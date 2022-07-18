import { Routes, Route, useLocation } from "react-router-dom";
import App from "./App";
import ActiveNotes from "./pages/ActiveNotes";
import ArchivedNotes from "./pages/ArchivedNotes";
import NewNote from "./pages/NewNote";
import { NotesProvider } from "./utils/notes-context";

const Root = () => {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };

  return (
    <>
      <NotesProvider>
        <Routes location={state?.backgroundLocation || location}>
          <Route path="/" element={<App />}>
            <Route index element={<ActiveNotes />} />
            <Route path="archive" element={<ArchivedNotes />} />
          </Route>
        </Routes>
        {state?.backgroundLocation && (
          <Routes>
            <Route path="/new" element={<NewNote />} />
          </Routes>
        )}
      </NotesProvider>
    </>
  );
};

export default Root;
