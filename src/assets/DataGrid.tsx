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
import { getRowData } from "../api/services.ts";
import { useState } from "react";
import ActionButtons from "../components/ActionButtons.tsx";

ModuleRegistry.registerModules([AllCommunityModule]);

// Create new DataGrid component
const DataGrid = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["rows"],
    queryFn: getRowData,
  });

  if (error) return <h3>{error.message}</h3>;

  const rowSelection: RowSelectionOptions = {
    mode: "multiRow",
    // headerCheckbox: false,
  };

  // Column Definitions: Defines & controls grid columns.
  const [colDefs] = useState<ColDef[]>([
    { field: "id" },
    {
      field: "title",
      filter: true,
    },
    { field: "description" },
    { field: "category" },
    {
      field: "price",
      valueFormatter: (params) => {
        return new Intl.NumberFormat("en").format(params.value);
      },
    },
    {
      colId: "actions",
      headerName: "Actions",
      cellRenderer: ActionButtons,
      cellRendererParams: (params: any) => ({
        rowData: params.data, // ارسال داده‌های ردیف به کامپوننت ActionButtons
      }),
      cellStyle: {
        display: "flex",
        "align-items": "center",
      },
    },
  ]);

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
        rowSelection={rowSelection}
        pagination
        rowData={data?.data}
        loading={isLoading}
        columnDefs={colDefs}
      />
    </div>
  );
};

export default DataGrid;
