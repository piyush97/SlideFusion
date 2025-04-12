import { cn } from "@/lib/utils";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  HelpCircle,
  Info,
} from "lucide-react";

type Props = {
  type: "success" | "info" | "warning" | "question" | "caution";
  children: React.ReactNode;
  className?: string;
};

const icons = {
  success: CheckCircle,
  warning: AlertTriangle,
  info: Info,
  question: HelpCircle,
  caution: AlertCircle,
};

const CalloutBox = ({ type, children, className = "", ...props }: Props) => {
  const Icon = icons[type];

  const colors = {
    success: {
      bg: "bg-green-100",
      border: "border-green-500",
      text: "text-green-800",
    },
    warning: {
      bg: "bg-yellow-100",
      border: "border-yellow-500",
      text: "text-yellow-800",
    },
    info: {
      bg: "bg-blue-100",
      border: "border-blue-500",
      text: "text-blue-800",
    },
    question: {
      bg: "bg-purple-100",
      border: "border-purple-500",
      text: "text-purple-800",
    },
    caution: {
      bg: "bg-red-100",
      border: "border-red-500",
      text: "text-red-800",
    },
  };

  return (
    <div
      className={cn(
        "p-4 rounded-lg border-l-4 flex items-start",
        colors[type].bg,
        colors[type].border,
        colors[type].text,
        className
      )}
      {...props}
    >
      <Icon className="mr-3 h-5 w-5 mt-0.5" />
      <div>{children}</div>
      {children}
    </div>
  );
};

export default CalloutBox;
