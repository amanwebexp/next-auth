import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import GitHubProvider from "next-auth/providers/github";
import { routesUrl } from "@/utils/pagesurl";
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        // It will force the Refresh Token to always be provided on sign in
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
      version: "2.0",
    }),
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
    Credentials({
      async authorize(credentials, req) {

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
  pages: {
    signIn: routesUrl.signIn,
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // the user present here gets the same data as received from DB call  made above -> fetchUserInfo(credentials.opt)
      return { ...token, ...user, ...account };
    },
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
export { handler as GET, handler as POST };
