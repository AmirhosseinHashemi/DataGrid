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

ModuleRegistry.registerModules([AllCommunityModule]);

// Row Data Interface
// interface IRow {
//   mission: string;
//   company: string;
//   location: string;
//   date: string;
//   time: string;
//   rocket: string;
//   price: number;
//   successful: boolean;
// }

// Create new DataGrid component
const DataGrid = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["rows"],
    queryFn: getRowData,
  });

  const CompanyLogoRenderer = ({ value }) => (
    <span
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        alignItems: "center",
      }}
    >
      {value && (
        <img
          alt={`${value} Flag`}
          src={`https://www.ag-grid.com/example-assets/space-company-logos/${value.toLowerCase()}.png`}
          style={{
            display: "block",
            width: "25px",
            height: "auto",
            maxHeight: "50%",
            marginRight: "12px",
            filter: "brightness(1.1)",
          }}
        />
      )}
      <p
        style={{
          textOverflow: "ellipsis",
          overflow: "hidden",
          whiteSpace: "nowrap",
        }}
      >
        {value}
      </p>
    </span>
  );

  const rowSelection: RowSelectionOptions = {
    mode: "multiRow",
    // headerCheckbox: false,
  };

  const rowClass = "my-green-class";
  const getRowClass = (params) => {
    if (params.node.rowIndex % 2 === 0) {
      return "bg-green-300";
    }
  };

  // Column Definitions: Defines & controls grid columns.
  const [colDefs] = useState<ColDef[]>([
    { field: "mission", editable: true },
    {
      field: "company",
      filter: true,
      cellRenderer: CompanyLogoRenderer,
    },
    { field: "location" },
    { field: "date" },
    {
      field: "price",
      valueFormatter: (params) => {
        return new Intl.NumberFormat("en").format(params.value);
      },
    },
    { field: "successful" },
    { field: "rocket" },
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
        rowClass={rowClass}
        getRowClass={getRowClass}
      />
    </div>
  );
};

export default DataGrid;
