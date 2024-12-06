import api from "../../service/api";

const type = {
  GET_BANNER: "GET_BANNER",
};

export function BannerReducer(state = [], action = {}) {
  switch (action.type) {
    case type.GET_BANNER:
      return [...action.payload];
    default:
      return state;
  }
}

export const BannerAction = (() => {
  function getBanner() {
    return async (dispatch) => {
      try {
        const response = await api.getBanner();

        dispatch({
          type: type.GET_BANNER,
          payload: [...response.data.data],
        });
      } catch (err) {
        console.error(err);
      }
    };
  }
  return { getBanner };
})();
