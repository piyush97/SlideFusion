"use client";
import AlertDialogBox from "@/components/global/alert-dialog";
import { Button } from "@/components/ui/button";
import { Project } from "@prisma/client";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = { Projects: Project[] };

const DeleteAllButton = ({ Projects }: Props) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <AlertDialogBox
      description="This action cannot be undone. This will permanently delete all your projects and remove your data from our servers"
      className="text-white bg-red-500 dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700"
      onClick={handleDeleteAllProjects}
      loading={loading}
      handleOpen={() => setOpen(!open)}
      open={open}
    >
      <Button
        size="lg"
        className="font-semibold rounded-lg bg-background-80 dark:hover:bg-background-90 text-primary hover:text-white"
      >
        <Trash /> Delete All
      </Button>
    </AlertDialogBox>
  );
};

export default DeleteAllButton;
