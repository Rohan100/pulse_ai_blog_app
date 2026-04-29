import { useMemo, useState } from "react";

function SearchBar({ onSearch, loading, suggestions = [] }) {
  const [title, setTitle] = useState("");
  const suggestionListId = "blog-title-suggestions";

  const normalizedSuggestions = useMemo(
    () => [...new Set(suggestions)].sort((a, b) => a.localeCompare(b)),
    [suggestions]
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title.trim()) {
      return;
    }
    onSearch(title.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-3 rounded-xl border border-slate-700 bg-slate-900/80 p-4 sm:flex-row"
    >
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        list={suggestionListId}
        placeholder="Enter blog title (e.g. AI in Healthcare)"
        className="flex-1 rounded-lg border border-slate-600 bg-slate-950 px-4 py-2 text-sm outline-none transition focus:border-cyan-400"
      />
      <datalist id={suggestionListId}>
        {normalizedSuggestions.map((suggestion) => (
          <option key={suggestion} value={suggestion} />
        ))}
      </datalist>
      <button
        type="submit"
        disabled={loading}
        className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Fetching..." : "Fetch Blog"}
      </button>
    </form>
  );
}

export default SearchBar;
