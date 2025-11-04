const ConfirmDeleteScreen = ({ isOpen, onCancel, onConfirm, loading }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-base-100/20 backdrop-blur-xs flex items-center justify-center z-50">
      <div className="card bg-base-100 border border-base-300 w-full max-w-sm shadow-xl">
        <div className="card-body text-center">
          <h2 className="card-title text-base-content text-lg mb-2">
            Delete this note?
          </h2>
          <p className="text-sm text-base-content/80 mb-6 text-left">
            This action cannot be reversed.
          </p>

          <div className="card-actions justify-end">
            <button
              className="btn btn-ghost"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              className="btn btn-error"
              onClick={onConfirm}
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteScreen;
