import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Error } from "next/error";
import { Row, Col, Card, Pagination } from "react-bootstrap";

import ArtworkCard from "@/components/ArtworkCard";
import validObjectIDList from "../../public/data/validObjectIDList.json";

const PER_PAGE = 12;

export default function Artwork() {
  const [artworkList, setArtworkList] = useState(null);
  const [page, setPage] = useState(1);

  const router = useRouter();
  let finalQuery = router.asPath.split("?")[1];
  // console.log(finalQuery);

  const { data, error } = useSWR(
    finalQuery
      ? `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`
      : null
  );

  function previousPage() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  function nextPage() {
    if (page < artworkList.length) {
      setPage(page + 1);
    }
  }

  // it ensures that the data processing logic runs after the data has been fetched
  useEffect(() => {
    if (data) {
      console.log(data);
      let results = [];

      // We need to filter the data result because there are some invalid objectID that are returned from fetching. We use a list of validObjectID
      // to filter just the valid object that are returned from data.
      let filteredResults = validObjectIDList.objectIDs.filter((x) =>
        data?.objectIDs?.includes(x)
      );

      for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
        const chunk = filteredResults.slice(i, i + PER_PAGE);
        results.push(chunk);
      }

      setArtworkList(results);
      setPage(1);
    }
  }, [data]);
  if (error) {
    return <Error statusCode={404} />;
  }

  if (artworkList) {
    console.log(artworkList);
    return (
      <>
        {artworkList.length > 0 ? (
          <Row className="gy-4">
            {artworkList[page - 1].map((artwork) => (
              <Col lg={3} key={artwork}>
                <ArtworkCard objectID={artwork} />
              </Col>
            ))}
          </Row>
        ) : (
          <Card>
            <Card.Body>
              <h4>Nothing Here</h4>
              Try searching for something else.
            </Card.Body>
          </Card>
        )}
        <br />
        {artworkList.length > 0 && (
          <Row>
            <Col>
              <Pagination>
                <Pagination.Prev onClick={previousPage} />
                <Pagination.Item>{page}</Pagination.Item>
                <Pagination.Next onClick={nextPage} />
              </Pagination>
            </Col>
          </Row>
        )}
      </>
    );
  } else {
    return null;
  }
}
