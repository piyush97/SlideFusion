export const dynamic = "force-dynamic";

import { onAuthenticateUser } from "@/actions/user";
import { ROUTES } from "@/global/constants";
import { redirect } from "next/navigation";

type Props = {
  children: React.ReactNode;
};
const DashboardLayout = async ({ children }: Props) => {
  const auth = await onAuthenticateUser();
  if (!auth?.user) redirect(ROUTES.signin);

  return <div className="w-full min-h-screen">{children}</div>;
};

export default DashboardLayout;
