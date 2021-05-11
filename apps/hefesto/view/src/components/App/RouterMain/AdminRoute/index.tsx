import { Redirect, RouteComponentProps, useNavigate } from "@reach/router";
import React, { Suspense } from "react";
import { connect, ConnectedProps } from "react-redux";
import { DashboardItem, DashboardItemCategory } from "@hefesto/types";
import { collections } from "../../../../config/collections.config";
import { loginRedirect } from "../../../../config/routes.config";
import { RootState } from "../../../../redux";
import { setupActiveCollection } from "../../../../redux/activeCollection/actions";

interface Props extends AdminRouteReduxProps, RouteComponentProps {
  dashboardItemType: DashboardItemCategory;
  dashboardItemID: string;
}

const AdminComponent = React.lazy(
  () => import("../../../RootComponents/DashboardItemComponent")
);

const AdminRoute = ({
  auth,
  dashboardItemID,
  dashboardItemType,
  setupActiveCollection,
  location,
  path,
  uri,
}: Props) => {
  React.useEffect(() => {
    let collectionsDataInternal: DashboardItem[] = collections.filter(
      (dashboardItem: DashboardItem, index: number) => {
        return dashboardItem.itemID === dashboardItemID;
      }
    );

    setupActiveCollection(collectionsDataInternal[0]);
  }, []);

  return (
    <React.Fragment>
      {auth ? (
        <Suspense fallback={<div>Loading...</div>}>
          <AdminComponent dashboardItemType={dashboardItemType} />
        </Suspense>
      ) : (
        <Redirect noThrow to={`/${loginRedirect}`} />
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state: RootState) => ({
  auth: state.auth.isAuth,
});

const mapDispatchToProps = {
  setupActiveCollection: setupActiveCollection,
};

const adminRouteConnector = connect(mapStateToProps, mapDispatchToProps);

export type AdminRouteReduxProps = ConnectedProps<typeof adminRouteConnector>;

export default adminRouteConnector(AdminRoute);
