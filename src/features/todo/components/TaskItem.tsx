import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Pencil, Save, X, Clock, Flag } from "lucide-react";
import { Input } from "@/components/ui";
import { TaskStatusToggle } from "./TaskStatusToggle";
import { Priority } from "../utils/priorityUtils";
import { TaskPrioritySelector } from "./TaskPrioritySelector";
import { Badge } from "@/components/ui/custom";

export interface TaskItemProps {
  id: string;
  text: string;
  completed: boolean;
  priority: Priority;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
  onPriorityChange?: (id: string, priority: Priority) => void;
}

export function TaskItem({
  id,
  text,
  completed,
  priority,
  onToggle,
  onDelete,
  onEdit,
  onPriorityChange,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);
  const [editPriority, setEditPriority] = useState<Priority>(priority);

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(id, editText.trim());

      if (onPriorityChange && editPriority !== priority) {
        onPriorityChange(id, editPriority);
      }

      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(text);
    setEditPriority(priority);
    setIsEditing(false);
  };

  const priorityVariants = {
    high: {
      indicator: "bg-red-500",
      badge: { variant: "danger" as const, label: "High" },
    },
    medium: {
      indicator: "bg-yellow-500",
      badge: { variant: "warning" as const, label: "Medium" },
    },
    low: {
      indicator: "bg-blue-500",
      badge: { variant: "primary" as const, label: "Low" },
    },
  };

  return (
    <motion.div
      layout
      className={`group flex items-center justify-between w-full p-3 mb-2 rounded-lg border shadow-sm relative ${
        completed
          ? "bg-blue-50 border-blue-200"
          : "bg-white border-gray-200 hover:border-gray-300 hover:shadow"
      }`}
    >
      {/* Priority indicator */}
      <div
        className={`absolute left-0 top-0 w-1 h-full rounded-l-lg ${priorityVariants[priority].indicator}`}
      />

      <div className="flex items-center flex-1 min-w-0 ml-2">
        <TaskStatusToggle
          completed={completed}
          onToggle={() => onToggle(id)}
          className="mr-3"
        />

        <AnimatePresence mode="wait" initial={false}>
          {isEditing ? (
            <motion.div
              key="editing"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="flex-1 flex flex-col gap-2"
            >
              <Input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="flex-1"
                autoFocus
              />

              {onPriorityChange && (
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">Priority:</span>
                  <TaskPrioritySelector
                    value={editPriority}
                    onChange={setEditPriority}
                    compact
                  />
                </div>
              )}

              <div className="flex justify-end space-x-2 mt-1">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleCancel}
                  className="text-gray-400 hover:text-gray-500 p-1 rounded-full hover:bg-gray-100"
                >
                  <X className="h-4 w-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleSave}
                  className="text-green-500 hover:text-green-600 p-1 rounded-full hover:bg-green-50"
                >
                  <Save className="h-4 w-4" />
                </motion.button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="viewing"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="flex flex-col flex-1 min-w-0"
            >
              <div className="flex items-center">
                <span
                  className={`flex-1 text-sm sm:text-base font-medium truncate ${
                    completed
                      ? "text-blue-500 line-through opacity-75"
                      : "text-gray-700"
                  }`}
                >
                  {text}
                </span>

                <Badge
                  variant={priorityVariants[priority].badge.variant}
                  size="sm"
                  className="ml-2"
                >
                  <Flag className="h-2.5 w-2.5 mr-0.5" />
                  {priorityVariants[priority].badge.label}
                </Badge>
              </div>

              <AnimatePresence>
                {completed && (
                  <motion.span
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-xs text-blue-400 flex items-center mt-0.5"
                  >
                    <Clock className="h-3 w-3 mr-1 inline" />
                    Completed
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!isEditing && (
        <div className="flex items-center">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsEditing(true)}
            className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-full p-1.5 mr-1"
          >
            <Pencil className="h-4 w-4" />
            <span className="sr-only">Edit task</span>
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onDelete(id)}
            className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full p-1.5"
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete task</span>
          </motion.button>
        </div>
      )}
    </motion.div>
  );
}
