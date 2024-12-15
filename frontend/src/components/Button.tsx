interface BUttonProps {
  title: string;
  action: () => void;
}
function Button({ title, action }: BUttonProps) {
  return (
    <button
      onClick={action}
      className="px-6 py-2 bg-blue-600 text-white text-center rounded-lg"
    >
      {title}
    </button>
  );
}

export default Button;
