import { findCharacterById, findRelationshipsForCharacter } from "../../domain/graph";
import { initialAppData, useAppState } from "../../hooks/useAppState";
import styles from "./CharacterPanel.module.css";

export function CharacterPanel() {
  const { selectedCharacterId } = useAppState();
  const character = findCharacterById(initialAppData.characters, selectedCharacterId);
  const relationships = findRelationshipsForCharacter(
    initialAppData.relationships,
    selectedCharacterId,
  );

  if (!character) {
    return (
      <aside className={styles.panel} aria-label="角色详情">
        <div className={styles.empty}>选择一个角色查看替身、台词和关系。</div>
      </aside>
    );
  }

  return (
    <aside className={styles.panel} aria-label="角色详情">
      <div className={styles.header}>
        <h2>{character.name}</h2>
        <span>{character.romanizedName}</span>
      </div>

      <dl className={styles.meta}>
        <div>
          <dt>部数</dt>
          <dd>{character.part.map((part) => `Part ${part}`).join(", ")}</dd>
        </div>
        <div>
          <dt>家族</dt>
          <dd>{character.family}</dd>
        </div>
        <div>
          <dt>替身</dt>
          <dd>{character.stand ?? "无替身资料"}</dd>
        </div>
      </dl>

      <p className={styles.quote}>{character.quote}</p>
      <p className={styles.summary}>{character.summary}</p>

      <div className={styles.tags} aria-label="角色标签">
        {character.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>

      <section className={styles.relationships}>
        <h3>直接关系</h3>
        <ul>
          {relationships.map((relationship) => (
            <li key={relationship.id}>
              <strong>{relationship.label}</strong>
              <span>{relationship.description}</span>
            </li>
          ))}
        </ul>
      </section>
    </aside>
  );
}

