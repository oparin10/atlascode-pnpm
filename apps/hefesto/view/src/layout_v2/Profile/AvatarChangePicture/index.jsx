import React from "react";
import styled from "styled-components";
import { Box, IconButton, SvgIcon } from "@material-ui/core";
import { AccountCircle, AddAPhotoSharp } from "@material-ui/icons";

const RoundPaperIcon = styled.div`
  background: #fff;
  /* bottom: 0; */
  position: absolute;
  /* right: 0; */
  overflow: visible;
  height: 32px;
  width: 32px;
  text-align: center;
  border-radius: 50%;
  transform: translate(-50px, 25px);
`;

const InnerRoundPaper = styled.div`
  bottom: 0;
  box-shadow: 0 1px 1px 0 rgba(65, 69, 73, 0.3),
    0 1px 3px 1px rgba(65, 69, 73, 0.15);
  margin: 0 2.5px 3px;
  outline: 0;
  position: absolute;
  right: 0;
  height: 26px;
  width: 26px;
  border-radius: 50%;
`;

function AvatarChangePicture(props) {
  return (
    <Box position="relative" display="flex" justifyContent="center">
      <SvgIcon style={{ fontSize: "10em", color: "gray" }}>
        <AccountCircle></AccountCircle>
      </SvgIcon>
      <RoundPaperIcon>
        <InnerRoundPaper>
          <IconButton style={{ padding: 0 }}>
            <SvgIcon style={{ fontSize: "14px", color: "#858585" }}>
              <AddAPhotoSharp />
            </SvgIcon>
          </IconButton>
        </InnerRoundPaper>
      </RoundPaperIcon>
    </Box>
  );
}

export default AvatarChangePicture;
