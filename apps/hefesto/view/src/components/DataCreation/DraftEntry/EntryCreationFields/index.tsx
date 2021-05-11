import { Fade } from "@material-ui/core";
import { FormikContextType } from "formik";
import React from "react";
import { DataCreationField, FieldGroup } from "@hefesto/types";
import AttributeSelect from "../../../App/AttributeSelect";
import CategorySelect from "../../../App/CategorySelect";
import AccordionGroup from "../../../Util/AccordionGroup";

import RootFormField from "../../FormFields/Root";
import {
  EntryCreationFieldContainerGrid,
  EntryCreationFieldsRoot,
} from "./styles";

interface Props {
  collectionID: string;
  formik: FormikContextType<Record<string, DataCreationField>>;
  fieldGroups: FieldGroup[];
  groupedFields: DataCreationField[];
  ungroupedFields: DataCreationField[];
  hasCategories: boolean;
  hasAttributes: boolean;
}

const EntryCreationFields = React.memo(
  ({
    fieldGroups,
    groupedFields,
    formik,
    ungroupedFields,
    collectionID,
    hasAttributes,
    hasCategories,
  }: Props) => {
    return (
      <Fade in={true} timeout={{ enter: 500, exit: 500 }}>
        <EntryCreationFieldsRoot>
          <EntryCreationFieldContainerGrid>
            {fieldGroups.map((fieldGroups: FieldGroup, index: number) => {
              return (
                <AccordionGroup label={fieldGroups.label} key={fieldGroups.id}>
                  {groupedFields.map(
                    (fieldCollection: DataCreationField, index: number) => {
                      if (fieldCollection.groupID === fieldGroups.id) {
                        return (
                          <RootFormField
                            id={fieldCollection.name}
                            key={index}
                            helperText={
                              formik.touched[fieldCollection.name] &&
                              formik.errors[fieldCollection.name]
                            }
                            error={
                              formik.touched[fieldCollection.name] &&
                              Boolean(formik.errors[fieldCollection.name])
                            }
                            onBlur={formik.handleBlur}
                            setFieldValue={formik.setFieldValue}
                            validateField={formik.validateField}
                            setFieldError={formik.setFieldError}
                            setFieldTouched={formik.setFieldTouched}
                            onChange={formik.handleChange}
                            value={formik.values[fieldCollection.name]}
                            name={fieldCollection.name}
                            label={fieldCollection.label}
                            listOptions={
                              fieldCollection.fieldType == "list" ||
                              fieldCollection.fieldType == "installment"
                                ? fieldCollection.listOptions
                                : null
                            }
                            formFieldType={fieldCollection.fieldType}
                            checkboxOptions={
                              fieldCollection.fieldType == "checkbox"
                                ? fieldCollection.checkboxOptions
                                : []
                            }
                            radioOptions={
                              fieldCollection.fieldType == "radio"
                                ? fieldCollection.radioOptions
                                : []
                            }
                            selectValues={
                              fieldCollection.fieldType == "select"
                                ? fieldCollection.selectOptions
                                : []
                            }
                          />
                        );
                      }
                    }
                  )}
                </AccordionGroup>
              );
            })}
            {ungroupedFields.map((value: DataCreationField, index: number) => {
              return (
                <RootFormField
                  id={value.name}
                  key={index}
                  helperText={
                    formik.touched[value.name] && formik.errors[value.name]
                  }
                  error={
                    formik.touched[value.name] &&
                    Boolean(formik.errors[value.name])
                  }
                  onBlur={formik.handleBlur}
                  setFieldValue={formik.setFieldValue}
                  setFieldError={formik.setFieldError}
                  setFieldTouched={formik.setFieldTouched}
                  validateField={formik.validateField}
                  onChange={formik.handleChange}
                  value={formik.values[value.name]}
                  name={value.name}
                  label={value.label}
                  formFieldType={value.fieldType}
                />
              );
            })}

            {hasAttributes ? (
              <AccordionGroup label={"Atributos"}>
                <AttributeSelect
                  setFieldValue={formik.setFieldValue}
                  value={formik.values["attributes"]}
                />
              </AccordionGroup>
            ) : null}

            {hasCategories ? (
              <AccordionGroup label={"Categorias"}>
                <CategorySelect
                  value={formik.values["categories"]}
                  setFieldValue={formik.setFieldValue}
                />
              </AccordionGroup>
            ) : null}
          </EntryCreationFieldContainerGrid>
        </EntryCreationFieldsRoot>
      </Fade>
    );
  }
);

export default EntryCreationFields;
