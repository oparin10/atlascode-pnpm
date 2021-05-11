import React, { HtmlHTMLAttributes } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { AdonisImage } from "@hefesto/types";
import convertBase64 from "../../../../helper/converFileUploadToBase64";
import {
  deleteImage,
  galleryClose,
  setActivePhotoNull,
  uploadAndOptimizeImage,
} from "../../../../redux/adonis/actions";
import { globalNotificationCustom } from "../../../../redux/globalUI/actions";
import IconComponent from "../../../Util/IconComponent";

const AdonisGalleryBodyHeader = styled.div`
  width: 100%;
  height: 15%;
  box-shadow: 0px 3px 4px rgba(0, 0, 0, 0.25);
`;

const AdonisGalleryBodyHeaderInnerContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const AdonisGalleryHeaderUploadButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-weight: 600;

  font-family: ${(props) => props.theme.typography.fontFamily};
  cursor: pointer;

  width: 115px;
  height: 35px;
  text-transform: uppercase;
  border-radius: 10px;
  background-color: ${(props) => props.theme.palette.primary.main};
  color: ${(props) => props.theme.palette.primary.contrastText};

  @media (min-width: 1024px) {
    font-size: 12px;

    height: 50px;
    width: 150px;
  }
`;

const AdonisGalleryUploadButtonContainer = styled.div`
  flex-grow: 1;
  margin-left: 5%;
`;

const AdonisGalleryAltActionsContainer = styled.div`
  margin-right: 10%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-grow: 0.5;
  color: ${(props) => props.theme.palette.primary.main};

  @media (min-width: 1024px) {
    flex-grow: 0.15;
    margin-right: 3%;
  }
`;

const AdonisGalleryCloseButtonBase = styled.div`
  border-radius: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const AdonisUploadInputField = styled.input`
  display: none;
`;

interface Props {
  isPhotoSelected: boolean;
  selectedPhoto: AdonisImage;
}

const AdonisGalleryHeader = ({
  isPhotoSelected = false,
  selectedPhoto,
}: Props) => {
  const dispatch = useDispatch();

  const inputRef = React.useRef<HTMLInputElement>(null);

  const openFileUpload = () => {
    if (typeof inputRef == null || typeof inputRef == "undefined") {
      return;
    }

    inputRef!.current!.click();
  };

  const onFileUpload = async (event: any) => {
    event.stopPropagation();
    event.preventDefault();
    var file: File = event.target.files[0];

    // let base64URI: string;
    let fileName: string;

    fileName = file.name;

    let fileNameWithoutExtension: string = fileName
      .split(".")
      .slice(0, -1)
      .join(".");

    console.log(fileNameWithoutExtension);

    let base64URI: string | any = await convertBase64(file);

    dispatch(uploadAndOptimizeImage(fileNameWithoutExtension, base64URI));
  };

  const onFileCopy = () => {
    if (isPhotoSelected) {
      navigator.clipboard
        .writeText(selectedPhoto.gallery)
        .then((result) => {
          dispatch(
            globalNotificationCustom(
              "Link da imagem copiado com sucesso",
              "success"
            )
          );

          dispatch(setActivePhotoNull());
        })
        .catch((error) => {
          dispatch(
            globalNotificationCustom(
              "Ocorreu um erro ao tentar copiar o link da imagem",
              "error"
            )
          );
        });
    }
  };

  const onFileDelete = () => {
    if (isPhotoSelected) dispatch(deleteImage());
  };

  return (
    <AdonisGalleryBodyHeader>
      <AdonisUploadInputField
        onChange={(e) => onFileUpload(e)}
        type="file"
        ref={inputRef}
      />

      <AdonisGalleryBodyHeaderInnerContainer>
        <AdonisGalleryUploadButtonContainer>
          <AdonisGalleryHeaderUploadButton onClick={openFileUpload}>
            Enviar imagem
          </AdonisGalleryHeaderUploadButton>
        </AdonisGalleryUploadButtonContainer>

        <AdonisGalleryAltActionsContainer>
          <div onClick={onFileDelete}>
            <IconComponent
              disabledHelper={"Selecione uma imagem para deletá-la"}
              clickable
              disabled={!isPhotoSelected}
              iconType="DeleteForever"
            />
          </div>
          <div onClick={onFileCopy}>
            <IconComponent
              disabledHelper={"Selecione uma imagem para copiar seu link"}
              clickable
              disabled={!isPhotoSelected}
              iconType="FileCopy"
            />
          </div>

          <AdonisGalleryCloseButtonBase
            onClick={() => dispatch(galleryClose())}
          >
            <IconComponent clickable iconType="Close" />
          </AdonisGalleryCloseButtonBase>
        </AdonisGalleryAltActionsContainer>
      </AdonisGalleryBodyHeaderInnerContainer>
    </AdonisGalleryBodyHeader>
  );
};

export default AdonisGalleryHeader;
