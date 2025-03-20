import { Link } from "react-router-dom";
import Heading from "../components/ui/Heading";
import Button from "../components/ui/Button";

export default function PageNotFound() {
  return (
    <div className="flex justify-center items-center h-screen text-white">
      <div className="flex flex-col items-center gap-4">
        <Heading level={2}>404 - Pagina non trovata</Heading>
        <Link to="/">
          <Button className="cursor-pointer">Torna alla home</Button>
        </Link>
      </div>
    </div>
  );
}
