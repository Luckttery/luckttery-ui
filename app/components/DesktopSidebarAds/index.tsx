import GoogleAdSense from "../GoogleAdSense";
import styles from "./styles.module.scss";

export default function DesktopSidebarAds() {
  return (
    <>
      <aside className={styles.leftSidebar}>
        {/* Desktop_Left_Sidebar */}
        <GoogleAdSense
          slot="2449601108"
          format="auto"
          responsive="true"
          style={{ width: '100%', height: '100%' }}
        />
      </aside>
      
      <aside className={styles.rightSidebar}>
        {/* Desktop_Right_Multiplex */}
        <GoogleAdSense
          slot="4279711614"
          format="autorelaxed"
          responsive="true"
          style={{ width: '100%', height: '100%' }}
        />
      </aside>
    </>
  );
}
