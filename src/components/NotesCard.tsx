import { Note, showFormattedDate } from "../utils/data";
import { useNotesAction } from "../utils/notes-context";

type Props = {
  note: Note;
};
const NotesCard = ({ note }: Props) => {
  const { toggleArchive, deleteNote } = useNotesAction();
  const isArchived = note.archived;
  return (
    <li className="flex max-w-md flex-col justify-between min-h-[15rem] bg-cardBg text-textPrimary w-full mx-auto p-4 rounded-lg">
      <div className="space-y-4 mb-6">
        <div>
          <h3 className="font-semibold text-2xl leading-none">{note.title}</h3>
          <span className="text-sm text-textSecondary">
            {showFormattedDate(note.createdAt)}
          </span>
        </div>
        <p>{note.body}</p>
      </div>
      <div className="pt-6 flex w-full gap-6 mt-auto">
        <button
          onClick={() => deleteNote(note.id)}
          className="w-full p-2 hover:opacity-90 rounded-md ring-purple ring-1 text-purple"
        >
          Delete
        </button>
        <button
          onClick={() => toggleArchive(note.id)}
          className="w-full p-2 hover:opacity-90 rounded-md bg-purple text-darkBg ring-1 ring-purple"
        >
          {isArchived ? "Unarchive" : "Archive"}
        </button>
      </div>
    </li>
  );
};

export default NotesCard;
