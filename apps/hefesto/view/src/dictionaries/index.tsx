import { SvgIconTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import {
  AccessAlarm,
  Accessibility,
  Accessible,
  AccountBalance,
  AccountBox,
  AcUnit,
  Add,
  AddAlert,
  AddAPhoto,
  AddCircle,
  AddComment,
  AddPhotoAlternate,
  AddShoppingCart,
  Apps,
  ArrowBackRounded,
  AttachMoney,
  Build,
  CardTravel,
  Category,
  Close,
  Delete,
  DeleteForever,
  FileCopy,
  Group,
  LibraryBooks,
  MoreHoriz,
  Palette,
  Panorama,
  PhotoLibrary,
  Settings,
  SubdirectoryArrowRight,
} from "@material-ui/icons";

import {
  FormFieldTypes,
  IconTypes,
  DashboardItemCategory,
} from "@hefesto/types";
import DataCreation from "../components/DataCreation";
import DataVisualization from "../components/DataVisualization";
import React from "react";
import StringFormField from "../components/DataCreation/FormFields/StringFormField";
import TextFormField from "../components/DataCreation/FormFields/TextFormField";
import SelectFormField from "../components/DataCreation/FormFields/SelectFormField";
import { FormFieldComponentProps } from "../components/DataCreation/FormFields/Root";
import ImageFormField from "../components/DataCreation/FormFields/ImageFormField";
import PriceFormField from "../components/DataCreation/FormFields/PriceFormField";
import PhoneFormField from "../components/DataCreation/FormFields/PhoneFormField";
import MarkdownFormField from "../components/DataCreation/FormFields/MarkdownFormField";
import SwitchFormField from "../components/DataCreation/FormFields/SwitchFormField";
import RadioFormField from "../components/DataCreation/FormFields/RadioFormField";
import CheckboxFormField from "../components/DataCreation/FormFields/CheckboxFormField";
import DateFormField from "../components/DataCreation/FormFields/DateFormField";
import TimeFormField from "../components/DataCreation/FormFields/TimeFormField";
import StringArrayFormField from "../components/DataCreation/FormFields/StringArrayFormField";
import InstallmentsListFormField from "../components/DataCreation/FormFields/InstallmentsListFormField";
import SlugFormField from "../components/DataCreation/FormFields/SlugFormField";

export const IconDictonary: Record<
  IconTypes,
  OverridableComponent<SvgIconTypeMap<{}, "svg">>
> = {
  AccountBalance: AccountBalance,
  AttachMoney: AttachMoney,
  AcUnit: AcUnit,
  AccessAlarm: AccessAlarm,
  Accessibility: Accessibility,
  Accessible: Accessible,
  AccountBox: AccountBox,
  Add: Add,
  AddAPhoto: AddAPhoto,
  AddAlert: AddAlert,
  AddCircle: AddCircle,
  AddComment: AddComment,
  AddPhotoAlternate: AddPhotoAlternate,
  AddShoppingCart: AddShoppingCart,
  Apps: Apps,
  PhotoLibrary: PhotoLibrary,
  MoreHoriz: MoreHoriz,
  Close: Close,
  Settings: Settings,
  Delete: Delete,
  DeleteForever: DeleteForever,
  FileCopy: FileCopy,
  Category: Category,
  Palette: Palette,
  Panorama: Panorama,
  Build: Build,
  SubdirectoryArrowRight: SubdirectoryArrowRight,
  ArrowBackRounded: ArrowBackRounded,
  LibraryBooks: LibraryBooks,
  CardTravel: CardTravel,
  Group: Group,
};

export const DashboardItemDictionary: Record<
  DashboardItemCategory,
  React.FC<any>
> = {
  creation: DataCreation,
  visualization: DataVisualization,
};

export const FormFieldDictionary: Record<
  FormFieldTypes,
  React.FC<FormFieldComponentProps>
> = {
  string: StringFormField,
  select: SelectFormField,
  text: TextFormField,
  image: ImageFormField,
  money: PriceFormField,
  phone: PhoneFormField,
  markdown: MarkdownFormField,
  boolean: SwitchFormField,
  radio: RadioFormField,
  checkbox: CheckboxFormField,
  date: DateFormField,
  time: TimeFormField,
  list: StringArrayFormField,
  installment: InstallmentsListFormField,
  slug: SlugFormField,
};
