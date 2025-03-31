import { useState } from "react";
import { TodoItemProps } from "@/types/props";
import { Button } from "@/components/ui/button";
import {
  Trash2,
  CheckCircle,
  Circle,
  Pencil,
  Save,
  X,
  Clock,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

export default function TodoItem({
  id,
  text,
  completed,
  onToggle,
  onDelete,
  onEdit,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(id, editText.trim());
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(text);
    setIsEditing(false);
  };

  return (
    <motion.div
      layout
      className={`group flex items-center justify-between w-full p-3 mb-2 rounded-lg border shadow-sm ${
        completed
          ? "bg-blue-50 border-blue-200"
          : "bg-white border-gray-200 hover:border-gray-300 hover:shadow"
      }`}
    >
      <div className="flex items-center flex-1 min-w-0">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => onToggle(id)}
          className={`relative mr-3 flex items-center justify-center rounded-full ${
            completed
              ? "text-blue-500 hover:text-blue-600"
              : "text-gray-400 hover:text-blue-500 hover:bg-blue-50"
          }`}
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

        <AnimatePresence mode="wait" initial={false}>
          {isEditing ? (
            <motion.div
              key="editing"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="flex-1 flex gap-2"
            >
              <Input
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                className="flex-1"
                autoFocus
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleSave}
                className="text-green-500 hover:text-green-600 p-1 rounded-full hover:bg-green-50"
              >
                <Save className="h-4 w-4" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleCancel}
                className="text-gray-400 hover:text-gray-500 p-1 rounded-full hover:bg-gray-100"
              >
                <X className="h-4 w-4" />
              </motion.button>
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
              <span
                className={`flex-1 text-sm sm:text-base font-medium truncate ${
                  completed
                    ? "text-blue-500 line-through opacity-75"
                    : "text-gray-700"
                }`}
              >
                {text}
              </span>
              <AnimatePresence>
                {completed && (
                  <motion.span
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-xs text-blue-400 flex items-center mt-0.5"
                  >
                    <Clock className="h-3 w-3 mr-1 inline" />
                    完成
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
