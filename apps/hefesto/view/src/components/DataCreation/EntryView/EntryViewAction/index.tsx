import { SvgIcon, Tooltip } from "@material-ui/core";
import { Visibility } from "@material-ui/icons";
import React from "react";
import { useAppDispatch } from "../../../../hooks/useAppDispatch";
import { entryViewShow } from "../../../../redux/activeCollection/actions";
import { EntryViewActionButtonRoot } from "../styles";

interface EntryViewActionButtonMain {
  rowData: any;
}

const EntryViewActionButtonMain = ({ rowData }: EntryViewActionButtonMain) => {
  const dispatch = useAppDispatch();

  const dispatchEntryViewOpen = () => {
    dispatch(entryViewShow());
  };

  return (
    <EntryViewActionButtonRoot onClick={dispatchEntryViewOpen}>
      <Tooltip title="Clique para visualizar informações detalhadas sobre o item">
        <SvgIcon component={Visibility} />
      </Tooltip>
    </EntryViewActionButtonRoot>
  );
};

export default EntryViewActionButtonMain;
