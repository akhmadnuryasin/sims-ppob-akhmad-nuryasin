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
