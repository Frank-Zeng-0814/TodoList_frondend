import { useState } from "react";
import { TaskInputProps } from "@/types/props";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function TaskInput({ onAdd }: TaskInputProps) {
  const [content, setContent] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onAdd(content.trim());
      setContent("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 w-full mb-4"
    >
      <Input
        type="text"
        placeholder="Add new task..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="flex-grow"
      />
      <Button type="submit">Add</Button>
    </form>
  );
}
