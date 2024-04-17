import { useEffect, useState } from 'react';
import GridLayout from 'react-grid-layout';
import Data from './component/Data';
import { Layout } from './types/type';

function App() {
  const [customLayout, setCustomLayout] = useState<Layout[]>([]);
  const [isEditingEnabled, setIsEditingEnabled] = useState(false);

  // Retrieve layout from localStorage when component mounts
  const savedLayout = localStorage.getItem('layout');

  // Initialize initialLayout based on savedLayout
  const initialLayout: Layout[] = savedLayout ? JSON.parse(savedLayout) : [
    {
      i: 'a', x: 0, y: 0, w: 2, h: 2,
      resizeHandles: ['s', 'w', 'e', 'n', 'se', 'sw', 'ne', 'nw'],
      isResizable: isEditingEnabled ? true : false,
      isDraggable: isEditingEnabled ? true : false,
    },
    {
      i: 'b', x: 2, y: 0, w: 2, h: 4,
      resizeHandles: ['s', 'w', 'e', 'n', 'se', 'sw', 'ne', 'nw'],
      isResizable: isEditingEnabled ? true : false,
      isDraggable: isEditingEnabled ? true : false,
    },
    {
      i: 'c', x: 4, y: 0, w: 2, h: 2,
      resizeHandles: ['s', 'w', 'e', 'n', 'se', 'sw', 'ne', 'nw'],
      isResizable: isEditingEnabled ? true : false,
      isDraggable: isEditingEnabled ? true : false,
    },
    {
      i: 'd', x: 0, y: 0, w: 2, h: 2,
      resizeHandles: ['s', 'w', 'e', 'n', 'se', 'sw', 'ne', 'nw'],
      isResizable: isEditingEnabled ? true : false,
      isDraggable: isEditingEnabled ? true : false,
    },
  ];

  // Define layout change handler
  const handleLayoutChange = (newLayout: Layout[]) => {
    // localStorage.setItem('layout', JSON.stringify(newLayout));
    setCustomLayout(newLayout);
  };

  // Function to save layout to localStorage
  const saveLayoutToLocalStorage = () => {
    localStorage.setItem('layout', JSON.stringify(customLayout));
    setIsEditingEnabled(prevState => !prevState);
    console.log('Layout saved to localStorage');
  };

  // Function to save layout to localStorage
  const resetLayout = () => {
    localStorage.removeItem('layout');
    console.log('Layout remove from localStorage');
    setCustomLayout([]);
  };

  useEffect(() => {
    if (savedLayout) {
      setCustomLayout(JSON.parse(savedLayout));
    }
  }, [savedLayout]);

  // Function to toggle editing functionality
  const toggleEditing = () => {
    setIsEditingEnabled(prevState => !prevState);
    if (savedLayout) {
      setCustomLayout(JSON.parse(savedLayout));
    }
  };

  return (
    <>
      <div className="container mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4">Basic React Grid Layout with Tailwind CSS</h1>
        <div className="flex justify-between">
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' onClick={saveLayoutToLocalStorage}>Save Layout</button>
          <div className='flex gap-2'>
            <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' onClick={resetLayout}>Reset</button>
            <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded' onClick={toggleEditing}>{isEditingEnabled ? 'Disable Editing' : 'Enable Editing'}</button>
          </div>
        </div>
        <GridLayout
          className="layout"
          layout={initialLayout}
          cols={6}
          rowHeight={100}
          width={1540} // one problem with with width
          onLayoutChange={handleLayoutChange}
          isResizable={isEditingEnabled}
          isDraggable={isEditingEnabled}
        // resizeHandles={['se', 'sw', 'ne', 'nw']} // only four side 
        // resizeHandles={['s', 'w', 'e', 'n', 'se', 'sw', 'ne', 'nw']} // all site
        >
          <div key="d" className="bg-pink-500 only-y-scrollbar-enable custom-scrollbar p-4">
            <Data />
          </div>
          <div key="a" className="bg-blue-500 p-6 custom-scrollbar only-y-scrollbar-enable">
            <Data />
          </div>
          <div key="b" className="bg-green-500">B</div>
          <div key="c" className="bg-yellow-500 p-6 custom-scrollbar only-y-scrollbar-enable">
            <Data />
          </div>

        </GridLayout>
      </div>
    </>
  )
}

export default App

