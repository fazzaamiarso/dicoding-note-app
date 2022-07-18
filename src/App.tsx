import { Link, Outlet, useLocation, useOutletContext } from "react-router-dom";
import { useNotesAction, useNotesData } from "./utils/notes-context";

function App() {
  const location = useLocation();
  const { searchedTitle } = useNotesData();
  const { updateSearchedTitle } = useNotesAction();

  return (
    <>
      <header>
        <h1 className="bg-red-500">FZ's Notes</h1>
        <input
          type="search"
          name="search-title"
          id="search-title"
          value={searchedTitle}
          onChange={(e) => updateSearchedTitle(e.target.value)}
          placeholder="search something"
        />
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
