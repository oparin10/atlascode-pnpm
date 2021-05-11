import { Box } from "@material-ui/core";
import React from "react";

interface SimpleTabsProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

function SimpleTabs({ index, value, children, dir }: SimpleTabsProps) {
  return (
    <div>
      {value === index && (
        <Box height={"100%"} p={4} minWidth={{ xs: "750px", sm: "500px" }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default SimpleTabs;
