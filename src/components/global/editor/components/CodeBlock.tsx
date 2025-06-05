import { cn } from "@/lib/utils";
import { useSlideStore } from "@/store/useSlideStore";

type Props = {
  code?: string;
  language?: string;
  onChange: (code: string) => void;
  className?: string;
};

const CodeBlock = ({ code, language, onChange, className }: Props) => {
  const { currentTheme } = useSlideStore();

  return (
    <pre
      className={cn("p-4 rounded-lg overflow-x-auto", className)}
      style={{ backgroundColor: `${currentTheme.accentColor}20` }}
    >
      <code className={`language-${language}`}>
        <textarea
          value={code}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-full font-mono bg-transparent outline-none"
          style={{ color: currentTheme.fontColor }}
        />
      </code>
    </pre>
  );
};

export default CodeBlock;
