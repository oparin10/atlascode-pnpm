import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";

import { Build, Close, Palette, Panorama } from "@material-ui/icons";
import { galleryOpen } from "../../../redux/adonis/actions";
import { RootState } from "../../../redux";
import { connect, ConnectedProps } from "react-redux";
import { colorPickerOpen } from "../../../redux/colorPicker/actions";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: 380,
      transform: "translateZ(0px)",
      flexGrow: 1,
      position: "fixed",
      bottom: 0,
      right: 0,
      zIndex: 9999,
    },
    speedDial: {
      position: "absolute",
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
  })
);

interface Props extends ToolboxReduxProps {}

const Toolbox = ({ galleryState, openGallery, openColorPicker }: Props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const toggleVisibility = () => {
    setOpen((prevState) => !prevState);
  };

  const actions = [
    { icon: <Panorama />, name: "Galeria", action: openGallery },
    { icon: <Palette />, name: "Cores", action: openColorPicker },
  ];

  return (
    <div className={classes.root}>
      <SpeedDial
        ariaLabel="SpeedDial openIcon example"
        className={classes.speedDial}
        hidden={false}
        icon={<SpeedDialIcon icon={<Build />} openIcon={<Close />} />}
        // onClose={handleClose}
        // onOpen={handleOpen}
        onClick={toggleVisibility}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.action}
            tooltipOpen
          />
        ))}
      </SpeedDial>
    </div>
  );
};

const mapDispatchToProps = {
  openGallery: galleryOpen,
  openColorPicker: colorPickerOpen,
};

const mapStateToProps = (rootState: RootState) => ({
  galleryState: rootState.adonis,
});

const toolboxConnector = connect(mapStateToProps, mapDispatchToProps);

export type ToolboxReduxProps = ConnectedProps<typeof toolboxConnector>;

export default toolboxConnector(Toolbox);
