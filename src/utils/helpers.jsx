import Toast from "../components/Toast";

export function formatTimestamp(timestamp) {
  const date = new Date(timestamp);

  const day = date.getUTCDate();
  const month = date.toLocaleString("id-ID", { month: "long" });
  const year = date.getUTCFullYear();

  const options = {
    timeZone: "Asia/Jakarta",
    hour: "2-digit",
    minute: "2-digit",
  };
  const time = date.toLocaleString("id-ID", options).replace(",", "");

  return `${day} ${month} ${year} ${time} WIB`;
}

export function formatNumber(number) {
  return number?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export function getSessionData(key) {
  const sessionData = sessionStorage.getItem(key);
  return sessionData ? JSON.parse(sessionData) : null;
}

export function setSessionData(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value));
}

export function isEmailValid(email) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(String(email).toLowerCase());
}

export function Uploader(handler) {
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";

  fileInput.onchange = (e) => {
    try {
      const file = e.target.files[0];

      const maxSize = 100 * 1024;
      if (file.size > maxSize) {
        throw new Error("Ukuran file terlalu besar (maksimal 100 KB)");
      }

      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!allowedTypes.includes(file.type)) {
        throw new Error("Tipe file tidak didukung. Gunakan JPG, PNG, atau GIF");
      }

      handler(file);
    } catch (error) {
      console.error("Error saat upload:", error.message);
      Toast.fire({
        icon: "error",
        title: "Gagal melakukan upload",
      });
    }
  };

  fileInput.click();
}

const helpers = {
  formatTimestamp,
  formatNumber,
  getSessionData,
  setSessionData,
  isEmailValid,
  Uploader,
};

export default helpers;
