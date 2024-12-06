import api from "../../service/api";

const type = {
  GET_SERVICE: "GET_SERVICE",
};

export function ServiceReducer(state = [], action = {}) {
  switch (action.type) {
    case type.GET_SERVICE:
      return [...action.payload];
    default:
      return state;
  }
}

export const ServiceAction = (() => {
  function getService() {
    return async (dispatch) => {
      try {
        const response = await api.getService();

        dispatch({
          type: type.GET_SERVICE,
          payload: [...response.data.data],
        });
      } catch (err) {
        console.error(err);
      }
    };
  }
  return { getService };
})();
