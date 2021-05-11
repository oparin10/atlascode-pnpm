import { Box, Button, Zoom } from "@material-ui/core";
import React from "react";
import { connect, ConnectedProps } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../../redux";
import { colorPickerHide } from "../../../redux/colorPicker/actions";
import IconComponent from "../../Util/IconComponent";
import { HexColorPicker } from "react-colorful";
import { globalNotificationCustom } from "../../../redux/globalUI/actions";
import invert, { HexColor } from "invert-color";

const ColorPickBackdrop = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

const ColorPickerRootContainer = styled.div`
  svg {
    display: none;
  }

  .MuiSvgIcon-root {
    display: block;
  }

  .flexbox-fix:last-of-type {
    div:nth-child(2) {
      display: none;
    }
  }
`;

const ColorPickerModalContainer = styled.div`
  outline: none;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 5000;
`;

const ColorPickerModalContainerInner = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 1px 2px 15px rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-left: 18px;
  padding-right: 18px;
  padding-bottom: 40px;
  position: relative;

  .colorPickerClose {
    box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    background-color: #fff;
    padding: 7px;
    position: absolute;
    right: 0;
    top: 0;
    transform: translate(10px, -6px);
  }

  .colorPickerHeader {
    font-size: 16px;
    padding-top: 25px;
    padding-bottom: 25px;
    width: 80%;
    text-align: center;

    .colorPickerHeaderTitle {
      font-weight: 700;
    }

    .colorPickerExplain {
      font-size: 12px;
    }

    @media (min-width: 1024px) {
      font-size: 20px;

      .colorPickerExplain {
        font-size: 14px;
      }
    }
  }

  @media (min-width: 1024px) {
    height: auto;
    width: auto;
    padding-left: 55px;
    padding-right: 55px;
  }
`;

const ColorPickerFooterContainer = styled.div`
  text-align: start;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 25px;
  width: 80%;
  font-size: 20px;
  font-weight: 700;

  > button {
    flex-grow: 1;
  }

  @media (min-width: 1024px) {
    font-size: 24px;
  }
`;

interface Props extends ColorPickerReduxProps {}

const ColorPicker = ({
  handleClose,
  isOpen,
  globalNotificationCustom,
}: Props) => {
  const [colorState, setColorState] = React.useState<string>("#F15D3C");
  const [invertedColorState, setInvertedColorState] = React.useState<string>(
    invert("#F15D3C")
  );

  const colorPickerRootRef = React.useRef<HTMLDivElement>(null);

  const eventOnParent = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target == colorPickerRootRef.current) {
      handleClose();
    } else {
      return;
    }
  };

  const copyHexValueHandler = () => {
    navigator.clipboard
      .writeText(colorState)
      .then(() => {
        globalNotificationCustom(
          "Código da cor copiado com sucesso",
          "success"
        );
      })
      .catch((error) => {
        globalNotificationCustom(
          "Erro ao tentar copiar código de cor",
          "error"
        );
      });
  };

  return (
    <Zoom
      style={{ outline: "none" }}
      in={isOpen}
      timeout={{ enter: 350, exit: 250 }}
      unmountOnExit
    >
      <ColorPickBackdrop
        ref={colorPickerRootRef}
        onClick={(e: any) => eventOnParent(e)}
        style={{ zIndex: 3000 }}
      >
        <div>
          <ColorPickerModalContainer>
            <ColorPickerRootContainer>
              <ColorPickerModalContainerInner>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={handleClose}
                  className="colorPickerClose"
                >
                  <IconComponent
                    width="12px"
                    height="12px"
                    clickable
                    iconType="Close"
                  />
                </div>
                <div className="colorPickerHeader">
                  <div className="colorPickerHeaderTitle">Seletor de cores</div>

                  <div className="colorPickerExplain">
                    Selecione a cor e clique no valor hexadecimal para copiá-lo
                  </div>
                </div>
                <HexColorPicker
                  color={colorState}
                  onChange={(newColor: string) => setColorState(newColor)}
                ></HexColorPicker>

                <ColorPickerFooterContainer>
                  <div className="helperLabel">Cor atual:</div>

                  <Box flexGrow={1} display="flex" justifyContent="flex-end">
                    <Button
                      onClick={copyHexValueHandler}
                      variant="outlined"
                      style={{
                        color: colorState,
                        fontWeight: 800,
                        textRendering: "optimizeLegibility",
                        width: "100%",
                        marginLeft: "15px",
                        border: `1px solid ${colorState}`,
                        // backgroundColor: `${invert(colorState, true)}`,
                      }}
                    >
                      {colorState}
                    </Button>
                  </Box>
                </ColorPickerFooterContainer>
              </ColorPickerModalContainerInner>
            </ColorPickerRootContainer>
          </ColorPickerModalContainer>
        </div>
      </ColorPickBackdrop>
    </Zoom>
  );
};

const mapStateToProps = (rootState: RootState) => ({
  isOpen: rootState.colorPicker.isOpen,
});

const mapDispatchToProps = {
  handleClose: colorPickerHide,
  globalNotificationCustom: globalNotificationCustom,
};

const colorPickerConnector = connect(mapStateToProps, mapDispatchToProps);

export type ColorPickerReduxProps = ConnectedProps<typeof colorPickerConnector>;

export default colorPickerConnector(ColorPicker);
