import { useNotes } from "../App";
import NotesCard from "../components/NotesCard";

const ArchivedNotes = () => {
  const { notes, onDeleteNote, onToggleArchive } = useNotes();

  const archivedNotes = notes.filter((note) => note.archived);

  return (
    <>
      <ul>
        {archivedNotes.map((note) => {
          return (
            <NotesCard
              key={note.id}
              note={note}
              onDeleteNote={onDeleteNote}
              onToggleArchive={onToggleArchive}
            />
          );
        })}
      </ul>
    </>
  );
};

export default ArchivedNotes;
