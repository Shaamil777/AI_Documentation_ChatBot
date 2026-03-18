import { FileText } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="px-5 py-3.5 flex items-center border-b border-border">
      <div className="flex items-center gap-2.5">
        <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center shadow-sm shadow-glow-primary">
          <FileText className="w-4 h-4 text-white" />
        </div>
        <span className="text-foreground font-semibold text-[15px] tracking-tight">
          DocChat AI
        </span>
      </div>
    </nav>
  );
}