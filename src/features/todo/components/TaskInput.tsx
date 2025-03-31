import { useState } from "react";
import { Input, Button } from "@/components/ui";
import { Plus } from "lucide-react";
import { Priority } from "@/features/todo/utils/priorityUtils";
import { TaskPrioritySelector } from "./TaskPrioritySelector";

export interface TaskInputProps {
  onAdd: (content: string, priority: Priority) => void;
}

export function TaskInput({ onAdd }: TaskInputProps) {
  const [content, setContent] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [showPrioritySelector, setShowPrioritySelector] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onAdd(content.trim(), priority);
      setContent("");
      setPriority("medium");
      setShowPrioritySelector(false);
    }
  };

  return (
    <div className="w-full mb-4">
      <form onSubmit={handleSubmit} className="flex items-center gap-2 w-full">
        <Input
          type="text"
          placeholder="Add new task..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="flex-grow"
          onFocus={() => setShowPrioritySelector(true)}
        />
        <Button type="submit" className="gap-1">
          <Plus className="h-4 w-4" />
          Add
        </Button>
      </form>

      {showPrioritySelector && (
        <div className="mt-2 flex items-center">
          <span className="text-xs text-gray-500 mr-2">Priority:</span>
          <TaskPrioritySelector value={priority} onChange={setPriority} />
        </div>
      )}
    </div>
  );
}
