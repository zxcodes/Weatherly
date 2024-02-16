import { Spacer } from "..";
import styles from "./TextWithIcon.module.css";

type TextWithIconProps = {
  text: string;
  icon: JSX.Element;
};

export default function TextWithIcon({
  text,
  icon,
}: TextWithIconProps): JSX.Element {
  return (
    <div className={styles.container}>
      {icon}
      <Spacer space="sm" between />
      <p>{text}</p>
    </div>
  );
}
