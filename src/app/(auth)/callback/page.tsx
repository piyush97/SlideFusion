import { onAuthenticateUser } from "@/actions/user";
import { ROUTES } from "@/global/constants";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

const AuthCallbackPage = async () => {
  const auth = await onAuthenticateUser();
  if (!auth) {
    console.log("Auth is undefined");
    redirect(ROUTES.signin);
    return;
  }

  console.log("Auth status:", auth.status);

  if (auth.status === 200 || auth.status === 201) {
    console.log("Redirecting to dashboard");
    redirect(ROUTES.dashboard);
  } else if (
    auth.status === 403 ||
    auth.status === 400 ||
    auth.status === 500
  ) {
    console.log("Redirecting to signin due to status:", auth.status);
    redirect(ROUTES.signin);
  }
  if (auth.status === 404) {
    console.log("Redirecting to signup");
    redirect(ROUTES.signup);
  } else if (auth.status === 401) {
    console.log("Redirecting to signout");
    redirect(ROUTES.signout);
  } else {
    console.log("Unhandled status code:", auth.status);
    redirect(ROUTES.signin);
  }
};

export default AuthCallbackPage;
