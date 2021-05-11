import { Fade } from "@material-ui/core";
import React from "react";
import { connect, ConnectedProps } from "react-redux";
import styled from "styled-components";
import { db } from "../../../firebase";
import { RootState } from "../../../redux";
import {
  attributeCreate,
  attributeDelete,
  attributeDraftChangeField,
  attributeDraftFieldSetup,
} from "../../../redux/attributeDraft/actions";

const AttributesRoot = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 50px;
  justify-items: center;
`;

const AttributeCreationComponent = React.lazy(
  () => import("./AttributeCreation")
);

interface Props extends AttributeCreationReduxProps {}

const AttributeContainer = ({
  setupAttributeFields,
  attributeChangeField,
  fields,
  attributesData,
  attributeCreate,
  attributeDelete,
}: Props) => {
  React.useEffect(() => {
    setupAttributeFields();
  }, []);

  return (
    <div>
      <AttributesRoot>
        {fields.map((value, index) => {
          return (
            <div key={index}>
              <React.Suspense fallback={<div>Loading...</div>}>
                <AttributeCreationComponent
                  attributesData={attributesData[value.name]}
                  label={value.label}
                  name={value.name}
                  createFn={attributeCreate}
                  deleteFn={attributeDelete}
                />
              </React.Suspense>
            </div>
          );
        })}
      </AttributesRoot>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  fields: state.activeCollection.attributesFields!,
  currentFieldValues: state.attributeDraft.fields!,
  attributesData: state.activeCollection.attributes,
});

const mapDispatchToProps = {
  setupAttributeFields: attributeDraftFieldSetup,
  attributeChangeField: attributeDraftChangeField,
  attributeCreate: attributeCreate,
  attributeDelete: attributeDelete,
};

const attributeCreationConnector = connect(mapStateToProps, mapDispatchToProps);

type AttributeCreationReduxProps = ConnectedProps<
  typeof attributeCreationConnector
>;

export default attributeCreationConnector(AttributeContainer);
