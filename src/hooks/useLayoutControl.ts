import { useEffect, useState } from 'react';
import { Layout } from 'react-grid-layout';

const useLayoutControl = () => {
  const [customLayout, setCustomLayout] = useState<Layout[]>([]);
  const [isEditingEnabled, setIsEditingEnabled] = useState(false);
  const savedLayout = localStorage.getItem('layout');

  const initialLayout: Layout[] = savedLayout
    ? JSON.parse(savedLayout)
    : [
        { i: 'a', x: 0, y: 0, w: 4, h: 4,  }, //minH: 4,
        { i: 'b', x: 2, y: 0, w: 2, h: 2 },
        { i: 'c', x: 4, y: 0, w: 2, h: 2 },
        { i: 'd', x: 0, y: 0, w: 2, h: 2 },
      
      ];

  const handleLayoutChange = (newLayout: Layout[]) => {
    setCustomLayout(newLayout);
  };

  const saveLayoutToLocalStorage = () => {
    const updatedLayout = customLayout.map((item) => ({
      ...item,
      isResizable: false,
      isDraggable: false,
    }));

    localStorage.setItem('layout', JSON.stringify(updatedLayout));
    setCustomLayout(updatedLayout);
    setIsEditingEnabled(false);

    console.log('Layout saved to localStorage with resizable/draggable disabled');
  };

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

  const toggleEditing = () => {
    setIsEditingEnabled((prevState) => {
      const newEditingState = !prevState;

      const updatedLayout = customLayout.map((item) => ({
        ...item,
        isResizable: newEditingState,
        isDraggable: newEditingState,
      }));

      setCustomLayout(updatedLayout);
      localStorage.setItem('layout', JSON.stringify(updatedLayout));

      return newEditingState;
    });
  };

  return {
    isEditingEnabled,
    initialLayout,
    handleLayoutChange,
    saveLayoutToLocalStorage,
    resetLayout,
    toggleEditing,
  };
};

export default useLayoutControl;