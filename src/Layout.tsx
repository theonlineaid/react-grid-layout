import { lazy, Suspense } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
const ResponsiveGridLayout = WidthProvider(Responsive);
import Data from "./component/Data";
import Header from "./component/Header";
import useLayoutControl from "./hooks/useLayoutControl";
import { Container } from "@mui/material";
import RD from "./component/MarketDapth/RD";
const AgGridMarketData =  lazy(() => import('./ag/AgGridMarketData'))


function LayoutComponent() {
  const {
    isEditingEnabled,
    initialLayout,
    handleLayoutChange,
    saveLayoutToLocalStorage,
    resetLayout,
    toggleEditing,
  } = useLayoutControl();

  const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };
  const cols = { lg: 6, md: 4, sm: 2, xs: 1, xxs: 1 };

  return (
    <>
      <Container maxWidth={false}>
        <Header
          saveLayout={saveLayoutToLocalStorage}
          resetLayout={resetLayout}
          toggleEditing={toggleEditing}
          isEditingEnabled={isEditingEnabled}
        />
        <ResponsiveGridLayout
          className="layout"
          layouts={{ lg: initialLayout }}
          breakpoints={breakpoints}
          cols={cols}
          rowHeight={100}   // to controll the layout height
          onLayoutChange={handleLayoutChange}
          isResizable={isEditingEnabled}
          isDraggable={isEditingEnabled}
        >
          <div
            key="a"
            className="bg-pink-200 p-1 custom-scrollbar only-y-scrollbar-enable"
          >
            <Suspense fallback={<>Loading ....</>}>
              <AgGridMarketData />
            </Suspense>
          </div>
          <div key="b" className="bg-green-500">
            <RD />
          </div>
          <div
            key="c"
            className="bg-yellow-500 p-6 custom-scrollbar only-y-scrollbar-enable"
          >
            <Data />
          </div>
          <div
            key="d"
            className="bg-pink-500 only-y-scrollbar-enable custom-scrollbar p-4"
          >
            <Data />
          </div>
        </ResponsiveGridLayout>
      </Container>
    </>
  );
}
export default LayoutComponent;