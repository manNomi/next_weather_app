import React from "react";

const useToggleState = (initialState = false): [boolean, () => void] => {
  const [isToggled, setIsToggled] = React.useState(initialState);
  const handleToggle = () => {
    setIsToggled((prev) => !prev);
  };

  return [isToggled, handleToggle];
};

export default useToggleState;
