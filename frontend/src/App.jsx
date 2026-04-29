import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import BlogViewer from "./components/BlogViewer";
import SearchBar from "./components/SearchBar";
import Sidebar from "./components/Sidebar";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

function App() {
  const [blogData, setBlogData] = useState(null);
  const [blogTitles, setBlogTitles] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState("");
  const [viewMode, setViewMode] = useState("tree");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadTitles = async () => {
      try {
        const response = await api.get("/blog/titles/all");
        setBlogTitles(response.data.titles ?? []);
      } catch (titlesError) {
        setBlogTitles([]);
      }
    };

    loadTitles();
  }, []);

  const fetchBlog = async (title) => {
    setLoading(true);
    setError("");
    setSelectedTitle(title);

    try {
      const response = await api.get(`/blog/${encodeURIComponent(title)}`);
      setBlogData(response.data);
    } catch (fetchError) {
      const message =
        fetchError?.response?.data?.error || "Failed to fetch blog. Please try again.";
      setError(message);
      setBlogData(null);
    } finally {
      setLoading(false);
    }
  };

  const subtitle = useMemo(() => {
    if (selectedTitle) {
      return `Viewing: ${selectedTitle}`;
    }
    return "Search and visualize structured blog knowledge.";
  }, [selectedTitle]);

  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col gap-4 px-4 py-6 sm:px-6">
      <header className="rounded-xl border border-slate-700 bg-slate-900/70 p-4">
        <h1 className="text-2xl font-bold text-cyan-300">Blog Knowledge Base Visualizer</h1>
        <p className="mt-1 text-sm text-slate-300">{subtitle}</p>
      </header>

      <SearchBar onSearch={fetchBlog} loading={loading} suggestions={blogTitles} />

      <section className="grid flex-1 gap-4 lg:grid-cols-[280px,1fr]">
        <Sidebar titles={blogTitles} onSelectTitle={fetchBlog} activeTitle={selectedTitle} />
        <BlogViewer
          blogData={blogData}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          loading={loading}
          error={error}
        />
      </section>
    </main>
  );
}

export default App;
