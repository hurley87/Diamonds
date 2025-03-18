export const Button = ({
  text,
  disabled,
  onClick,
  className,
}: {
  text: string;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}) => {
  return (
    <button
      className={`font-haboro bg-[#0C0D0D] px-10 py-2.5 font-semibold uppercase text-[#F1F6F7] rounded-full ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
