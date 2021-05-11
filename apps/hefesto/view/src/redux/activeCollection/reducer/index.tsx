import {
  ActiveCollectionState,
  ActiveContentActionTypes,
  ACTIVE_COLLECTION_ATTRIBUTES_OBSERVER_SUCCESS,
  ACTIVE_COLLECTION_CATEGORIES_OBSERVER_SUCCESS,
  ACTIVE_COLLECTION_ENTRIES_OBSERVER_SUCCESS,
  ACTIVE_COLLECTION_ENTRY_CREATE_SUCCESS,
  ACTIVE_COLLECTION_ENTRY_SETUP_DISCARD,
  ACTIVE_COLLECTION_ENTRY_SETUP_NEW,
  ACTIVE_COLLECTION_ENTRY_SETUP_UPDATE,
  ACTIVE_COLLECTION_ENTRY_UPDATE_SUCCESS,
  ACTIVE_COLLECTION_ENTRY_VIEW_VISIBILITY_HIDDEN,
  ACTIVE_COLLECTION_ENTRY_VIEW_VISIBILITY_SHOW,
  ACTIVE_COLLECTION_SET_FAIL,
  ACTIVE_COLLECTION_SET_START,
  ACTIVE_COLLECTION_SET_SUCCESS,
} from "../types";

let initialState: ActiveCollectionState = {
  entries: [],
  attributes: {},
  categories: [],
  collectionRef: "",
  fields: [],
  routerPath: "",
  sidebarIcon: "Add",
  sidebarLabel: "",
  itemCategory: "creation",
  itemID: "",
  isCreating: false,
  isUpdating: false,
  isViewing: false,
  entrySelected: {
    entryUUID: "",
    entryValues: "",
  },
};

export const activeCollectionReducer = (
  state = initialState,
  action: ActiveContentActionTypes
): ActiveCollectionState => {
  switch (action.type) {
    case ACTIVE_COLLECTION_ENTRY_UPDATE_SUCCESS:
      return { ...state, isUpdating: false };

    case ACTIVE_COLLECTION_ENTRY_CREATE_SUCCESS:
      return { ...state, isCreating: false };

    case ACTIVE_COLLECTION_ENTRY_SETUP_UPDATE:
      let entryValuesInternal: any = {};
      let entryUUIDInternal: string = "";

      for (const row in action.payload) {
        const rowValue = action.payload[row];

        if (row == "uuid") {
          entryUUIDInternal = rowValue;
        } else if (row !== "tableData") {
          entryValuesInternal[row] = rowValue;
        }
      }

      return {
        ...state,
        entrySelected: {
          entryUUID: entryUUIDInternal,
          entryValues: { ...entryValuesInternal },
        },
        isUpdating: true,
      };

    case ACTIVE_COLLECTION_ENTRY_VIEW_VISIBILITY_SHOW:
      return { ...state, isViewing: true };

    case ACTIVE_COLLECTION_ENTRY_VIEW_VISIBILITY_HIDDEN:
      return { ...state, isViewing: false };

    case ACTIVE_COLLECTION_ENTRIES_OBSERVER_SUCCESS:
      return { ...state, entries: [...action.payload] };

    case ACTIVE_COLLECTION_ATTRIBUTES_OBSERVER_SUCCESS:
      return { ...state, attributes: action.payload };

    case ACTIVE_COLLECTION_CATEGORIES_OBSERVER_SUCCESS:
      return { ...state, categories: [...action.payload] };

    case ACTIVE_COLLECTION_ENTRY_SETUP_NEW:
      return { ...state, isCreating: true };

    case ACTIVE_COLLECTION_ENTRY_SETUP_DISCARD:
      return {
        ...state,
        isCreating: false,
        isUpdating: false,
        entrySelected: { entryUUID: "", entryValues: "" },
      };

    case ACTIVE_COLLECTION_SET_START:
      return { ...state };

    case ACTIVE_COLLECTION_SET_SUCCESS:
      return action.payload;

    case ACTIVE_COLLECTION_SET_FAIL:
      return { ...state };

    default:
      return state;
  }
};
