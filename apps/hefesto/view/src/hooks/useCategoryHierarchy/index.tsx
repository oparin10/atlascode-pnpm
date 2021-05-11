import React from "react";
import { CategoryMaterializedPair } from "../../components/App/CategorySelect";
import { Category } from "@hefesto/types";
import { useAppSelector } from "../useAppSelector";

const useCategoryHierarchy = (): {
  rootCategories: CategoryMaterializedPair[];
  childCategories: CategoryMaterializedPair[];
} => {
  const [rootCategories, setRootCategories] = React.useState<
    Array<CategoryMaterializedPair>
  >([]);

  const [childCategories, setChildCategories] = React.useState<
    Array<CategoryMaterializedPair>
  >([]);

  const categories = useAppSelector(
    (state) => state.activeCollection.categories
  );

  React.useEffect(() => {
    let childMaterializedPairInternal: CategoryMaterializedPair[] = [];
    let rootMaterializedPairInternal: CategoryMaterializedPair[] = [];

    categories!.forEach((category: Category, index: number) => {
      if (category.root) {
        rootMaterializedPairInternal.push({
          labelPath: category.label_path!,
          uuidPath: category.uuid_path,
        });
      } else {
        childMaterializedPairInternal.push({
          labelPath: category.label_path!,
          uuidPath: category.uuid_path,
        });
      }
    });

    setRootCategories(rootMaterializedPairInternal);
    setChildCategories(childMaterializedPairInternal);
  }, []);

  return {
    childCategories: childCategories,
    rootCategories: rootCategories,
  };
};

export default useCategoryHierarchy;
