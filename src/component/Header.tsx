import React, { useState } from "react";
import MarqueeControl from "./MarqueeControl";
import { Switch, IconButton, Tabs, Tab, Box } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import CustomDialog from "./CustomDialog"; // Assuming CustomDialog is imported

type Props = {
  saveLayout: () => void;
  resetLayout: () => void;
  toggleEditing: () => void;
  isEditingEnabled: boolean;
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Header: React.FC<Props> = ({
  saveLayout,
  resetLayout,
  toggleEditing,
  isEditingEnabled,
}) => {
  const [openSettingsDialog, setOpenSettingsDialog] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);

  const handleOpenDialog = () => setOpenSettingsDialog(true);
  const handleCloseDialog = () => setOpenSettingsDialog(false);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
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

      {/* Custom Dialog with Tabs */}
      <CustomDialog
        title="Settings"
        open={openSettingsDialog}
        onClose={handleCloseDialog}
        isDraggable
        isFullScreenButtonVisible
      >
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={tabIndex} onChange={handleTabChange} aria-label="settings tabs">
            <Tab label="General" {...a11yProps(0)} />
            <Tab label="Appearance" {...a11yProps(1)} />
            <Tab label="Advanced" {...a11yProps(2)} />
          </Tabs>
        </Box>

        {/* Tab Content */}
        <TabPanel value={tabIndex} index={0}>
          <p>General Settings content goes here...</p>
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <p>Appearance Settings content goes here...</p>
        </TabPanel>
        <TabPanel value={tabIndex} index={2}>
          <p>Advanced Settings content goes here...</p>
        </TabPanel>
      </CustomDialog>
    </>
  );
};

export default Header;
