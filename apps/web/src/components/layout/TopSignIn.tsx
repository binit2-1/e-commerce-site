import { useState } from "react";
import { Close } from "../icons";

const TopSignIn = () => {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className="relative bg-black px-10 py-2.5 text-center text-xs text-white lg:text-sm">
      Sign up and get 20% off to your first order.{" "}
      <a className="font-body-medium underline" href="#">
        Sign Up Now
      </a>
      <button
        type="button"
        aria-label="Dismiss banner"
        onClick={() => setDismissed(true)}
        className="absolute right-4 top-1/2 hidden -translate-y-1/2 sm:block xl:right-[100px]"
      >
        <Close width={18} height={18} />
      </button>
    </div>
  );
};

export default TopSignIn;
