import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { useNotesAction, useNotesData } from "./utils/notes-context";
import { PlusCircleIcon } from "@heroicons/react/solid";

function App() {
  const location = useLocation();
  const { searchedTitle } = useNotesData();
  const { updateSearchedTitle } = useNotesAction();

  return (
    <>
      <header className="my-6 w-full mx-auto rounded-md max-w-3xl md:w-10/12">
        <h1 className="text-4xl font-bold">FZ's Notes</h1>
        <nav className="w-full bg-[#272626]">
          <ul className="flex w-full justify-around">
            <li className="w-full">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block p-2 w-full  text-center  ${
                    isActive
                      ? "text-purple border-b-2 border-purple"
                      : "text-[#a8a9a8] "
                  }`
                }
              >
                Active
              </NavLink>
            </li>
            <li className="w-full ">
              <NavLink
                to="/archive"
                className={({ isActive }) =>
                  `block p-2 w-full text-center  ${
                    isActive
                      ? "text-purple border-b-2 border-purple"
                      : "text-[#a8a9a8] "
                  }`
                }
              >
                Archived
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="w-10/12 md:w-full mx-auto flex gap-4 mt-8 justify-between items-center">
          <input
            type="search"
            name="search-title"
            id="search-title"
            value={searchedTitle}
            onChange={(e) => updateSearchedTitle(e.target.value)}
            placeholder="search title"
            className="w-full md:max-w-lg rounded-full bg-[#292929] focus:ring-purple text-textPrimary placeholder:text-textSecondary pl-6"
          />
          <Link
            className="w-max"
            to="/new"
            state={{ backgroundLocation: location }}
          >
            <PlusCircleIcon className="h-12 text-purple hover:opacity-75 md:hidden" />
            <span className="hidden md:inline whitespace-nowrap bg-purple text-darkBg font-semibold rounded-md p-4">
              Add Note
            </span>
          </Link>
        </div>
      </header>
      <main className="bg-darkBg w-10/12 mx-auto mb-20 max-w-3xl">
        <Outlet />
      </main>
    </>
  );
}

export default App;
