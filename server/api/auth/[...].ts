import { NuxtAuthHandler } from '#auth'
import GithubProvider from 'next-auth/providers/github'
import { supabase } from '~/utils/supabase';

const runtimeConfig = useRuntimeConfig()

export default NuxtAuthHandler({
  secret: runtimeConfig.authSecret,
  pages: {
    signIn: '/login'
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
          await supabase.from('users').insert([{ email: profile.email }]);
        }

        return profile;
      }
    }),
  ],
});
