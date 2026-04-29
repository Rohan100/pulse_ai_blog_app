# Blog Knowledge Base Visualizer

Full-stack app to fetch blog JSON from FastAPI and visualize it in React with a recursive tree viewer.

## Tech Stack

- Frontend: React + Vite + Tailwind CSS + Axios
- Backend: Python + FastAPI
- Data: Mock blog JSON in backend (`backend/app/data.py`)

## Project Structure

```text
Visualization/
  backend/
    app/
      data.py
      routes/blog.py
    main.py
    requirements.txt
  frontend/
    src/
      components/
        BlogViewer.jsx
        JsonTreeView.jsx
        SearchBar.jsx
        Sidebar.jsx
        ToggleView.jsx
      App.jsx
      main.jsx
      index.css
```

## Backend Setup

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

API:

- `GET /blog/{title}` -> returns full blog JSON (404 with `{"error":"Blog not found"}`)
- `GET /blog/titles/all` -> returns available blog titles for sidebar

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:5173`.

## Usage

1. Start backend and frontend.
2. Enter a blog title and click **Fetch Blog** (or select from sidebar).
3. Use toggle to switch between:
   - **Tree View** (recursive expandable JSON)
   - **Raw JSON** (formatted JSON block)
