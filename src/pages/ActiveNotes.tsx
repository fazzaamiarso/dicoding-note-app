import NotesCard from "../components/NotesCard";
import { useNotesData } from "../utils/notes-context";

const ActiveNotes = () => {
  const { notes } = useNotesData();

  const activeNotes = notes.filter((note) => !note.archived);

  return (
    <>
      <h2 className="font-bold text-3xl my-8 mt-12">Active Notes</h2>
      {activeNotes.length === 0 && <EmptyState />}
      <ul className="mx-auto gap-4 grid grid-cols-1 md:grid-cols-2">
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
