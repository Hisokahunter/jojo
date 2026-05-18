import cytoscape, { type Core } from "cytoscape";
import { useEffect, useMemo, useRef } from "react";
import { filterGraphData } from "../../domain/filters";
import { toCytoscapeElements } from "../../domain/graph";
import { useCollectibles } from "../../hooks/useCollectibles";
import { initialAppData, useAppState } from "../../hooks/useAppState";
import { cytoscapeStyles } from "./cytoscapeStyles";
import styles from "./GraphCanvas.module.css";

export function GraphCanvas() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const cyRef = useRef<Core | null>(null);
  const {
    filters,
    selectedCharacterId,
    selectedRelationshipId,
    setSelectedCharacterId,
    setSelectedRelationshipId,
  } = useAppState();
  const { triggerCollectibles } = useCollectibles();

  const graphData = useMemo(
    () => filterGraphData(initialAppData.characters, initialAppData.relationships, filters),
    [filters],
  );

  const elements = useMemo(
    () => toCytoscapeElements(graphData.characters, graphData.relationships),
    [graphData],
  );

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const cy = cytoscape({
      container: containerRef.current,
      elements,
      layout: { name: "cose", animate: false, fit: true, padding: 48 },
      maxZoom: 2.5,
      minZoom: 0.35,
      style: cytoscapeStyles,
    });

    cyRef.current = cy;

    cy.on("tap", "node", (event) => {
      const id = event.target.id();
      setSelectedCharacterId(id);
      setSelectedRelationshipId(null);
      triggerCollectibles({ type: "select-character", targetId: id });
    });

    cy.on("tap", "edge", (event) => {
      const id = event.target.id();
      const edge = event.target;
      setSelectedRelationshipId(id);
      setSelectedCharacterId(String(edge.data("source")));
      triggerCollectibles({ type: "select-relationship", targetId: id });
    });

    return () => {
      cy.destroy();
      cyRef.current = null;
    };
  }, [
    elements,
    setSelectedCharacterId,
    setSelectedRelationshipId,
    triggerCollectibles,
  ]);

  useEffect(() => {
    const cy = cyRef.current;
    if (!cy) {
      return;
    }

    cy.elements().removeClass("selected");

    if (selectedCharacterId) {
      cy.getElementById(selectedCharacterId).addClass("selected");
    }

    if (selectedRelationshipId) {
      cy.getElementById(selectedRelationshipId).addClass("selected");
    }
  }, [selectedCharacterId, selectedRelationshipId, elements]);

  return (
    <section className={styles.wrap} aria-label="人物关系图谱">
      <div className={styles.canvas} ref={containerRef} data-testid="graph-canvas" />
    </section>
  );
}

