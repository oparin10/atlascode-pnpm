import React, { forwardRef } from "react";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import Add from "@material-ui/icons/Add";
import Delete from "@material-ui/icons/Delete";
import Save from "@material-ui/icons/Save";
import { useDispatch } from "react-redux";
import { globalNotificationCustom } from "../../../redux/globalUI/actions";
import { DatagridColumns } from "../../DataCreation";
import FeedbackDialog from "../../Util/FeedbackDialog";

const tableIcons: any = {
  Add: forwardRef((props: any, ref: any) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props: any, ref: any) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props: any, ref: any) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props: any, ref: any) => (
    <DeleteOutline {...props} ref={ref} />
  )),
  DetailPanel: forwardRef((props: any, ref: any) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props: any, ref: any) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props: any, ref: any) => (
    <SaveAlt {...props} ref={ref} />
  )),
  Filter: forwardRef((props: any, ref: any) => (
    <FilterList {...props} ref={ref} />
  )),
  FirstPage: forwardRef((props: any, ref: any) => (
    <FirstPage {...props} ref={ref} />
  )),
  LastPage: forwardRef((props: any, ref: any) => (
    <LastPage {...props} ref={ref} />
  )),
  NextPage: forwardRef((props: any, ref: any) => (
    <ChevronRight {...props} ref={ref} />
  )),
  PreviousPage: forwardRef((props: any, ref: any) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props: any, ref: any) => (
    <Clear {...props} ref={ref} />
  )),
  Search: forwardRef((props: any, ref: any) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props: any, ref: any) => (
    <ArrowDownward {...props} ref={ref} />
  )),
  ThirdStateCheck: forwardRef((props: any, ref: any) => (
    <Remove {...props} ref={ref} />
  )),
  ViewColumn: forwardRef((props: any, ref: any) => (
    <ViewColumn {...props} ref={ref} />
  )),
  Save: forwardRef((props: any, ref: any) => <Save {...props} ref={ref} />),
};

interface DatagridEntriesProps {
  createFn: (...args: any[]) => void;
  deleteFn: (...args: any[]) => void;
  updateFn: (...args: any[]) => void;
  data: Array<any>;
  collectionName: string;
  columns: DatagridColumns[];
  collectionRef: string;
  allowDeleteMany?: boolean;
  allowUpdateMany?: boolean;
}

const Datagrid = React.memo(
  ({
    createFn,
    deleteFn,
    updateFn,
    allowDeleteMany,
    allowUpdateMany,
    collectionRef,
    collectionName,
    columns,
    data = [],
  }: DatagridEntriesProps) => {
    const [feedbackDialogState, setFeedbackDialogState] = React.useState<{
      callback: (...args: any[]) => void;
      open: boolean;
    }>({
      callback: () => console.log("well hello"),
      open: false,
    });

    const handleDeleteWithDialog = (callback: (...args: any[]) => void) => {
      setFeedbackDialogState({ open: true, callback: callback });
    };

    const toggleDeleteDialog = (open: boolean) => {
      setFeedbackDialogState((prevState) => {
        let currentState = prevState;

        return { ...currentState, open: open };
      });
    };

    const tableRef = React.useRef<any>(null);

    const dispatch = useDispatch();

    return (
      <div>
        <FeedbackDialog
          closeFn={() => toggleDeleteDialog(false)}
          open={feedbackDialogState.open}
          severity={"error"}
          message="Você está prestes a deletar um item, clique em confirmar se realmente deseja fazé-lo. Caso contrário, clique em cancelar"
          title="Atenção"
          callback={feedbackDialogState.callback}
        />
        <MaterialTable
          // onSelectionChange={(data) => {
          //   setSelectionValues(data);
          //   console.log(selectionValues);
          // }}
          tableRef={tableRef}
          localization={{
            body: {
              emptyDataSourceMessage: `Nenhum(a) ${collectionName} encontrado(a)`,
            },
            toolbar: {
              searchTooltip: "Procurar por um campo específico",
              searchPlaceholder: "Pesquisar",
              nRowsSelected: `{0} ${collectionName}(s) selecionados`,
            },
            pagination: {
              labelRowsSelect: "linhas sendo exibidas",
              labelDisplayedRows: "{count} de {from}-{to}",
              firstTooltip: "Primeira página",
              lastTooltip: "Última página",
              nextTooltip: "Próxima página",
              previousTooltip: "Página anterior",
            },
            header: {
              actions: "Ações",
            },
          }}
          icons={tableIcons}
          title={collectionName + "s"}
          columns={columns}
          data={data}
          actions={[
            {
              icon: Edit,
              tooltip: `Editar ${collectionName}`,
              onClick: (event, rowData) => {
                if (
                  tableRef!.current!.dataManager!.selectedCount > 1 &&
                  !allowUpdateMany
                ) {
                  dispatch(
                    globalNotificationCustom(
                      `Não é possível EDITAR mais de um(a) ${collectionName.toUpperCase()} por vez, selecione apenas um item.`,
                      "warning"
                    )
                  );
                } else {
                  updateFn(rowData[0]);
                  // updateFn(rowData[0].uuid, rowData[0].label);
                  // handleUpdateDialogOpen()
                }
              },
            },
            {
              icon: Add,
              tooltip: `Adicionar ${collectionName}`,
              isFreeAction: true,
              onClick: () => createFn(),
            },
            (rowData) => ({
              icon: Delete,
              tooltip: `Excluir ${collectionName}`,
              onClick: (event, rowData) => {
                if (
                  tableRef!.current!.dataManager!.selectedCount > 1 &&
                  !allowDeleteMany
                ) {
                  dispatch(
                    globalNotificationCustom(
                      `Não é possível DELETAR mais de um(a) ${collectionName.toUpperCase()} por vez, selecione apenas um item.`,
                      "warning"
                    )
                  );
                } else {
                  handleDeleteWithDialog(() =>
                    deleteFn(rowData[0].uuid, collectionRef)
                  );
                }
              },
            }),
          ]}
          options={{
            actionsColumnIndex: -1,
            selection: true,
          }}
        />
      </div>
    );
  }
);

export default Datagrid;
