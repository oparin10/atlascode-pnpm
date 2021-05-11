import { Category, DashboardItem } from "@hefesto/types";

export const ACTIVE_COLLECTION_ENTRY_UPDATE_START =
  "ACTIVE_COLLECTION_ENTRY_UPDATE_START";

export const ACTIVE_COLLECTION_ENTRY_UPDATE_SUCCESS =
  "ACTIVE_COLLECTION_ENTRY_UPDATE_SUCCESS";

export const ACTIVE_COLLECTION_ENTRY_UPDATE_FAIL =
  "ACTIVE_COLLECTION_ENTRY_UPDATE_FAIL";

interface ActiveCollectionEntryUpdateStart {
  type: typeof ACTIVE_COLLECTION_ENTRY_UPDATE_START;
}

interface ActiveCollectionEntryUpdateSuccess {
  type: typeof ACTIVE_COLLECTION_ENTRY_UPDATE_SUCCESS;
}

interface ActiveCollectionEntryUpdateFail {
  type: typeof ACTIVE_COLLECTION_ENTRY_UPDATE_FAIL;
  payload: {
    error: string;
  };
}

export type ActiveCollectionEntryUpdateActionTypes =
  | ActiveCollectionEntryUpdateStart
  | ActiveCollectionEntryUpdateFail
  | ActiveCollectionEntryUpdateSuccess;

export const ACTIVE_COLLECTION_ENTRY_DELETE_START =
  "ACTIVE_COLLECTION_ENTRY_DELETE_START";

export const ACTIVE_COLLECTION_ENTRY_DELETE_SUCCESS =
  "ACTIVE_COLLECTION_ENTRY_DELETE_SUCCESS";

export const ACTIVE_COLLECTION_ENTRY_DELETE_FAIL =
  "ACTIVE_COLLECTION_ENTRY_DELETE_FAIL";

interface ActiveCollectionEntryDeleteStart {
  type: typeof ACTIVE_COLLECTION_ENTRY_DELETE_START;
}

interface ActiveCollectionEntryDeleteSuccess {
  type: typeof ACTIVE_COLLECTION_ENTRY_DELETE_SUCCESS;
}

interface ActiveCollectionEntryDeleteFail {
  type: typeof ACTIVE_COLLECTION_ENTRY_DELETE_FAIL;
}

export type ActiveCollectionEntryDeleteActionTypes =
  | ActiveCollectionEntryDeleteStart
  | ActiveCollectionEntryDeleteSuccess
  | ActiveCollectionEntryDeleteFail;

export const ACTIVE_COLLECTION_ENTRY_VIEW_VISIBILITY_SHOW =
  "ACTIVE_COLLECTION_ENTRY_VIEW_VISIBILITY_SHOW";

export const ACTIVE_COLLECTION_ENTRY_VIEW_VISIBILITY_HIDDEN =
  "ACTIVE_COLLECTION_ENTRY_VIEW_VISIBILITY_HIDDEN";

interface ActiveCollectionEntryViewVisibilityShow {
  type: typeof ACTIVE_COLLECTION_ENTRY_VIEW_VISIBILITY_SHOW;
}

interface ActiveCollectionEntryViewVisibilityHidden {
  type: typeof ACTIVE_COLLECTION_ENTRY_VIEW_VISIBILITY_HIDDEN;
}

export type ActiveCollectionEntryViewVisibilityActionTypes =
  | ActiveCollectionEntryViewVisibilityShow
  | ActiveCollectionEntryViewVisibilityHidden;

export const ACTIVE_COLLECTION_ENTRIES_OBSERVER_START =
  "ACTIVE_COLLECTION_ENTRIES_OBSERVER_START";

export const ACTIVE_COLLECTION_ENTRIES_OBSERVER_SUCCESS =
  "ACTIVE_COLLECTION_ENTRIES_OBSERVER_SUCCESS";

export const ACTIVE_COLLECTION_ENTRIES_OBSERVER_FAIL =
  "ACTIVE_COLLECTION_ENTRIES_OBSERVER_FAIL";

interface ActiveCollectionEntriesObserverStart {
  type: typeof ACTIVE_COLLECTION_ENTRIES_OBSERVER_START;
}

interface ActiveCollectionEntriesObserverSuccess {
  type: typeof ACTIVE_COLLECTION_ENTRIES_OBSERVER_SUCCESS;
  payload: any;
}

interface ActiveCollectionEntriesObserverFail {
  type: typeof ACTIVE_COLLECTION_ENTRIES_OBSERVER_FAIL;
}

export type ActiveCollectionEntriesObserverActionTypes =
  | ActiveCollectionEntriesObserverStart
  | ActiveCollectionEntriesObserverSuccess
  | ActiveCollectionEntriesObserverFail;

export const ACTIVE_COLLECTION_ATTRIBUTES_OBSERVER_START =
  "ACTIVE_COLLECTION_ATTRIBUTES_OBSERVER_START";

