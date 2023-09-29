import React from "react";
import "../styles/main.css";
import RoutingLayout from "./RoutingLayout";
import Container from "react-bootstrap/Container";


export default function MainContainer() {
  return (
    <Container>
      <RoutingLayout />
    </Container>
  )
}