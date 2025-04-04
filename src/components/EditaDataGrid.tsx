// Theme
import type {
  ColDef,
  RowSelectionOptions,
  ValueFormatterParams,
} from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
// Core CSS
import { AgGridReact } from "ag-grid-react";
import { useQuery } from "@tanstack/react-query";
import { getRowData, getRowDataById } from "../api/services.ts";
import { useRef, useState } from "react";

ModuleRegistry.registerModules([AllCommunityModule]);

// Create new DataGrid component
const EditDataGrid = ({ rowId, gridRef }: { rowId: number; gridRef: any }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["rowData", rowId],
    queryFn: () => getRowDataById(rowId),
    retry: false,
  });

  // Column Definitions: Defines & controls grid columns.
  const [colDefs] = useState<ColDef[]>([
    { field: "id" },
    {
      field: "title",
      editable: true,
    },
    { field: "description", editable: true },
    {
      field: "category",
      editable: true,
      cellEditor: "agSelectCellEditor",
      cellEditorParams: {
        values: ["women's clothing", "electronics", "jewelery"], // Your dropdown options
      },
    },
    {
      field: "price",
      editable: true,
      valueFormatter: (params) => {
        return new Intl.NumberFormat("en").format(params.value);
      },
    },
  ]);

  const onCellEditRequest = (event: CellEditRequestEvent) => {
    const data = event.data;
    const field = event.colDef.field;
    const newValue = event.newValue;
    console.log(event);
  };

  if (error) {
    return <h3>{error.message}</h3>;
  }

  if (isLoading) {
    return null;
  }

  // Container: Defines the grid's theme & dimensions.
  return (
    <div style={{ width: "100%", height: "100%" }}>
      {/* The AG Grid component, with Row Data & Column Definition props */}
      <AgGridReact
        onCellValueChanged={(event) =>
          console.log(`New Cell Value: ${event.value}`)
        }
        onSelectionChanged={(event) =>
          console.log(`${event.selectedNodes.length} Selected`)
        }
        ref={gridRef}
        onCellEditRequest={onCellEditRequest}
        rowData={[data]}
        loading={isLoading}
        columnDefs={colDefs}
      />
    </div>
  );
};

export default EditDataGrid;
