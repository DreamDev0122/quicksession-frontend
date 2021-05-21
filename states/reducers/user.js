import { FETCH_USER, FETCH_ERROR, LOAD_PAGE } from "../types";

export function user(state, action) {
  switch (action.type) {
    case FETCH_USER:
      return {
        loading: false,
        auth: action.payload || false,
        error: "",
      };
    case FETCH_ERROR:
      return {
        loading: false,
        auth: {},
        error: "Something went wrong!",
      };
    case LOAD_PAGE:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
}
