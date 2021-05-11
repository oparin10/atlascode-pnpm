import { Grow, SvgIcon, Tooltip } from "@material-ui/core";
import React from "react";
import { IconDictonary } from "../../../dictionaries";
import styled from "styled-components";
import { setTimeout } from "timers";
import { IconTypes } from "@hefesto/types";

const IconHelperRoot = styled.div`
  width: 220px;
  text-align: center;
  border-radius: 10px;
  background-color: #fff;
  color: #333;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.2),
    0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  padding: 10px;
  position: fixed;
  z-index: 700;
`;

interface Props {
  iconType: IconTypes;
  height?: string;
  width?: string;
  clickable?: boolean;
  disabled?: boolean;
  helper?: string;
  disabledHelper?: string;
}

const IconComponent = ({
  iconType,
  width,
  height,
  clickable,
  disabled,
  helper,
  disabledHelper,
  ...rest
}: Props) => {
  const IconComponentDynamic = IconDictonary[iconType as IconTypes];

  let helperMessage: string;

  if (disabledHelper && disabled) {
    helperMessage = disabledHelper;
  } else if (helper && !disabled) {
    helperMessage = helper;
  } else {
    helperMessage = "";
  }

  return (
    <div style={{ position: "relative", display: "flex" }}>
      <Tooltip arrow title={helperMessage}>
        <SvgIcon
          style={{
            width: `${width ? width : "1em"}`,
            height: `${height ? height : "1em"}`,
            cursor: `${clickable && !disabled ? "pointer" : "not-allowed"}`,
            color: `${disabled ? "#bdbdbd" : "inherit"}`,
            transition: "all 0.5s ease",
          }}
          {...rest}
          component={IconComponentDynamic}
        ></SvgIcon>
      </Tooltip>
    </div>
  );
};

export default IconComponent;
