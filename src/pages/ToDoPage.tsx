import { useState } from "react";
import { TaskInput, TaskList } from "@/features/todo/components";
import { Task } from "@/features/todo/types/task";
import { v4 as uuidv4 } from "uuid";
import { Priority } from "@/features/todo/components/TaskPrioritySelector";

const ToDoPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAdd = (content: string, priority: Priority) => {
    const newTask: Task = {
      id: uuidv4(),
      content,
      completed: false,
      priority,
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

  const handleEdit = (id: string, newContent: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, content: newContent } : task
      )
    );
  };

  const handlePriorityChange = (id: string, priority: Priority) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, priority } : task))
    );
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">ToDo List</h1>
      <TaskInput onAdd={handleAdd} />
      <TaskList
        tasks={tasks}
        onToggle={handleToggle}
        onDelete={handleDelete}
        onEdit={handleEdit}
        onPriorityChange={handlePriorityChange}
      />
    </div>
  );
};

export default ToDoPage;
