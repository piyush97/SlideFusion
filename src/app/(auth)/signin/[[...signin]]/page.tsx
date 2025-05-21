"use client";

import { SignIn } from "@clerk/clerk-react";

export const runtime = 'edge'; // Required for Cloudflare Pages

const Signin = () => {
  return <SignIn />;
};

export default Signin;
