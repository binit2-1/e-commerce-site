import { Link } from "react-router-dom";
import { paths } from "../app/paths";

const NotFoundPage = () => (
  <div className="flex flex-col items-center gap-4 py-32 text-black">
    <h1 className="text-4xl font-[neue-montreal-bold]">404</h1>
    <p className="font-[satoshi-regular]">We couldn&apos;t find that page.</p>
    <Link to={paths.home} className="underline font-[satoshi-medium]">
      Back to home
    </Link>
  </div>
);

export default NotFoundPage;
