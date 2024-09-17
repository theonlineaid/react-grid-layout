import { useEffect, useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { Layout } from './types/type';
import SampleData from './component/SampleData';
import Data from './component/Data';

const ResponsiveGridLayout = WidthProvider(Responsive);

function LayoutComponent() {
  const [customLayout, setCustomLayout] = useState<Layout[]>([]);
  const [isEditingEnabled, setIsEditingEnabled] = useState(false);

  // Retrieve layout from localStorage when component mounts
  const savedLayout = localStorage.getItem('layout');

  // Initialize initialLayout based on savedLayout
  const initialLayout: Layout[] = savedLayout
    ? JSON.parse(savedLayout)
    : [
      {
        i: 'a',
        x: 0,
        y: 0,
        w: 4,
        h: 4,
        resizeHandles: ['s', 'w', 'e', 'n', 'se', 'sw', 'ne', 'nw'],
        isResizable: isEditingEnabled ? true : false,
        isDraggable: isEditingEnabled ? true : false,
      },
      {
        i: 'b',
        x: 2,
        y: 0,
        w: 2,
        h: 4,
        resizeHandles: ['s', 'w', 'e', 'n', 'se', 'sw', 'ne', 'nw'],
        isResizable: isEditingEnabled ? true : false,
        isDraggable: isEditingEnabled ? true : false,
      },
      {
        i: 'c',
        x: 4,
        y: 0,
        w: 2,
        h: 2,
        resizeHandles: ['s', 'w', 'e', 'n', 'se', 'sw', 'ne', 'nw'],
        isResizable: isEditingEnabled ? true : false,
        isDraggable: isEditingEnabled ? true : false,
      },
      {
        i: 'd',
        x: 0,
        y: 0,
        w: 2,
        h: 2,
        resizeHandles: ['s', 'w', 'e', 'n', 'se', 'sw', 'ne', 'nw'],
        isResizable: isEditingEnabled ? true : false,
        isDraggable: isEditingEnabled ? true : false,
      },
    ];

  const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };
  const cols = { lg: 6, md: 4, sm: 2, xs: 1, xxs: 1 };

  // Define layout change handler
  const handleLayoutChange = (newLayout: Layout[]) => {
    setCustomLayout(newLayout);
  };

  // Function to save layout to localStorage and disable editing
  const saveLayoutToLocalStorage = () => {
    const updatedLayout = customLayout.map((item) => ({
      ...item,
      isResizable: false, // Disable resizing
      isDraggable: false, // Disable dragging
    }));

    // Save the updated layout to localStorage
    localStorage.setItem('layout', JSON.stringify(updatedLayout));

    // Update the state with the non-editable layout
    setCustomLayout(updatedLayout);

    // Disable editing mode
    setIsEditingEnabled(false);

    console.log('Layout saved to localStorage with resizable/draggable disabled');
  };

  // Reset layout from localStorage
  const resetLayout = () => {
    localStorage.removeItem('layout');
    console.log('Layout removed from localStorage');
    setCustomLayout([]);
  };

  useEffect(() => {
    if (savedLayout) {
      setCustomLayout(JSON.parse(savedLayout));
    }
  }, [savedLayout]);

  // Toggle editing functionality
  const toggleEditing = () => {
    setIsEditingEnabled((prevState) => {
      const newEditingState = !prevState;
      
      // Update layout to reflect new editing state
      const updatedLayout = customLayout.map((item) => ({
        ...item,
        isResizable: newEditingState, // Enable/Disable resizing based on the new state
        isDraggable: newEditingState, // Enable/Disable dragging based on the new state
      }));
  
      setCustomLayout(updatedLayout);
  
      // Save the updated layout to localStorage if necessary
      localStorage.setItem('layout', JSON.stringify(updatedLayout));
  
      return newEditingState;
    });
  };
  

  return (
    <>
      <div className="container mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4">Responsive React Grid Layout with Tailwind CSS</h1>
        <div className="flex justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={saveLayoutToLocalStorage}>
            Save Layout
          </button>
          <div className="flex gap-2">
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={resetLayout}>
              Reset
            </button>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={toggleEditing}>
              {isEditingEnabled ? 'Disable Editing' : 'Enable Editing'}
            </button>
          </div>
        </div>
        <ResponsiveGridLayout
          className="layout"
          layouts={{ lg: initialLayout }}
          breakpoints={breakpoints}
          cols={cols}
          rowHeight={100}
          onLayoutChange={handleLayoutChange}
          isResizable={isEditingEnabled}
          isDraggable={isEditingEnabled}
        >
          <div key="a" className="bg-blue-500 p-1 custom-scrollbar only-y-scrollbar-enable">
            <SampleData />
          </div>
          <div key="b" className="bg-green-500">B</div>
          <div key="c" className="bg-yellow-500 p-6 custom-scrollbar only-y-scrollbar-enable">
            <Data />
          </div>
          <div key="d" className="bg-pink-500 only-y-scrollbar-enable custom-scrollbar p-4">
            <Data />
          </div>
        </ResponsiveGridLayout>
      </div>
    </>
  );
}

export default LayoutComponent
