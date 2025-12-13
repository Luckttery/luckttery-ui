import GoogleAdSense from "../GoogleAdSense";
import styles from "./styles.module.scss";

export default function BottomAd() {
  return (
    <div className={styles.container}>
      {/* Bottom_Horizontal */}
      <GoogleAdSense
        slot="3079962974"
        format="auto"
        responsive="true"
        style={{ display: 'block', width: '100%' }}
      />
    </div>
  );
}
