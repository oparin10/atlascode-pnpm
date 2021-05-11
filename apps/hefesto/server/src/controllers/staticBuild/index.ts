import { Request, Response } from "express";
import Axios from "axios";
import {
  dispatchURL,
  eventType,
  workflowBearerKey,
} from "../../config/workflow.config";

type RequestParams = {
  eventType: string;
};

type RequestBody = {
  event_type: string;
};

type ResponseBody = {};

type RequestQuery = {};

export const staticGithubActionBuild = async (
  req: Request<RequestParams, ResponseBody, RequestBody, RequestQuery>,
  res: Response
) => {
  let responseMessage: string;

  Axios.post(
    dispatchURL,
    { event_type: eventType },
    {
      headers: {
        Authorization: `Bearer ${workflowBearerKey}`,
        "Content-Type": "application/json",
        Accept: "application/vnd.github.v3+json",
      },
    }
  )
    .then((result) => {
      console.log(result.data);

      res.json({ message: responseMessage }).status(200);
    })
    .catch((error) => {
      res.json({ error: error, message: error.message }).status(500);
    });
};
