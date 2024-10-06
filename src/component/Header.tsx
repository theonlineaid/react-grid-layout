import React, { useState } from "react";
import MarqueeControl from "./MarqueeControl";
import { Switch, IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import CustomDialog from "./CustomDialog";
import SettingTab from "./SettingTab";

type Props = {
  saveLayout: () => void;
  resetLayout: () => void;
  toggleEditing: () => void;
  isEditingEnabled: boolean;
};

const Header: React.FC<Props> = ({
  saveLayout,
  resetLayout,
  toggleEditing,
  isEditingEnabled,
}) => {
  const [openSettingsDialog, setOpenSettingsDialog] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleOpenDialog = () => setOpenSettingsDialog(true);
  const handleCloseDialog = () => setOpenSettingsDialog(false);

  const handleFullScreenChange = (isFullScreen: boolean) => {
    setIsFullScreen(isFullScreen);
  };

  return (
    <>
      <MarqueeControl />
      <div className="flex justify-between mb-4">
        <IconButton onClick={handleOpenDialog}>
          <SettingsIcon />
        </IconButton>

        <div className="flex gap-2">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={saveLayout}
          >
            Save
          </button>

          <div className="flex items-center">
            <Switch
              checked={isEditingEnabled}
              onChange={toggleEditing}
              color="primary"
            />
          </div>

          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={resetLayout}
          >
            Reset
          </button>
        </div>
      </div>

      {/* Custom Dialog */}
      <CustomDialog
        title="Settings"
        open={openSettingsDialog}
        onClose={handleCloseDialog}
        isDraggable
        isFullScreenButtonVisible
        fullScreen={isFullScreen}
        onFullScreenChange={handleFullScreenChange}
      >
        <SettingTab fullScreen={isFullScreen} />
      </CustomDialog>
    </>
  );
};

export default Header;
