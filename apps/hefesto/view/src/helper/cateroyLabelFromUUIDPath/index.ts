import { Category } from "@hefesto/types";

export const categoryLabelFromUUIDPath = (
  uuid_path: string[],
  categories: Category[]
): string[] => {
  let label_path_return_array: string[] = [];

  for (let j = 0; j < uuid_path.length; j++) {
    const uuidElement = uuid_path[j];

    for (let i = 0; i < categories.length; i++) {
      const categoryElement = categories[i];

      if (categoryElement.uuid == uuidElement) {
        label_path_return_array.push(categoryElement.label);
      }
    }
  }

  return label_path_return_array;
};
