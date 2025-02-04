import { FC, ReactNode } from "react";
import styles from "./styles.module.scss";

interface IconButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  ariaLabel?: string;
  type?: 'button' | 'submit' | 'reset';
}

const IconButton: FC<IconButtonProps> = ({
  children,
  onClick,
  className = '',
  disabled = false,
  ariaLabel,
  type = 'button'
}) => {
  return (
    <button
      type={type}
      className={`${styles.iconButton} ${className}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

export default IconButton;