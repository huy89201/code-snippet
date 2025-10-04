import GithubProvider from 'next-auth/providers/github';

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: 'Ov23lisSiIANO5rm90b4',
      clientSecret: 'db3c052a7b890067f0e1aa64b15ca71ad9cdd60c',
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Add id into session.user
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};
