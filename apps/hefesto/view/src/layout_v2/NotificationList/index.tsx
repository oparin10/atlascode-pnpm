import { Menu, MenuItem } from "@material-ui/core";
import React from "react";

interface Props {
  anchorRef: HTMLElement | null;
  handleClose: (...args: any[]) => void;
}

const NotificationList = ({ anchorRef, handleClose }: Props) => {
  return (
    <Menu
      className={"notificationMenu"}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      open={Boolean(anchorRef)}
      onClose={handleClose}
      keepMounted
      anchorEl={anchorRef}
    >
      <MenuItem>Nenhuma notificação encontrada.</MenuItem>
    </Menu>
  );
};

export default NotificationList;
