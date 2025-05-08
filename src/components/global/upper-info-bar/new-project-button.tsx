"use client";
import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

const NewProjectButton = ({ user }: { user: User }) => {
  const router = useRouter();
  return (
    <Button
      className="font-semibold rounded-lg"
      disabled={!user.subscription}
      onClick={() => router.push("/create-page")}
    >
      <Plus />
      New Project
    </Button>
  );
};

export default NewProjectButton;
