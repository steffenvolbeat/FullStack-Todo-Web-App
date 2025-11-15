// app/page.tsx - Hauptseite der Todo-Anwendung
import TodoApp from "@/components/TodoApp";

/**
 * Hauptseite der Todo-Anwendung
 * Verwendet das TodoApp-Component für die gesamte Funktionalität
 */
export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            📝 Todo App
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            Eine moderne, responsive Todo-Anwendung mit{" "}
            <span className="font-semibold text-indigo-400">Next.js</span>,
            <span className="font-semibold text-indigo-400"> TypeScript</span>{" "}
            und
            <span className="font-semibold text-indigo-400"> Prisma</span>
          </p>
        </div>

        <TodoApp />
      </div>
    </main>
  );
}
