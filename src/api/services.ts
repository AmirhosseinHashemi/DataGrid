import axios from "axios";

export function getRowData() {
  return axios.get(
    "https://www.ag-grid.com/example-assets/space-mission-data.json",
  );
}
