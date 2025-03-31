import { Priority } from "../utils/priorityUtils";

export interface Task {
  id: string;
  content: string;
  completed: boolean;
  priority: Priority;
}
