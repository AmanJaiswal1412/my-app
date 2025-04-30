import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";


// Extending the NextAuth types to add custom fields to Profile and Session
declare module "next-auth" {
    interface Session {
      user: {
        id: string;
        email: string;
        name: string;
        picture: string;
      };
    }
  
    interface Profile {
      id: string;
      email?: string;
      name?: string;
      picture?: string;
    }
  }


export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.id = profile.id;
        token.email = profile.email || "";
        token.name = profile.name || "";
        token.picture = profile.picture || "";
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.email = token.email as string;
      session.user.name = token.name as string;
      session.user.picture = token.picture as string;
      return session;
    },
    async redirect({ url, baseUrl }) {
        // Always redirect to dashboard after login
        return `${baseUrl}`;
      },
  },
  secret: process.env.JWT_SECRET || "your_default_secret_key",
  pages: {
    signIn: "/login",
  },
});
