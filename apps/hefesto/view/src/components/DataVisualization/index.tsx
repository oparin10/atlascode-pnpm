import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { FormFieldTypes, DataCreationField } from "@hefesto/types";
import useFieldGrouping from "../../hooks/useFieldGrouping";
import useFormGenerator from "../../hooks/useFormGenerator";
import { RootState } from "../../redux";
import RootFormField from "../DataCreation/FormFields/Root";

interface Props extends DataVisualizationReduxProps {}

const DataVisualization = ({ id }: Props) => {
  let { fields, formik } = useFormGenerator();

  const { fieldGroups, groupedFields, ungroupedFields } = useFieldGrouping(id);

  React.useEffect(() => {
    console.log(fieldGroups, groupedFields, ungroupedFields);
  }, []);

  return (
    <div>
      {fields.map((value, index) => {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: "500px",
              paddingTop: "50px",
            }}
            key={index}
          >
            <RootFormField
              validateField={formik.validateField}
              setFieldError={formik.setFieldError}
              onBlur={formik.handleBlur}
              setFieldValue={formik.setFieldValue}
              setFieldTouched={formik.setFieldTouched}
              id={value.name}
              formFieldType={value.fieldType as FormFieldTypes}
              label={value.label}
              name={value.name}
              onChange={formik.handleChange}
              value={formik.values[value.name]}
              error={
                formik.touched[value.name] && Boolean(formik.errors[value.name])
              }
              helperText={
                formik.touched[value.name] && formik.errors[value.name]
              }
            />
          </div>
        );
      })}

      <button onClick={() => console.log(formik.initialValues)}>
        Check this out
      </button>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  id: state.activeCollection.itemID,
});

const mapDispatchToProps = {};

const dataVisualizationConnector = connect(mapStateToProps, mapDispatchToProps);

type DataVisualizationReduxProps = ConnectedProps<
  typeof dataVisualizationConnector
>;

export default dataVisualizationConnector(DataVisualization);
