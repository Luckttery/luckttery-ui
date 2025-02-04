import { Link } from "@remix-run/react";
import styles from "./styles.module.scss";
import Logo from "~/assets/logo.svg";
import { useMediaQuery } from "react-responsive";
import { Menu } from "./Menu";
import { DrawerProvider } from "~/contexts/drawerContext";

export const AppBar = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const menus = [
    { name: '회차별 당첨번호', href: '/draws' },
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
            <img className={styles.logo} alt="logo" src={Logo} />
          </Link>
        </div>
        {!isMobile && (
          <nav className={styles.nav}>
            <ul>
              {menus.map(({ name, href }) => (
                <li>
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