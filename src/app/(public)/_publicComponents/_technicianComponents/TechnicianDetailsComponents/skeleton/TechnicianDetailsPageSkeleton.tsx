  export const TechnicianSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-64 bg-slate-200 dark:bg-slate-800 w-full" />
      <div className="max-w-5xl mx-auto px-4">
        <div className="h-32 bg-slate-200 dark:bg-slate-800 rounded-3xl -mt-16 mb-6" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 h-96 bg-slate-200 dark:bg-slate-800 rounded-3xl" />
          <div className="h-96 bg-slate-200 dark:bg-slate-800 rounded-3xl" />
        </div>
      </div>
    </div>
  );
};