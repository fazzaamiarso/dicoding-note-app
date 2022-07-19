import { ReactNode } from "react";
import { useLocation, Link } from "react-router-dom";

const NewNoteButton = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  return (
    <Link className="w-max" to="/new" state={{ backgroundLocation: location }}>
      {children}
    </Link>
  );
};

export default NewNoteButton;
