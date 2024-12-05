export function getSessionData(key) {
  const sessionData = sessionStorage.getItem(key);
  return sessionData ? JSON.parse(sessionData) : null;
}

export function setSessionData(key, value) {
  sessionStorage.setItem(key, JSON.stringify(value));
}
