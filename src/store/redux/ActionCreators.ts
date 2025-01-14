import * as SlideActionCreators from "./SlideActionCreators";
import * as ElementActionCreators from "./ElementActionCreators";
import * as EditorActionCreators from "./EditorActionCreators";
import * as TextActionCreators from "./TextActionCreators";

export default {
  ...SlideActionCreators,
  ...ElementActionCreators,
  ...EditorActionCreators,
  ...TextActionCreators,
};
