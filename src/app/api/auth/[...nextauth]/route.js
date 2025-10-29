import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import GitHubProvider from "next-auth/providers/github";
import { routesUrl } from "@/utils/pagesurl";
const handler = NextAuth({
  // 🔹 Define all authentication providers (OAuth + Credentials)
  providers: [
    // ✅ Google authentication configuration
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        // Force consent screen every time to get a refresh token
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    // ✅ Twitter authentication configuration (OAuth 2.0)
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
      version: "2.0",
    }),
    // GitHub OAuth provider setup
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      authorization: {
        // It will force the Refresh Token to always be provided on sign in
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    // Credentials-based custom login (username/password)
    Credentials({
      async authorize(credentials, req) {
        // Send credentials to backend API for authentication
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
          {
            method: "POST",
            body: JSON.stringify(credentials),
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          }
        );
        const user = await res.json();

        if (!res.ok) throw new Error("Network response was not ok");
        // Return user data if authentication successful
        if (res.ok && user)
          return {
            id: user.id,
            name: user.username,
            email: user.email,
            image: user.image,
            accessToken: user.token,
          };
        return null;
      },
    }),
  ],
  // Define custom sign-in page route
  pages: {
    signIn: routesUrl.signIn,
  },
  // Define NextAuth callback functions

  callbacks: {
    // Modify JWT token before storing it
    async jwt({ token, user, account }) {
      // Merge existing token with user and account info

      return { ...token, ...user, ...account };
    },
    // Control what session data is exposed to the client
    async session({ token }) {
      return {
        user: {
          email: token.email,
          id: token.id,
          fullName: token.fullName,
          profileImage: token.profileImage,
          accessToken: token.accessToken,
          admin: token.admin,
          dummyImage: "/assets/images/dummy-profile-img.webp",
        },
      };
    },
  },
});
// Export handler for both GET and POST requests (required by NextAuth)
export { handler as GET, handler as POST };
