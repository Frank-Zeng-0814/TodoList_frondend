import { Task } from "../types/task";
import { motion } from "framer-motion";
import { BarChart, Circle, CheckCircle } from "lucide-react";
import { ProgressBar } from "@/components/ui/custom";
import { getPriorityColor, Priority } from "./TaskPrioritySelector";
import { Badge } from "@/components/ui/custom";

interface TaskStatsProps {
  tasks: Task[];
}

export function TaskStats({ tasks }: TaskStatsProps) {
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = tasks.length - completedTasks;
  const completionRate =
    tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

  // 统计各优先级任务数量
  const priorityCounts = {
    high: tasks.filter((t) => t.priority === "high").length,
    medium: tasks.filter((t) => t.priority === "medium").length,
    low: tasks.filter((t) => t.priority === "low").length,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-4 p-3 bg-white rounded-lg border border-gray-200 shadow-sm"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <BarChart className="h-4 w-4 text-blue-500 mr-2" />
          <h3 className="text-sm font-medium text-gray-700">任务统计</h3>
        </div>
        <div className="flex space-x-1">
          {Object.entries(priorityCounts).map(
            ([priority, count]) =>
              count > 0 && (
                <Badge
                  key={priority}
                  variant={
                    priority === "high"
                      ? "danger"
                      : priority === "medium"
                      ? "warning"
                      : "primary"
                  }
                  size="sm"
                >
                  {priority === "high"
                    ? "高"
                    : priority === "medium"
                    ? "中"
                    : "低"}
                  : {count}
                </Badge>
              )
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-center mb-3">
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

      <ProgressBar
        value={completedTasks}
        max={tasks.length}
        showLabel={true}
        label={`${completionRate}% 完成`}
      />
    </motion.div>
  );
}
