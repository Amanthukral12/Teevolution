import { useEffect, useState } from "react";
import propTypes from "prop-types";

const Message = ({ variant, children }) => {
  const [textColor, setTextColor] = useState("");

  useEffect(() => {
    if (variant === "Danger") {
      setTextColor("red");
    } else if (variant === "Success") {
      setTextColor("green");
    } else {
      setTextColor("blue");
    }
  }, [variant]);

  return (
    <div
      className={`p-4 mb-4 text-s rounded-lg bg-${textColor}-300 text-${textColor}-800`}
      role="alert"
    >
      {children}
    </div>
  );
};

Message.propTypes = {
  variant: propTypes.string,
  children: propTypes.node,
};

export default Message;
