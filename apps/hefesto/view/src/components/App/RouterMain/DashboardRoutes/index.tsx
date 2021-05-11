import { RouteComponentProps, Router, useNavigate } from "@reach/router";
import React from "react";
import AdminRoute from "../AdminRoute";
import { DataCreationItem } from "@hefesto/types";
import AdonisGallery from "../../AdonisGallery";
import Toolbox from "../../Toolbox";
import ColorPicker from "../../ColorPicker";
import CategoryDialog from "../../CategoryDialog";
import EntryCreation from "../../../DataCreation/DraftEntry";
import EntryView from "../../../DataCreation/EntryView";
import { useAppSelector } from "../../../../hooks/useAppSelector";
import AppLayout from "../../../../layout_v2/Main";
import useReferenceSize from "../../../../hooks/useReferenceSize";
import { collections } from "../../../../config/collections.config";

interface Props extends RouteComponentProps {}

const DashboardRoutes = ({ location, navigate, path, uri }: Props) => {
  const { isCreating, isUpdating } = useAppSelector(
    (state) => state.activeCollection
  );

  return (
    <div>
      <AdonisGallery />
      <Toolbox />
      <ColorPicker />
      <CategoryDialog />
      <EntryCreation />
      <EntryView />
      <AppLayout>
        <Router id="dashboardContent">
          {collections.map(
            (dataCreationItem: DataCreationItem, index: number) => {
              return (
                <AdminRoute
                  key={index}
                  dashboardItemID={dataCreationItem.itemID}
                  dashboardItemType={dataCreationItem.itemCategory}
                  path={dataCreationItem.routerPath}
                />
              );
            }
          )}
        </Router>
      </AppLayout>
    </div>
  );
};

export default DashboardRoutes;
