import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import useSWR from "swr";
import Error from "next/error";
import { useAtom } from "jotai";

import { favouritesAtom } from "@/store";
import { addToFavourites, removeFromFavourites } from "@/lib/userData";

function ArtworkCardDetail({ objectID }) {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(false);

  const { data, error } = useSWR(
    objectID
      ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
      : null
  );

  async function favouritesClicked() {
    if (showAdded) {
      setFavouritesList(await removeFromFavourites(objectID));
      setShowAdded(false);
    } else {
      setFavouritesList(await addToFavourites(objectID));
      setShowAdded(true);
    }
  }

  useEffect(() => {
    setShowAdded(favouritesList?.includes(objectID));
  }, [favouritesList]);

  if (data) {
    return (
      <>
        <Card style={{ width: "80%", marginTop: "20px" }}>
          {data.primaryImage && (
            <div
              style={{
                height: "0",
                paddingBottom: "80%",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Card.Img
                fluid
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  position: "absolute",
                }}
                variant="top"
                src={data.primaryImageSmall}
              />
            </div>
          )}

          <Card.Body
            style={{
              display: "block",
              position: "relative",
              height: "100%",
            }}
          >
            <Card.Title>
              {data.title ? <span>{data.title}</span> : <h5>N/a</h5>}
            </Card.Title>

            <Card.Text>
              {data.objectDate ? (
                <span>
                  <strong>Date: </strong>
                  {data.objectDate}
                </span>
              ) : (
                <span>
                  <strong>Date: </strong>N/A
                </span>
              )}
              <br />
              {data.classification ? (
                <span>
                  <strong>Classification: </strong>
                  {data.classification}
                </span>
              ) : (
                <span>
                  <strong>Classification: </strong>N/A
                </span>
              )}
              <br />
              {data.medium ? (
                <span>
                  <strong>Medium: </strong>
                  {data.medium}
                </span>
              ) : (
                <span>
                  <strong>Medium: </strong>N/A
                </span>
              )}
              <br />
              <br />
              {data.artistDisplayName ? (
                <>
                  <strong>Artist Name: </strong> {data.artistDisplayName}
                  <a
                    href={data.artistWikidata_URL}
                    target="_blank"
                    rel="noreferrer"
                  >
                    ...wiki
                  </a>
                </>
              ) : (
                <span>
                  <strong>Artist Name: </strong> N/A
                </span>
              )}
              <br />
              {data.creditLine ? (
                <>
                  <strong>Credit Line: </strong> {data.creditLine}
                </>
              ) : (
                <span>
                  <strong>Credit Line: </strong> N/A
                </span>
              )}
              <br />
              {data.dimensions ? (
                <>
                  <strong>Dimensions: </strong> {data.dimensions}
                </>
              ) : (
                <span>
                  <strong>Dimensions: </strong> N/A
                </span>
              )}
            </Card.Text>

            <Button
              variant={showAdded ? "primary" : "outline-primary"}
              onClick={() => favouritesClicked()}
            >
              {showAdded ? "+ Favourite (added)" : "+ Favourite"}
            </Button>
          </Card.Body>
        </Card>
      </>
    );
  } else if (error) {
    return <Error statusCode={404} />;
  } else {
    return null;
  }
}

export default ArtworkCardDetail;
