import { Link } from "@remix-run/react";
import styles from "./styles.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <Link to="/about">소개</Link>
        <Link to="/history">로또 역사</Link>
        <Link to="/contact">문의하기</Link>
        <Link to="/terms">이용약관</Link>
        <Link to="/privacy">개인정보처리방침</Link>
      </div>
      <div className={styles.copyright}>
        © {new Date().getFullYear()} Luckttery. All Rights Reserved.<br/>
        <span style={{ fontSize: '0.8em', opacity: 0.7 }}>본 서비스의 당첨 결과 및 판매점 데이터는 동행복권의 데이터를 기반으로 합니다.</span>
      </div>
    </footer>
  );
}
