"use client";
import { SignUp } from "@clerk/clerk-react";

export const runtime = 'edge'; // Required for Cloudflare Pages

const Signup = () => {
  return <SignUp />;
};

export default Signup;
