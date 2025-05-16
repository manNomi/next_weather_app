import useToggleState from "@/shared/model/useToggleState";
import Link from "next/link";
import Button from "./style/button.module.css";

const SelectLink = (props: SelectLink) => {
  const { href, innerText } = props;

  const [isClicked, toggleClicked] = useToggleState();
  return (
    <Link
      href={`/${href}`}
      onClick={toggleClicked}
      className={`${Button.button} ${isClicked ? Button.selected : ""}`}>
      {innerText}
    </Link>
  );
};
export default SelectLink;
