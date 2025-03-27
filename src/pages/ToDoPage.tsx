import { useState } from "react";
import TaskInput from "@/components/TaskInput";
import TaskList from "@/components/TaskList";
import { Task } from "@/types/task";
import { v4 as uuidv4 } from "uuid";

const ToDoPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAdd = (content: string) => {
    const newTask: Task = {
      id: uuidv4(),
      content,
      completed: false,
    };
    setTasks([newTask, ...tasks]);
  };

  const handleToggle = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDelete = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">ToDo List</h1>
      <TaskInput onAdd={handleAdd} />
      <TaskList tasks={tasks} onToggle={handleToggle} onDelete={handleDelete} />
    </div>
  );
};

export default ToDoPage;
