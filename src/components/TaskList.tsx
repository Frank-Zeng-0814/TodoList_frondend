import TodoItem from "@/components/TodoItem";
import { TaskListProps } from "@/types/props";
import {
  ClipboardList,
  ListTodo,
  Plus,
  Sparkles,
  ArrowRight,
  Circle,
  CheckCircle,
  BarChart,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// 任务统计组件
const TaskStats = ({ tasks }: { tasks: TaskListProps["tasks"] }) => {
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = tasks.length - completedTasks;
  const completionRate =
    tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-4 p-3 bg-white rounded-lg border border-gray-200 shadow-sm"
    >
      <div className="flex items-center mb-2">
        <BarChart className="h-4 w-4 text-blue-500 mr-2" />
        <h3 className="text-sm font-medium text-gray-700">任务统计</h3>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center">
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">总计</span>
          <span className="font-medium text-gray-800">{tasks.length}</span>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center justify-center">
            <Circle className="h-3 w-3 text-amber-400 mr-1" />
            <span className="text-xs text-gray-500">进行中</span>
          </div>
          <span className="font-medium text-gray-800">{pendingTasks}</span>
        </div>
        <div className="flex flex-col">
          <div className="flex items-center justify-center">
            <CheckCircle className="h-3 w-3 text-green-500 mr-1" />
            <span className="text-xs text-gray-500">已完成</span>
          </div>
          <span className="font-medium text-gray-800">{completedTasks}</span>
        </div>
      </div>

      {/* 进度条 */}
      <div className="mt-3 w-full bg-gray-100 rounded-full h-2.5">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${completionRate}%` }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-blue-500 h-2.5 rounded-full"
        />
      </div>
      <div className="flex justify-end mt-1">
        <span className="text-xs text-gray-500">{completionRate}% 完成</span>
      </div>
    </motion.div>
  );
};

export default function TaskList({
  tasks,
  onToggle,
  onDelete,
  onEdit,
}: TaskListProps) {
  if (tasks.length === 0) {
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
          任务清单空空如也
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-sm text-gray-500 max-w-xs mx-auto mb-6"
        >
          点击上方"添加"按钮开始创建您的第一个任务吧！
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center justify-center space-x-2 text-sm text-blue-500 font-medium"
        >
          <Plus className="h-4 w-4" />
          <span>添加新任务</span>
          <ArrowRight className="h-4 w-4" />
        </motion.div>

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-md">
          {[
            {
              icon: <ListTodo className="h-6 w-6 text-blue-400 mb-2" />,
              text: "添加任务",
            },
            {
              icon: <Circle className="h-6 w-6 text-amber-400 mb-2" />,
              text: "进行中",
            },
            {
              icon: <CheckCircle className="h-6 w-6 text-green-400 mb-2" />,
              text: "已完成",
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
            <TodoItem
              id={task.id}
              text={task.content}
              completed={task.completed}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEdit}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
