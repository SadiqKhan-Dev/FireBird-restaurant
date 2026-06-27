import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";

interface SpiceIndicatorProps {
  level: number;
  maxLevel?: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  className?: string;
}

const spiceLabels = [
  "Mild",
  "Medium",
  "Hot",
  "Extra Hot",
  "Inferno",
];

const spiceColors = [
  "text-spice-mild",
  "text-spice-medium",
  "text-spice-hot",
  "text-spice-extrahot",
  "text-spice-inferno",
];

export function SpiceIndicator({
  level,
  maxLevel = 4,
  size = "sm",
  showLabel = false,
  className,
}: SpiceIndicatorProps) {
  if (level === 0 && !showLabel) return null;

  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <div className="flex items-center gap-0.5" aria-label={`Spice level: ${level} out of ${maxLevel}`}>
        {Array.from({ length: maxLevel }).map((_, i) => (
          <Flame
            key={i}
            className={cn(
              sizeClasses[size],
              i < level
                ? cn(spiceColors[Math.min(level - 1, 4)], "fill-current")
                : "text-neutral-200"
            )}
          />
        ))}
      </div>
      {showLabel && level > 0 && (
        <span className="ml-1 text-xs text-muted-foreground">
          {spiceLabels[Math.min(level - 1, 4)]}
        </span>
      )}
    </div>
  );
}
