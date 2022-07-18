import NotesCard from "../components/NotesCard";
import { useNotesData } from "../utils/notes-context";

const ActiveNotes = () => {
  const notes = useNotesData();

  const activeNotes = notes.filter((note) => !note.archived);

  return (
    <>
      {activeNotes.length === 0 && <EmptyState />}
      <ul>
        {activeNotes.map((note) => {
          return <NotesCard key={note.id} note={note} />;
        })}
      </ul>
    </>
  );
};

export default ActiveNotes;

const EmptyState = () => {
  return <p>No notes yet.</p>;
};
