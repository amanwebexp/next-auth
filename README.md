# Integrating NextAuth Providers in a Next.js Application
This guide illustrates how to implement authentication in a Next.js application using NextAuth.js. The integration covers multiple OAuth providers including Google, Twitter, and GitHub to offer secure and streamlined user sign-ins.
Next Authentication: [Example Next Auth](https://next-auth-pi-steel.vercel.app/auth/signin)
## About NextAuth js
NextAuth.js is a powerful, open-source authentication library designed for seamless integration with Next.js and Serverless frameworks. It offers easy-to-implement authentication solutions for full-stack applications and aims to expand support for additional frameworks in the future.
For more detailed information and documentation, visit the [NextAuth.js website](https://next-auth.js.org/).

## Build with
* [Next js](https://nextjs.org/) - A React framework for server-side rendering and static site generation..
* [NextAuth.js](https://next-auth.js.org/) - An authentication library for Next.js.
* [MUI](https://mui.com/) - A comprehensive UI library.

##Installation
## To set up this project, follow these steps:
Install of framework and library
For Next js 
```bash 
npx create-next-app@latest
```
For Next Auth 
```bash 
npm install next-auth
```
For Mui 
```bash
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/material @mui/styled-engine-sc styled-components
npm install @fontsource/roboto
npm install @mui/icons-material
```

Navigate to your project directory and install the necessary npm packages:

```bash
  npm install 
```

## Project Scope
The primary goal of this project is to authenticate users and grant access to pages that require user verification. By integrating NextAuth.js with multiple OAuth providers, this project ensures a secure and user-friendly sign-in process.

### Configure Authentication Providers
When setting up OAuth, in the developer admin page for each of your OAuth services, you should configure the callback URL to use a callback path of `{server}/api/auth/callback/{provider}`.

 e.g. For Google OAuth you would use: `https://YOUR_DOMAIN_URL/api/auth/callback/google`.
 
A list of configured providers and their callback URLs is available from the endpoint `api/auth/providers`. 
You can find more information at [Next Auth Providers](https://next-auth.js.org/v3/configuration/providers)

## Creating OAuth Provider Credentials

To enable authentication with different providers, you need to create **Client ID** and **Client Secret** for each platform.  
Follow the links below to set them up:

- **Google:** [Google Cloud Console](https://console.cloud.google.com/)  
- **Twitter (X):** [Twitter Developer Portal](https://developer.twitter.com/en/portal/projects)  
- **GitHub:** [GitHub Developer Settings](https://github.com/settings/developers)


## ⚙️ Environment Variables Setup

Create a `.env` file in your project root and add the following credentials:

```bash
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=454B

# Base URL for API calls
NEXT_PUBLIC_BASE_URL=https://dummyjson.com

# GitHub Provider
GITHUB_ID=ghp_1234567890abcdef1234
GITHUB_SECRET=ghs_abcdef1234567890abcdef1234

# Twitter (X) Provider
TWITTER_CLIENT_ID=tw_9876543210abcdef
TWITTER_CLIENT_SECRET=ts_abcdef9876543210abcdef

# Google Provider
GOOGLE_CLIENT_ID=1234567890-abcdefg.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-abcdef1234567890abcdef
```
## Notes
  * Replace the dummy values with your actual credentials from each provider.
  * Never commit real credentials to a public repository.
  * Restart your development server after adding or updating environment variables.

#  Optional: Steps to Create Each Credential
##  Google
  * Go to Google Cloud Console
  * Create a new project (or select an existing one).
  * Navigate to APIs & Services → Credentials.
  * Click Create Credentials → OAuth 2.0 Client IDs.
  * Choose Web Application and add your redirect URI (e.g., https://YOUR_DOMAIN_URL/api/auth/callback/google).
  * Copy your Client ID and Client Secret into .env .
## Twitter (X)
 * Visit Twitter Developer Portal
 * Create a new App inside a Project.
 * In the User authentication settings, enable OAuth 2.0.
 * Add a callback URL: https://YOUR_DOMAIN_URL/api/auth/callback/twitter.
 * Copy your Client ID and Client Secret into .env .

## GitHub
 * Go to GitHub Developer Settings
 * Click New OAuth App.
 * Set Homepage URL: https://YOUR_DOMAIN_URL
 * Set Authorization callback URL: https://YOUR_DOMAIN_URL/api/auth/callback/github
 * Copy your Client ID and Client Secret into .env .
