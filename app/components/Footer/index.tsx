import { Link } from "@remix-run/react";
import styles from "./styles.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <Link to="/about">소개</Link>
        <Link to="/contact">문의하기</Link>
        <Link to="/privacy">개인정보처리방침</Link>
      </div>
      <div className={styles.copyright}>
        © {new Date().getFullYear()} Luckttery. All Rights Reserved.
      </div>
    </footer>
  );
}
