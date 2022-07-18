import { useNotes } from "../App";
import NotesCard from "../components/NotesCard";

const ActiveNotes = () => {
  const { notes, onDeleteNote, onToggleArchive } = useNotes();

  const activeNotes = notes.filter((note) => !note.archived);

  return (
    <>
      <ul>
        {activeNotes.map((note) => {
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

export default ActiveNotes;
