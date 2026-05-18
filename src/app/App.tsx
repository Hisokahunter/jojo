import { CharacterPanel } from "../components/CharacterPanel/CharacterPanel";
import { CollectiblesBar } from "../components/CollectiblesBar/CollectiblesBar";
import { FilterBar } from "../components/FilterBar/FilterBar";
import { GraphCanvas } from "../components/GraphCanvas/GraphCanvas";
import { Legend } from "../components/Legend/Legend";
import { StatusBar } from "../components/StatusBar/StatusBar";
import { AppProviders } from "./AppProviders";
import styles from "./App.module.css";

export function App() {
  return (
    <AppProviders>
      <main className={styles.shell}>
        <FilterBar />
        <div className={styles.workspace}>
          <div className={styles.graphArea}>
            <GraphCanvas />
            <Legend />
          </div>
          <CharacterPanel />
        </div>
        <CollectiblesBar />
        <StatusBar />
      </main>
    </AppProviders>
  );
}

