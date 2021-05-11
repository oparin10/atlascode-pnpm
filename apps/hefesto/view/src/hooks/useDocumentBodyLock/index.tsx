import React from "react";
import { documentBodyScrollToggle } from "../../helper/documentBodyScrollToggle";

export const useDocumentBodyLock = (condition: boolean) => {
  React.useEffect(() => {
    documentBodyScrollToggle(condition);
  }, [condition]);
};
