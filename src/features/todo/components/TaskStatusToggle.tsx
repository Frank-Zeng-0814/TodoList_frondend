import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Circle } from "lucide-react";

interface TaskStatusToggleProps {
  completed: boolean;
  onToggle: () => void;
  className?: string;
}

export function TaskStatusToggle({
  completed,
  onToggle,
  className = "",
}: TaskStatusToggleProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={onToggle}
      className={`relative flex items-center justify-center rounded-full ${
        completed
          ? "text-blue-500 hover:text-blue-600"
          : "text-gray-400 hover:text-blue-500 hover:bg-blue-50"
      } ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {completed ? (
          <motion.div
            key="completed"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <CheckCircle className="h-5 w-5 text-blue-500 fill-blue-100" />
          </motion.div>
        ) : (
          <motion.div
            key="uncompleted"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <Circle className="h-5 w-5" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}
