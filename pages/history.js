import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { Card, ListGroup, Button } from "react-bootstrap";

import { searchHistoryAtom } from "@/store";
import styles from "@/styles/History.module.css";
import { removeFromHistory } from "@/lib/userData";

export default function History() {
  const router = useRouter();
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
  let parsedHistory = [];

  function historyClicked(e, index) {
    router.push(`/artwork?${searchHistory[index]}`);
  }

  async function removeHistoryClicked(e, index) {
    e.stopPropagation();
    setSearchHistory(await removeFromHistory(searchHistory[index]));
  }

  if (!searchHistory) return null;

  searchHistory.forEach((history) => {
    let params = new URLSearchParams(history);
    let entries = params.entries();
    parsedHistory.push(Object.fromEntries(entries));
  });
  return (
    <>
      {parsedHistory.length > 0 ? (
        <ListGroup>
          {parsedHistory.map((historyItem, index) => (
            <ListGroup.Item
              className={styles.historyListItem}
              key={index}
              onClick={(e) => historyClicked(e, index)}
            >
              {console.log(historyItem)}

              {Object.keys(historyItem).map((key, index) => (
                <span key={index}>
                  {key}: <strong>{historyItem[key]}</strong>&nbsp;
                </span>
              ))}
              <Button
                className="float-end"
                variant="danger"
                size="sm"
                onClick={(e) => removeHistoryClicked(e, index)}
              >
                &times;
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <Card>
          <Card.Body>
            <h1>Nothing Here. Try searching for some artwork</h1>
          </Card.Body>
        </Card>
      )}
    </>
  );
}
