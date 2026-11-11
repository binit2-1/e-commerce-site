import { Check } from "../icons";

interface ColorSwatchProps {
  name: string;
  hex: string;
  selected?: boolean;
  size?: number;
  onClick?: () => void;
}

const ColorSwatch = ({ name, hex, selected = false, size = 37, onClick }: ColorSwatchProps) => {
  const light = hex.toLowerCase() === "#ffffff";
  return (
    <button
      type="button"
      title={name}
      aria-label={name}
      aria-pressed={selected}
      onClick={onClick}
      style={{ backgroundColor: hex, width: size, height: size }}
      className={`flex items-center justify-center rounded-full border ${
        light ? "border-black/20" : "border-black/10"
      } transition-transform hover:scale-105`}
    >
      {selected && <Check width={16} height={16} className={light ? "text-black" : "text-white"} />}
    </button>
  );
};

export default ColorSwatch;
