import { Link } from "@remix-run/react";
import { useMediaQuery } from "react-responsive";
import { DrawerProvider } from "~/contexts/drawerContext";
import { Logo } from "../Logo";
import { Menu } from "./Menu";
import styles from "./styles.module.scss";

export const AppBar = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const menus = [
    { name: '회차별 당첨번호', href: '/draws' },
    { name: '꿈 해몽', href: '/dream' },
    { name: '로또 역사', href: '/history' },
  ];
  
  return (
    <div className={styles.appBar}>
      <div className={styles.container}>
        {isMobile && (
          <DrawerProvider>
            <Menu menus={menus} />
          </DrawerProvider>
        )}
        <div className={styles.logoWrapper}>
          <Link to="/">
            <Logo className={styles.logo} />
          </Link>
        </div>
        {!isMobile && (
          <nav className={styles.nav}>
            <ul>
              {menus.map(({ name, href }, index) => (
                <li key={index}>
                  <Link to={href}><span>{name}</span></Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
}

export default AppBar;