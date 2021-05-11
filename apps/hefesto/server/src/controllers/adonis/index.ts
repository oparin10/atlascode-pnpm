import admin, { bucket } from "../../firebase";
import path from "path";
import os from "os";
import { nanoid } from "nanoid";
import sharp from "sharp";
import { Request, Response } from "express";
import fs from "fs";
import {adonisConfig} from '@hefesto/configuration'
import converToSlug from "../../helper/converToSlug";
import {AdonisImage, AdonisPath } from '@hefesto/types'



export const optimizeAndCreateThumbnail = async (
  req: Request,
  res: Response
) => {
  if (!req.body.fileName) {
    return res
      .json({
        error: "A file name must be supplied",
      })
      .status(400);
  }

  if (!req.body.base64URI) {
    return res
      .json({
        error: "A base64 URI must be supplied",
      })
      .status(400);
  }

  // if (!req.body.fileExtension) {
  //   return res.json({
  //     error: "A file extension must be supplied",
  //   });
  // }

  const validURI: string = req.body.base64URI.split(";base64,").pop();
  const imgBuffer: Buffer = Buffer.from(validURI, "base64");
  // Sanitize filename input
  const fileName: string = converToSlug(req.body.fileName);
  const fileExtension: string = "webp";
  const nanoID: string = nanoid();
  let fileNameWithExtension: string = `${fileName}.${fileExtension}`;
  const baseCloudURL: string = "https://firebasestorage.googleapis.com/v0/b/";
  const uploadTime: string = new Date().toISOString();

  let fileDuplicated = await bucket
    .file(
      `${adonisConfig.path.rootFolder}/${adonisConfig.path.gallery}/${fileNameWithExtension}`
    )
    .exists();

  if (fileDuplicated[0]) {
    let fileDuplicateID: string = nanoid(5);

    fileNameWithExtension = `${fileName}-${fileDuplicateID}.${fileExtension}`;
  }

  const imageMetadata = {
    cacheControl: "public, max-age=1296000",
    contentType: "image/webp",
    metadata: {
      uuid: nanoID,
      uploadDate: uploadTime,
      fileName: fileName,
    },
  };
  //   Temp dir file path for each img variation
  const fullResolutionImagePath: string = path.resolve(
    os.tmpdir(),
    fileNameWithExtension
  );

  const thumbnailImagePath: string = path.resolve(
    os.tmpdir(),
    `thumbnail-${fileNameWithExtension}`
  );

  const thumbnailBlurredImagePath: string = path.resolve(
    os.tmpdir(),
    `thumbnailBlur-${fileNameWithExtension}`
  );

  //   Cloud storage bucket path

  const bucketPath: AdonisPath = {
    rootFolder: adonisConfig.path.rootFolder,
    gallery: `${adonisConfig.path.rootFolder}/${adonisConfig.path.gallery}/${fileNameWithExtension}`,
    galleryThumbnail: `${adonisConfig.path.rootFolder}/${adonisConfig.path.galleryThumbnail}/${fileNameWithExtension}`,
    galleryThumbnailBlur: `${adonisConfig.path.rootFolder}/${adonisConfig.path.galleryThumbnailBlur}/${fileNameWithExtension}`,
  };

  //   Convert images, transform them and save them to OS temp folder

  const fullImgBuffer = await sharp(imgBuffer)
    .toFormat("webp", { nearLossless: true })
    .toBuffer();

  await sharp(fullImgBuffer).toFile(fullResolutionImagePath);

  await sharp(fullImgBuffer).resize(null, 400).toFile(thumbnailImagePath);

  await sharp(fullImgBuffer)
    .resize(null, 300)
    .blur(10)
    .toFile(thumbnailBlurredImagePath);

  // Upload every file to storage bucket

  await bucket.upload(fullResolutionImagePath, {
    destination: bucketPath.gallery,
    metadata: imageMetadata,
  });

  await bucket.upload(thumbnailImagePath, {
    destination: bucketPath.galleryThumbnail,
    metadata: imageMetadata,
  });

  await bucket.upload(thumbnailBlurredImagePath, {
    destination: bucketPath.galleryThumbnailBlur,
    metadata: imageMetadata,
  });

  // Delete files from OS's temporary directory to free up memory

  try {
    fs.unlinkSync(fullResolutionImagePath);
    fs.unlinkSync(thumbnailImagePath);
    fs.unlinkSync(thumbnailBlurredImagePath);
  } catch (error) {
    console.log(error);
  }

  let optimizationResponse: AdonisImage = {
    fileName: fileName,
    uuid: nanoID,
    gallery: `${baseCloudURL}${admin.storage().app.options.storageBucket}/o/${
      adonisConfig.path.rootFolder
    }%2F${adonisConfig.path.gallery}%2F${fileName}.${fileExtension}?alt=media`,
    gallery_thumbnail: `${baseCloudURL}${
      admin.storage().app.options.storageBucket
    }/o/${adonisConfig.path.rootFolder}%2F${
      adonisConfig.path.galleryThumbnail
    }%2F${fileName}.${fileExtension}?alt=media`,
    gallery_thumbnail_blur: `${baseCloudURL}${
      admin.storage().app.options.storageBucket
    }/o/${adonisConfig.path.rootFolder}%2F${
      adonisConfig.path.galleryThumbnailBlur
    }%2F${fileName}.${fileExtension}?alt=media`,
  };

  return res.json(optimizationResponse).status(200);
};
