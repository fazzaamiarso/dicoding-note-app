import EmptyStateShell from "../components/EmptyStateShell";
import NotesCard from "../components/NotesCard";
import { useNotesData } from "../utils/notes-context";

const ArchivedNotes = () => {
  const { notes } = useNotesData();

  const archivedNotes = notes.filter((note) => note.archived);

  return (
    <>
      <h2 className="font-bold text-3xl my-8 mt-12">Archived Notes</h2>
      {archivedNotes.length === 0 && <EmptyState />}
      <ul className="mx-auto gap-4 grid grid-cols-1 md:grid-cols-2">
        {archivedNotes.map((note) => {
          return <NotesCard key={note.id} note={note} />;
        })}
      </ul>
    </>
  );
};

export default ArchivedNotes;

const EmptyState = () => {
  return (
    <EmptyStateShell>
      <p className="text-lg ">Archive is empty!</p>
    </EmptyStateShell>
  );
};
