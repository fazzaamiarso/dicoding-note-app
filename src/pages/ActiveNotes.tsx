import EmptyStateShell from "../components/EmptyStateShell";
import NewNoteButton from "../components/NewNoteButton";
import NotesCard from "../components/NotesCard";
import { useNotesData } from "../utils/notes-context";

const ActiveNotes = () => {
  const { notes, searchedTitle } = useNotesData();

  const activeNotes = notes.filter((note) => !note.archived);

  return (
    <>
      <h2 className="font-bold text-3xl my-8 mt-12">Active Notes</h2>
      {activeNotes.length === 0 ? (
        searchedTitle ? (
          <EmptyStateShell>
            <p>No notes found!</p>
          </EmptyStateShell>
        ) : (
          <EmptyState />
        )
      ) : null}
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
  return (
    <EmptyStateShell>
      <p className="mb-4 text-lg">Notes are empty. Get started down here.</p>
      <NewNoteButton>
        <span className="bg-purple p-4 text-darkBg rounded-md block w-max hover:opacity-90 font-semibold">
          Create a new note
        </span>
      </NewNoteButton>
    </EmptyStateShell>
  );
};
