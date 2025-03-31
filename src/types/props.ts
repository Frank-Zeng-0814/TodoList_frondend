import { Task } from "@/features/todo/types/task";
import { Priority } from "@/features/todo/utils/priorityUtils";

export interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
  priority: Priority;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
  onPriorityChange?: (id: string, priority: Priority) => void;
}

export interface TaskInputProps {
  onAdd: (content: string, priority: Priority) => void;
}

export interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
  onPriorityChange?: (id: string, priority: Priority) => void;
}
