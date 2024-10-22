import Database from 'better-sqlite3';
import { join } from 'path';

const dbPath = process.env.NODE_ENV === 'production'
  ? '/tmp/emails.db'
  : join(process.cwd(), 'emails.db');

const db = new Database(dbPath, { verbose: console.log });

db.exec(`
  CREATE TABLE IF NOT EXISTS emails (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    created_at TEXT NOT NULL
  )
`);


db.exec(`
  CREATE TABLE IF NOT EXISTS magic_links (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    token TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL,
    expires_at INTEGER NOT NULL
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    configs TEXT NOT NULL DEFAULT '[]'
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS configs (
    configName TEXT PRIMARY KEY,
    config TEXT NOT NULL
  )
`);

try {
  db.exec(`ALTER TABLE users ADD COLUMN configs TEXT NOT NULL DEFAULT '[]'`);
} catch (error) {
  if (!error.message.includes("duplicate column name: configs")) {
    console.error('Erreur lors de l\'ajout de la colonne configs:', error);
  }
}

export default db;
