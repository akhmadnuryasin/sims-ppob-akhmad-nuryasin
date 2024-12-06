import axios from "axios";

export default (() => {
  const BASE_URL = "https://take-home-test-api.nutech-integrasi.com";

  axios.defaults.headers.post["Content-Type"] = "application/json";
  axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

  async function register(email, first_name, last_name, password) {
    const url = BASE_URL + "/registration";

    const response = await axios.post(url, {
      email,
      first_name,
      last_name,
      password,
    });

    return response;
  }

  async function login(email, password) {
    const url = BASE_URL + "/login";

    const response = await axios.post(url, { email, password });

    return response;
  }

  async function getProfile() {
    const url = BASE_URL + "/profile";

    const response = await axios.get(url);

    return response;
  }

  async function updateProfile(first_name, last_name) {
    const url = BASE_URL + "/profile/update";

    const response = await axios.put(url, { first_name, last_name });

    return response;
  }

  async function updateProfilePicture(file) {
    const url = BASE_URL + "/profile/image";

    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.put(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  }

  async function getBalance() {
    const url = BASE_URL + "/balance";

    const response = await axios.get(url);

    return response;
  }

  async function getService() {
    const url = BASE_URL + "/services";

    const response = await axios.get(url);

    return response;
  }

  async function getBanner() {
    const url = BASE_URL + "/banner";

    const response = await axios.get(url);

    return response;
  }

  async function topUp(nominal) {
    const url = BASE_URL + "/topup";

    const response = await axios.post(url, { top_up_amount: nominal });

    return response;
  }

  async function transaction(service_code) {
    const url = BASE_URL + "/transaction";

    const response = await axios.post(url, { service_code });

    return response;
  }

  async function historyTransaction(page) {
    const limit = 5;
    const offset = limit * (page - 1);

    const url =
      BASE_URL + `/transaction/history?offset=${offset}&limit=${limit}`;

    const response = await axios.get(url);

    return response;
  }

  return {
    register,
    login,
    getProfile,
    updateProfile,
    updateProfilePicture,
    getBalance,
    getService,
    getBanner,
    topUp,
    transaction,
    historyTransaction,
  };
})();
