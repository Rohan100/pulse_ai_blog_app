import JsonTreeView from "./JsonTreeView";
import ToggleView from "./ToggleView";

function BlogViewer({ blogData, viewMode, onViewModeChange, loading, error }) {
  return (
    <section className="flex h-full flex-col gap-4 rounded-xl border border-slate-700 bg-slate-950/50 p-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-lg font-semibold text-slate-100">Blog JSON Viewer</h2>
        <ToggleView viewMode={viewMode} onChange={onViewModeChange} />
      </div>

      {loading && (
        <div className="flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 p-3 text-sm text-slate-200">
          <span className="h-3 w-3 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
          Loading blog...
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-rose-500/50 bg-rose-950/40 p-3 text-sm text-rose-200">
          {error}
        </div>
      )}

      {!loading && !error && viewMode === "tree" && <JsonTreeView data={blogData} />}

      {!loading && !error && viewMode === "raw" && (
        <pre className="overflow-auto rounded-lg border border-slate-700 bg-slate-900 p-4 text-xs text-slate-200">
          {blogData ? JSON.stringify(blogData, null, 2) : "No blog loaded yet."}
        </pre>
      )}
    </section>
  );
}

export default BlogViewer;
