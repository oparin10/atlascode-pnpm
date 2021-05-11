import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Fade, SvgIcon } from "@material-ui/core";
import { connect, ConnectedProps, useSelector } from "react-redux";
import { RootState } from "../../redux";
import Datagrid from "../App/Datagrid";
import {
  categoryDelete,
  categoryDraftCreateFieldSetup,
  categoryDraftUpdateFieldSetup,
} from "../../redux/categoryDraft/actions";
import { ArrowRightAlt } from "@material-ui/icons";
import AttributeContainer from "../App/Attributes";
import {
  entryDelete,
  entryUpdateSetup,
  newEntrySetup,
} from "../../redux/activeCollection/actions";
import generateEntriesDataGridColumns from "../../helper/generateEntriesDatagridColumns";
import SimpleTabs from "../Util/SimpleTabs";
import styled from "styled-components";
import useReferenceSize from "../../hooks/useReferenceSize";

interface DataCreationLayouRootProps {
  appbarWidth: number;
}

const DataCreationLayoutRoot = styled.div<DataCreationLayouRootProps>`
  flex-grow: 1;
  background-color: #fff;

  .appbar {
    background-color: #eaeff2;
    box-shadow: none;
    color: #333;
    border-bottom: 1px solid #c3cfdd;
    position: fixed;
    width: ${(props) => `${props.appbarWidth}px`};
  }
`;

const DataCreationAppbarAnchor = styled.div`
  min-height: 48px;
  width: 100%;
  background-color: red;
  opacity: 0;
`;

export interface DatagridColumns {
  title: string;
  field: string;
  hidden?: boolean;
  render?: (...args: any[]) => any;
}

interface LayoutNavigationProps extends LayoutNavigationReduxProps {}

const DataCreation = ({
  activeCollection,
  createCategory,
  deleteCategory,
  updateCategory,
  newEntrySetup,
  entryDelete,
  entryUpdate,
}: LayoutNavigationProps) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  let entriesColumns = generateEntriesDataGridColumns(activeCollection.itemID);

  let categoriesColumns: DatagridColumns[] = [
    { title: "uuid", field: "uuid", hidden: true },
    { title: "root", field: "root", hidden: true },
    { title: "Nome da categoria", field: "label" },
    {
      title: "Categoria pai",
      field: "parent",
      render: (rowData) => {
        if (rowData.parent == null) {
          return <p>{"Raíz"}</p>;
        } else {
          return <p>{rowData.label_path[0]}</p>;
        }
      },
    },
    { title: "uuid_path", field: "uuid_path", hidden: true },
    {
      title: "Caminho da categoria",
      field: "label_path",
      render: (rowData) => {
        let local_label_path_array: string[] = rowData.label_path as string[];

        return (
          <div style={{ display: "flex" }}>
            {local_label_path_array.map(
              (label_path_item: string, index: number) => {
                return (
                  <div
                    key={index}
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <p>{label_path_item}</p>
                    {index == local_label_path_array.length - 1 ? (
                      ""
                    ) : (
                      <SvgIcon
                        style={{
                          marginLeft: "8px",
                          marginRight: "8px",
                          fontSize: "1.2rem",
                        }}
                        component={ArrowRightAlt}
                      ></SvgIcon>
                    )}
                  </div>
                );
              }
            )}
          </div>
        );
      },
    },
  ];

  // Using selector function for state because it automatically does a deep comparison on the categories object and always triggers a rerender. Using it this way will guarantee that the categories data table component will always update properly and automatically, making it also work properly with Firestore websocket subscription

  const categoriesSelector = useSelector(
    (state: RootState) => state.activeCollection.categories
  );

  const entriesSelector = useSelector(
    (state: RootState) => state.activeCollection.entries
  );

  const anchorRef = React.useRef<HTMLDivElement>(null);

  const [appbarWidth, appbarHeight] = useReferenceSize(anchorRef);

  return (
    <DataCreationLayoutRoot appbarWidth={appbarWidth}>
      <AppBar className={"appbar"} position="static">
        <Tabs
          style={{ backgroundColor: "#fff" }}
          value={value}
          onChange={handleChange}
          aria-label="simple tabs example"
        >
          <Tab label="Itens" />

          {activeCollection?.hasCategories ? <Tab label="Categorias" /> : null}

          {activeCollection?.hasAttributes ? <Tab label="Atributos" /> : null}
        </Tabs>
      </AppBar>
      <DataCreationAppbarAnchor ref={anchorRef} />

      <SimpleTabs value={value} index={0}>
        <Fade in={true} timeout={{ enter: 500, exit: 500 }}>
          <div>
            <Datagrid
              updateFn={entryUpdate}
              deleteFn={entryDelete}
              collectionRef={activeCollection.collectionRef}
              columns={entriesColumns}
              data={entriesSelector!}
              collectionName={activeCollection.sidebarLabel}
              createFn={newEntrySetup}
            />
          </div>
        </Fade>
      </SimpleTabs>

      {activeCollection?.hasCategories ? (
        <SimpleTabs value={value} index={1}>
          <Fade in={true} timeout={{ enter: 500, exit: 500 }}>
            <div>
              <Datagrid
                collectionRef={activeCollection.collectionRef}
                columns={categoriesColumns}
                collectionName="Categoria"
                data={categoriesSelector!}
                createFn={createCategory}
                deleteFn={deleteCategory}
                updateFn={updateCategory}
              />
            </div>
          </Fade>
        </SimpleTabs>
      ) : null}

      {activeCollection?.hasAttributes ? (
        <SimpleTabs value={value} index={2}>
          <Fade in={true} timeout={{ enter: 500, exit: 500 }}>
            <AttributeContainer />
          </Fade>
        </SimpleTabs>
      ) : null}
    </DataCreationLayoutRoot>
  );
};

const mapStateToProps = (rootState: RootState) => ({
  activeCollection: rootState.activeCollection,
});

const mapDispatchToProps = {
  createCategory: categoryDraftCreateFieldSetup,
  deleteCategory: categoryDelete,
  updateCategory: categoryDraftUpdateFieldSetup,
  newEntrySetup: newEntrySetup,
  entryDelete: entryDelete,
  entryUpdate: entryUpdateSetup,
};

const layoutNavigationConnector = connect(mapStateToProps, mapDispatchToProps);

export type LayoutNavigationReduxProps = ConnectedProps<
  typeof layoutNavigationConnector
>;

export default layoutNavigationConnector(DataCreation);
