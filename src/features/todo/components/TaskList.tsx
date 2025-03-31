import { Task } from "@/features/todo/types/task";
import { AnimatePresence, motion } from "framer-motion";
import { TaskItem } from "./TaskItem";
import { TaskStats } from "./TaskStats";
import { TaskEmptyState } from "./TaskEmptyState";
import { Priority } from "@/features/todo/utils/priorityUtils";

export interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
  onPriorityChange?: (id: string, priority: Priority) => void;
}

export function TaskList({
  tasks,
  onToggle,
  onDelete,
  onEdit,
  onPriorityChange,
}: TaskListProps) {
  if (tasks.length === 0) {
    return <TaskEmptyState />;
  }

  return (
    <div className="mt-6">
      <TaskStats tasks={tasks} />

      <AnimatePresence mode="popLayout">
        {tasks.map((task) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
              opacity: { duration: 0.2 },
            }}
          >
            <TaskItem
              id={task.id}
              text={task.content}
              completed={task.completed}
              priority={task.priority}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEdit}
              onPriorityChange={onPriorityChange}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
