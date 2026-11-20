# School Readings

My course readings for the term, organized by class, with a cover for each book.
Tap a book to open it (Google Drive copy or the UCSC bookstore listing) in a new tab.

- **Filter** by class with the chips (each class also has its own link, e.g. `#educ-222`).
- **Search** titles, authors and class names. Press `/` to jump to the search box.
- Works on phones (books become list rows) and follows your system's light/dark mode.

## Running it

It's plain HTML, CSS and JavaScript with no build step: open `index.html` in a browser,
or visit the GitHub Pages site.

## Updating the list

Everything comes from [`data.js`](data.js): one entry per course, one object per book.
Put a cover image in `covers/` and point the book's `cover` at it. Set `source` to
`'drive'` (you have a copy) or `'bookstore'` (still to buy), and `optional: true` for
optional readings. A course with no books takes a `note` instead.
