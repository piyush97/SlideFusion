import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog";
import { Loader2 } from "lucide-react";

type Props = {
  className?: string;
  description: string;
  loading: boolean;
  onClick: () => void;
  handleOpen: () => void;
  open: boolean;
  children: React.ReactNode;
};

const AlertDialogBox = ({
  open,
  handleOpen,
  description,
  loading = false,
  onClick,
  children,
  className,
}: Props) => {
  return (
    <AlertDialog open={open} onOpenChange={handleOpen}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
        <AlertDialogDescription>{description}</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={onClick}
            className={`${className} `}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" />
                Loading...
              </>
            ) : (
              "Continue"
            )}
          </Button>
        </AlertDialogCancel>
      </AlertDialogFooter>
      <AlertDialogContent></AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogBox;
