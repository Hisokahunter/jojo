import { useCollectibles } from "../../hooks/useCollectibles";
import styles from "./CollectiblesBar.module.css";

export function CollectiblesBar() {
  const { collectibles, discoveredCollectibleIds } = useCollectibles();
  const discovered = new Set(discoveredCollectibleIds);

  return (
    <section className={styles.bar} aria-label="圣者遗体收集进度">
      <span>
        圣者遗体 {discovered.size}/{collectibles.length}
      </span>
      <ol>
        {collectibles.map((collectible) => (
          <li
            key={collectible.id}
            className={discovered.has(collectible.id) ? styles.discovered : undefined}
            title={collectible.englishName}
          >
            {collectible.name}
          </li>
        ))}
      </ol>
    </section>
  );
}

