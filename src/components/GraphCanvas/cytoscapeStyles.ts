import type cytoscape from "cytoscape";

export const cytoscapeStyles: cytoscape.StylesheetJson = [
  {
    selector: "node",
    style: {
      "background-color": "#a7b0b8",
      "border-color": "#f7f1e3",
      "border-width": 1,
      color: "#f7f1e3",
      "font-size": "11px",
      label: "data(label)",
      "text-background-color": "#003153",
      "text-background-opacity": 0.78,
      "text-background-padding": "3px",
      "text-margin-y": -8,
      "text-wrap": "wrap",
      "text-max-width": "82px",
      height: "42px",
      width: "42px",
    },
  },
  {
    selector: "node.joestar",
    style: {
      "background-color": "#2aae9f",
      shape: "star",
    },
  },
  {
    selector: "node.brando",
    style: {
      "background-color": "#a63d40",
      shape: "diamond",
    },
  },
  {
    selector: "node.zeppeli",
    style: {
      "background-color": "#d6a928",
      shape: "ellipse",
    },
  },
  {
    selector: "edge",
    style: {
      "curve-style": "bezier",
      "font-size": "9px",
      label: "data(label)",
      "line-color": "#a7b0b8",
      "target-arrow-color": "#a7b0b8",
      "target-arrow-shape": "triangle",
      "text-background-color": "#003153",
      "text-background-opacity": 0.72,
      "text-background-padding": "2px",
      color: "#f7f1e3",
      opacity: 0.82,
      width: "2px",
    },
  },
  {
    selector: "edge.rivalry",
    style: {
      "line-color": "#a63d40",
      "target-arrow-color": "#a63d40",
      "line-style": "solid",
    },
  },
  {
    selector: "edge.blood",
    style: {
      "line-color": "#d6a928",
      "target-arrow-color": "#d6a928",
      "line-style": "solid",
    },
  },
  {
    selector: "edge.ally, edge.mentor",
    style: {
      "line-color": "#2aae9f",
      "target-arrow-color": "#2aae9f",
      "line-style": "solid",
    },
  },
  {
    selector: "edge.fate, edge.parallel",
    style: {
      "line-color": "#d6a928",
      "line-style": "dashed",
      "target-arrow-color": "#d6a928",
    },
  },
  {
    selector: ".selected",
    style: {
      "border-color": "#d6a928",
      "border-width": "5px",
      "z-index": 20,
    },
  },
];
