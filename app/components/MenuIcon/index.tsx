import { FC } from "react";
import styles from "./styles.module.scss"

type MenuIconProps = {
  isMenu: boolean
}

export const MenuIcon: FC<MenuIconProps> = ({ isMenu }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={styles.icon}
    >
      <path
        className={`${styles.line} ${isMenu ? styles.openTop : styles.closeTop}`}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        d="M4 6h16"
      />

      <path
        className={styles.line}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        d="M4 12h16"
      />

      <path
        className={`${styles.line} ${isMenu ? styles.openBottom : styles.closeBottom}`}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        d="M4 18h16"
      />
    </svg>
  )
}

export default MenuIcon;