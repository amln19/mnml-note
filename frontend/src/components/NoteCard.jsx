import { useState } from "react";
import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import toast from "react-hot-toast";
import { formatDate } from "../lib/utils.js";
import api from "../lib/axios.js";
import ConfirmDeleteScreen from "./ConfirmDeleteScreen.jsx";

const NoteCard = ({ note, setNotes }) => {
  const [showDeleteScreen, setShowDeleteScreen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async (id) => {
    setDeleting(true);

    try {
      await api.delete(`/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id));
      toast.success("Note deleted successfully");
    } catch (error) {
      console.log("Error in handleDelete", error);
      toast.error("Failed to delete note");
    } finally {
      setDeleting(false);
      setShowDeleteScreen(false);
    }
  };

  return (
    <>
      <Link
        to={`/note/${note._id}`}
        className="card bg-base-100 border border-base-300 hover:border-base-content"
      >
        <div className="card-body">
          <h3 className="card-title text-base-content">{note.title}</h3>
          <p className="text-base-content/70 line-clamp-3">{note.content}</p>
          <div className="card-actions justify-between items-center mt-4">
            <span className="text-sm text-base-content/60">
              {formatDate(new Date(note.createdAt))}
            </span>
            <div className="flex items-center gap-1">
              <Link
                to={`/note/${note._id}`}
                className="btn btn-ghost btn-xs text-info"
              >
                <PenSquareIcon className="size-4" />
              </Link>
              <button
                className="btn btn-ghost btn-xs text-error"
                onClick={(e) => {
                  e.preventDefault();
                  setShowDeleteScreen(true);
                }}
              >
                <Trash2Icon className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </Link>

      <ConfirmDeleteScreen
        isOpen={showDeleteScreen}
        onCancel={() => setShowDeleteScreen(false)}
        onConfirm={() => handleDelete(note._id)}
        loading={deleting}
      />
    </>
  );
};

export default NoteCard;
