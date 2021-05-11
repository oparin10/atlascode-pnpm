import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../../../redux";
import { entryViewHide } from "../../../redux/activeCollection/actions";
import AtlasBackdrop from "../../Util/AtlasBackdrop";

interface Props extends EntryViewReduxProps {}

const EntryView = ({ isViewing, entryViewHide }: Props) => {
  return (
    <AtlasBackdrop
      closeFn={entryViewHide}
      open={isViewing}
      onClose={entryViewHide}
    >
      <div>Hello</div>
    </AtlasBackdrop>
  );
};

const mapStateToProps = (state: RootState) => ({
  isViewing: state.activeCollection.isViewing,
});

const mapDispatchToProps = {
  entryViewHide: entryViewHide,
};

const entryViewConnector = connect(mapStateToProps, mapDispatchToProps);

export type EntryViewReduxProps = ConnectedProps<typeof entryViewConnector>;

export default entryViewConnector(EntryView);
