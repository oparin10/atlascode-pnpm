import { Request, Response } from "express";
import { db } from "../../firebase/";
import converToSlug from "../../helper/converToSlug";

export const getEntry = async (req: Request, res: Response) => {
  const collectionRef: string = req.params.collectionRef;

  db.collection("collections")
    .doc(collectionRef)
    .collection("entries")
    .get()
    .then((collectionSnapshot) => {
      ("");
      let dataArrayInternal: any[] = [];

      collectionSnapshot.forEach((collectionData) => {
        dataArrayInternal.push(collectionData.data());
      });

      return dataArrayInternal;
    })
    .then((dataArray) => {
      return res.json(dataArray).status(200);
    })
    .catch((error) => {
      return res.status(400).json({ error: error, message: error.message });
    });
};

type RequestParams = {
  collectionRef: string;
  id: string;
};

export const getEntryByID = async (
  req: Request<RequestParams, {}, {}, {}>,
  res: Response
) => {
  const collectionRef: string = req.params.collectionRef;
  const entryUUID: string = req.params.id;

  db.collection("collections")
    .doc(collectionRef)
    .collection("entries")
    .where("uuid", "==", entryUUID)
    .get()
    .then((entrySnapshot) => {
      let entryDataInternal: any;

      entrySnapshot.forEach((entryData) => {
        entryDataInternal = entryData.data();
      });

      return res.json(entryDataInternal).status(200);
    })
    .catch((error) => {
      return res.status(400).json({ error: error, message: error.message });
    });
};

type GetEntryWhereRequestParams = {
  collectionRef: string;
};

type GetEntryWhereQueryStrings = {};

type GetEntryWhereBody = {
  key: string;
  value: string;
};

export const getEntryWhere = async (
  req: Request<
    GetEntryWhereRequestParams,
    {},
    GetEntryWhereBody,
    GetEntryWhereQueryStrings
  >,
  res: Response
) => {
  const collectionRef: string = req.params.collectionRef;

  if (!req.body.key || !req.body.value) {
    return res.status(400).json({
      message: "Invalid request format. You must provide a key and a value",
    });
  }

  db.collection("collections")
    .doc(collectionRef)
    .collection("entries")
    .where(req.body.key, "==", req.body.value)
    .get()
    .then((entrySnapshopt) => {
      let entryDataInternal: any;

      entrySnapshopt.forEach((entryRef) => {
        entryDataInternal = entryRef.data();
      });

      return res.json(entryDataInternal).status(200);
    })
    .catch((error) => {
      return res.status(500).json({ error: error, message: error.message });
    });
};
