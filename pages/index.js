import React from "react";
import { Image, Row, Col } from "react-bootstrap";

export default function Home() {
  return (
    <>
      <Image
        src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg"
        rounded
        fluid
        alt=""
      />
      <Row>
        <Col md={6}>
          The Metropolitan Museum of Art in New York City, colloquially "the
          Met",[a] is the largest art museum in the Americas. In 2022 it
          welcomed 3,208,832 visitors, ranking it the third most visited U.S
          museum, and eighth on the list of most-visited art museums in the
          world.[6] Its permanent collection contains over two million works,[1]
          divided among 17 curatorial departments. The main building at 1000
          Fifth Avenue, along the Museum Mile on the eastern edge of Central
          Park on Manhattan's Upper East Side, is by area one of the world's
          largest art museums. The first portion of the approximately
          2-million-square-foot (190,000 m2) building was built in 1880. A much
          smaller second location, The Cloisters at Fort Tryon Park in Upper
          Manhattan, contains an extensive collection of art, architecture, and
          artifacts from medieval Europe.
        </Col>
        <Col md={6}>
          The Metropolitan Museum of Art was founded in 1870 with its mission to
          bring art and art education to the American people. The museum's
          permanent collection consists of works of art from classical antiquity
          and ancient Egypt, paintings, and sculptures from nearly all the
          European Old Masters, and an extensive collection of American and
          modern art. The Met maintains extensive holdings of African, Asian,
          Oceanian, Byzantine, and Islamic art. The museum is home to
          encyclopedic collections of musical instruments, costumes, and
          accessories, as well as antique weapons and armor from around the
          world. Several notable interiors, ranging from 1st-century Rome
          through modern American design, are installed in its galleries.
        </Col>
      </Row>
      <a
        style={{ fontSize: "40px" }}
        href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art"
        target="_blank"
        rel="noreferrer"
      >
        …
      </a>
    </>
  );
}
