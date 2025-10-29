"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
} from "@mui/material";

import { errorMsg } from "@/component/Toastmsg/toaster";
import userDetail from "@/services/UserDetail"; // ✅ Uses your ApiClient wrapper

const Page = () => {
  // ✅ State variables for products, error handling, and UI loading control

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [hasShownSuccess, setHasShownSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  // ✅ Access current session data from NextAuth

  const { data: session, status } = useSession();
  // ✅ Track successful authentication (runs once when session is authenticated)

  useEffect(() => {
    if (status === "authenticated" && !hasShownSuccess) {
      setHasShownSuccess(true);
    }
  }, [status, hasShownSuccess]);
  // ✅ Fetch all products from the API

  const fetchProducts = async () => {
    if (!session) return; // Stop if user is not authenticated

    try {
      setLoading(true);
      const response = await userDetail.getAllProduct();
      setProducts(response?.products || []);
    } catch (err) {
      setError(err);
      errorMsg(err?.message || "Failed to load products");
    } finally {
      setLoading(false);
    }
  };
  // ✅ Trigger product fetch whenever user session is ready

  useEffect(() => {
    fetchProducts();
  }, [session]);
  // ✅ Show loading spinner during data fetch or session loading
  if (status === "loading" || loading) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        minHeight="60vh"
      >
        <CircularProgress />
      </Box>
    );
  }
  // ✅ Handle API or network error state
  if (error) {
    return (
      <Typography color="error" align="center" sx={{ mt: 5 }}>
        Error loading products: {error.message}
      </Typography>
    );
  }
  // ✅ Handle empty product list case

  if (products.length === 0) {
    return (
      <Typography align="center" sx={{ mt: 5 }}>
        No products found.
      </Typography>
    );
  }

  return (
    <Container className="max-w-full">
      <Typography variant="h4" gutterBottom sx={{ mt: 3 }}>
        Product List
      </Typography>

      <Grid container spacing={3} justifyContent="center" alignItems="stretch">
        {products.map((item) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CardMedia
                component="img"
                height="180"
                image={item?.thumbnail || "/placeholder.png"}
                alt={item?.title || "Product Image"}
                sx={{ objectFit: "cover" }}
              />

              <CardContent>
                <Typography variant="h6" gutterBottom noWrap>
                  {item.title}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {item.description}
                </Typography>
                <Typography variant="subtitle1" sx={{ mt: 1 }}>
                  💲{item.price}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Category: {item.category}
                </Typography>
              </CardContent>

              <CardActions>
                <Link href={`/products/${item.id}`} passHref>
                  <Button size="small" variant="outlined">
                    View Details
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Page;
