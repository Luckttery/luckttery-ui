import styles from "./styles.module.scss";

export const ComingSoon = () => {
  return (
    <div className={styles.container}>
      <svg 
        className={styles.icon}
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24"
      >
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z" />
      </svg>
      <div className={styles.title}>Coming Soon</div>
    </div>
  );
}

export default ComingSoon;