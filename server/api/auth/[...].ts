import { NuxtAuthHandler } from '#auth'
import GithubProvider from 'next-auth/providers/github'
import { supabase } from '~/utils/supabase';

const runtimeConfig = useRuntimeConfig()

export default NuxtAuthHandler({
  secret: runtimeConfig.authSecret,
  pages: {
    signIn: '/login',
    error: '/login'
  },
  providers: [
    GithubProvider.default({
      clientId: runtimeConfig.public.GITHUB_CLIENT_ID,
      clientSecret: runtimeConfig.GITHUB_CLIENT_SECRET,
      async profile(profile) {
        const { data: user, error } = await supabase
          .from('users')
          .select('*')
          .eq('email', profile.email)
          .single();

        if (!user) {
          const { error: insertError } = await supabase
            .from('users')
            .insert([{ email: profile.email }]);

          if (insertError) {
            console.error('Erreur lors de l\'insertion de l\'utilisateur:', insertError.message);
            throw new Error('Erreur lors de l\'insertion de l\'utilisateur');
          }
        }

        return profile;
      }
    }),
  ],
  cookies: {
    sessionToken: {
      name: 'next-auth.session-token',
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      },
    },
    callbackUrl: {
      name: 'next-auth.callback-url',
      options: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
      },
    },
  },
});
