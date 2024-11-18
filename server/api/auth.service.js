import nodemailer from 'nodemailer';
import { supabase } from '~/utils/supabase';
import jwt from 'jsonwebtoken';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const generateToken = (email) => {
  return jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '2h' });
};

export const sendMagicLink = async (email) => {
  const token = generateToken(email);
  const expirationTime = new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString();

  const link = `${process.env.BASE_URL}/verify?token=${token}&email=${email}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Votre lien magique',
    text: `Cliquez sur ce lien pour vous connecter : ${link}`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    throw new Error('Erreur lors de l\'envoi de l\'email');
  }

  const { error } = await supabase
    .from('magic_links')
    .insert([{ token, email, expires_at: expirationTime }]);

  if (error) {
    console.error('Erreur lors de l\'insertion du lien magique:', error.message);
    throw new Error('Erreur lors de l\'insertion du lien magique');
  }

  return token;
};
