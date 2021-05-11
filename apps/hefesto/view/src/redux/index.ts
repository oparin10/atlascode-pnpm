import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { authenticationReducer } from "./authentication/reducer";
import { globalUIReducer } from "./globalUI/reducer";
import { activeCollectionReducer } from "./activeCollection/reducer";
import { adonisReducer } from "./adonis/reducer";
import { colorPickerReducer } from "./colorPicker/reducer";
import { attributeDraftReducer } from "./attributeDraft/reducer";
import { categoryDraftReducer } from "./categoryDraft/reducer";

const rootReducer = combineReducers({
  auth: authenticationReducer,
  globalUI: globalUIReducer,
  activeCollection: activeCollectionReducer,
  adonis: adonisReducer,
  colorPicker: colorPickerReducer,
  attributeDraft: attributeDraftReducer,
  categoryDraft: categoryDraftReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
