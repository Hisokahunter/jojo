import { filterGraphData } from "../../domain/filters";
import { initialAppData, useAppState } from "../../hooks/useAppState";
import styles from "./StatusBar.module.css";

export function StatusBar() {
  const { activeView, filters } = useAppState();
  const graphData = filterGraphData(
    initialAppData.characters,
    initialAppData.relationships,
    filters,
  );

  return (
    <footer className={styles.status} aria-label="图谱状态">
      <span>视图：{activeView}</span>
      <span>节点：{graphData.characters.length}</span>
      <span>关系：{graphData.relationships.length}</span>
    </footer>
  );
}

