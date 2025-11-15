"use client";

// components/TodoForm.tsx - Formular zum Hinzufügen neuer Todos
import { useState } from "react";

interface TodoFormProps {
  onAddTodo: (title: string, description: string) => Promise<boolean>;
}

export default function TodoForm({ onAddTodo }: TodoFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const success = await onAddTodo(title.trim(), description.trim());

      if (success) {
        // Form zurücksetzen bei erfolgreichem Hinzufügen
        setTitle("");
        setDescription("");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-6">
        ✨ Neues Todo hinzufügen
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Titel Input */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-200 mb-2"
          >
            Titel *
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Was möchtest du erledigen?"
            maxLength={255}
            required
            disabled={isSubmitting}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 disabled:bg-gray-600 disabled:cursor-not-allowed"
          />
          <div className="mt-1 text-xs text-gray-400">
            {title.length}/255 Zeichen
          </div>
        </div>

        {/* Beschreibung Textarea */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-200 mb-2"
          >
            Beschreibung (optional)
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Weitere Details zu deinem Todo..."
            rows={3}
            disabled={isSubmitting}
            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 disabled:bg-gray-600 disabled:cursor-not-allowed resize-none"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={!title.trim() || isSubmitting}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin -ml-1 mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                Wird hinzugefügt...
              </>
            ) : (
              <>
                <span className="mr-2">➕</span>
                Todo hinzufügen
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
