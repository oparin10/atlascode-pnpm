import { AdonisImage } from "@hefesto/types";
import {
  AdonisGalleryState,
  AdonisActionTypes,
  SET_ADONIS_GALLERY_OPEN,
  SET_ADONIS_GALLERY_CLOSE,
  UPLOAD_ADONIS_PHOTO_START,
  UPLOAD_ADONIS_PHOTO_FAIL,
  UPLOAD_ADONIS_PHOTO_SUCCESS,
  GET_ADONIS_GALLERY_PHOTOS_SUCCESS,
  GET_ADONIS_GALLERY_PHOTOS_START,
  GET_ADONIS_GALLERY_PHOTOS_FAIL,
  SET_ADONIS_ACTIVE_PHOTO,
  SET_ADONIS_ACTIVE_PHOTO_NULL,
  DELETE_ADONIS_IMAGE_SUCCESS,
} from "../types";

let initialState: AdonisGalleryState = {
  gallery: [],
  selectedPhoto: {
    fileName: "",
    gallery: "",
    gallery_thumbnail: "",
    gallery_thumbnail_blur: "",
    uuid: "",
  },
  isPhotoSelected: false,
  isOpen: false,
  isLoading: false,
};

export const adonisReducer = (
  state = initialState,
  action: AdonisActionTypes
): AdonisGalleryState => {
  switch (action.type) {
    case DELETE_ADONIS_IMAGE_SUCCESS:
      let localGalleryArray: Array<AdonisImage> = [...state.gallery];

      let removeDeletedItem: Array<AdonisImage> = localGalleryArray.filter(
        (adonisImage) => {
          return adonisImage.gallery !== action.payload.deletedImageURL;
        }
      );

      return {
        ...state,
        gallery: removeDeletedItem,
        selectedPhoto: initialState.selectedPhoto,
        isPhotoSelected: false,
      };

    case SET_ADONIS_ACTIVE_PHOTO:
      return { ...state, selectedPhoto: action.payload, isPhotoSelected: true };

    case SET_ADONIS_ACTIVE_PHOTO_NULL:
      return {
        ...state,
        isPhotoSelected: false,
        selectedPhoto: {
          fileName: "",
          gallery: "",
          gallery_thumbnail: "",
          gallery_thumbnail_blur: "",
          uuid: "",
        },
      };

    case SET_ADONIS_GALLERY_OPEN:
      return { ...state, isOpen: true };

    case SET_ADONIS_GALLERY_CLOSE:
      return {
        ...state,
        isOpen: false,
        selectedPhoto: {
          fileName: "",
          gallery: "",
          gallery_thumbnail: "",
          gallery_thumbnail_blur: "",
          uuid: "",
        },
        isPhotoSelected: false,
      };

    case UPLOAD_ADONIS_PHOTO_START: {
      return { ...state };
    }

    case UPLOAD_ADONIS_PHOTO_FAIL: {
      return { ...state };
    }

    case UPLOAD_ADONIS_PHOTO_SUCCESS: {
      let localGalleryArray: Array<AdonisImage> = [...state.gallery];

      localGalleryArray.splice(0, 0, action.payload);

      return {
        ...state,
        gallery: localGalleryArray,
      };
    }
    case GET_ADONIS_GALLERY_PHOTOS_START: {
      return { ...state, isLoading: true };
    }

    case GET_ADONIS_GALLERY_PHOTOS_SUCCESS: {
      return { ...state, isLoading: false, gallery: action.payload };
    }

    case GET_ADONIS_GALLERY_PHOTOS_FAIL: {
      return { ...state, isLoading: false };
    }

    default:
      return state;
  }
};
