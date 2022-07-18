import { useState } from "react";
import { Link, Outlet, useLocation, useOutletContext } from "react-router-dom";
import { getInitialData, Note } from "./utils/data";

function App() {
  const location = useLocation();
  const [notes, setNotes] = useState(() => getInitialData());

  const [searchedTitle, setSearchedTitle] = useState("");

  const searchedNotes =
    searchedTitle.length === 0
      ? notes
      : notes.filter((note) =>
          note.title.toLowerCase().includes(searchedTitle.trim().toLowerCase())
        );

  return (
    <>
      <header>
        <h1 className="bg-red-500">FZ's Notes</h1>
        <form>
          <input
            type="search"
            name="search-title"
            id="search-title"
            value={searchedTitle}
            onChange={(e) => setSearchedTitle(e.target.value)}
            placeholder="search something"
          />
        </form>
        <Link
          className="text-blue-500"
          to="/new"
          state={{ backgroundLocation: location }}
        >
          New Note
        </Link>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
