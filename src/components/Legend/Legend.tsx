import styles from "./Legend.module.css";

const items = [
  ["星形", "Joestar 血脉"],
  ["菱形", "主要反派"],
  ["金色实线", "血亲传承"],
  ["红色实线", "敌对关系"],
  ["金色虚线", "命运或平行呼应"],
];

export function Legend() {
  return (
    <section className={styles.legend} aria-label="图例">
      <h2>图例</h2>
      <ul>
        {items.map(([mark, label]) => (
          <li key={label}>
            <span>{mark}</span>
            <strong>{label}</strong>
          </li>
        ))}
      </ul>
    </section>
  );
}

