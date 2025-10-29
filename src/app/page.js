"use client";
import { FeatureCard, features } from "@/component/Discription";
import { Box, Container, Grid, Typography } from "@mui/material";
import * as React from "react";

export default function Home() {
  return (
    <>
      <Container>
        <Box sx={{ textAlign: "center", color: "white", mt: 4 }}>
          <Typography variant="h3" gutterBottom>
            <div>
              <img
                src="auth.jpg"
                className="absolute left-0 top-12 -z-50  object-cover"
                alt="Background"
              />
            </div>
            <Typography variant="h3" gutterBottom sx={{ fontWeight: "bold", mb: 2 }}>
              NextAuth
            </Typography>
          </Typography>
          <Typography variant="body1" paragraph className="tracking-widest">
            Your gateway to a seamless, secure, and user-friendly authentication
            experience. Get started with ease and explore our app powerful
            features.
          </Typography>
          <Grid container spacing={4} sx={{ mt: 3 }}>
            {features.map((item, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Box
                  sx={{
                    backgroundColor: "rgb(0 0 0 / 50%)",
                    padding: 3,
                    borderRadius: 2,
                    boxShadow: 4,
                    textAlign: "center",
                    transition:
                      "transform 0.3s ease, background-color 0.3s ease",
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2">{item.description}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
}

