import { defineEventHandler, getQuery, sendRedirect } from 'h3';
import { useRuntimeConfig } from '#imports';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const { code } = getQuery(event);

  if (!code) {
    throw new Error('No code provided');
  }

  const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: config.GITHUB_CLIENT_ID,
      client_secret: config.GITHUB_CLIENT_SECRET,
      code,
    }),
  });

  const tokenData = await tokenResponse.json();

  if (tokenData.error) {
    throw new Error(tokenData.error_description);
  }

  const script = `
    <script>
      localStorage.setItem('github_token', '${tokenData.access_token}');
      window.location.href = '/export';
    </script>
  `;

  event.node.res.setHeader('Content-Type', 'text/html');
  event.node.res.end(script);
});
