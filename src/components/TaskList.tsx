import TodoItem from "@/components/TodoItem";
import { TaskListProps } from "@/types/props";

export default function TaskList({ tasks, onToggle, onDelete }: TaskListProps) {
  return (
    <div className="mt-6">
      {tasks.map((task) => (
        <TodoItem
          key={task.id}
          id={task.id}
          text={task.content}
          completed={task.completed}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
