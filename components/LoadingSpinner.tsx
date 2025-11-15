// components/LoadingSpinner.tsx - Loading Component
export default function LoadingSpinner() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            Lädt Todos...
          </h3>
          <p className="text-sm text-gray-500">Einen Moment bitte</p>
        </div>
      </div>
    </div>
  );
}
