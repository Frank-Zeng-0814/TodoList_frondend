import { TodoItemProps } from "@/types/props";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export default function TodoItem({
  id,
  text,
  completed,
  onToggle,
  onDelete,
}: TodoItemProps) {
  return (
    <div className="group flex items-center justify-between w-full p-3 mb-2 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow transition-all duration-200">
      <div className="flex items-center flex-1 min-w-0">
        <input
          type="checkbox"
          id={`todo-${id}`}
          checked={completed}
          onChange={() => onToggle(id)}
          className="mr-3 h-5 w-5 transition-all duration-200"
        />
        <label
          htmlFor={`todo-${id}`}
          className={`flex-1 text-sm sm:text-base font-medium truncate transition-colors duration-200 ${
            completed ? "text-gray-400 line-through" : "text-gray-700"
          }`}
        >
          {text}
        </label>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onDelete(id)}
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-gray-400 hover:text-red-500"
      >
        <Trash2 className="h-4 w-4" />
        <span className="sr-only">Delete task</span>
      </Button>
    </div>
  );
}
