export interface AdonisPath {
  rootFolder: string;
  gallery: string;
  galleryThumbnail: string;
  galleryThumbnailBlur: string;
}

export type AdonisOrderedTriple = {
  gallery: string;
  gallery_thumbnail: string;
  gallery_thumbnail_blur: string;
};

export type RoadmapItemType = {
  complete: boolean;
  label: string;
  last?: boolean;
};

export interface AdonisImage extends AdonisOrderedTriple {
  fileName: string;
  uuid: string;
}

export interface AdonisConfig {
  path: AdonisPath;
  createBlur: boolean;
  storageBucketPath: string;
  baseCloudURL: string;
}

export type SeverityLevel = "success" | "error" | "warning" | "info";
export type BrandingConfig = {
  companyName: string | null;
  companyWebsite: string | null;
  logoUrl: string | null;
};

export type DashboardItemCategory = "creation" | "visualization";

export interface DashboardItemRoot {
  itemID: string;
  routerPath: string;
  sidebarLabel: string;
  sidebarIcon: IconTypes;
  itemCategory: DashboardItemCategory;
}

export interface CheckboxField extends RadioField {}

export interface RadioField {
  value: string;
  label: string;
}

export interface FieldGroup {
  id: string;
  label: string;
}

export interface ListFieldOptions {
  label: string;
  fieldLabel: string;
  min?: number;
  max?: number;
}

export interface Attribute {
  label: string;
  name: string;
  attributeValues: Array<string>;
}

export interface AttributeCollectionField {
  label: string;
  name: string;
}

export interface Category {
  uuid: string;
  root?: boolean;
  label: string;
  parent: string | null | undefined;
  uuid_path: Array<string>;
  label_path?: Array<string>;
}

export type DashboardItem = DataCreationItem;

export interface DataCreationItem extends DashboardItemRoot {
  collectionRef: string;
  fields: Array<DataCreationField>;
  attributesFields?: Array<AttributeCollectionField>;
  hasCategories?: boolean | null;
  hasAttributes?: boolean | null;
  fieldGroups?: FieldGroup[];
  showID?: boolean;
}

export interface DataCreationField {
  fieldType: FormFieldTypes;
  label: string;
  initialValue?: string | Array<string>;
  selectOptions?: Array<string>;
  radioOptions?: Array<RadioField>;
  checkboxOptions?: Array<CheckboxField>;
  listOptions?: ListFieldOptions;
  hidden?: boolean;
  private?: boolean;
  required?: boolean;
  currencyPrefix?: string;
  slug?: boolean;
  groupID?: string;
  name: string;
}

export type FormFieldTypes =
  | "string"
  | "select"
  | "text"
  | "image"
  | "money"
  | "phone"
  | "markdown"
  | "boolean"
  | "radio"
  | "checkbox"
  | "date"
  | "time"
  | "list"
  | "installment"
  | "slug";

export type IconTypes =
  | "AttachMoney"
  | "AccountBalance"
  | "AcUnit"
  | "AccessAlarm"
  | "Accessibility"
  | "Accessible"
  | "AccountBox"
  | "Add"
  | "AddAPhoto"
  | "AddAlert"
  | "AddCircle"
  | "AddComment"
  | "AddPhotoAlternate"
  | "AddShoppingCart"
  | "Apps"
  | "PhotoLibrary"
  | "MoreHoriz"
  | "Close"
  | "Settings"
  | "FileCopy"
  | "Delete"
  | "DeleteForever"
  | "Category"
  | "Palette"
  | "Panorama"
  | "Build"
  | "SubdirectoryArrowRight"
  | "ArrowBackRounded"
  | "LibraryBooks"
  | "CardTravel"
  | "Group";
