import { AdonisImage } from "@hefesto/types";

export const SET_ADONIS_GALLERY_OPEN = "SET_ADONIS_GALLERY_OPEN";
export const SET_ADONIS_GALLERY_CLOSE = "SET_ADONIS_GALLERY_CLOSE";

export const GET_ADONIS_GALLERY_PHOTOS_START =
  "GET_ADONIS_GALLERY_PHOTOS_START";
export const GET_ADONIS_GALLERY_PHOTOS_SUCCESS =
  "GET_ADONIS_GALLERY_PHOTOS_SUCCESS";
export const GET_ADONIS_GALLERY_PHOTOS_FAIL = "GET_ADONIS_GALLERY_PHOTOS_FAIL";

export const SET_ADONIS_SELECTED_PHOTO = "SET_ADONIS_SELECTED_PHOTO";

export const UPLOAD_ADONIS_PHOTO_START = "UPLOAD_ADONIS_PHOTO_START";
export const UPLOAD_ADONIS_PHOTO_SUCCESS = "UPLOAD_ADONIS_PHOTO_SUCCESS";
export const UPLOAD_ADONIS_PHOTO_FAIL = "UPLOAD_ADONIS_PHOTO_FAIL";

export const SET_ADONIS_ACTIVE_PHOTO = "SET_ADONIS_ACTIVE_PHOTO";
export const SET_ADONIS_ACTIVE_PHOTO_NULL = "SET_ADONIS_ACTIVE_PHOTO_NULL";

export const DELETE_ADONIS_IMAGE_START = "DELETE_ADONIS_IMAGE_START";
export const DELETE_ADONIS_IMAGE_SUCCESS = "DELETE_ADONIS_IMAGE_SUCCESS";
export const DELETE_ADONIS_IMAGE_FAIL = "DELETE_ADONIS_IMAGE_FAIL";

interface DeleteAdonisImageStart {
  type: typeof DELETE_ADONIS_IMAGE_START;
}

interface DeleteAdonisImageSuccessPayload {
  deletedImageURL: string;
}

interface DeleteAdonisImageSuccess {
  type: typeof DELETE_ADONIS_IMAGE_SUCCESS;
  payload: DeleteAdonisImageSuccessPayload;
}

interface DeleteAdonisImageFail {
  type: typeof DELETE_ADONIS_IMAGE_FAIL;
}

export type DeleteAdonisImageActionTypes =
  | DeleteAdonisImageStart
  | DeleteAdonisImageSuccess
  | DeleteAdonisImageFail;

interface SetAdonisActivePhoto {
  type: typeof SET_ADONIS_ACTIVE_PHOTO;
  payload: AdonisImage;
}

interface SetAdonisActivePhotoNull {
  type: typeof SET_ADONIS_ACTIVE_PHOTO_NULL;
}

interface UploadAdonisPhotoStart {
  type: typeof UPLOAD_ADONIS_PHOTO_START;
}

interface UploadAdonisPhotoFail {
  type: typeof UPLOAD_ADONIS_PHOTO_FAIL;
}

interface UploadAdonisPhotoSuccess {
  type: typeof UPLOAD_ADONIS_PHOTO_SUCCESS;
  payload: AdonisImage;
}

export type SetAdonisActivePhotoActionTypes =
  | SetAdonisActivePhoto
  | SetAdonisActivePhotoNull;

export type UploadAdonisPhotoActionTypes =
  | UploadAdonisPhotoStart
  | UploadAdonisPhotoSuccess
  | UploadAdonisPhotoFail;

interface SetAdonisSelectedPhoto {
  type: typeof SET_ADONIS_SELECTED_PHOTO;
}

export type SetAdonisSelectedPhotoActionTypes = SetAdonisSelectedPhoto;

export interface AdonisGalleryState {
  gallery: Array<AdonisImage>;
  selectedPhoto: AdonisImage;
  isPhotoSelected: boolean;
  isOpen: boolean;
  isLoading: boolean;
}

interface SetAdonisGalleryOpen {
  type: typeof SET_ADONIS_GALLERY_OPEN;
}

interface SetAdonisGalleryClose {
  type: typeof SET_ADONIS_GALLERY_CLOSE;
}

export type SetAdonisGalleryComponentActionTypes =
  | SetAdonisGalleryClose
  | SetAdonisGalleryOpen;

interface GetAdonisGalleryPhotosStart {
  type: typeof GET_ADONIS_GALLERY_PHOTOS_START;
}

interface GetAdonisGalleryPhotosSuccess {
  type: typeof GET_ADONIS_GALLERY_PHOTOS_SUCCESS;
  payload: Array<AdonisImage>;
}

interface GetAdonisGalleryPhotosFail {
  type: typeof GET_ADONIS_GALLERY_PHOTOS_FAIL;
  payload: any;
}

export type GetAdonisGalleryPhotosActionTypes =
  | GetAdonisGalleryPhotosStart
  | GetAdonisGalleryPhotosSuccess
  | GetAdonisGalleryPhotosFail;

export type AdonisActionTypes =
  | GetAdonisGalleryPhotosActionTypes
  | SetAdonisGalleryComponentActionTypes
  | SetAdonisSelectedPhotoActionTypes
  | UploadAdonisPhotoActionTypes
  | SetAdonisActivePhotoActionTypes
  | DeleteAdonisImageActionTypes;
