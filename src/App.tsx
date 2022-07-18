import { FormEvent, useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import { getInitialData, Note, showFormattedDate } from "./utils/data";

type NotesContext = {
  notes: Note[];
  onDeleteNote: (id: number) => void;
  onToggleArchive: (id: number) => void;
};

const TITLE_MAX_LENGTH = 10;

function App() {
  const [notes, setNotes] = useState(() => getInitialData());
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [searchedTitle, setSearchedTitle] = useState("");

  const titleCharCount = title.length;
  const titleCharLeft = TITLE_MAX_LENGTH - titleCharCount;

  const searchedNotes =
    searchedTitle.length === 0
      ? notes
      : notes.filter((note) =>
          note.title.toLowerCase().includes(searchedTitle.trim().toLowerCase())
        );

  const deleteNote = (id: number) =>
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));

  const toggleArchive = (id: number) => {
    const updatedNoteIdx = notes.findIndex((note) => note.id === id);
    const copiedNotes = [...notes];
    let updatedNote = copiedNotes[updatedNoteIdx];
    if (!updatedNote) return;
    copiedNotes[updatedNoteIdx] = {
      ...updatedNote,
      archived: !updatedNote.archived,
    };
    setNotes(copiedNotes);
  };
  const createNote = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newNote: Note = {
      title,
      body,
      createdAt: new Date().toString(),
      archived: false,
      id: Date.now(),
    };
    setNotes((prevNotes) => [...prevNotes, newNote]);
    setTitle("");
    setBody("");
  };

  return (
    <>
      <header>
        <h1 className="bg-red-500">Hello Vite Dicoding</h1>
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
      </header>
      <main>
        {/* <form onSubmit={createNote}>
          <label htmlFor="title">
            <input
              type="text"
              value={title}
              name="title"
              onChange={(e) => {
                const canChange = e.target.value.length <= TITLE_MAX_LENGTH;
                canChange && setTitle(e.target.value);
              }}
              placeholder="title"
            />
            {titleCharLeft} characters left
          </label>
          <label htmlFor="body">
            <input
              type="text"
              value={body}
              name="body"
              onChange={(e) => setBody(e.target.value)}
              placeholder="body"
            />
          </label>
          <button type="submit">New Post</button>
        </form> */}
        <Outlet
          context={{
            onDeleteNote: deleteNote,
            onToggleArchive: toggleArchive,
            notes: searchedNotes,
          }}
        />
      </main>
    </>
  );
}

export default App;

export const useNotes = () => {
  return useOutletContext<NotesContext>();
};