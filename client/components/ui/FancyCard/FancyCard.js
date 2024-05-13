import styles from "./FancyCard.module.css";
export default function FancyCard() {
  return (
    <div className={styles.card}>
      <div className={styles.card_content}>
        <h2 className={styles.card_title}>Welcome</h2>
        <a href="/customers" className={styles.card_link}>
          Show Customers
        </a>
      </div>
    </div>
  );
}
