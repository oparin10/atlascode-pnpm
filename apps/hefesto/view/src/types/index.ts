import { SvgIconTypeMap } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { ConnectedProps } from "react-redux";
import { adonisGalleryConnector } from "../components/App/AdonisGallery";

export type RouterItem = {
  path: string;
  component: (props: any) => JSX.Element;
  label: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
};

export type AdonisGalleryReduxProps = ConnectedProps<
  typeof adonisGalleryConnector
>;
