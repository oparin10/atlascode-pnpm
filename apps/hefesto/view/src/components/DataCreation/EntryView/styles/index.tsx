import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

interface EntryViewMainProps {}

export const EntryViewActionButtonRoot = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: flex-end;
  padding-right: 6px;

  .MuiSvgIcon-root {
    fill: #686a6d;
  }
`;

const EntryViewMain = ({}: EntryViewMainProps) => {
  return <div>Sorrow</div>;
};

export default EntryViewMain;
