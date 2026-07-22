export function CardSkeleton({ count = 4 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-xl p-6 shadow animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
          <div className="h-8 bg-gray-200 rounded w-1/2"></div>
        </div>
      ))}
    </div>
  );
}

export function TableSkeleton({ rows = 5, cols = 5 }) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <div className="animate-pulse">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex gap-4 p-4 border-b border-gray-100">
            {Array.from({ length: cols }).map((_, j) => (
              <div key={j} className="h-4 bg-gray-200 rounded flex-1"></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function MapSkeleton() {
  return (
    <div className="bg-gray-200 rounded-xl animate-pulse h-96 flex items-center justify-center">
      <p className="text-gray-400">Loading map...</p>
    </div>
  );
}
