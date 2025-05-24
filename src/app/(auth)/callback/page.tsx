"use client";

import { ROUTES } from "@/config";
import { api } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const AuthCallbackPage = () => {
  const router = useRouter();

  const { data: auth, isLoading } = api.user.authenticate.useQuery();

  useEffect(() => {
    if (isLoading) return;

    if (!auth) {
      console.log("Auth is undefined");
      router.push(ROUTES.signin);
      return;
    }

    console.log("Auth status:", auth.status);

    if (auth.status === 200 || auth.status === 201) {
      console.log("Redirecting to dashboard");
      router.push(ROUTES.dashboard);
    } else if (
      auth.status === 403 ||
      auth.status === 400 ||
      auth.status === 500
    ) {
      console.log("Redirecting to signin due to status:", auth.status);
      router.push(ROUTES.signin);
    } else if (auth.status === 404) {
      console.log("Redirecting to signup");
      router.push(ROUTES.signup);
    }
  }, [auth, isLoading, router]);

  if (isLoading) {
    return <div>Authenticating...</div>;
  }

  return null;
};

export default AuthCallbackPage;
