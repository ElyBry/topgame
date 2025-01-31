import styles from "./Button.module.css";
interface ButtonProps {
  label: string;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({ label, onClick, className, type = "button" }) => {
  const buttonClass = `${styles.button} ${className ? className : ""}`.trim();

  return (
    <button
      type={type}
      className={buttonClass}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
