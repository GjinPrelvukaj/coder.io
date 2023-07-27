import React from "react";
import { Modal, Input, Row, Button, Text } from "@nextui-org/react";
import { Mail } from "./Mail";
import { Password } from "./Password";

export default function Login() {
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  // State variables to store form data and validation errors
  const [formData, setFormData] = React.useState({
    identifier: "",
    password: "",
  });

  const [errors, setErrors] = React.useState({
    identifier: "",
    password: "",
  });

  // Form validation logic
  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    // Check if both fields are filled
    for (const key in formData) {
      if (formData[key] === "") {
        newErrors[key] = "This field is required";
        isValid = false;
      } else {
        newErrors[key] = "";
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleLogin = () => {
    const isValid = validateForm();

    if (isValid) {
      console.log("Form Data:", formData);
    }
  };

  // Handle input changes
  const handleInputChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  return (
    <div>
      <Button auto color="secondary" shadow onPress={handler}>
        Login
      </Button>
      <Modal
        closeButton
        blur
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Welcome to
            <Text b size={18}>
              <br />
              coders.io
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Email or Username"
            value={formData.identifier}
            onChange={(e) => handleInputChange("identifier", e.target.value)}
            contentLeft={<Mail fill="currentColor" />}
            error={errors.identifier}
          />
          <Input
            clearable
            bordered
            fullWidth
            color="primary"
            size="lg"
            placeholder="Password"
            type="password"
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            contentLeft={<Password fill="currentColor" />}
            error={errors.password}
          />
          <Row justify="space-between">
            <Text size={14}>Existing User?</Text>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={closeHandler}>
            Close
          </Button>
          <Button auto onPress={handleLogin}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
