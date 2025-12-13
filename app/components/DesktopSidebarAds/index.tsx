import { useLocation } from "@remix-run/react";
import GoogleAdSense from "../GoogleAdSense";
import styles from "./styles.module.scss";

export default function DesktopSidebarAds() {
  const location = useLocation();

  return (
    <>
      <aside className={styles.leftSidebar}>
        {/* Desktop_Left_Sidebar */}
        <GoogleAdSense
          key={`left-ad-${location.pathname}`}
          slot="2449601108"
          format="auto"
          responsive="true"
        />
      </aside>
      
      <aside className={styles.rightSidebar}>
        {/* Desktop_Right_Sidebar (New Vertical) */}
        <GoogleAdSense
          key={`right-ad-${location.pathname}`}
          slot="9117939471"
          format="auto"
          responsive="true"
        />
      </aside>
    </>
  );
}
