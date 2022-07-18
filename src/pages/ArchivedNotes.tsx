import NotesCard from "../components/NotesCard";
import { useNotesData } from "../utils/notes-context";

const ArchivedNotes = () => {
  const notes = useNotesData();

  const archivedNotes = notes.filter((note) => note.archived);

  return (
    <>
      {archivedNotes.length === 0 && <EmptyState />}
      <ul>
        {archivedNotes.map((note) => {
          return <NotesCard key={note.id} note={note} />;
        })}
      </ul>
    </>
  );
};

export default ArchivedNotes;

const EmptyState = () => {
  return <p>Archive is empty.</p>;
};
