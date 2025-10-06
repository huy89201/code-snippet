import { withAuth } from 'next-auth/middleware';

export default withAuth(() => {}, {
  callbacks: {
    // require a session (JWT) for matched routes
    authorized: ({ token }) => !!token,
  },
  pages: {
    signIn: '/api/auth/signin',
  },
});

export const config = {
  matcher: ['/', '/snippet/:path*'],
};
