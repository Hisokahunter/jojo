import { resetFilters, useAppState } from "../../hooks/useAppState";
import type { RelationshipType } from "../../domain/types";
import styles from "./FilterBar.module.css";

const relationshipOptions: Array<{ value: RelationshipType | "all"; label: string }> = [
  { value: "all", label: "全部关系" },
  { value: "blood", label: "血亲" },
  { value: "rivalry", label: "敌对" },
  { value: "ally", label: "同伴" },
  { value: "mentor", label: "师承" },
  { value: "fate", label: "命运呼应" },
  { value: "parallel", label: "平行世界" },
];

export function FilterBar() {
  const { filters, setFilters } = useAppState();

  return (
    <header className={styles.bar} aria-label="图谱筛选">
      <label className={styles.field}>
        <span>搜索</span>
        <input
          value={filters.searchQuery}
          onChange={(event) =>
            setFilters({ ...filters, searchQuery: event.currentTarget.value })
          }
          placeholder="角色名或英文名"
          aria-label="搜索角色"
        />
      </label>

      <label className={styles.field}>
        <span>部数</span>
        <select
          value={filters.part}
          onChange={(event) => {
            const value = event.currentTarget.value;
            setFilters({ ...filters, part: value === "all" ? "all" : Number(value) });
          }}
          aria-label="按部数筛选"
        >
          <option value="all">全部</option>
          <option value="1">Part 1</option>
          <option value="3">Part 3</option>
          <option value="5">Part 5</option>
          <option value="7">Part 7</option>
        </select>
      </label>

      <label className={styles.field}>
        <span>关系</span>
        <select
          value={filters.relationshipType}
          onChange={(event) =>
            setFilters({
              ...filters,
              relationshipType: event.currentTarget.value as RelationshipType | "all",
            })
          }
          aria-label="按关系类型筛选"
        >
          {relationshipOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <button className={styles.reset} type="button" onClick={() => setFilters(resetFilters())}>
        重置
      </button>
    </header>
  );
}

