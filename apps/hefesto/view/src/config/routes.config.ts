import { collections } from "./collections.config";

export const basePath: string = "admin";
export const dashboardPath: string = "dashboard";
export const loginRedirect: string = `${basePath}/login`;
export const startingPath: string = `${basePath}/${dashboardPath}/${collections[0].routerPath}`;
