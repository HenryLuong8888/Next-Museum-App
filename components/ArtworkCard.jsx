import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import useSWR from "swr";
import Error from "next/error";
import Link from "next/link";

export default function ArtworkCard({ objectID }) {
  // function handleRemove() {
  //   setFavouritesList((current) => current.filter((fav) => fav != objectID));
  //   setShowAdded(false);
  // }

  // const fetcher = (url) => fetch(url).then((res) => res.json());
  // const { data, error } = useSWR(
  //   objectID
  //     ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
  //     : null,
  //   fetcher
  // );

  // I dont need to set up the fetcher like above, because I did it in the _app in swrConfig
  const { data, error } = useSWR(
    objectID
      ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
      : null
  );

  {
    if (data) {
      console.log(data);
      return (
        <>
          <Card style={{ width: "80%" }}>
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
                src={
                  data.primaryImageSmall
                    ? data.primaryImageSmall
                    : "https://via.placeholder.com/375x375.png?text=[+Not+Available+]"
                }
                alt="artwork image"
              />
            </div>

            <Card.Body
              style={{
                display: "block",
                position: "relative",
                height: "15rem",
              }}
            >
              <Card.Title>
                {data.title ? (
                  <span
                    style={{
                      width: "210px",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {data.title}
                  </span>
                ) : (
                  <h5>N/a</h5>
                )}
              </Card.Title>

              <Card.Text>
                {data.objectDate ? (
                  <span
                    style={{
                      width: "210px",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    <strong>Date: </strong>
                    {data.objectDate}
                  </span>
                ) : (
                  <span>
                    <strong>Date: </strong>N/A
                  </span>
                )}
                {data.classification ? (
                  <span
                    style={{
                      width: "210px",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    <strong>Classification: </strong>
                    {data.classification}
                  </span>
                ) : (
                  <span>
                    <strong>Classification: </strong>N/A
                  </span>
                )}
                {data.medium ? (
                  <span
                    style={{
                      width: "210px",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    <strong>Medium: </strong>
                    {data.medium}
                  </span>
                ) : (
                  <span>
                    <strong>Medium: </strong>N/A
                  </span>
                )}
              </Card.Text>

              <Link
                style={{
                  display: "block",
                  position: "absolute",
                  bottom: "10px",
                  marginTop: "10px",
                }}
                href={`/artwork/${data.objectID}`}
                passHref
              >
                <Button>{data.objectID}</Button>
              </Link>
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
}
