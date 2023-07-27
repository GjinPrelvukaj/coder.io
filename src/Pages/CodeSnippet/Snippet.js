import React from "react";
import { CodeSection } from "react-code-section-lib";
import { Container, Card, Row, Text } from "@nextui-org/react";
import { CodeBlock } from "react-code-blocks";
import snippetImage from "./snippet.png";
import buttonImage from "./buttons.png";

function Snippet() {
  const value = `import { Introduction } from "./coder.io";
console.log(Intruducing user [+])
<div>
    <Introduction text={"Hi user , this is how code will be shows in the future!"}/>
</div>`;

  return (
    <Container>
      <Card css={{ $$cardColor: "#1e1e1e" }}>
        <Card.Body>
          <Row justify="center" align="center">
            <CodeBlock
              text={value}
              language="javascript"
              showLineNumbers={true}
              theme="atom-one-dark" // Choose a theme from react-code-blocks library
            />
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Snippet;
