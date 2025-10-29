# Integrating NextAuth Providers in a Next.js Application
This guide illustrates how to implement authentication in a Next.js application using NextAuth.js. The integration covers multiple OAuth providers including Google, Twitter, and GitHub to offer secure and streamlined user sign-ins.

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
  cd my-project
```

## Project Scope
The primary goal of this project is to authenticate users and grant access to pages that require user verification. By integrating NextAuth.js with multiple OAuth providers, this project ensures a secure and user-friendly sign-in process.

### Configure Authentication Providers
When setting up OAuth, in the developer admin page for each of your OAuth services, you should configure the callback URL to use a callback path of `{server}/api/auth/callback/{provider}`.

 e.g. For Google OAuth you would use: `http://localhost:3000/api/auth/callback/google`.
 
A list of configured providers and their callback URLs is available from the endpoint `api/auth/providers`. 
You can find more information at [Next Auth Providers](https://next-auth.js.org/v3/configuration/providers)

