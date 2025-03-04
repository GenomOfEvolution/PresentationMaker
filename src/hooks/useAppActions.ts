import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import ActionCreators from "../store/redux/ActionCreators";

const useAppActions = () => {
  const dispatch = useDispatch();

  return bindActionCreators(ActionCreators, dispatch);
};

export { useAppActions };
