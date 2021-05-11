import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Slide,
} from "@material-ui/core";
import React from "react";
import { connect, ConnectedProps } from "react-redux";
import styled from "styled-components";
import AvatarChangePicture from "./AvatarChangePicture";

interface UserProfileButtonRootProps {
  imgURL?: string;
}

const DialogContainer = styled.div``;

const UserProfileOptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

interface UserProfileOptionsButtonProps {
  variant: "contained" | "outlined";
}

const UserProfileOptionsButton = styled.div<UserProfileOptionsButtonProps>`
  cursor: pointer;
  border: ${(props) => `1px solid ${props.theme.palette.primary.main}`};
  border-radius: 7px;
  color: ${(props) =>
    props.variant == "contained"
      ? props.theme.palette.primary.contrastText
      : props.theme.palette.primary.main};
  font-weight: 700;
  width: max-content;
  padding: 3px 6px 3px 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) =>
    props.variant == "contained" ? props.theme.palette.primary.main : "none"};
  text-rendering: optimizeLegibility;
`;

const UserProfileInfoContainer = styled.div`
  text-align: center;

  & > div {
    margin-bottom: 15px;
  }

  .fieldLabel {
    font-weight: 700;
  }
`;

interface Props {
  userPhoto?: string;
  userInfoName?: string;
  userInfoEmail?: string;
  userInfoRole?: string;
  logout: (...args: any[]) => void;
  toggleDialog: (open: boolean) => void;
  dialogOpen: boolean;
}

const UserProfile = ({
  userPhoto = "https://i.imgur.com/qtFkvT9.png",
  userInfoName = "Placeholder Username",
  userInfoEmail = "placeholder@user.com",
  userInfoRole = "Admin",
  logout,
  toggleDialog,
  dialogOpen,
}: Props) => {
  return (
    <div>
      <DialogContainer>
        <Dialog
          PaperProps={{ style: { borderRadius: "10px" } }}
          fullWidth
          maxWidth={"xs"}
          onClose={() => toggleDialog(false)}
          open={dialogOpen}
          TransitionComponent={Slide}
        >
          <DialogTitle>
            <Box
              className="profileDialogTitle"
              fontWeight={700}
              textAlign="center"
            >
              Perfil de usuário
            </Box>
          </DialogTitle>

          <Box
            marginTop={"-10px"}
            height="1px"
            width={"100%"}
            bgcolor="#333"
          ></Box>
          <DialogContent>
            <Box my={2}>
              <AvatarChangePicture />
            </Box>

            <Box my={2}>
              <UserProfileInfoContainer>
                <div className="userInfoName">
                  <div className="fieldLabel">Nome de usuário:</div>
                  <div className="fieldValue">{userInfoName}</div>
                </div>
                <div className="userInfoEmail">
                  <div className="fieldLabel">Email de usuário:</div>
                  <div className="fieldValue">{userInfoEmail}</div>
                </div>
                <div className="userInfoRole">
                  <div className="fieldLabel">Rank do usuário:</div>
                  <div className="fieldValue">{userInfoRole}</div>
                </div>
              </UserProfileInfoContainer>
            </Box>

            <Box
              marginTop={"-10px"}
              height="1px"
              width={"100%"}
              bgcolor="#333"
              my={1}
            ></Box>

            <UserProfileOptionsContainer>
              <Box>
                <UserProfileOptionsButton variant="outlined">
                  Configurações
                </UserProfileOptionsButton>
              </Box>

              <Box mb={4}>
                <UserProfileOptionsButton onClick={logout} variant="contained">
                  Logout
                </UserProfileOptionsButton>
              </Box>
            </UserProfileOptionsContainer>
          </DialogContent>
        </Dialog>
      </DialogContainer>
    </div>
  );
};

export default UserProfile;
