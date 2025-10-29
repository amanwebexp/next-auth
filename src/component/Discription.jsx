import { Grid, Typography } from "@mui/material";

export const features = [
    {
      title: "Informative",
      description:
        "NextAuth is a robust authentication system designed to provide secure, user-friendly access. Explore its features and learn how to get started with confidence.",
    },
    {
      title: "Friendly and Welcoming",
      description:
        "Welcome! Start your journey with NextAuth as we guide you through our app's intuitive login process and powerful features.",
    },
    {
      title: "Feature-Oriented",
      description:
        "Experience hassle-free, secure authentication with NextAuth. Dive into the app and discover how quickly you can get started.",
    },
    {
      title: "Multi-Factor Authentication",
      description:
        "Enhance security with our multi-factor authentication option. Combine something you know (password) with something you have (authenticator app or SMS) for an added layer of protection.",
    },
    {
      title: "Social Media Integration",
      description:
        "Log in effortlessly using your favorite social media platforms, including Google, Facebook, and GitHub. No need to remember another password!",
    },
    {
      title: "Session Management",
      description:
        "Stay logged in for convenience, or log out from all devices for security. NextAuth puts you in control of your sessions.",
    },
    {
      title: "Developer-Friendly API",
      description:
        "Integrate NextAuth into your app effortlessly with our developer-friendly API. Customizable, extensible, and well-documented for your needs.",
    },
  ];

// Feature card
export const FeatureCard = ({ title, description }) => (
    <Grid
      item
      xs={12}
      sm={6}
      spacing={3}
      sx={{
        color:"white",
        // backgroundColor: "white",
        // boxShadow: 3,
        // borderRadius: 1,
        p: 2,
        mt: 2,
      }}
      columnSpacing={3}
    //    className="rounded-md border-2  "
    >
      <Typography variant="h6" sx={{ mt: 2 }}>
        {title}
      </Typography>
      <Typography variant="body1" paragraph>
        {description}
      </Typography>
    </Grid>
  );