import { Button, SvgIcon, Tooltip } from "@material-ui/core";
import { ArrowBackRounded } from "@material-ui/icons";
import styled from "styled-components";

export const EntryCreationRoot = styled.div`
  width: 95%;
  height: 90%;

  @media (min-width: 1024px) {
    width: 80%;
    height: 90%;
  }
`;

export const EntryCreationContainer = styled.div`
  background-color: #fff;
  border-radius: 4px;
  height: 100%;
  width: 100%;
  box-shadow: 2px 4px 6px rgba(0, 0, 0, 0.25);
`;

export const EntryCreationInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const EntryCreationHeader = styled.div`
  border-bottom: 1.5px solid #dfe0eb;
  height: 12%;
  width: 100%;
`;

export const EntryCreationHeaderInner = styled.div`
  display: flex;
  width: 100%;
  height: 100%;

  & .entryHeaderLabel {
    height: 100%;
    flex-grow: 1;
    justify-content: flex-start;
    margin-left: 15px;
    font-weight: 500;
    font-size: 14px;
    color: #494949;

    & > div {
      height: 100%;
      align-items: center;
      display: flex;
    }
  }

  & .entryHeaderExitButton {
    height: 100%;
    margin-right: 15px;

    & > div {
      flex-grow: 1;
      justify-content: flex-end;
      height: 100%;
      align-items: center;
      display: flex;
    }
  }

  @media (min-width: 1024px) {
    & .entryHeaderExitButton {
      margin-right: 25px;
    }

    & .entryHeaderLabel {
      margin-left: 25px;
      font-size: 20px;
    }
  }
`;

export const EntryCreationContent = styled.div`
  height: 75%;
  overflow-y: scroll;
  position: relative;
  padding: 0px;

  @media (min-width: 1024px) {
    padding: 40px;
  }
`;

export const EntryCreationFooter = styled.div`
  border-top: 1.5px solid #dfe0eb;
  height: 14%;
`;

export const EntryCreationFooterInner = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  & .entryFooterActionCancel {
    margin-right: 15px;
  }

  & .entryFooterActionCreate {
    margin-left: 15px;
  }

  @media (min-width: 1024px) {
    & .entryFooterActionCancel {
      margin-right: 65px;
    }

    & .entryFooterActionCreate {
      margin-left: 65px;
    }
  }
`;

export const CircleAroundIcon = styled.div`
  height: 28px;
  width: 28px;
  border-radius: 50%;
  background-color: #333;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  & .MuiSvgIcon-root {
    font-size: 1.25rem;
  }

  @media (min-width: 1024px) {
    height: 32px;
    width: 32px;

    & .MuiSvgIcon-root {
      font-size: 1.35rem;
    }
  }
`;

export const EntryCreationNavigationContainer = styled.div`
  & .MuiTabs-root {
    background-color: #fff;
    color: #333;
    border-bottom: 1.5px solid #dfe0eb;
    padding-right: 3px;
  }
`;

interface EntryCreationLayouMainProps {
  handleCloseFn: (...args: any[]) => void;
  handleSubmitFn: (...args: any[]) => void;
  sidebarLabel: string;
  children: React.ReactNode;
  isFormValid: boolean;
  isUpdating: boolean;
}

const EntryCreationLayoutMain = ({
  children,
  handleCloseFn,
  sidebarLabel,
  handleSubmitFn,
  isFormValid,
  isUpdating,
}: EntryCreationLayouMainProps) => {
  return (
    <EntryCreationRoot>
      <EntryCreationContainer>
        <EntryCreationInnerContainer>
          <EntryCreationHeader>
            <EntryCreationHeaderInner>
              <div className="entryHeaderLabel">
                <div>
                  {isUpdating ? "Atualizando" : "Criando novo"} item em{" "}
                  {sidebarLabel!.toUpperCase()}
                </div>
              </div>

              <div className="entryHeaderExitButton">
                <div>
                  <CircleAroundIcon onClick={handleCloseFn}>
                    <Tooltip title="Cancelar">
                      <SvgIcon
                        style={{ position: "absolute", color: "#fff" }}
                        component={ArrowBackRounded}
                      />
                    </Tooltip>
                  </CircleAroundIcon>
                </div>
              </div>
            </EntryCreationHeaderInner>
          </EntryCreationHeader>

          <EntryCreationContent>{children}</EntryCreationContent>

          <EntryCreationFooter>
            <EntryCreationFooterInner>
              <Button
                onClick={() => handleCloseFn()}
                variant="outlined"
                className="entryFooterActionCancel"
              >
                Cancelar
              </Button>

              <Tooltip
                arrow
                title="Vefique todos os campos antes de prosseguir"
              >
                <span>
                  <Button
                    color="primary"
                    variant="contained"
                    disabled={!isFormValid}
                    onClick={handleSubmitFn}
                    className="entryFooterActionCreate"
                  >
                    {isUpdating ? "Atualizar item" : "Criar item"}
                  </Button>
                </span>
              </Tooltip>
            </EntryCreationFooterInner>
          </EntryCreationFooter>
        </EntryCreationInnerContainer>
      </EntryCreationContainer>
    </EntryCreationRoot>
  );
};

export default EntryCreationLayoutMain;
