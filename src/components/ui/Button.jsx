export default function Button({
  size = "md",
  variant = "primary",
  children,
  ...props
}) {
  const baseStyle = "rounded-sm font-medium transition-all cursor-pointer";

  const sizes = {
    sm: "py-1 px-2 text-xs",
    md: "py-2 px-4 text-md",
    lg: "py-3 px-6 text-lg",
  };

  const variants = {
    primary: "bg-blue-900 text-white hover:bg-blue-600 ",
    secondary:
      "bg-transparent text-blue-800 border-2 border-blue-800 hover:bg-blue-600 hover:text-white",
  };

  return (
    <button
      className={`${baseStyle} ${variants[variant]} ${sizes[size]}`}
      {...props}
    >
      {children}
    </button>
  );
}
