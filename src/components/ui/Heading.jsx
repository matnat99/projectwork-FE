export default function Heading({ level, children, ...props }) {
  if (level === 1) {
    return (
      <h1 className="text-4xl font-extrabold" {...props}>
        {children}
      </h1>
    );
  }
  if (level === 2) {
    return (
      <h2 className="text-3xl font-bold" {...props}>
        {children}
      </h2>
    );
  }
  if (level === 3) {
    return (
      <h3 className="text-2xl font-semibold" {...props}>
        {children}
      </h3>
    );
  }
  if (level === 4) {
    return (
      <h4 className="text-xl font-medium" {...props}>
        {children}
      </h4>
    );
  }
  if (level === 5) {
    return (
      <h5 className="text-lg font-medium" {...props}>
        {children}
      </h5>
    );
  }
  if (level === 6) {
    return (
      <h6 className="text-md font-medium" {...props}>
        {children}
      </h6>
    );
  }
}
