import { Link } from "@remix-run/react";
import Drawer from "~/components/Drawer";
import IconButton from "~/components/IconButton";
import MenuIcon from "~/components/MenuIcon";
import { useDrawer } from "~/contexts/drawerContext";
import styles from "./styles.module.scss";
import { FC } from "react";

type MenuProps = {
  menus: { name: string, href: string }[]
}

export const Menu: FC<MenuProps> = ({ menus }) => {
  const { isOpen, openDrawer, closeDrawer } = useDrawer();

  const toggleMenu = () => {
    if (isOpen) {
      closeDrawer()
    } else {
      openDrawer()
    }
  }

  const closeMenu = () => {
    closeDrawer()
  }

  return (
    <>
      <div className={styles.menu}>
        <IconButton onClick={toggleMenu}>
          <MenuIcon isMenu={!isOpen} />
        </IconButton>
      </div>
      <Drawer isOpen={isOpen} onClose={closeMenu}>
        <nav className={styles.nav}>
          <ul className={styles.menuList}>
            {menus.map(({ name, href }, index) => (
              <li key={index} className={styles.menuItem}>
                <Link className={styles.menuLink} to={href} onClick={toggleMenu}>
                  <span className={styles.name}>{name}</span>
                  <span className={styles.indicator} />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Drawer>
    </>
  )
}

export default Menu;