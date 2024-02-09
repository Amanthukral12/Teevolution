import { useEffect, useState } from "react";
import propTypes from "prop-types";

const Message = ({ variant, children }) => {
  const [effect, setEffect] = useState("");

  useEffect(() => {
    if (variant === "Danger") {
      setEffect(
        "p-4 my-4 text-center text-s rounded-lg bg-red-300 text-red-800"
      );
    } else if (variant === "Success") {
      setEffect(
        "p-4 my-4 text-s text-center rounded-lg bg-green-300 text-green-800"
      );
    } else {
      setEffect(
        "p-4 my-4 text-s text-center rounded-lg bg-blue-300 text-blue-800"
      );
    }
  }, [variant]);

  return (
    <div className={effect}>
      <p>{children}</p>
    </div>
  );
};

Message.propTypes = {
  variant: propTypes.string,
  children: propTypes.node,
};

export default Message;
