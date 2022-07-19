import { Transition, Dialog } from "@headlessui/react";
import { ChangeEvent, FormEvent, Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotesAction } from "../utils/notes-context";

const TITLE_MAX_LENGTH = 50;

const NewNote = () => {
  const { createNote } = useNotesAction();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const navigate = useNavigate();
  const onDismiss = () => navigate(-1);

  const titleCharCount = title.length;
  const titleCharLeft = TITLE_MAX_LENGTH - titleCharCount;

  const createNewNote = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createNote(title, body);
    setTitle("");
    setBody("");
    onDismiss();
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const canChange = e.target.value.length <= TITLE_MAX_LENGTH;
    canChange && setTitle(e.target.value);
  };
  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onDismiss}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full space-y-6 max-w-md transform overflow-hidden rounded-2xl bg-cardBg p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-2xl font-bold text-purple  leading-6"
                >
                  New Note
                </Dialog.Title>
                <form
                  onSubmit={createNewNote}
                  className="flex flex-col space-y-4"
                >
                  <div className="flex flex-col ">
                    <label htmlFor="title" className="text-lg mb-2">
                      Title
                    </label>
                    <input
                      required
                      type="text"
                      value={title}
                      name="title"
                      onChange={handleTitleChange}
                      className="rounded-md bg-[#2f2e2e] focus:ring-purple text-textPrimary"
                    />
                    <span className="text-sm text-textSecondary self-end mt-1">
                      {titleCharLeft} characters left
                    </span>
                  </div>
                  <div className="flex flex-col ">
                    <label htmlFor="body" className="mb-2">
                      Body
                    </label>
                    <textarea
                      required
                      value={body}
                      name="body"
                      onChange={(e) => setBody(e.target.value)}
                      className="rounded-md bg-[#2f2e2e] focus:ring-purple text-textPrimary resize-y"
                    />
                  </div>
                  <div className="pt-8 ml-auto space-x-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md ring-1 ring-textSecondary text-purple px-4 py-2 text-sm   hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={onDismiss}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md ring-1 ring-purple  bg-purple text-darkBg px-4 py-2 text-sm font-medium hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      Create
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default NewNote;
