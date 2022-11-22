import React from "react";
import styled from "styled-components";

import { Button } from "@sailthru/stui-elements";
import { ButtonGroup } from "@sailthru/stui-components";

const StyledDiv = styled.div`
  display: inline-flex;
  padding: 6px;
  border: 3px solid gold;
  border-radius: 6px;
`;

export default function App() {
  return (
    <>
      <h1>Welcome to React Boilerplate</h1>
      <StyledDiv>This div has style</StyledDiv>
      <ButtonGroup align={ButtonGroup.ALIGN_CENTER}>
        <Button
          variant={Button.VARIANT_SECONDARY}
          onClick={() => alert("goodbye")}
        >
          Farewell
        </Button>
        <Button onClick={() => alert("hi")}>Greeting</Button>
      </ButtonGroup>
    </>
  );
}
