export const dynamic = "force-dynamic";

import { onAuthenticateUser } from "@/actions/user";
import { redirect } from "next/navigation";

type Props = {
  children: React.ReactNode;
};
const DashboardLayout = async ({ children }: Props) => {
  const auth = await onAuthenticateUser();
  if (!auth?.user) redirect("/signin");

  return <div className="w-full min-h-screen">{children}</div>;
};

export default DashboardLayout;
