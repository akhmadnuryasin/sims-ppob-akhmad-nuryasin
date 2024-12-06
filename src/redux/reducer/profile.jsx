import Swal from "sweetalert2";
import api from "../../service/api";
import formatNumber from "../../utils/helpers";

const type = {
  GET_PROFILE: "GET_PROFILE",
  UPDATE_BALANCE: "UPDATE_BALANCE",
  RESET_PROFILE: "RESET_PROFILE",
};

const defaultState = {
  email: "",
  first_name: "",
  last_name: "",
  profile_image: null,
  balance: 0,
};

export function ProfileReducer(state = defaultState, action) {
  switch (action.type) {
    case type.GET_PROFILE:
      return {
        ...action.payload,
        balance: state.balance,
      };
    case type.UPDATE_BALANCE:
      return {
        ...state,
        balance: action.payload.balance,
      };
    case type.RESET_PROFILE:
      return defaultState;
    default:
      return state;
  }
}

export const ProfileAction = (() => {
  function getProfile() {
    return async (dispatch) => {
      try {
        const response = await api.getProfile();

        dispatch({
          type: type.GET_PROFILE,
          payload: { ...response.data.data },
        });
      } catch (err) {
        console.error(err);
      }
    };
  }

  function updateProfile(first_name, last_name) {
    return async (dispatch) => {
      try {
        const response = await api.updateProfile(first_name, last_name);

        if (response.data.status !== 0) return new Error(response.message);

        Swal.fire({
          icon: "success",
          title: "Berhasil Memperbarui Profile",
          confirmButtonColor: "#ef4444",
          confirmButtonText: "Selesai",
        });

        dispatch({
          type: type.GET_PROFILE,
          payload: response.data.data,
        });
      } catch (err) {
        console.error(err);
      }
    };
  }

  function updateProfilePicture(file) {
    return async (dispatch) => {
      try {
        const response = await api.updateProfilePicture(file);

        if (response.data.status !== 0) return new Error(response.message);

        Swal.fire({
          icon: "success",
          title: "Berhasil Memperbarui Foto Profile",
          confirmButtonColor: "#ef4444",
          confirmButtonText: "Selesai",
        });

        dispatch({
          type: type.GET_PROFILE,
          payload: response.data.data,
        });
      } catch (err) {
        console.error(err);
      }
    };
  }

  function updateBalance() {
    return async (dispatch) => {
      try {
        const response = await api.getBalance();

        dispatch({
          type: type.UPDATE_BALANCE,
          payload: { balance: response.data.data.balance || 0 },
        });
      } catch (err) {
        console.error(err);
      }
    };
  }

  function topUp(nominal) {
    return async (dispatch) => {
      try {
        const response = await api.topUp(nominal);

        if (response.data.status !== 0) return new Error(response.message);

        Swal.fire({
          showConfirmButton: false,
          icon: "success",
          html: `
          <div>
          <h1 class="text-base mb-2">Top Up Sebesar</h1>
          <h1 class="text-2xl font-semibold">Rp${formatNumber(nominal)}</h1>
          <h1 class="text-base mb2">Berhasil</h1>
          </div>`,
          footer:
            '<a href="/" class="text-red-500 font-medium">Kembali ke Beranda</=>',
        });

        dispatch({
          type: type.UPDATE_BALANCE,
          payload: { balance: response.data.data.balance },
        });
      } catch (err) {
        Swal.fire({
          showConfirmButton: false,
          icon: "error",
          html: `
          <div>
          <h1 class="text-base mb-2">Top Up Sebesar</h1>
          <h1 class="text-2xl font-semibold">Rp${formatNumber(nominal)}</h1>
          <h1 class="text-base mb2">Berhasil</h1>
          </div>`,
          footer:
            '<a href="/" class="text-red-500 font-medium">Kembali ke Beranda</=>',
        });
        console.error(err);
      }
    };
  }

  function transaction(detail) {
    return async (dispatch, state) => {
      try {
        const { profile } = state();
        const response = await api.transaction(detail.service_code);

        if (response.data.status !== 0) return new Error(response.message);

        Swal.fire({
          showConfirmButton: false,
          icon: "success",
          html: `
          <div>
          <h1 class="text-base mb-2">Pembayaran ${
            detail.service_name
          } Sebesar</h1>
          <h1 class="text-2xl font-semibold">Rp${formatNumber(
            detail.service_tariff
          )}</h1>
          <h1 class="text-base mb2">Berhasil</h1>
          </div>`,
          footer:
            '<a href="/" class="text-red-500 font-medium">Kembali ke Beranda</=>',
        });

        dispatch({
          type: type.UPDATE_BALANCE,
          payload: { balance: profile.balance - detail.service_tariff },
        });
      } catch (err) {
        Swal.fire({
          showConfirmButton: false,
          icon: "error",
          html: `
          <div>
          <h1 class="text-base mb-2">Pembayaran ${
            detail.service_name
          } Sebesar</h1>
          <h1 class="text-2xl font-semibold">Rp${formatNumber(
            detail.service_tariff
          )}</h1>
          <h1 class="text-base mb2">Berhasil</h1>
          </div>`,
          footer:
            '<a href="/" class="text-red-500 font-medium">Kembali ke Beranda</=>',
        });
        console.error(err);
      }
    };
  }

  return {
    getProfile,
    updateProfile,
    updateProfilePicture,
    updateBalance,
    topUp,
    transaction,
  };
})();
