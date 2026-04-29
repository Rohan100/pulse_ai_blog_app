if (-not (Test-Path ".\.venv\Scripts\python.exe")) {
  Write-Host "Virtual environment not found. Create it first with: python -m venv .venv" -ForegroundColor Yellow
  exit 1
}

& ".\.venv\Scripts\python.exe" -m uvicorn main:app --reload --port 8000
