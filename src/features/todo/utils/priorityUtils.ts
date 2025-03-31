export type Priority = "low" | "medium" | "high";

interface PriorityOption {
  value: Priority;
  label: string;
  color: string;
  bgColor: string;
  hoverColor: string;
}

export const priorityOptions: PriorityOption[] = [
  {
    value: "low",
    label: "Low",
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    hoverColor: "hover:bg-blue-100",
  },
  {
    value: "medium",
    label: "Medium",
    color: "text-yellow-500",
    bgColor: "bg-yellow-50",
    hoverColor: "hover:bg-yellow-100",
  },
  {
    value: "high",
    label: "High",
    color: "text-red-500",
    bgColor: "bg-red-50",
    hoverColor: "hover:bg-red-100",
  },
];

export function getPriorityColor(priority: Priority): string {
  const option = priorityOptions.find((opt) => opt.value === priority);
  return option ? option.color : "";
}

export function getPriorityBgColor(priority: Priority): string {
  const option = priorityOptions.find((opt) => opt.value === priority);
  return option ? option.bgColor : "";
}
