import { Transition, Dialog } from "@headlessui/react";
import { FormEvent, Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotesAction } from "../utils/notes-context";

const TITLE_MAX_LENGTH = 10;

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
          <div className="fixed inset-0 bg-black bg-opacity-25" />
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  New Note
                </Dialog.Title>
                <form onSubmit={createNewNote}>
                  <label htmlFor="title">
                    <input
                      type="text"
                      value={title}
                      name="title"
                      onChange={(e) => {
                        const canChange =
                          e.target.value.length <= TITLE_MAX_LENGTH;
                        canChange && setTitle(e.target.value);
                      }}
                      placeholder="title"
                    />
                    {titleCharLeft} characters left
                  </label>
                  <label htmlFor="body">
                    <input
                      type="text"
                      value={body}
                      name="body"
                      onChange={(e) => setBody(e.target.value)}
                      placeholder="body"
                    />
                  </label>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={onDismiss}
                    >
                      cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
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
