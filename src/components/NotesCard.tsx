import { Note, showFormattedDate } from "../utils/data";
import { useNotesAction } from "../utils/notes-context";

type Props = {
  note: Note;
};
const NotesCard = ({ note }: Props) => {
  const { toggleArchive, deleteNote } = useNotesAction();
  const isArchived = note.archived;
  return (
    <li>
      <h3 className="font-semibold">{note.title}</h3>
      <span>{showFormattedDate(note.createdAt)}</span>
      <p>{note.body}</p>
      <div>
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
            {isArchived ? "Un-archived" : "Archive"}
          </button>
        </div>
      </div>
    </li>
  );
};

export default NotesCard;
