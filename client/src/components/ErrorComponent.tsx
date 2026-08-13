interface Props {
  error: string;
  closeError: () => void;
}

const ErrorComponent = ({ error, closeError }: Props) => {
  return (
    <div className="fixed bottom-4 right-4 rounded-md md:left-auto md:right-4 md:w-auto bg-red-100 border border-red-400 text-red-700 px-4 py-3 flex items-center justify-between gap-3">
      <span className="text-sm">{error}</span>
      <button
        onClick={closeError}
        className="text-red-700 hover:text-red-900 font-bold"
      >
        ✕
      </button>
    </div>
  );
};

export default ErrorComponent;
