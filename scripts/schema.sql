CREATE TABLE IF NOT EXISTS works (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  description TEXT NOT NULL,
  link TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);
