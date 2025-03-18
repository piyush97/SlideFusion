/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { Button } from "@/components/ui/button";
import { itemVariant, ROUTES, themes } from "@/global/constants";
import { timeAgo } from "@/lib/utils";
import { useSlideStore } from "@/store/useSlideStore";
import { JsonValue } from "@prisma/client/runtime/library";
import { motion } from "framer-motion";
import router from "next/router";
import { useState } from "react";
import AlertDialogBox from "../alert-dialog";
import Thumbnail from "./thumbnail";
type Props = {
  projectId: string;
  isDeleted?: boolean;
  createdAt: Date;
  slideData: JsonValue;
  src: string;
  title: string;
  themeName: string;
};

const ProjectCard = ({
  projectId,
  isDeleted,
  createdAt,
  slideData,
  src,
  title,
  themeName,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const { setSlides } = useSlideStore();

  const theme = themes.find((theme) => theme.name === themeName) || themes[0];
  const handleNavigation = () => {
    setSlides(JSON.parse(JSON.stringify(slideData)));
    router.push(`${ROUTES.presentation}/${projectId}`);
  };

  return (
    <motion.div
      className={`group w-full flex flex-col gap-y-3 rounded-xl p-3 transition-colors ${
        !isDeleted && "hover:bg-muted/50"
      }`}
      variants={itemVariant}
    >
      <div
        className="relative aspect-[16/10] overflow-hidden rounded-lg cursor-pointer"
        onClick={handleNavigation}
      >
        <Thumbnail
          slide={JSON.parse(JSON.stringify(slideData))?.[0]}
          theme={theme}
        />
      </div>
      <div className="w-full">
        <div className="space-y-1">
          <h3 className="font-semibold text-base text-primary line-clamp-1">
            {title}
          </h3>
          <div className="flex w-full justify-between items-center gap-2">
            <p
              className="text-sm text-muted-foreground"
              suppressHydrationWarning
            >
              {timeAgo(createdAt)}
            </p>
            {isDeleted ? (
              <AlertDialogBox
                description="This will recover your project and restore your data"
                className="bg-green-500 text-white dark:bg-green-600 hover:bg-green-600 dark:hover:bg-green-700"
                loading={loading}
                open={open}
                // onClick={handleRecover}
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
              ""
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
