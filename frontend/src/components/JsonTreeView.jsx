import { useMemo, useState } from "react";

const isObject = (value) => value !== null && typeof value === "object";

const getNodeLabel = (value) => {
  if (Array.isArray(value)) {
    return `Array(${value.length})`;
  }
  if (isObject(value)) {
    return "Object";
  }
  if (typeof value === "string") {
    return `"${value}"`;
  }
  return String(value);
};

function JsonNode({ data, nodeKey = "root", depth = 0, defaultExpanded = true }) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const objectEntries = useMemo(() => {
    if (Array.isArray(data)) {
      return data.map((item, index) => [index, item]);
    }
    if (isObject(data)) {
      return Object.entries(data);
    }
    return [];
  }, [data]);

  const expandable = objectEntries.length > 0;

  return (
    <div className={depth > 0 ? "border-l border-slate-700 pl-3" : ""}>
      <div className="flex items-start gap-2 py-1">
        {expandable ? (
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className="mt-0.5 h-5 w-5 rounded border border-slate-600 text-xs text-slate-300 hover:bg-slate-800"
            aria-label={expanded ? "Collapse node" : "Expand node"}
          >
            {expanded ? "-" : "+"}
          </button>
        ) : (
          <span className="inline-block h-5 w-5" />
        )}
        <div className="text-sm">
          <span className="font-semibold text-cyan-300">{String(nodeKey)}</span>
          <span className="mx-1 text-slate-500">:</span>
          {!expandable && <span className="text-emerald-300">{getNodeLabel(data)}</span>}
          {expandable && <span className="text-violet-300">{getNodeLabel(data)}</span>}
        </div>
      </div>

      {expandable && expanded && (
        <div className="ml-4 transition-all duration-200">
          {objectEntries.map(([key, value]) => (
            <JsonNode
              key={`${nodeKey}-${String(key)}`}
              nodeKey={String(key)}
              data={value}
              depth={depth + 1}
              defaultExpanded={depth < 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function JsonTreeView({ data }) {
  if (!data) {
    return (
      <div className="rounded-lg border border-dashed border-slate-700 p-6 text-slate-400">
        No blog loaded yet.
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-slate-700 bg-slate-900 p-4">
      <JsonNode data={data} nodeKey="root" />
    </div>
  );
}

export default JsonTreeView;
