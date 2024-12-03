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
        try {
          const { data: existingUser, error: fetchError } = await supabase
            .from('users')
            .select('*')
            .eq('email', profile.email)
            .single()

          if (!existingUser) {
            const { data: newUser, error: insertError } = await supabase
              .from('users')
              .insert([{
                email: profile.email,
                name: profile.name,
                github_id: profile.id,
                avatar_url: profile.avatar_url
              }])
              .select()
              .single()

            if (insertError) {
              console.error('Erreur lors de la création de l\'utilisateur:', insertError)
              throw new Error('Erreur lors de la création de l\'utilisateur')
            }

            return {
              id: newUser.id,
              email: profile.email,
              name: profile.name
            }
          }

          return {
            id: existingUser.id,
            email: profile.email,
            name: profile.name
          }
        } catch (error) {
          console.error('Erreur dans le profil GitHub:', error)
          throw error
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id
      }
      return session
    }
  }
});
