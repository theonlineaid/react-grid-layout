import { useCallback, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { useMarket } from "../context/MarketContext";
import { columnDefs, defaultColDef, handleContextMenu } from "./chunk/external";
import { useBoardFilter } from "./chunk/useBoardFilter";
import CustomDialog from "../component/CustomDialog";

const AgGridMarketData = () => {
  // State for modal control
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRowData, setSelectedRowData] = useState<any>(null);

  const { marketData } = useMarket();
  const gridRef = useRef<AgGridReact>(null);

  const {
    filteredData,
    availableBoards,
    selectedBoard,
    setSelectedBoard,
  } = useBoardFilter(marketData);


  const onRowClicked = useCallback((event: any) => {
    console.log("Row Data: ", event.data);
  }, []);

  // Handle double-click on cell
  // const onCellDoubleClicked = ((event: any) => {
  //   setSelectedRowData(event.data); // Set row data for the modal
  //   setIsModalOpen(true); // Open the modal
  // });

  const onCellDoubleClicked = useCallback((event: any) => {
    setSelectedRowData(event.data); // Set row data for the modal
    setIsModalOpen(true); // Open the modal
  }, [])

  // Close modal handler
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRowData(null);
  };

  return (
    <>
      <div>
        <h3>Filter by Board:</h3>
        <select
          value={selectedBoard}
          onChange={(e) => setSelectedBoard(e.target.value)}
        >
          <option value="">All Boards</option>
          {availableBoards.map((board) => (
            <option key={board} value={board}>
              {board}
            </option>
          ))}
        </select>
      </div>
      <div
        className="ag-theme-balham"
        style={{ height: 400, width: "100%" }}
        onContextMenu={handleContextMenu} // Attach context menu prevention to the grid
      >
        <AgGridReact
          ref={gridRef}
          rowData={filteredData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          suppressMenuHide={false}
          animateRows={false}
          headerHeight={54}
          rowHeight={30}
          rowBuffer={100}
          suppressColumnVirtualisation={true}
          rowSelection="single"
          allowShowChangeAfterFilter={true}
          onRowClicked={onRowClicked}
          pagination={true}
          paginationPageSize={50}
          onCellDoubleClicked={onCellDoubleClicked}
        />
      </div>

      {/* Custom Dialog for displaying row data */}
      {isModalOpen && (
        <CustomDialog
          title="Row Details"
          open={isModalOpen}
          onClose={handleCloseModal}
          isFullScreenButtonVisible
          maxWidth="sm"
          isDraggable
        >
          <div>
            {/* Render row data here */}
            {selectedRowData && (
              <pre>{JSON.stringify(selectedRowData, null, 2)}</pre>
            )}
          </div>
        </CustomDialog>
      )}
    </>
  );
};

export default AgGridMarketData;