export const ACTIVE_COLLECTION_ATTRIBUTES_OBSERVER_SUCCESS =
  "ACTIVE_COLLECTION_ATTRIBUTES_OBSERVER_SUCCESS";

export const ACTIVE_COLLECTION_ATTRIBUTES_OBSERVER_FAIL =
  "ACTIVE_COLLECTION_ATTRIBUTES_OBSERVER_FAIL";

interface ActiveCollectionAttributesObserverStart {
  type: typeof ACTIVE_COLLECTION_ATTRIBUTES_OBSERVER_START;
}

interface ActiveCollectionAttributesObserverSuccess {
  type: typeof ACTIVE_COLLECTION_ATTRIBUTES_OBSERVER_SUCCESS;
  payload: any;
}

interface ActiveCollectionAttributesObserverFail {
  type: typeof ACTIVE_COLLECTION_ATTRIBUTES_OBSERVER_FAIL;
}

export type ActiveCollectionAttributesObserverActionTypes =
  | ActiveCollectionAttributesObserverStart
  | ActiveCollectionAttributesObserverSuccess
  | ActiveCollectionAttributesObserverFail;

export const ACTIVE_COLLECTION_CATEGORIES_OBSERVER_START =
  "ACTIVE_COLLECTION_CATEGORIES_OBSERVER_START";

export const ACTIVE_COLLECTION_CATEGORIES_OBSERVER_SUCCESS =
  "ACTIVE_COLLECTION_CATEGORIES_OBSERVER_SUCCESS";

export const ACTIVE_COLLECTION_CATEGORIES_OBSERVER_FAIL =
  "ACTIVE_COLLETION_CATEGORIES_OBSERVER_FAIL";

interface ActiveCollectionCategoriesObserverStart {
  type: typeof ACTIVE_COLLECTION_CATEGORIES_OBSERVER_START;
}

interface ActiveCollectionCategoriesObserverSuccess {
  type: typeof ACTIVE_COLLECTION_CATEGORIES_OBSERVER_SUCCESS;
  payload: Category[];
}

interface ActiveCollectionCategoriesObserverFail {
  type: typeof ACTIVE_COLLECTION_CATEGORIES_OBSERVER_FAIL;
}

export type ActiveCollectionCategoriesObserverActionTypes =
  | ActiveCollectionCategoriesObserverStart
  | ActiveCollectionCategoriesObserverSuccess
  | ActiveCollectionCategoriesObserverFail;

export const ACTIVE_COLLECTION_ENTRY_CREATE_START =
  "ACTIVE_COLLECTION_ENTRY_CREATE_START";

export const ACTIVE_COLLECTION_ENTRY_CREATE_SUCCESS =
  "ACTIVE_COLLECTION_ENTRY_CREATE_SUCCESS";

export const ACTIVE_COLLECTION_ENTRY_CREATE_FAIL =
  "ACTIVE_COLLECTION_ENTRY_CREATE_FAIL";

interface ActiveCollectionEntryCreateStart {
  type: typeof ACTIVE_COLLECTION_ENTRY_CREATE_START;
}

interface ActiveCollectionEntryCreateSuccess {
  type: typeof ACTIVE_COLLECTION_ENTRY_CREATE_SUCCESS;
}

interface ActiveCollectionEntryCreateFail {
  type: typeof ACTIVE_COLLECTION_ENTRY_CREATE_FAIL;
}

export type ActiveCollectionEntryCreateActionTypes =
  | ActiveCollectionEntryCreateStart
  | ActiveCollectionEntryCreateSuccess
  | ActiveCollectionEntryCreateFail;

export const ACTIVE_COLLECTION_ENTRY_SETUP_NEW =
  "ACTIVE_COLLECTION_ENTRY_SETUP_NEW";

export const ACTIVE_COLLECTION_ENTRY_SETUP_DISCARD =
  "ACTIVE_COLLECTION_ENTRY_SETUP_DISCARD";

export const ACTIVE_COLLECTION_ENTRY_SETUP_UPDATE =
  "ACTIVE_COLLECTION_ENTRY_SETUP_UPDATE";

interface ActiveCollectionEntrySetupUpdate {
  type: typeof ACTIVE_COLLECTION_ENTRY_SETUP_UPDATE;
  payload: any;
}

interface ActiveCollectionEntrySetupNew {
  type: typeof ACTIVE_COLLECTION_ENTRY_SETUP_NEW;
}

interface ActiveCollectionEntrySetupDiscard {
  type: typeof ACTIVE_COLLECTION_ENTRY_SETUP_DISCARD;
}

export type ActiveCollectionEntrySetupActionTypes =
  | ActiveCollectionEntrySetupNew
  | ActiveCollectionEntrySetupUpdate
  | ActiveCollectionEntrySetupDiscard;

