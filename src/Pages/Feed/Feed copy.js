import React, { useState } from "react";
import { Container, Textarea, Button, Text, Spacer } from "@nextui-org/react";
import web_logo from "../NavBar/logo.png";
import { Avatar } from "@nextui-org/react";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // Replace with the correct URL for your Node.js server
});

const Feed = () => {
  const [feedbackText, setFeedbackText] = useState("");
  const [userFeedbacks, setUserFeedbacks] = useState([]);

  const handleSubmit = () => {
    if (feedbackText.trim() !== "") {
      const newFeedback = {
        initialValue: feedbackText,
        name: "New User",
        avatarSrc: "https://i.pravatar.cc/300?u=newuser",
        timestamp: new Date().toLocaleString("en-US", {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      // Update the UI immediately with the new feedback
      setUserFeedbacks((prevFeedbacks) => [newFeedback, ...prevFeedbacks]);

      // Send the new feedback to the server
      api
        .post("/api/saveFeedback", newFeedback)
        .then(() => {
          console.log("Feedback successfully saved on the server.");
          setFeedbackText(""); // Clear the text after submitting
        })
        .catch((error) => {
          console.error("Error saving feedback:", error);
          // If there is an error saving the feedback on the server,
          // we should revert the UI update to maintain consistency.
          setUserFeedbacks((prevFeedbacks) =>
            prevFeedbacks.filter((f) => f !== newFeedback)
          );
        });
    }
  };

  return (
    <div style={{ overflowX: "hidden", minHeight: "100vh", overflowY: "auto" }}>
      <Container justify="center" align="center">
        <Spacer y={2.5} />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={web_logo} height={"75"} />
          <Text b color="inherit" hideIn="xs" size={75}>
            coders.io/Feed
          </Text>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Spacer y={5} />
          <Textarea
            underlined
            size="xl"
            width={500}
            label="What's on your mind?"
            placeholder="Enter your amazing ideas."
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
          />

          <Spacer y={1.5} />
          <Button variant="outlined" onPress={handleSubmit}>
            Share
          </Button>

          <Spacer y={3} />
          <hr
            style={{
              background: "black",
              color: "black",
              borderColor: "black",
              width: "750px",
            }}
          />
          <Spacer y={3} />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxHeight: "400px",
            }}
          >
            {userFeedbacks.map((feedback, index) => (
              <div key={index}>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Avatar squared src={feedback.avatarSrc} />
                  <Text
                    size={14}
                    color="#666"
                    weight="bold"
                    css={{ marginLeft: "8px" }}
                  >
                    {feedback.name}
                  </Text>
                </div>
                <Text
                  size={14}
                  color="#666"
                  css={{ marginTop: "5px", marginBottom: "5px" }}
                >
                  {feedback.timestamp}
                </Text>
                <Textarea
                  readOnly
                  size="xl"
                  width={500}
                  value={feedback.initialValue}
                />
                <Spacer y={2.5} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Feed;
