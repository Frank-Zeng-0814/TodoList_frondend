import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  barClassName?: string;
  showLabel?: boolean;
  labelClassName?: string;
  label?: string;
}

export function ProgressBar({
  value,
  max = 100,
  className,
  barClassName,
  showLabel = false,
  labelClassName,
  label,
}: ProgressBarProps) {
  const percentage = Math.round((value / max) * 100);

  return (
    <div>
      <div className={cn("w-full bg-gray-100 rounded-full h-2.5", className)}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5 }}
          className={cn("bg-blue-500 h-2.5 rounded-full", barClassName)}
        />
      </div>

      {showLabel && (
        <div className="flex justify-end mt-1">
          <span className={cn("text-xs text-gray-500", labelClassName)}>
            {label || `${percentage}%`}
          </span>
        </div>
      )}
    </div>
  );
}
