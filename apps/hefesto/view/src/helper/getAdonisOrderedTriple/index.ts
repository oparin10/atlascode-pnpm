import { adonisConfig } from "@hefesto/configuration";
import { AdonisOrderedTriple } from "@hefesto/types";

const getAdonisOrderedTriple = (
  fileName: string,
  adonisID?: string
): AdonisOrderedTriple => {
  let adonisImagePath: AdonisOrderedTriple;

  if (adonisID) {
    adonisImagePath = {
      gallery: `${adonisConfig.baseCloudURL}${adonisConfig.storageBucketPath}/o/${adonisConfig.path.rootFolder}%2F${adonisConfig.path.gallery}%2F${adonisID}%2F${fileName}?alt=media`,
      gallery_thumbnail: `${adonisConfig.baseCloudURL}${adonisConfig.storageBucketPath}/o/${adonisConfig.path.rootFolder}%2F${adonisConfig.path.galleryThumbnail}%2F${adonisID}%2F${fileName}?alt=media`,
      gallery_thumbnail_blur: `${adonisConfig.baseCloudURL}${adonisConfig.storageBucketPath}/o/${adonisConfig.path.rootFolder}%2F${adonisConfig.path.galleryThumbnailBlur}%2F${adonisID}%2F${fileName}?alt=media`,
    };
  } else {
    adonisImagePath = {
      gallery: `${adonisConfig.baseCloudURL}${adonisConfig.storageBucketPath}/o/${adonisConfig.path.rootFolder}%2F${adonisConfig.path.gallery}%2F${fileName}?alt=media`,
      gallery_thumbnail: `${adonisConfig.baseCloudURL}${adonisConfig.storageBucketPath}/o/${adonisConfig.path.rootFolder}%2F${adonisConfig.path.galleryThumbnail}%2F${fileName}?alt=media`,
      gallery_thumbnail_blur: `${adonisConfig.baseCloudURL}${adonisConfig.storageBucketPath}/o/${adonisConfig.path.rootFolder}%2F${adonisConfig.path.galleryThumbnailBlur}%2F${fileName}?alt=media`,
    };
  }

  return adonisImagePath;
};

export default getAdonisOrderedTriple;
