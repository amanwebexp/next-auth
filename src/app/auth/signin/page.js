"use client";
import { FormControl, FormLabel } from "@mui/joy";
import { Sheet } from "@mui/joy";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button, CircularProgress, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { routesUrl } from "@/utils/pagesurl";
import InputField from "../../../component/shared/form/InputField";
import { signIn, useSession } from "next-auth/react";
import GoogleIcon from "@mui/icons-material/Google";
import XIcon from "@mui/icons-material/X";
import GitHubIcon from "@mui/icons-material/GitHub";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginvalidation } from "@/component/Validation/loginvalidation";
import { errorMsg, successMsg } from "@/component/Toastmsg/toaster";
const Login = () => {
  // Initialize react-hook-form with Yup validation schema
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginvalidation) });
  // Local states for handling loader and error messages
  const [error, setError] = useState(null);
  const [loader, setLoader] = useState(false);
  // Next.js router for redirection
  const router = useRouter();
  // Form submit handler

  const onSubmit = async (data) => {
    const { username, password } = data;
    setLoader(true);
    try {
      // Trigger NextAuth credentials login
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (res.error) {
        errorMsg("Invalid credentials");
        setLoader(false);
      } else {
        router.replace(routesUrl.products);
        successMsg("Login Successfully");
      }
    } catch (error) {
      errorMsg("Login Error");
      setLoader(true);
    }
  };
  return (
    <Sheet
      sx={{
        width: 400,
        mx: "auto",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        py: 3,
        px: 4,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRadius: "sm",
        boxShadow: "md",
      }}
      variant="outlined"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Typography variant="h4" align="center">
            <b>Welcome!</b>
          </Typography>
          <Typography variant="body2" align="center">
            Sign in to continue.
          </Typography>
        </div>

        <div>
          <Typography variant="body2" sx={{ mt: 1, mb: 1 }}>
            <b>Login Credentials</b>
          </Typography>
          <Typography variant="body2">User name: emilys</Typography>
          <Typography variant="body2">Password: emilyspass</Typography>
        </div>

        <FormControl>
          <FormLabel>User Name</FormLabel>
          <InputField control={control} name="username" required />
          <Typography variant="body2" color="error" gutterBottom>
            {errors?.email?.message}
          </Typography>
        </FormControl>

        <FormControl>
          <FormLabel>Password</FormLabel>
          <InputField
            control={control}
            name="password"
            type="password"
            required
          />
          <Typography variant="body2" color="error" gutterBottom>
            {errors?.password?.message}
          </Typography>
        </FormControl>

        <br />

        <div>
          {loader === false ? (
            <Button
              type="submit"
              fullWidth
              className="bg-red-600 hover:bg-red-700 text-white font-bold cursor-pointer py-2 rounded-md transition duration-300"
            >
              Login
            </Button>
          ) : (
            <div className="flex justify-center">
              <CircularProgress size={24} />
            </div>
          )}
        </div>

        <div className="mt-5 ml-1">
          {error}
          <Typography variant="body2" sx={{ alignSelf: "center" }}>
            <Link href="" className="mr-2"></Link>
          </Typography>
        </div>
      </form>

      <button
        onClick={() => signIn("google")}
        className="flex items-center justify-center w-full bg-white border border-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md hover:bg-gray-100 transition duration-300 shadow-sm"
      >
        <GoogleIcon className="mr-2" /> Sign in with Google
      </button>

      <button
        onClick={() => signIn("twitter")}
        className="flex items-center justify-center w-full bg-blue-400 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-500 transition duration-300 shadow-sm"
      >
        <XIcon className="mr-2" /> Sign in with Twitter
      </button>

      <button
        onClick={() => signIn("github")}
        className="flex items-center justify-center w-full bg-gray-800 text-white font-semibold py-2 px-4 rounded-md hover:bg-gray-700 transition duration-300 shadow-sm"
      >
        <GitHubIcon className="mr-2" /> Sign in with GitHub
      </button>
    </Sheet>
  );
};

export default Login;
