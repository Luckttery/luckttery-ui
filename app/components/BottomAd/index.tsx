import { useLocation } from "@remix-run/react";
import GoogleAdSense from "../GoogleAdSense";
import styles from "./styles.module.scss";

export default function BottomAd() {
  const location = useLocation();

  return (
    <div className={styles.container}>
      {/* Bottom_Horizontal */}
      <GoogleAdSense
        key={`bottom-ad-${location.pathname}`}
        slot="3079962974"
        format="auto"
        responsive="true"
        style={{ display: 'block', width: '100%' }}
      />
    </div>
  );
}
