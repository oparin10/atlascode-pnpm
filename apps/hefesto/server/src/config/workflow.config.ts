import * as functions from "firebase-functions";

const repositoryName: string = "portalbens-nextjs-frontend";
const repositoryOwner: string = "oparin10";
export const eventType: string = "forge";
export const workflowBearerKey: string = "";

try {
  functions.config().workflow?.github?.app?.key ?? "";
} catch (error) {
  console.log(error);
}

export const dispatchURL: string = `https://api.github.com/repos/${repositoryOwner}/${repositoryName}/dispatches`;
