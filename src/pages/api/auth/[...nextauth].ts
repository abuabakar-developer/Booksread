import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import clientPromise from '../../../lib/mongodb';

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        const client = await clientPromise;
        const db = client.db('your-database-name');
        const user = await db.collection('users').findOne({ email: credentials?.email });

        if (user && credentials?.password === user.password) {
          return { id: user._id, email: user.email };
        } else {
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: '/signin', // Point to your custom sign-in page
  },
  callbacks: {
    async session({ session, token }) {
      session.user.id = token.sub;
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
});
