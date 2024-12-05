import { useState } from "react";

export default function Image(props) {
  const { fallback = null } = props;
  const [isBroken, setIsBroken] = useState(false);

  function handleError() {
    setIsBroken(true);
  }

  if (isBroken) {
    return fallback;
  }

  return <img onError={handleError} alt={props.alt || ""} {...props} />;
}
