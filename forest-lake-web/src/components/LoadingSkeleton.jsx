export function CardSkeleton({ count = 4 }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 animate-pulse">
          <div className="flex justify-between items-start">
            <div className="space-y-3 flex-1">
              <div className="h-3 bg-gray-100 rounded-full w-20"></div>
              <div className="h-7 bg-gray-100 rounded-lg w-14"></div>
            </div>
            <div className="w-14 h-14 bg-gray-100 rounded-2xl"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function TableSkeleton({ rows = 5, cols = 5 }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div className="animate-pulse">
        <div className="p-4 border-b border-gray-50">
          <div className="flex gap-4">
            {Array.from({ length: cols }).map((_, j) => (
              <div key={j} className="h-3 bg-gray-100 rounded-full flex-1"></div>
            ))}
          </div>
        </div>
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="flex gap-4 p-4 border-b border-gray-50 last:border-0">
            {Array.from({ length: cols }).map((_, j) => (
              <div key={j} className="h-3 bg-gray-50 rounded-full flex-1"></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function MapSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 animate-pulse h-[500px] flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 bg-gray-100 rounded-full mx-auto mb-3"></div>
        <p className="text-gray-400 text-sm">Loading map...</p>
      </div>
    </div>
  );
}
