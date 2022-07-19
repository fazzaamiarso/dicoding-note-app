import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { getInitialData, Note } from "./data";

type NotesCtx = {
  notes: Note[];
  searchedTitle: string;
  updateSearchedTitle: (searchValue: string) => void;
  createNote: (title: string, body: string) => void;
  toggleArchive: (id: number) => void;
  deleteNote: (id: number) => void;
};
const notesContext = createContext<NotesCtx | undefined>(undefined);

const NotesProvider = ({ children }: { children: ReactNode }) => {
  const [notes, setNotes] = useState(() => getInitialData());
  const [searchedTitle, setSearchedTitle] = useState("");

  const updateSearchedTitle = (searchValue: string) =>
    setSearchedTitle(searchValue);

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
    // copiedNotes[updatedNoteIdx] = {
    //   ...updatedNote,
    //   archived: !updatedNote.archived,
    // };
    updatedNote.archived = !updatedNote.archived;
    setNotes(copiedNotes);
  };

  const createNote = (title: string, body: string) => {
    const newNote: Note = {
      title,
      body,
      createdAt: new Date().toString(),
      archived: false,
      id: Date.now(),
    };
    setNotes((prevNotes) => [...prevNotes, newNote]);
  };
  return (
    <notesContext.Provider
      value={{
        notes: searchedNotes,
        deleteNote,
        toggleArchive,
        createNote,
        searchedTitle,
        updateSearchedTitle,
      }}
    >
      {children}
    </notesContext.Provider>
  );
};


const useNotes = () => {
  const ctx = useContext(notesContext);
  if (!ctx)
    throw Error("Notes Context should be used inside a Notes Provider!");
  return ctx;
};

const useNotesData = () => {
  const { notes, searchedTitle } = useNotes();
  return { notes, searchedTitle };
};
const useNotesAction = () => {
  const { toggleArchive, deleteNote, createNote, updateSearchedTitle } =
    useNotes();
  return { toggleArchive, deleteNote, createNote, updateSearchedTitle };
};

export { NotesProvider, useNotesAction, useNotesData };
