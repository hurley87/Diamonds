export const Button = ({
  text,
  disabled,
  onClick,
}: {
  text: string;
  disabled?: boolean;
  onClick?: () => void;
}) => {
  return (
    <button
      className="bg-[#7A8385] px-10 py-2.5 font-semibold font-sans  text-black bg-gradient-to-r from-white to-[#A8E0E4] disabled:opacity-50"
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
