import React from "react";
import { connect, ConnectedProps } from "react-redux";
import useFieldGrouping from "../../../hooks/useFieldGrouping";
import useFormGenerator from "../../../hooks/useFormGenerator";
import { RootState } from "../../../redux";
import {
  entryUpdate,
  newEntryCreate,
  newEntryDiscard,
} from "../../../redux/activeCollection/actions";
import AtlasBackdrop from "../../Util/AtlasBackdrop";
import EntryCreationFields from "./EntryCreationFields";
import EntryCreationLayoutMain from "./styles";

interface Props extends EntryCreationReduxProps {}

const EntryCreation = ({
  isUpdating,
  isCreating,
  discardEntry,
  createEntry,
  updateEntry,
  collectionID,
  hasAttributes,
  hasCategories,
  sidebarLabel,
}: Props) => {
  const { formik } = useFormGenerator();
  const { fieldGroups, groupedFields, ungroupedFields } = useFieldGrouping(
    collectionID
  );

  const handleDiscard = () => {
    discardEntry();
    formik.resetForm();
  };

  const handleSubmit = () => {
    isUpdating ? updateEntry(formik.values) : createEntry(formik.values);
  };

  React.useEffect(() => {
    formik.validateForm();
  }, []);

  // React.useEffect(() => {}, [formik.values, formik.errors, formik.touched]);

  console.log(formik.values);

  return (
    <AtlasBackdrop
      open={isCreating || isUpdating}
      closeFn={handleDiscard}
      onClose={handleDiscard}
    >
      <EntryCreationLayoutMain
        isFormValid={formik.isValid && formik.dirty}
        handleCloseFn={handleDiscard}
        handleSubmitFn={handleSubmit}
        sidebarLabel={sidebarLabel}
        isUpdating={isUpdating}
      >
        <EntryCreationFields
          hasAttributes={hasAttributes}
          hasCategories={hasCategories}
          collectionID={collectionID}
          fieldGroups={fieldGroups}
          groupedFields={groupedFields}
          ungroupedFields={ungroupedFields}
          formik={formik}
        />
      </EntryCreationLayoutMain>
      );
    </AtlasBackdrop>
  );
};

const mapStateToProps = (state: RootState) => ({
  isCreating: state.activeCollection.isCreating,
  isUpdating: state.activeCollection.isUpdating,
  collectionID: state.activeCollection.itemID,
  sidebarLabel: state.activeCollection.sidebarLabel,
  hasCategories: state.activeCollection.hasCategories!,
  hasAttributes: state.activeCollection.hasAttributes!,
});

const mapDispatchToProps = {
  discardEntry: newEntryDiscard,
  createEntry: newEntryCreate,
  updateEntry: entryUpdate,
};

const entryCreationConnector = connect(mapStateToProps, mapDispatchToProps);

export type EntryCreationReduxProps = ConnectedProps<
  typeof entryCreationConnector
>;

export default entryCreationConnector(EntryCreation);
