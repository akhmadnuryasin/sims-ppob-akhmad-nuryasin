import api from "../../service/api";

const type = {
  GET_HISTORY: "GET_HISTORY",
};

export function HistoryReducer(state = [], action = {}) {
  switch (action.type) {
    case type.GET_HISTORY:
      return [...action.payload];
    default:
      return state;
  }
}

export const HistoryAction = (() => {
  function getHistoryTransaction(page) {
    return async (dispatch) => {
      try {
        const response = await api.historyTransaction(page);

        dispatch({
          type: type.GET_HISTORY,
          payload: [...response.data.data.records],
        });
      } catch (err) {
        console.error(err);
      }
    };
  }
  return { getHistoryTransaction };
})();
