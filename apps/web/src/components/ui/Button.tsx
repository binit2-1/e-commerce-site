import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "solid" | "outline";
  full?: boolean;
}

const Button = ({ variant = "solid", full = false, className = "", type = "button", ...rest }: ButtonProps) => (
  <button
    type={type}
    className={`rounded-full px-8 py-3.5 font-body-medium text-base transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 ${
      variant === "solid"
        ? "bg-black text-white hover:bg-black/85"
        : "border border-line bg-transparent text-black hover:bg-surface"
    } ${full ? "w-full" : ""} ${className}`}
    {...rest}
  />
);

export default Button;
