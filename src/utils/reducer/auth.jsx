import { getSessionData, setSessionData } from "../session";
import Toast from "../../components/Toats";
import axios from "axios";
import api from "../api";

const type = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
};

const defaultState = {
  isLogin: false,
  user: null,
};

export function AuthReducer(state = defaultState, action = {}) {
  switch (action.type) {
    case type.LOGIN:
      return {
        isLogin: true,
        user: action.payload,
      };
    case type.LOGOUT:
      return {
        isLogin: false,
        user: null,
      };
    default:
      return state;
  }
}

export const AuthAction = (() => {
  function Login(email, password) {
    return async (dispatch) => {
      try {
        const response = await api.login(email, password);

        if (response.data.status !== 0) return new Error(response);

        const expiresIn = 8 * 60 * 60 * 1000;
        const payload = {
          token: response.data.data.token,
          expiresAt: new Date().getTime() + expiresIn,
        };

        setSessionData("auth", JSON.stringify(payload));
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${payload.token}`;

        dispatch({
          type: type.LOGIN,
          payload,
        });
      } catch (err) {
        Toast.fire({
          icon: "error",
          title: err.response.data.message || "Gagal Melakukan Login",
        });
        console.log(err);
      }
    };
  }

  function Register(email, first_name, last_name, password) {
    return async (dispatch) => {
      try {
        const response = await api.register(
          email,
          first_name,
          last_name,
          password
        );

        if (response.data.status !== 0) return new Error(response);

        const response_login = await api.login(email, password);
        const expiresIn = 8 * 60 * 60 * 1000;

        const payload = {
          token: response_login.data.data.token,
          expiresAt: new Date().getTime() + expiresIn,
        };

        setSessionData("auth", JSON.stringify(payload));
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${payload.token}`;

        dispatch({
          type: type.LOGIN,
          payload,
        });
      } catch (err) {
        Toast.fire({
          icon: "error",
          title: err.response.data.message || "Gagal Melakukan Registrasi",
        });
        console.error(err);
      }
    };
  }

  function CheckLogin() {
    return async (dispatch) => {
      const data = JSON.parse(getSessionData("auth"));

      if (!data?.token) return;

      const currentTime = new Date().getTime();
      if (currentTime > data.expiresAt) {
        setSessionData("auth", JSON.stringify({}));
        delete axios.defaults.headers.common["Authorization"];

        dispatch({
          type: type.LOGOUT,
        });

        return;
      }

      axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;

      dispatch({
        type: type.LOGIN,
        payload: data,
      });
    };
  }

  function Logout() {
    return async (dispatch) => {
      setSessionData("auth", JSON.stringify({}));
      delete axios.defaults.headers.common["Authorization"];

      dispatch({
        type: type.LOGOUT,
      });

      dispatch({
        type: "RESET_PROFILE",
      });
    };
  }

  return {
    Login,
    Register,
    CheckLogin,
    Logout,
  };
})();
