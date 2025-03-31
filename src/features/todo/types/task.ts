import { Priority } from "../components/TaskPrioritySelector";

export interface Task {
  id: string;
  content: string;
  completed: boolean;
  priority: Priority;
}
