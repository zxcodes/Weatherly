import CloseIcon from "@assets/svg/close.svg?react";
import styles from "./RecentSearchList.module.css";
import { Spacer } from "..";
import { RecentSearch } from "@app/types";

type RecentSearchListProps = {
  searchList: RecentSearch[];
  onRemove: (id: string) => void;
  onSelect: (text: string) => void;
};

const RecentSearchList = ({
  onRemove,
  onSelect,
  searchList,
}: RecentSearchListProps): JSX.Element => {
  return (
    <div className={styles.container}>
      <h1 className={styles.searchHeading}>Recent Searches</h1>

      <Spacer space="lg" />
      {!searchList.length ? (
        <p className={styles.noRecentSearchText}>No recent searches found!</p>
      ) : null}
      {searchList.map((item) => (
        <div key={item.id} className={styles.listItemHolder}>
          <button
            className={styles.listItem}
            onClick={() => onSelect(item.text)}
          >
            {item.text}
          </button>
          <button onClick={() => onRemove(item.id)} style={{ all: "unset" }}>
            <CloseIcon
              height={24}
              width={24}
              style={{ marginBottom: "-0.2rem" }}
            />
          </button>
        </div>
      ))}
    </div>
  );
};

export default RecentSearchList;
