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
    })
  ],
  basePath: '/api/auth',
  baseUrl: runtimeConfig.public.authOrigin
})
