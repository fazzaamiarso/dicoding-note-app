import { FormEvent, useState } from "react";
import { getInitialData, Note, showFormattedDate } from "./utils/data";

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
  const archivedNotes = searchedNotes.filter((note) => note.archived);
  const activeNotes = searchedNotes.filter((note) => !note.archived);

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
    <main>
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
      <form onSubmit={createNote}>
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
      </form>
      <h2 className="font-bold text-xl">Active</h2>
      <ul>
        {activeNotes.length === 0 && <p>No Notes yet!</p>}
        {activeNotes.map((note) => {
          return (
            <li key={note.id} className="flex flex-col max-w-sm ">
              <h2>{note.title}</h2>
              <span>{showFormattedDate(note.createdAt)}</span>
              <p>{note.body}</p>
              <div>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="p-2 hover:opacity-90 bg-red-400 text-white"
                >
                  delete
                </button>
                <button
                  onClick={() => toggleArchive(note.id)}
                  className="p-2 hover:opacity-90 bg-green-400 text-black"
                >
                  archive
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      <h2 className="font-bold text-xl">Archived</h2>
      {archivedNotes.length === 0 && <p>Archive is empty</p>}
      <ul>
        {archivedNotes.map((note) => {
          return (
            <li key={note.id} className="flex flex-col max-w-sm ">
              <h2>{note.title}</h2>
              <span>{showFormattedDate(note.createdAt)}</span>
              <p>{note.body}</p>
              <div>
                <button
                  onClick={() => deleteNote(note.id)}
                  className="p-2 hover:opacity-90 bg-red-400 text-white"
                >
                  delete
                </button>
                <button
                  onClick={() => toggleArchive(note.id)}
                  className="p-2 hover:opacity-90 bg-green-400 text-black"
                >
                  un-archive
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </main>
  );
}

export default App;
