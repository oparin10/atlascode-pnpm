import React from "react";
import { DataCreationField, FieldGroup } from "@hefesto/types";
import { useAppSelector } from "../useAppSelector";

const useFieldGrouping = (
  collectionID: string
): {
  fieldGroups: FieldGroup[];
  groupedFields: DataCreationField[];
  ungroupedFields: DataCreationField[];
} => {
  const [fieldGroupsState, setFieldGroups] = React.useState<FieldGroup[]>([]);
  const [groupedFields, setGroupedFields] = React.useState<DataCreationField[]>(
    []
  );
  const [ungroupedFields, setUngroupedFields] = React.useState<
    DataCreationField[]
  >([]);

  const { fields, fieldGroups } = useAppSelector(
    (state) => state.activeCollection
  );

  React.useEffect(() => {
    let fieldGroupsLocal: FieldGroup[] = [];
    let groupedFieldsLocal: DataCreationField[] = [];
    let ungroupedFieldsLocal: DataCreationField[] = [];

    if (fieldGroups) {
      fieldGroups.forEach((value, index) => {
        fieldGroupsLocal.push(value);
      });

      for (let i = 0; i < fieldGroupsLocal.length; i++) {
        const fieldGroupElement = fieldGroupsLocal[i];

        for (let j = 0; j < fields.length; j++) {
          const fieldElement = fields[j];

          if (
            fieldElement.groupID &&
            fieldElement.groupID == fieldGroupElement.id
          ) {
            groupedFieldsLocal.push(fieldElement);
          }

          if (
            !fieldElement.groupID &&
            !ungroupedFieldsLocal.includes(fieldElement)
          ) {
            ungroupedFieldsLocal.push(fieldElement);
          }
        }
      }
    }

    setFieldGroups(fieldGroupsLocal);
    setGroupedFields(groupedFieldsLocal);
    setUngroupedFields(ungroupedFieldsLocal);
  }, [collectionID]);

  return {
    fieldGroups: fieldGroupsState,
    groupedFields: groupedFields,
    ungroupedFields: ungroupedFields,
  };
};

export default useFieldGrouping;
