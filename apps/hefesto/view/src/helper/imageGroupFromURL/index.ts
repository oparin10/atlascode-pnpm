import { AdonisOrderedTriple } from "@hefesto/types";
import { storage } from "../../firebase";

const imageGroupFromURL = async (
  storageImageURL: string
): Promise<AdonisOrderedTriple | undefined> => {
  let getStorageImagePath: string;

  try {
    getStorageImagePath = storage.refFromURL(storageImageURL).fullPath;
  } catch (error) {
    console.log(error);
    return;
  }

  if (!getStorageImagePath) {
    return;
  }

  let storageURIArray: Array<string> = getStorageImagePath.split("/");
  storageURIArray.splice(storageURIArray.length - 1, 1);

  let parentPathIndex: number = 1;

  let thumbnailPath: Array<string> = [...storageURIArray];
  let thumbnailBlurPath: Array<string> = [...storageURIArray];

  thumbnailPath.splice(parentPathIndex, 1);
  thumbnailPath.splice(parentPathIndex, 0, "gallery_thumbnail");
  thumbnailBlurPath.splice(parentPathIndex, 1);
  thumbnailBlurPath.splice(parentPathIndex, 0, "gallery_thumbnail_blur");

  let imageGroup: AdonisOrderedTriple = {
    gallery: storageURIArray.join("/"),
    gallery_thumbnail: thumbnailPath.join("/"),
    gallery_thumbnail_blur: thumbnailBlurPath.join("/"),
  };

  let absoluteGalleryURL: string = await (
    await storage.ref().child(imageGroup.gallery).list()
  ).items[0].getDownloadURL();
  let absoluteGalleryThumbnailURL: string = await (
    await storage.ref().child(imageGroup.gallery_thumbnail).list()
  ).items[0].getDownloadURL();
  let absoluteGalleryThumbnailBlurURL: string = await (
    await storage.ref().child(imageGroup.gallery_thumbnail_blur).list()
  ).items[0].getDownloadURL();

  let imageGroupAbsolute: AdonisOrderedTriple = {
    gallery: absoluteGalleryURL,
    gallery_thumbnail: absoluteGalleryThumbnailURL,
    gallery_thumbnail_blur: absoluteGalleryThumbnailBlurURL,
  };

  return imageGroupAbsolute;
};

export default imageGroupFromURL;
