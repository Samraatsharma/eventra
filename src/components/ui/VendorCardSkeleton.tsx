export default function VendorCardSkeleton() {
  return (
    <div className="group relative bg-surface-container-low rounded-3xl overflow-hidden animate-pulse">
      <div className="aspect-[4/5] relative bg-surface-container-high">
        <div className="absolute bottom-4 left-4 right-4 bg-surface-container rounded-2xl p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <div className="h-6 bg-surface-container-high rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-surface-container-high rounded w-1/2"></div>
            </div>
            <div className="h-6 w-12 bg-surface-container-high rounded"></div>
          </div>
          <div className="h-4 bg-surface-container-high rounded w-2/3"></div>
        </div>
      </div>
    </div>
  );
}
