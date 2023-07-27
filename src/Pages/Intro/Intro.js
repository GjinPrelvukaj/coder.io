import { Grid, Card, Text } from "@nextui-org/react";
import { useMediaQuery } from "./useMediaQuery.js";
import Snippet from "../CodeSnippet/Snippet.js";

export default function App() {
  const isMd = useMediaQuery(960);

  const MockItem = ({ text }) => {
    return (
      <Card css={{ h: "$20", $$cardColor: "grey" }}>
        <Card.Body>
          <Text h6 size={15} color="white" css={{ m: 0 }}>
            {text}
          </Text>
        </Card.Body>
      </Card>
    );
  };
  return (
    <Grid.Container gap={2} justify="center">
      <Grid xs={12} css={{ m: 25 }}>
        <Snippet />
      </Grid>
    </Grid.Container>
  );
}
