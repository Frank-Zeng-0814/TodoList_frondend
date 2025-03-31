import { motion } from "framer-motion";
import {
  ClipboardList,
  ListTodo,
  Plus,
  Sparkles,
  ArrowRight,
  Circle,
  CheckCircle,
} from "lucide-react";

export function TaskEmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-8 flex flex-col items-center justify-center text-center p-8 bg-gray-50 rounded-xl border border-dashed border-gray-200 transition-all duration-300 hover:border-blue-200 hover:bg-blue-50"
    >
      <div className="relative mb-6">
        <ClipboardList className="h-16 w-16 text-gray-200" />
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 300 }}
          className="absolute -top-2 -right-2 bg-blue-100 rounded-full p-1.5"
        >
          <Sparkles className="h-4 w-4 text-blue-500" />
        </motion.div>
      </div>

      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-xl font-medium text-gray-700 mb-2"
      >
        Task List is Empty
      </motion.h3>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-sm text-gray-500 max-w-xs mx-auto mb-6"
      >
        Click the "Add" button above to create your first task!
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex items-center justify-center space-x-2 text-sm text-blue-500 font-medium"
      >
        <Plus className="h-4 w-4" />
        <span>Add New Task</span>
        <ArrowRight className="h-4 w-4" />
      </motion.div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-md">
        {[
          {
            icon: <ListTodo className="h-6 w-6 text-blue-400 mb-2" />,
            text: "Add Task",
          },
          {
            icon: <Circle className="h-6 w-6 text-amber-400 mb-2" />,
            text: "In Progress",
          },
          {
            icon: <CheckCircle className="h-6 w-6 text-green-400 mb-2" />,
            text: "Completed",
          },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            className="flex flex-col items-center bg-white p-3 rounded-lg shadow-sm"
          >
            {item.icon}
            <span className="text-xs text-gray-600">{item.text}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
