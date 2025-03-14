import { onAuthenticateUser } from "@/actions/user";
import { redirect } from "next/navigation";

const AuthCallbackPage = async () => {
  const auth = await onAuthenticateUser();
  console.log("Auth status:", auth.status);

  if (auth.status === 200 || auth.status === 201) {
    console.log("Redirecting to dashboard");
    redirect("/dashboard");
  } else if (
    auth.status === 403 ||
    auth.status === 400 ||
    auth.status === 500
  ) {
    console.log("Redirecting to signin due to status:", auth.status);
    redirect("/signin");
  }
  if (auth.status === 404) {
    console.log("Redirecting to signup");
    redirect("/signup");
  } else if (auth.status === 401) {
    console.log("Redirecting to signout");
    redirect("/signout");
  } else if (auth.status === 409) {
    console.log("Redirecting to verify");
    redirect("/verify");
  } else {
    console.log("Unhandled status code:", auth.status);
    redirect("/signin");
  }
};

export default AuthCallbackPage;
