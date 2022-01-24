import "./title.css";

export default function Title({ className = "", children }) {
  return <span className={`title ${className}`}>{children}</span>;
}
