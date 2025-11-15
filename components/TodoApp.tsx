"use client";

// components/TodoApp.tsx - Hauptkomponente der Todo-Anwendung
import { useState, useEffect } from "react";
import { Todo, ApiResponse } from "@/types/todo";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import LoadingSpinner from "./LoadingSpinner";

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Todos laden
  const fetchTodos = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/todos");
      const data: ApiResponse<Todo[]> = await response.json();

      if (data.success && data.data) {
        setTodos(data.data);
      } else {
        throw new Error(data.message || "Fehler beim Laden der Todos");
      }
    } catch (err) {
      console.error("Fehler beim Laden der Todos:", err);
      setError(err instanceof Error ? err.message : "Unbekannter Fehler");
    } finally {
      setLoading(false);
    }
  };

  // Todo hinzufügen
  const addTodo = async (title: string, description: string) => {
    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description }),
      });

      const data: ApiResponse<Todo> = await response.json();

      if (data.success && data.data) {
        setTodos((prev) => [data.data!, ...prev]);
        return true;
      } else {
        throw new Error(data.message || "Fehler beim Erstellen des Todos");
      }
    } catch (err) {
      console.error("Fehler beim Erstellen des Todos:", err);
      setError(err instanceof Error ? err.message : "Fehler beim Erstellen");
      return false;
    }
  };

  // Todo aktualisieren
  const updateTodo = async (id: number, updates: Partial<Todo>) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      });

      const data: ApiResponse<Todo> = await response.json();

      if (data.success && data.data) {
        setTodos((prev) =>
          prev.map((todo) => (todo.id === id ? data.data! : todo))
        );
        return true;
      } else {
        throw new Error(data.message || "Fehler beim Aktualisieren des Todos");
      }
    } catch (err) {
      console.error("Fehler beim Aktualisieren des Todos:", err);
      setError(
        err instanceof Error ? err.message : "Fehler beim Aktualisieren"
      );
      return false;
    }
  };

  // Todo löschen
  const deleteTodo = async (id: number) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: "DELETE",
      });

      const data: ApiResponse = await response.json();

      if (data.success) {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
        return true;
      } else {
        throw new Error(data.message || "Fehler beim Löschen des Todos");
      }
    } catch (err) {
      console.error("Fehler beim Löschen des Todos:", err);
      setError(err instanceof Error ? err.message : "Fehler beim Löschen");
      return false;
    }
  };

  // Todos beim ersten Laden abrufen
  useEffect(() => {
    fetchTodos();
  }, []);

  // Statistiken berechnen
  const completedCount = todos.filter((todo) => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Error Banner */}
      {error && (
        <div className="bg-red-900 border border-red-700 rounded-lg p-4 animate-fade-in">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-red-400 text-xl">⚠️</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-red-100">{error}</p>
            </div>
            <div className="ml-auto pl-3">
              <button
                onClick={() => setError(null)}
                className="inline-flex bg-red-900 rounded-md p-1.5 text-red-400 hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-900 focus:ring-red-400"
              >
                <span className="sr-only">Dismiss</span>
                <span className="text-lg">×</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Statistiken */}
      <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-white">{totalCount}</div>
            <div className="text-sm text-gray-400">Gesamt</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">
              {completedCount}
            </div>
            <div className="text-sm text-gray-400">Erledigt</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-400">
              {totalCount - completedCount}
            </div>
            <div className="text-sm text-gray-400">Offen</div>
          </div>
        </div>
      </div>

      {/* Todo Form */}
      <TodoForm onAddTodo={addTodo} />

      {/* Loading State */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        /* Todo List */
        <TodoList
          todos={todos}
          onUpdateTodo={updateTodo}
          onDeleteTodo={deleteTodo}
        />
      )}

      {/* Refresh Button */}
      <div className="text-center">
        <button
          onClick={fetchTodos}
          disabled={loading}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <div className="animate-spin -ml-1 mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
              Lädt...
            </>
          ) : (
            <>
              <span className="mr-2">🔄</span>
              Aktualisieren
            </>
          )}
        </button>
      </div>
    </div>
  );
}
