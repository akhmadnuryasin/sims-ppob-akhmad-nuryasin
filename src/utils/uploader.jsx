import Toast from "../components/Toats";

export default function Uploader(handler) {
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";

  fileInput.onchange = (e) => {
    try {
      const file = e.target.files[0];

      const maxSize = 100 * 1024;
      if (file.size > maxSize) {
        throw new Error("Ukuran file terlalu besar (maksimal 100 kb)");
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
