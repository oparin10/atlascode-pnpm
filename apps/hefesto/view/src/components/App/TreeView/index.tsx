import React from "react";

interface Category {
  categoryID: string;
  categoryRoot?: boolean;
  categoryName: string;
  categoryParent: string | null | undefined;
  categoryPath: Array<string>;
  categoryPathName: Array<string>;
}
let categories: Array<Category> = [
  {
    categoryID: "000",
    categoryName: "Masculino",
    categoryParent: null,
    categoryPath: ["000"],
    categoryPathName: ["masculino"],
    categoryRoot: true,
  },
  {
    categoryID: "001",
    categoryName: "Roupas",
    categoryParent: "000",
    categoryPath: ["000", "001"],
    categoryPathName: ["masculino", "roupas"],
    categoryRoot: false,
  },
  {
    categoryID: "002",
    categoryName: "Calças",
    categoryParent: "001",
    categoryPath: ["000", "001", "002"],
    categoryPathName: ["masculino", "roupas", "calças"],
    categoryRoot: false,
  },
  {
    categoryID: "00003",
    categoryName: "Khakhi",
    categoryParent: "002",
    categoryPath: ["000", "001", "002", "00003"],
    categoryPathName: ["masculino", "roupas", "calças", "khakhi"],
    categoryRoot: false,
  },
  {
    categoryID: "900",
    categoryName: "Feminino",
    categoryParent: null,
    categoryPath: ["900"],
    categoryPathName: ["feminino"],
    categoryRoot: true,
  },

  {
    categoryID: "901",
    categoryName: "Moda verão",
    categoryParent: "900",
    categoryPath: ["900", "901"],
    categoryRoot: false,
    categoryPathName: ["feminino", "moda verão"],
  },
];

//   if (startingDepth > maxDepth) {
//     console.log("max depth reached");
//     return;
//   } else {
//     for (let i = 0; i < categoriesArg.length; i++) {
//       const categoryItem = categoriesArg[i];

//       if (categoryItem.categoryPath.length == startingDepth) {
//         // rootArray.push(categoryItem);
//         console.log(categoryItem);
//       }
//     }

//     categoryTreeTraversal(categoryTreeArray, maxDepth, startingDepth + 1);
//   }
// };

export default function RecursiveTreeView() {
  const getTreeMaxDepth = (tree: Array<Category>): number => {
    let depth: number = 0;

    for (let i = 0; i < tree.length; i++) {
      const leaf = tree[i];

      if (leaf.categoryPath.length > depth) {
        depth = leaf.categoryPath.length;
      }
    }

    return depth;
  };

  const renderTreeRecursive = (
    tree: Array<Category>,
    depth: number,
    maxDepth: number = getTreeMaxDepth(tree)
  ) => {
    return (
      <div>
        <h1></h1>
      </div>
    );
  };

  const renderLinkedList = (
    tree: Array<Category>,
    maxDepth: number = getTreeMaxDepth(tree)
  ) => {};

  const renderTree = (tree: Array<Category>) => {
    let rootCategories: Array<Category> = [];
    let depth: number = 0;

    for (let i = 0; i < tree.length; i++) {
      const treeLeaf = tree[i];

      if (treeLeaf.categoryRoot) {
        rootCategories.push(treeLeaf);
      }
    }

    return (
      <div>
        {rootCategories.map((category, index) => {
          return (
            <div>
              <h1>{category.categoryName}</h1>
              {tree.map((categoryFromTree, index) => {
                if (categoryFromTree.categoryPath[0] == category.categoryID) {
                  return (
                    <div>
                      <div>
                        {categoryFromTree.categoryPathName.join(" ----> ")}
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          );
        })}
      </div>
    );
  };

  return <div>{renderTreeRecursive(categories, 0)}</div>;
}
