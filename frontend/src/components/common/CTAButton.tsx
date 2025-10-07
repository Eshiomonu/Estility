import { FiArrowRight } from "react-icons/fi";

interface CTAButtonProps {
  label: string;
  url?: string;
  type?: "primary" | "secondary";
  size?: "large" | "medium" | "small";
  state?: "default" | "disabled";
  onClick?: () => void;
  icon?: React.ReactNode;
}

export function CTAButton({
  label,
  url,
  type = "primary",
  size = "large",
  state = "default",
  onClick,
  icon,
}: CTAButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition";
  const sizes = {
    large: "w-[153px] h-[56px] px-3 py-4 text-base",
    medium: "px-4 py-2 text-sm",
    small: "px-3 py-1 text-xs",
  };
  const variants = {
    primary: "bg-[#8883CC] text-white hover:bg-[#736EB5]",
    secondary: "bg-gray-600 text-white hover:bg-gray-700",
  };
  const disabled =
    state === "disabled" ? "opacity-50 cursor-not-allowed" : "cursor-pointer";

  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>
  ) => {
    if (state === "disabled") {
      e.preventDefault();
      return;
    }
    onClick?.();
  };

  // Conditionally render <a> or <button> instead of using a variable
  if (url) {
    return (
      <a
        href={url}
        onClick={handleClick}
        className={`${base} ${sizes[size]} ${variants[type]} ${disabled}`}
        aria-disabled={state === "disabled"}
      >
        {label}
        {icon ?? <FiArrowRight className="text-lg" />}
      </a>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`${base} ${sizes[size]} ${variants[type]} ${disabled}`}
      disabled={state === "disabled"}
    >
      {label}
      {icon ?? <FiArrowRight className="text-lg" />}
    </button>
  );
}
