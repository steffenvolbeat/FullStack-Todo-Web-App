"use client";

// components/TodoList.tsx - Liste aller Todos
import { Todo } from "@/types/todo";
import TodoItem from "./TodoItem";

interface TodoListProps {
  todos: Todo[];
  onUpdateTodo: (id: number, updates: Partial<Todo>) => Promise<boolean>;
  onDeleteTodo: (id: number) => Promise<boolean>;
}

export default function TodoList({
  todos,
  onUpdateTodo,
  onDeleteTodo,
}: TodoListProps) {
  if (todos.length === 0) {
    return (
      <div className="bg-gray-800 rounded-xl shadow-lg p-8 text-center border border-gray-700">
        <div className="text-6xl mb-4">📝</div>
        <h3 className="text-xl font-medium text-white mb-2">
          Keine Todos vorhanden
        </h3>
        <p className="text-gray-400">
          Füge dein erstes Todo hinzu, um zu starten!
        </p>
      </div>
    );
  }

  // Todos sortieren: offene zuerst, dann erledigte
  const sortedTodos = [...todos].sort((a, b) => {
    if (a.completed === b.completed) {
      // Bei gleichem Status: neueste zuerst
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    // Offene Todos zuerst
    return a.completed ? 1 : -1;
  });

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-700">
      <div className="px-6 py-4 bg-gray-900 border-b border-gray-600">
        <h2 className="text-xl font-semibold text-white">
          📋 Deine Todos ({todos.length})
        </h2>
      </div>

      <div className="divide-y divide-gray-600">
        {sortedTodos.map((todo, index) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onUpdate={onUpdateTodo}
            onDelete={onDeleteTodo}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
