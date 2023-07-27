import React, { useState } from "react";
import {
  Grid,
  Avatar,
  Textarea,
  GridContainerProps,
  Text,
  Spacer,
} from "@nextui-org/react";

const UserFeedback = ({ initialValue, name, avatarSrc }) => {
  const [showText, setShowText] = useState(false);

  return (
    <Grid.Container gap={2} justify="center" align="center">
      <Grid>
        <Avatar
          squared
          src={avatarSrc}
          onMouseEnter={() => setShowText(true)}
          onMouseLeave={() => setShowText(false)}
        />
        {showText && (
          <Text
            size={14}
            color="#666"
            weight="bold"
            css={{ position: "absolute", marginTop: "5px" }}
          >
            {name}
          </Text>
        )}
      </Grid>

      <Textarea readOnly size="xl" width={500} initialValue={initialValue} />
    </Grid.Container>
  );
};

export default UserFeedback;
