import { Link, useRouteError } from "react-router-dom";
import { paths } from "../app/paths";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);
  return (
    <div className="flex flex-col items-center gap-4 py-32 text-black">
      <h1 className="text-3xl font-[neue-montreal-bold]">Something went wrong</h1>
      <Link to={paths.home} className="underline font-[satoshi-medium]">
        Back to home
      </Link>
    </div>
  );
};

export default ErrorPage;
