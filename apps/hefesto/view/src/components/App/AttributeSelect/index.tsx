import { Fade } from "@material-ui/core";
import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { AttributeCollectionField } from "@hefesto/types";
import { collections } from "../../../config/collections.config";
import { RootState } from "../../../redux";
import { AttributeSelectGridContainer, AttributeSelectLayout } from "./styles";

interface Props extends AttributeSelectReduxProps {
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
  value: any;
}

const AttributeSelect = React.memo(
  ({ attributes, setFieldValue, value, collectionID }: Props) => {
    const activeCollection = collections.filter((value, index) => {
      return value.itemID == collectionID;
    });

    const attributeFields = activeCollection[0].attributesFields;

    const handleAttributeInsert = (
      attributeName: string,
      attributeValue: string
    ) => {
      setFieldValue(`attributes.${attributeName}`, [
        ...value[attributeName],
        attributeValue,
      ]);
    };

    const handleAttributeRemove = (
      attributeName: string,
      attributeValue: string
    ) => {
      let attributeValuesArrayInternal: string[] = [...value[attributeName]];

      setFieldValue(
        `attributes.${attributeName}`,
        attributeValuesArrayInternal.filter((value, index) => {
          return value !== attributeValue;
        })
      );
    };

    return (
      <Fade in={true} timeout={{ enter: 500, exit: 500 }}>
        <AttributeSelectGridContainer>
          {attributeFields!.map(
            (value: AttributeCollectionField, index: number) => {
              return (
                <AttributeSelectLayout
                  key={index}
                  attributeLabel={value.label}
                  attributeName={value.name}
                  attributeValues={attributes[value.name] ?? []}
                  insertFn={handleAttributeInsert}
                  removeFn={handleAttributeRemove}
                />
              );
            }
          )}
        </AttributeSelectGridContainer>
      </Fade>
    );
  }
);

const mapStateToProps = (state: RootState) => ({
  attributes: state.activeCollection.attributes,
  collectionID: state.activeCollection.itemID,
});

const mapDispatchToProps = {};

const attributeSelectConnector = connect(mapStateToProps, mapDispatchToProps);

export type AttributeSelectReduxProps = ConnectedProps<
  typeof attributeSelectConnector
>;

export default attributeSelectConnector(AttributeSelect);
