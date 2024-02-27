import React from "react";
import { useRouter } from "next/router";
import { Row, Col } from "react-bootstrap";
import ArtworkCardDetail from "@/components/ArtworkCardDetail";

export default function ArtworkById() {
  const router = useRouter();
  const { objectID } = router.query;

  return (
    <>
      <Row>
        <Col md={{ span: 9, offset: 2 }}>
          <ArtworkCardDetail objectID={objectID} />
        </Col>
      </Row>
    </>
  );
}
