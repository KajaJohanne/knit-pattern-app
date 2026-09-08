import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "danger";
};

export function Button({
  variant = "primary",
  className = "",
  ...rest
}: ButtonProps) {
  const baseStyles =
    "font-heading font-bold uppercase rounded-full py-2 px-5 transition-all  hover:opacity-60 disabled:opacity-50 disabled:hover:scale-100";

  const variantStyles = {
    primary: "bg-espresso text-cream-light",
    secondary: "bg-transparent border-2 border-background-blue text-charcoal",
    danger: "bg-transparent border-2 border-red-400 text-red-500",
  }[variant];

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${className}`}
      {...rest}
    />
  );
}
