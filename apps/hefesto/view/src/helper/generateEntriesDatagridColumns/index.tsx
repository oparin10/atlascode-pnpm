import { collections } from "../../config/collections.config";
import { DataCreationItem, DataCreationField } from "@hefesto/types";
import { DatagridColumns } from "../../components/DataCreation";
import EntryViewActionButtonMain from "../../components/DataCreation/EntryView/EntryViewAction";

const generateEntriesDataGridColumns = (
  collectionID: string
): DatagridColumns[] => {
  let entriesDataGridColumns: DatagridColumns[] = [];

  const activeCollection: DataCreationItem[] = collections.filter(
    (creationItem: DataCreationItem, index: number) => {
      return creationItem.itemID == collectionID;
    }
  );

  const activeCollectionFields: DataCreationField[] =
    activeCollection[0].fields;

  for (const field of activeCollectionFields) {
    let dataGridColumnItemInternal: DatagridColumns;

    dataGridColumnItemInternal = {
      field: field.name,
      title: field.label,
      hidden: field.hidden ? true : false,
    };

    entriesDataGridColumns.push(dataGridColumnItemInternal);
  }

  entriesDataGridColumns.unshift({
    field: "uuid",
    title: "ID",
    hidden: !activeCollection[0].showID,
  });

  // entriesDataGridColumns.push({
  //   field: "visualizeComponent",
  //   title: "",
  //   render: (rowData) => {
  //     return <EntryViewActionButtonMain rowData={rowData} />;
  //   },
  // });

  return entriesDataGridColumns;
};

export default generateEntriesDataGridColumns;
