function ToggleView({ viewMode, onChange }) {
  return (
    <div className="inline-flex rounded-lg border border-slate-700 bg-slate-900 p-1">
      <button
        onClick={() => onChange("tree")}
        className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
          viewMode === "tree"
            ? "bg-cyan-500 text-slate-950"
            : "text-slate-300 hover:bg-slate-800"
        }`}
      >
        Tree View
      </button>
      <button
        onClick={() => onChange("raw")}
        className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
          viewMode === "raw"
            ? "bg-cyan-500 text-slate-950"
            : "text-slate-300 hover:bg-slate-800"
        }`}
      >
        Raw JSON
      </button>
    </div>
  );
}

export default ToggleView;
