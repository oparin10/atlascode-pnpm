import { Fade } from "@material-ui/core";
import React from "react";
import useCategoryHierarchy from "../../../hooks/useCategoryHierarchy";

import { CategorySelectGridContainer, CategorySelectLayout } from "./styles";

export interface CategoryMaterializedPair {
  uuidPath: string[];
  labelPath: string[];
}

interface Props {
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
  value: any;
}

const CategorySelect = React.memo(({ setFieldValue, value }: Props) => {
  const { childCategories, rootCategories } = useCategoryHierarchy();

  const handleCategoryInsert = (newValue: string) => {
    setFieldValue("categories", [...value, newValue]);
  };

  const handleCategoryRemove = (valueToRemove: string) => {
    let categoryValuesArrayInternal: string[] = [...value];

    setFieldValue(
      "categories",
      categoryValuesArrayInternal.filter((value, index) => {
        return value !== valueToRemove;
      })
    );
  };

  return (
    <Fade in={true} timeout={{ enter: 500, exit: 500 }}>
      <div style={{ gridColumn: "1/3" }}>
        <CategorySelectGridContainer>
          {rootCategories.length > 0 ? (
            rootCategories.map(
              (materializedPair: CategoryMaterializedPair, index: number) => {
                let childMaterializedPathInternal: CategoryMaterializedPair[] = [];

                for (let i = 0; i < childCategories.length; i++) {
                  const element = childCategories[i];

                  if (element.uuidPath[0] == materializedPair.uuidPath[0]) {
                    childMaterializedPathInternal.push(element);
                  }
                }

                return (
                  <CategorySelectLayout
                    insertFn={handleCategoryInsert}
                    removeFn={handleCategoryRemove}
                    key={index}
                    childCategories={childMaterializedPathInternal}
                    rootCategory={materializedPair}
                  />
                );
              }
            )
          ) : (
            <div>
              Parece que você ainda não adicionou nenhuma categoria, ao criar um
              item sem uma categoria, seu item será marcado como{" "}
              <strong>SEM CATEGORIA</strong> e não será exibido em sua página
              principal. Você pode adicionar, remover ou modificar categorias
              mesmo após ter criado um item.
            </div>
          )}
        </CategorySelectGridContainer>
      </div>
    </Fade>
  );
});

export default CategorySelect;
