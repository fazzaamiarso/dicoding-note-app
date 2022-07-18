import { Note, showFormattedDate } from "../utils/data";

type Props = {
  note: Note;
  onToggleArchive: (id: number) => void;
  onDeleteNote: (id: number) => void;
};
const NotesCard = ({ note, onDeleteNote, onToggleArchive }: Props) => {
  const isArchived = note.archived;
  return (
    <li>
      <h3 className="font-semibold">{note.title}</h3>
      <span>{showFormattedDate(note.createdAt)}</span>
      <p>{note.body}</p>
      <div>
        <div>
          <button
            onClick={() => onDeleteNote(note.id)}
            className="p-2 hover:opacity-90 bg-red-400 text-white"
          >
            delete
          </button>
          <button
            onClick={() => onToggleArchive(note.id)}
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
