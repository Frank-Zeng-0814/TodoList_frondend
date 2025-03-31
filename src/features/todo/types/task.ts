import { Priority } from "@/features/todo/utils/priorityUtils";

export interface Task {
  id: string;
  content: string;
  completed: boolean;
  priority: Priority;
}
