import styles from "./Legend.module.css";

const items = [
  ["青绿头像环", "Joestar 血脉"],
  ["红色头像环", "Brando 阵营"],
  ["金色头像环", "Zeppeli 传承"],
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
