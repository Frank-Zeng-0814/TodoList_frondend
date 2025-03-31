import { Flag } from "lucide-react";
import { Priority, priorityOptions } from "../utils/priorityUtils";

interface TaskPrioritySelectorProps {
  value: Priority;
  onChange: (priority: Priority) => void;
  disabled?: boolean;
  compact?: boolean;
}

export function TaskPrioritySelector({
  value,
  onChange,
  disabled = false,
  compact = false,
}: TaskPrioritySelectorProps) {
  return (
    <div className={`flex ${compact ? "space-x-1" : "space-x-2"}`}>
      {priorityOptions.map((option) => (
        <button
          key={option.value}
          type="button"
          disabled={disabled}
          onClick={() => onChange(option.value)}
          className={`flex items-center ${
            compact ? "px-1.5 py-0.5" : "px-2 py-1"
          } rounded-md transition-colors ${
            value === option.value
              ? `${option.color} ${option.bgColor} border border-gray-200`
              : `text-gray-400 ${option.hoverColor}`
          } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <Flag className={compact ? "h-3 w-3" : "h-4 w-4"} />
          <span
            className={`${compact ? "ml-0.5 text-[10px]" : "ml-1 text-xs"}`}
          >
            {option.label}
          </span>
        </button>
      ))}
    </div>
  );
}

export function getPriorityColor(priority: Priority): string {
  const option = priorityOptions.find((opt) => opt.value === priority);
  return option ? option.color : "";
}

export function getPriorityBgColor(priority: Priority): string {
  const option = priorityOptions.find((opt) => opt.value === priority);
  return option ? option.bgColor : "";
}
