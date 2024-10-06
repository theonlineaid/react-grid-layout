import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import { Button } from "@mui/material";

const TableListSetting = ({isFullScreen}: any) => {
  // Define the row data (your data)
  const rowData = [
    { SL: 1, Name: "Trading List", Action: "", Existing: 1 },
    { SL: 2, Name: "Market Depth", Action: "", Existing: 1 },
    { SL: 3, Name: "Blotter", Action: "", Existing: 3 },
    { SL: 4, Name: "Mover Gainers", Action: "", Existing: 0 },
    { SL: 5, Name: "Execution", Action: "", Existing: 1 },
    { SL: 6, Name: "Order Summery", Action: "", Existing: 0 },
    { SL: 7, Name: "Position", Action: "", Existing: 1 },
    { SL: 8, Name: "News", Action: "", Existing: 0 },
    { SL: 9, Name: "Reports", Action: "", Existing: 0 },
    { SL: 10, Name: "Purchase Power", Action: "", Existing: 0 },
  ];

  // Define the column definitions
  const columnDefs: ColDef[] = [
    { headerName: "#SL", field: "SL", sortable: true, filter: true },
    { headerName: "Name", field: "Name", sortable: true, filter: true },
    {
      headerName: "Action",
      field: "Action",
      cellRenderer: (params: any) => (
        <Button
          variant="contained"
          size="small"
          sx={{ mb: 0.5 }}
          onClick={() => alert(`Action triggered for ${params.data.Name}`)}
        >
          Action
        </Button>
      ),
    },
    { headerName: "Existing", field: "Existing", sortable: true, filter: true },
  ];

    // Adjust the height based on full-screen mode
  const gridHeight = isFullScreen ? '85vh' : '400px';

  return (
    <div className="ag-theme-alpine" style={{ height: gridHeight, width: "100%" }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        // pagination={false}
        // paginationPageSize={0}
      />
    </div>
  );
};

export default TableListSetting;
