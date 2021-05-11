import React from "react";
import styled from "styled-components";
import { motion, Variants } from "framer-motion";
import { InputAdornment, SvgIcon, TextField, Tooltip } from "@material-ui/core";
import { Camera, Info, PhotoCamera } from "@material-ui/icons";
import validURL from "../../../../../helper/isURL";

const ImageFieldComponentRoot = styled.div`
  display: flex;
  width: fit-content;
  flex-direction: column;

  @media (min-width: 1024px) {
    flex-direction: row;
  }
`;

const ImageFieldComponentBox = styled.div<{ validImage: boolean }>`
  width: 200.58px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  z-index: 100;
  position: relative;

  background-color: ${(props) =>
    props.validImage ? "rgb(242, 242, 242)" : "#333"};
  background-size: 16px 16px;
  background-position: 0px 0px, 8px 8px;
  box-shadow: rgba(68, 74, 87, 0.3) 0px 0px 4px inset;
  background-image: ${(props) =>
    props.validImage
      ? "linear-gradient(45deg,rgb(230, 230, 230) 25%,transparent 25%,transparent 75%,rgb(230, 230, 230) 75%,rgb(230, 230, 230)),linear-gradient(45deg,rgb(230, 230, 230) 25%,transparent 25%,transparent 75%,rgb(230, 230, 230) 75%,rgb(230, 230, 230))"
      : "none"};

  @media (min-width: 1024px) {
    height: 175.92px;
  }
`;

const ImageFieldComponentBoxIcon = styled(motion.div)`
  .MuiSvgIcon-root {
    fill: #fff;
    font-size: 1.85rem;
    cursor: pointer;
  }
  position: absolute;

  z-index: 10;
`;

const ImageFieldComponentBoxImage = styled.img<{ validImage: boolean }>`
  object-fit: contain;
  width: 100%;
  height: 100%;
  opacity: ${(props) => (props.validImage ? "1" : "0")};
`;

const ImageFieldComponentFieldContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  z-index: 1;
`;

const ImageFieldComponentFieldURL = styled(motion.div)`
  /* flex-grow: 1; */
  padding-top: 5px;
`;

const ImageFieldComponentFieldDescription = styled(motion.div)`
  padding-bottom: 5px;
`;

const ImageFieldOuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  .imageFieldLabel {
    font-size: 1rem;
    color: #949494;
    margin-bottom: 15px;
  }
`;

const imageFieldContainer: Variants = {
  initial: {
    x: window.innerWidth > 1024 ? "-100%" : 0,
    y: window.innerWidth < 1024 ? "-90%" : 0,
    opacity: 0,
  },

  open: {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      stiffness: 200,
      damping: 100,
    },
  },
};

const photoCameraVariants: Variants = {
  initial: {
    scale: 1,
    transition: { duration: 0.3 },
  },
  hover: { scale: 1.3 },
  pressed: { scale: 0.9 },
};

interface Props {
  value: any;
  name: string;
  changeFn: (...args: any[]) => void;
  blurFn: (...args: any[]) => void;
  label: string;
  error?: boolean;
  helperText: any;
}

const ImageFieldComponentBase = ({
  changeFn,
  value,
  label,
  name,
  blurFn,
  helperText,
  error,
}: Props) => {
  const [visible, setVisible] = React.useState<boolean>(false);

  const handleVisible = () => {
    setVisible((prevState) => !prevState);
  };

  return (
    <ImageFieldOuterContainer>
      <div className="imageFieldLabel">{label}</div>
      <ImageFieldComponentRoot>
        <ImageFieldComponentBox validImage={validURL(value?.["imageURL"])}>
          <ImageFieldComponentBoxIcon
            onClick={handleVisible}
            variants={photoCameraVariants}
            initial={"initial"}
            whileHover="hover"
            whileTap="pressed"
          >
            <SvgIcon component={PhotoCamera} />
          </ImageFieldComponentBoxIcon>

          <ImageFieldComponentBoxImage
            validImage={validURL(value?.["imageURL"])}
            src={validURL(value?.["imageURL"]) ? value?.["imageURL"] : ""}
          />
        </ImageFieldComponentBox>
        <ImageFieldComponentFieldContainer
          variants={imageFieldContainer}
          initial="initial"
          animate={visible ? "open" : "initial"}
        >
          <ImageFieldComponentFieldURL>
            <TextField
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip title="Utilize a galeria disponibilizada neste app para fazer upload de imagens para a nuvem e então selecione seu link para preencher este campo">
                      <SvgIcon
                        style={{
                          cursor: "pointer",
                          fill: "#575757",
                          fontSize: "1.25em",
                        }}
                        component={Info}
                      />
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              name={`${name?.toString()}.imageURL`}
              value={value?.["imageURL"] ?? ""}
              onChange={changeFn}
              onBlur={blurFn}
              label={"Link da imagem"}
              error={error}
              helperText={helperText?.["imageURL"]}
            />
          </ImageFieldComponentFieldURL>
          <ImageFieldComponentFieldDescription>
            <TextField
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Tooltip title="Descreva sua imagem para melhor a acessibilidade de seus usuários/clientes e aumentar seu SEO">
                      <SvgIcon
                        style={{
                          cursor: "pointer",
                          fill: "#575757",
                          fontSize: "1.25em",
                        }}
                        component={Info}
                      />
                    </Tooltip>
                  </InputAdornment>
                ),
              }}
              onBlur={blurFn}
              helperText={helperText?.["imageDescription"]}
              error={error}
              onChange={changeFn}
              name={`${name?.toString()}.imageDescription`}
              value={value?.["imageDescription"] ?? ""}
              variant="outlined"
              label={"Descrição da imagem"}
            />
          </ImageFieldComponentFieldDescription>
        </ImageFieldComponentFieldContainer>
      </ImageFieldComponentRoot>
    </ImageFieldOuterContainer>
  );
};

export default ImageFieldComponentBase;
