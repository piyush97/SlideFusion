"use client";

import { Button } from "@/components/ui/button";
import { ROUTES, itemVariant, themes } from "@/config";
import { api } from "@/lib/api";
import { timeAgo } from "@/lib/utils";
import { useSlideStore } from "@/store/useSlideStore";
import type { JsonValue } from "@prisma/client/runtime/library";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import AlertDialogBox from "../alert-dialog";
import Thumbnail from "./thumbnail";

type Props = {
  projectId: string;
  isDeleted?: boolean;
  createdAt: Date;
  slideData: JsonValue;
  title: string;
  themeName: string;
};

const ProjectCard = ({
  projectId,
  isDeleted,
  createdAt,
  slideData,
  title,
  themeName,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const { setSlides } = useSlideStore();
  const router = useRouter();

  // tRPC mutations
  const utils = api.useUtils();
  const deleteProjectMutation = api.project.delete.useMutation({
    onSuccess: () => {
      utils.project.getAll.invalidate();
      utils.project.getRecent.invalidate();
      toast.success("Project deleted successfully");
      setOpen(false);
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const recoverProjectMutation = api.project.recover.useMutation({
    onSuccess: () => {
      utils.project.getAll.invalidate();
      utils.project.getRecent.invalidate();
      utils.project.getDeleted.invalidate();
      toast.success("Project recovered successfully");
      setOpen(false);
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
    onSettled: () => {
      setLoading(false);
    },
  });

  const theme = themes.find((theme) => theme.name === themeName) || themes[0];
  const handleNavigation = () => {
    setSlides(JSON.parse(JSON.stringify(slideData)));
    router.push(`${ROUTES.presentation}/${projectId}`);
  };

  const handleDelete = async () => {
    if (!projectId) {
      toast.error("Error: Project Not found");
      return;
    }
    setLoading(true);
    deleteProjectMutation.mutate({ projectId });
  };

  const handleRecover = async () => {
    if (!projectId) {
      toast.error("Error: Project Not found");
      return;
    }
    setLoading(true);
    recoverProjectMutation.mutate({ projectId });
  };

  return (
    <motion.div
      className={`group w-full flex flex-col gap-y-3 rounded-xl p-3 transition-colors bg-background-20 ${
        !isDeleted && "hover:bg-muted/50"
      }`}
      variants={itemVariant}
    >
      <div
        className="relative aspect-[16/10] overflow-hidden rounded-lg cursor-pointer"
        onClick={handleNavigation}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleNavigation();
          }
        }}
        tabIndex={0}
        role="button"
      >
        <Thumbnail
          slide={JSON.parse(JSON.stringify(slideData))?.[0]}
          theme={theme}
        />
      </div>
      <div className="w-full">
        <div className="space-y-1">
          <h3 className="text-base font-semibold text-primary line-clamp-1">
            {title}
          </h3>
          <div className="flex items-center justify-between w-full gap-2">
            <p
              className="text-sm text-muted-foreground"
              suppressHydrationWarning
            >
              {timeAgo(createdAt)}
            </p>
            {isDeleted ? (
              <AlertDialogBox
                description="This will recover your project and restore your data"
                className="text-white bg-green-500 dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-700"
                loading={loading}
                open={open}
                onClick={handleRecover}
                handleOpen={() => setOpen(!open)}
              >
                <Button
                  size="sm"
                  variant={"ghost"}
                  className="bg-background-80 dark:hover:bg-background-90"
                  disabled={loading}
                >
                  Recover
                </Button>
              </AlertDialogBox>
            ) : (
              <AlertDialogBox
                description="This will delete your project and remove it from the list"
                className="text-white bg-red-500 dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700"
                loading={loading}
                open={open}
                onClick={handleDelete}
                handleOpen={() => setOpen(!open)}
              >
                <Button
                  size="sm"
                  variant={"ghost"}
                  className="bg-background-80 dark:hover:bg-background-90"
                  disabled={loading}
                >
                  Delete
                </Button>
              </AlertDialogBox>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
