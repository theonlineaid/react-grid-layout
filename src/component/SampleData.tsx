import React, { useState, useEffect, useMemo, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, GridOptions, GridReadyEvent } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import useLayoutHeight from "../hooks/useLayoutHeight";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import FullscreenSharpIcon from "@mui/icons-material/FullscreenSharp";

export interface IOlympicData {
  athlete: string;
  age: number;
  country: string;
  year: number;
  date: string;
  sport: string;
  gold: number;
  silver: number;
  bronze: number;
  total: number;
}

const COLUMN_STATE_KEY = "ag-grid-column-state";
const FONT_SIZE_KEY = "ag-grid-font-size";

const SampleData: React.FC = () => {
  const [rowData, setRowData] = useState<IOlympicData[] | null>(null);
  const height = useLayoutHeight(0); // Get dynamic height based on index

  // Retrieve font size from localStorage or set default to 14
  const [fontSize, setFontSize] = useState<number>(() => {
    const savedFontSize = localStorage.getItem(FONT_SIZE_KEY);
    return savedFontSize ? parseInt(savedFontSize) : 14;
  });

  const gridApiRef = useRef<any>(null);

  const columnDefs: ColDef<IOlympicData>[] = useMemo(
    () => [
      { field: "athlete" },
      { field: "age" },
      { field: "country" },
      { field: "year" },
      { field: "date" },
      { field: "sport" },
      { field: "gold" },
      { field: "silver" },
      { field: "bronze" },
      { field: "total" },
    ],
    []
  );

  useEffect(() => {
    fetch("https://www.ag-grid.com/example-assets/olympic-winners.json")
      .then((response) => response.json())
      .then((data: IOlympicData[]) => setRowData(data));
  }, []);

  useEffect(() => {
    localStorage.setItem(FONT_SIZE_KEY, fontSize.toString());
  }, [fontSize]);

  const onGridReady = (params: GridReadyEvent) => {
    gridApiRef.current = params.api;

    const savedColumnState = localStorage.getItem(COLUMN_STATE_KEY);
    if (savedColumnState) {
      params.api.applyColumnState({
        state: JSON.parse(savedColumnState),
        applyOrder: true,
      });
    }

    // // Automatically resize columns to fit content
    // const allColumnIds = params.columnApi
    //   .getAllColumns()
    //   .map((col) => col.getId());
    // params.columnApi.autoSizeColumns(allColumnIds);
  };

  const saveColumnState = () => {
    if (gridApiRef.current) {
      const columnState = gridApiRef.current.getColumnState();
      localStorage.setItem(COLUMN_STATE_KEY, JSON.stringify(columnState));
    }
  };

  const gridOptions: GridOptions = {
    columnDefs,
    rowSelection: "single",
    onColumnMoved: saveColumnState,
    onColumnVisible: saveColumnState,
    onColumnPinned: saveColumnState,
    onColumnResized: saveColumnState,
  };

  const getRowHeight = (params: any) => (params?.node.group ? 30 : 20);
  const headerHeight = 28;

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      minWidth: 100,
      filter: true,
      sortable: true,
      resizable: true,
      enableCellChangeFlash: true,
      cellClass: "align-right",
      cellStyle: {
        fontWeight: 400,
        fontSize: `${fontSize}px`,
        whiteSpace: "normal", // Allow text wrapping
        wordWrap: "break-word", // Break long words
      },
      animateRows: false,
    };
  }, [fontSize]);

  const resetTable = () => {
    gridApiRef.current?.setColumnDefs(columnDefs);
    gridApiRef.current?.resetRowHeights();
    setFontSize(14);
  };

  const increaseFontSize = () =>
    setFontSize((prevSize) => Math.min(prevSize + 1, 24));
  const decreaseFontSize = () =>
    setFontSize((prevSize) => Math.max(prevSize - 1, 10));

  // const onGridReady = (params: GridReadyEvent) => {
  //   const gridApi = params.api;

  //   // Restore column state from localStorage
  //   const savedColumnState = localStorage.getItem(COLUMN_STATE_KEY);
  //   if (savedColumnState) {
  //     gridApi.applyColumnState({
  //       state: JSON.parse(savedColumnState),
  //       applyOrder: true,
  //     });
  //   }

  //   // Save column state to localStorage whenever columns are moved or resized
  //   const saveColumnState = () => {
  //     const columnState = gridApi.getColumnState();
  //     localStorage.setItem(COLUMN_STATE_KEY, JSON.stringify(columnState));
  //   };

  //   gridApi.addEventListener("columnMoved", saveColumnState);
  //   gridApi.addEventListener("columnVisible", saveColumnState);
  //   gridApi.addEventListener("columnPinned", saveColumnState);
  //   gridApi.addEventListener("columnResized", saveColumnState);
  // };

  return (
    <>
      <div style={{ display: "flex", color: "#fff" }}>
        <RotateLeftIcon onClick={resetTable} />
        <AddBoxIcon onClick={increaseFontSize} />
        <IndeterminateCheckBoxIcon onClick={decreaseFontSize} />
        <FullscreenSharpIcon />
      </div>

      <div
        className="ag-theme-alpine"
        style={{ height: height, width: "100%" }}
      >
        <AgGridReact<IOlympicData>
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onGridReady={onGridReady}
        />
      </div>
    </>
  );
};

export default SampleData;
