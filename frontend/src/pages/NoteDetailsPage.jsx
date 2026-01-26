import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";
import ConfirmDeleteScreen from "../components/ConfirmDeleteScreen";

const NoteDetailsPage = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showDeleteScreen, setShowDeleteScreen] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    let isMounted = true;

    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        if (isMounted) setNote(res.data);
      } catch (error) {
        console.error("Error fetching note:", error);
        toast.error("Failed to fetch the note");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchNote();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleDelete = async (id) => {
    setDeleting(true);

    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted");
      navigate("/");
    } catch (error) {
      console.log("Error deleting the note:", error);
      const message = error.response?.data?.message || "Failed to delete note";
      toast.error(message);
    } finally {
      setDeleting(false);
      setShowDeleteScreen(false);
    }
  };

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("Please add a title or content");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      console.log("Error saving the note:", error);
      const message = error.response?.data?.message || "Failed to update note";
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeftIcon className="size-5" />
              Back to Notes
            </Link>

            <button
              onClick={() => setShowDeleteScreen(true)}
              className="btn btn-error btn-outline"
            >
              <Trash2Icon className="size-5" />
              Delete Note
            </button>
          </div>

          <div className="card bg-base-100 border border-base-300">
            <div className="card-body">
              <div className="form-control flex flex-col gap-2 mb-6">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  placeholder="Note title"
                  className="input input-bordered"
                  value={note.title}
                  onChange={(e) => setNote({ ...note, title: e.target.value })}
                />
              </div>

              <div className="form-control flex flex-col gap-2 mb-6">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  placeholder="Write your note here..."
                  className="textarea textarea-bordered h-32"
                  value={note.content}
                  onChange={(e) =>
                    setNote({ ...note, content: e.target.value })
                  }
                />
              </div>

              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  disabled={saving}
                  onClick={handleSave}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConfirmDeleteScreen
        isOpen={showDeleteScreen}
        onCancel={() => setShowDeleteScreen(false)}
        onConfirm={() => handleDelete(note._id)}
        loading={deleting}
      />
    </div>
  );
};

export default NoteDetailsPage;
