import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Layout } from 'react-grid-layout';

interface LayoutState {
  customLayout: Layout[];
  isEditingEnabled: boolean;
}

const initialState: LayoutState = {
  customLayout: [],
  isEditingEnabled: false,
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setLayout(state, action: PayloadAction<Layout[]>) {
      state.customLayout = action.payload;
    },
    toggleEditing(state) {
      state.isEditingEnabled = !state.isEditingEnabled;
      state.customLayout = state.customLayout.map(item => ({
        ...item,
        isResizable: state.isEditingEnabled,
        isDraggable: state.isEditingEnabled,
      }));
    },
    resetLayout(state) {
      state.customLayout = [];
    }
  },
});

export const { setLayout, toggleEditing, resetLayout } = layoutSlice.actions;
export default layoutSlice.reducer;