export const SET_ACTIVE_CONTENT = "SET_ACTIVE_CONTENT";

export const ACTIVE_COLLECTION_SET_START = "ACTIVE_COLLECTION_SET_START";
export const ACTIVE_COLLECTION_SET_SUCCESS = "ACTIVE_COLLECTION_SET_SUCCESS";
export const ACTIVE_COLLECTION_SET_FAIL = "ACTIVE_COLLECTION_SET_FAIL";
export const ACTIVE_COLLECTION_ENTRIES_GET_START =
  "ACTIVE_COLLECTION_ENTRIES_GET_START";
export const ACTIVE_COLLECTION_ENTRIES_GET_SUCCESS =
  "ACTIVE_COLLECTION_ENTRIES_GET_START";
export const ACTIVE_COLLECTION_ENTRIES_GET_FAIL =
  "ACTIVE_COLLECTION_ENTRIES_GET_FAIL";

export const ACTIVE_COLLECTION_ENTRIES_CATEGORIES_GET_START =
  "ACTIVE_COLLECTION_ENTRIES_CATEGORIES_GET_START";

export const ACTIVE_COLLECTION_ENTRIES_CATEGORIES_GET_SUCCESS =
  "ACTIVE_COLLECTION_ENTRIES_CATEGORIES_GET_SUCCESS";

export const ACTIVE_COLLECTION_ENTRIES_CATEGORIES_GET_FAIL =
  "ACTIVE_COLLECTION_ENTRIES_CATEGORIES_GET_FAIL";

export interface ActiveCollectionEntriesCategoriesGetSuccess {
  type: typeof ACTIVE_COLLECTION_ENTRIES_CATEGORIES_GET_SUCCESS;
}

export interface ActiveCollectionEntriesCategoriesGetStart {
  type: typeof ACTIVE_COLLECTION_ENTRIES_CATEGORIES_GET_START;
}

export interface ActiveCollectionEntriesCategoriesGetFail {
  type: typeof ACTIVE_COLLECTION_ENTRIES_CATEGORIES_GET_FAIL;
}

export interface ActiveCollectionEntriesGetStart {
  type: typeof ACTIVE_COLLECTION_ENTRIES_GET_START;
}

export interface ActiveCollectionEntriesGetSuccess {
  type: typeof ACTIVE_COLLECTION_ENTRIES_GET_SUCCESS;
}

export interface ActiveCollectionEntriesGetFail {
  type: typeof ACTIVE_COLLECTION_ENTRIES_GET_FAIL;
}

export interface ActiveCollectionSetStart {
  type: typeof ACTIVE_COLLECTION_SET_START;
}

export interface ActiveCollectionSetSuccess {
  type: typeof ACTIVE_COLLECTION_SET_SUCCESS;
  payload: ActiveCollectionState;
}

export interface ActiveCollectionSetFail {
  type: typeof ACTIVE_COLLECTION_SET_FAIL;
}

export type ActiveCollectionEntriesCategoriesGetActionTypes =
  | ActiveCollectionEntriesCategoriesGetStart
  | ActiveCollectionEntriesCategoriesGetSuccess
  | ActiveCollectionEntriesCategoriesGetFail;

export type ActiveCollectionEntriesGetActionTypes =
  | ActiveCollectionEntriesGetStart
  | ActiveCollectionEntriesGetSuccess
  | ActiveCollectionEntriesGetFail;

export type ActiveCollectionSetActionTypes =
  | ActiveCollectionSetStart
  | ActiveCollectionSetFail
  | ActiveCollectionSetSuccess;

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

type DashboardItemOptional = Optional<DashboardItem, "fields">;

export interface ActiveCollectionState extends DashboardItem {
  entries: Array<any> | null | undefined;
  categories: Array<Category> | null | undefined;
  attributes: Record<string, Array<any>>;
  isCreating: boolean;
  isViewing: boolean;
  isUpdating: boolean;
  entrySelected: {
    entryUUID: string;
    entryValues: any;
  };
}

export interface SetActiveContent {
  type: typeof SET_ACTIVE_CONTENT;
  payload: DashboardItem;
}

export type SetActiveContentActionTypes = SetActiveContent;

export type ActiveContentActionTypes =
  | SetActiveContent
  | ActiveCollectionSetActionTypes
  | ActiveCollectionEntriesGetActionTypes
  | ActiveCollectionEntriesCategoriesGetActionTypes
  | ActiveCollectionEntrySetupActionTypes
  | ActiveCollectionEntryCreateActionTypes
  | ActiveCollectionCategoriesObserverActionTypes
  | ActiveCollectionAttributesObserverActionTypes
  | ActiveCollectionEntriesObserverActionTypes
  | ActiveCollectionEntryViewVisibilityActionTypes
  | ActiveCollectionEntryDeleteActionTypes
  | ActiveCollectionEntryUpdateActionTypes;
