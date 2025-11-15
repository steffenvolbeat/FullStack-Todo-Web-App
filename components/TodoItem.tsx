"use client";

// components/TodoItem.tsx - Einzelnes Todo Item
import { useState } from "react";
import { Todo } from "@/types/todo";

interface TodoItemProps {
  todo: Todo;
  onUpdate: (id: number, updates: Partial<Todo>) => Promise<boolean>;
  onDelete: (id: number) => Promise<boolean>;
  index: number;
}

export default function TodoItem({
  todo,
  onUpdate,
  onDelete,
  index,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(
    todo.description || ""
  );
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Todo Status umschalten (completed)
  const handleToggleComplete = async () => {
    setIsUpdating(true);
    try {
      await onUpdate(todo.id, { completed: !todo.completed });
    } finally {
      setIsUpdating(false);
    }
  };

  // Edit-Modus starten
  const handleStartEdit = () => {
    setIsEditing(true);
    setEditTitle(todo.title);
    setEditDescription(todo.description || "");
  };

  // Edit-Modus abbrechen
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditTitle(todo.title);
    setEditDescription(todo.description || "");
  };

  // Änderungen speichern
  const handleSaveEdit = async () => {
    if (!editTitle.trim()) {
      return;
    }

    setIsUpdating(true);
    try {
      const success = await onUpdate(todo.id, {
        title: editTitle.trim(),
        description: editDescription.trim() || null,
      });

      if (success) {
        setIsEditing(false);
      }
    } finally {
      setIsUpdating(false);
    }
  };

  // Todo löschen
  const handleDelete = async () => {
    if (!confirm("Möchtest du dieses Todo wirklich löschen?")) {
      return;
    }

    setIsDeleting(true);
    try {
      await onDelete(todo.id);
    } finally {
      setIsDeleting(false);
    }
  };

  // Datum formatieren
  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("de-DE", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className={`p-6 hover:bg-gray-700 transition-colors animate-slide-up ${
        todo.completed ? "opacity-75" : ""
      }`}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-start space-x-4">
        {/* Checkbox */}
        <button
          onClick={handleToggleComplete}
          disabled={isUpdating || isDeleting}
          className={`flex-shrink-0 mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:cursor-not-allowed ${
            todo.completed
              ? "bg-green-500 border-green-500 text-white"
              : "border-gray-300 hover:border-indigo-500"
          }`}
        >
          {isUpdating ? (
            <div className="w-3 h-3 border border-current border-t-transparent rounded-full animate-spin"></div>
          ) : todo.completed ? (
            <span className="text-xs">✓</span>
          ) : null}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            /* Edit Mode */
            <div className="space-y-3">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Titel"
                maxLength={255}
                className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md shadow-sm placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400"
              />
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                placeholder="Beschreibung (optional)"
                rows={2}
                className="w-full px-3 py-2 bg-gray-600 border border-gray-500 rounded-md shadow-sm placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 resize-none"
              />
              <div className="flex space-x-2">
                <button
                  onClick={handleSaveEdit}
                  disabled={!editTitle.trim() || isUpdating}
                  className="px-3 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUpdating ? "Speichert..." : "Speichern"}
                </button>
                <button
                  onClick={handleCancelEdit}
                  disabled={isUpdating}
                  className="px-3 py-1 text-sm bg-gray-600 text-white rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Abbrechen
                </button>
              </div>
            </div>
          ) : (
            /* View Mode */
            <div>
              <h3
                className={`text-lg font-medium ${
                  todo.completed ? "line-through text-gray-400" : "text-white"
                }`}
              >
                {todo.title}
              </h3>

              {todo.description && (
                <p
                  className={`mt-1 text-sm ${
                    todo.completed
                      ? "line-through text-gray-500"
                      : "text-gray-300"
                  }`}
                >
                  {todo.description}
                </p>
              )}

              <div className="mt-2 flex items-center space-x-4 text-xs text-gray-400">
                <span>Erstellt: {formatDate(todo.createdAt)}</span>
                {todo.updatedAt !== todo.createdAt && (
                  <span>Geändert: {formatDate(todo.updatedAt)}</span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        {!isEditing && (
          <div className="flex-shrink-0 flex space-x-2">
            <button
              onClick={handleStartEdit}
              disabled={isUpdating || isDeleting}
              className="p-2 text-gray-400 hover:text-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 rounded disabled:cursor-not-allowed"
              title="Bearbeiten"
            >
              <span className="text-sm">✏️</span>
            </button>
            <button
              onClick={handleDelete}
              disabled={isUpdating || isDeleting}
              className="p-2 text-gray-400 hover:text-red-400 focus:outline-none focus:ring-2 focus:ring-red-400 rounded disabled:cursor-not-allowed"
              title="Löschen"
            >
              {isDeleting ? (
                <div className="w-4 h-4 border border-current border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <span className="text-sm">🗑️</span>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
