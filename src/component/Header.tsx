import React from "react";
import MarqueeControl from "./MarqueeControl";
import { Switch } from "@mui/material";

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
  return (
    <>
      <MarqueeControl />
      <div className="flex justify-between mb-4">
        <div className="flex gap-2">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={saveLayout}
          >
            Save
          </button>

          <div className="flex items-center">
            {/* <span>
              {isEditingEnabled ? "Editing Enabled" : "Editing Disabled"}
            </span> */}
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
    </>
  );
};

export default Header;
