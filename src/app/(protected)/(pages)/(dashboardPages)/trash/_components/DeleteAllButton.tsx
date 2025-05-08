"use client";
import { deleteAllProjects } from "@/actions/project";
import AlertDialogBox from "@/components/global/alert-dialog";
import { Button } from "@/components/ui/button";
import { Project } from "@prisma/client";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

type Props = { Projects: Project[] };

const DeleteAllButton = ({ Projects }: Props) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDeleteAllProjects = async () => {
    setLoading(true);
    if (!Projects || Projects.length === 0) {
      setLoading(false);
      toast.error("Error: No projects found");
      return;
    }

    try {
      const res = await deleteAllProjects(
        Projects.map((project) => project.id)
      );

      if (res.status !== 200) {
        toast.error(`Something is wrong, please try again later: ${res.error}`);
        setOpen(false);
        return;
      }
      router.refresh();
      setOpen(false);
      toast.success("All projects deleted successfully");
    } catch (error) {
      console.error("Error deleting all projects", error);
      toast.error("Something went wrong, please try again later");
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };

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
