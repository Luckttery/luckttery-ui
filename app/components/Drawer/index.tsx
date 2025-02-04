import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./styles.module.scss";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export const Drawer = ({ isOpen, onClose, children, title }: DrawerProps) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!mounted) return null;

  const drawer = (
    <div className={`${styles.drawerWrapper} ${isOpen && styles.open}`}>
      {isOpen && <div className={styles.drawerOverlay} onClick={onClose} />}
      
      <div ref={drawerRef} className={`${styles.drawerContent} ${isOpen && styles.open}`}>
        <div className={styles.drawerHeader}>
          {title && <h2 className={styles.drawerTitle}>{title}</h2>}
        </div>
        <div className={styles.drawerBody}>{children}</div>
      </div>
    </div>
  );

  return createPortal(drawer, document.body);
};

export default Drawer;