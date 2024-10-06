import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import TableListSetting from "../ag/TableListSetting";

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

// Update to accept fullScreen prop
export default function SettingTab({ fullScreen }: { fullScreen: boolean }) {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  return (
    <div>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          aria-label="settings tabs"
        >
          <Tab label="General" {...a11yProps(0)} />
          <Tab label="Appearance" {...a11yProps(1)} />
          <Tab label="Advanced" {...a11yProps(2)} />
        </Tabs>
      </Box>

      {/* Tab Content */}
      <TabPanel value={tabIndex} index={0}>
        <TableListSetting isFullScreen={fullScreen} />
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <p>Appearance Settings content goes here...</p>
      </TabPanel>
      <TabPanel value={tabIndex} index={2}>
        <p>Advanced Settings content goes here...</p>
      </TabPanel>
    </div>
  );
}
