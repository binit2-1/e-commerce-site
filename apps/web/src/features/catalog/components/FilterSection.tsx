import { useState, type ReactNode } from "react";
import { ChevronDown, ChevronUp } from "../../../components/icons";

const FilterSection = ({ title, children }: { title: string; children: ReactNode }) => {
  const [open, setOpen] = useState(true);
  return (
    <section className="border-t border-line py-5">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between font-body-bold text-xl"
      >
        {title}
        {open ? <ChevronUp width={20} height={20} /> : <ChevronDown width={20} height={20} />}
      </button>
      {open && <div className="mt-5">{children}</div>}
    </section>
  );
};

export default FilterSection;
