"use client";
import { Button } from "@/components/ui/button";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { api } from "@/lib/api";
import { SignedIn, UserButton, useUser } from "@clerk/nextjs";
import type { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const NavFooter = ({ prismaUser }: { prismaUser: User }) => {
  const router = useRouter();

  const { isLoaded, isSignedIn, user } = useUser();
  const [loading, setLoading] = useState(false);

  // tRPC mutation
  const buySubscriptionMutation = api.lemonSqueezy.buySubscription.useMutation({
    onSuccess: (data) => {
      if (data.status === 200 && data.url) {
        router.push(data.url);
      } else {
        toast.error("Failed to upgrade subscription. Please try again.");
      }
      setLoading(false);
    },
    onError: (error) => {
      console.error("Error upgrading subscription:", error);
      toast.error("Failed to upgrade subscription. Please try again.");
      setLoading(false);
    },
  });

  if (!isLoaded || !isSignedIn) return null;

  const handleUpgrading = async () => {
    setLoading(true);
    try {
      await buySubscriptionMutation.mutateAsync({ userId: prismaUser.id });
    } catch (error) {
      // Error handling is done in the onError callback
      console.error("Error upgrading subscription:", error);
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex flex-col gap-y-6 items-start group-data-[collapsible=icon]:hidden">
          {!prismaUser.subscription && (
            <div className="flex flex-col items-start gap-4 p-2 pb-3 bg-background-80 rounded-xl">
              <div className="flex flex-col items-start gap-1">
                <p className="text-base font-bold">
                  Get <span className="text-vivid">Creative AI</span>
                </p>
                <span className="text-sm dark:text-secondary">
                  Unlock all features including AI and more
                </span>
              </div>
              <div className="w-full bg-vivid-gradient p-[1px] rounded-full">
                <Button
                  className="w-full font-bold rounded-full border-vivid bg-background-80 hover:bg-background-90 text-primary"
                  variant="default"
                  size="lg"
                  onClick={handleUpgrading}
                >
                  {loading ? "Upgrading" : "Upgrade"}
                </Button>
              </div>
            </div>
          )}
          <SignedIn>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <UserButton />
              <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                <span className="font-semibold truncate">{user?.fullName}</span>
                <span className="truncate text-secondary">
                  {user?.emailAddresses[0]?.emailAddress}
                </span>
              </div>
            </SidebarMenuButton>
          </SignedIn>
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default NavFooter;
