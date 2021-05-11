import {
  SwipeableDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { Person } from "@material-ui/icons";
import styled from "styled-components";
import React from "react";
import IconComponent from "../../components/Util/IconComponent";
import { DataCreationItem } from "@hefesto/types";
import getCurrentPath from "../../helper/currentPath";
import { Link } from "@reach/router";
import { basePath, dashboardPath } from "../../config/routes.config";

interface Props {
  open: boolean;
  toggleDrawer: (open: boolean) => void;
  logo: string;
  sidebarItems: DataCreationItem[];
}

const LayoutDrawerImageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 75%;
    padding: 10px;
    height: 75%;
    max-width: 100px;
    max-height: 100px;
  }
`;

const LayoutDrawer = ({ open, toggleDrawer, logo, sidebarItems }: Props) => {
  const path = getCurrentPath();

  return (
    <div>
      <SwipeableDrawer
        onClose={() => toggleDrawer(false)}
        onOpen={() => toggleDrawer(true)}
        open={open}
        anchor="left"
      >
        <List style={{ color: "#5d6d7c", padding: "0px 25px" }}>
          <ListItem divider>
            <LayoutDrawerImageContainer>
              <img src={logo} alt="Logo" />
            </LayoutDrawerImageContainer>
          </ListItem>

          {sidebarItems.map((item, index: number) => {
            return (
              <ListItem
                onClick={() => toggleDrawer(false)}
                component={Link}
                to={`/${basePath}/${dashboardPath}/${item.routerPath}`}
                key={index}
                style={{ padding: "10px", paddingLeft: "20px" }}
                alignItems="center"
              >
                <ListItemIcon>
                  <IconComponent iconType={item.sidebarIcon} clickable />
                </ListItemIcon>
                <ListItemText
                  style={{
                    color: path == item.routerPath ? "#F15D3C" : "initial",
                  }}
                >
                  {item.sidebarLabel}
                </ListItemText>
              </ListItem>
            );
          })}
        </List>
      </SwipeableDrawer>
    </div>
  );
};

export default LayoutDrawer;
