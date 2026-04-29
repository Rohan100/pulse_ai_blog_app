function Sidebar({ titles, onSelectTitle, activeTitle }) {
  return (
    <aside className="rounded-xl border border-slate-700 bg-slate-900/60 p-4">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-300">
        Available Blogs
      </h3>
      {titles.length === 0 ? (
        <p className="text-sm text-slate-500">No titles available.</p>
      ) : (
        <ul className="space-y-2">
          {titles.map((title) => (
            <li key={title}>
              <button
                onClick={() => onSelectTitle(title)}
                className={`w-full rounded-md px-3 py-2 text-left text-sm transition ${
                  activeTitle === title
                    ? "bg-cyan-500 text-slate-950"
                    : "bg-slate-800 text-slate-200 hover:bg-slate-700"
                }`}
              >
                {title}
              </button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}

export default Sidebar;
