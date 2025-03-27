import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { User } from "@prisma/client";
import { Upload } from "lucide-react";
import ThemeSwitcher from "../mode-toggle";
import NewProjectButton from "./new-project-button";
import SearchBar from "./upper-info-searchbar";

type Props = {
  user: User;
};

const UpperInfoBar = ({ user }: Props) => {
  return (
    <header className="sticky top-0 z-[10] flex shrink-0 flex-wrap items-center gap-2  bg-background p-4 justify-between">
      <SidebarTrigger className="ml-2 z-[20]" />
      <Separator orientation="vertical" className="h-4 mr-2" />
      <div className="w-full max-w-[95%] flex items-center justify-between gap-4 flex-wrap">
        <SearchBar />
        <ThemeSwitcher />
      </div>
      <div className="flex flex-wrap items-center justify-end gap-4">
        <Button className="font-semibold rounded-lg cursor-not-allowed bg-primary-80 hover:bg-background-80 text-primary">
          <Upload />
          Import
        </Button>
        <NewProjectButton user={user} />{" "}
      </div>
    </header>
  );
};

export default UpperInfoBar;
