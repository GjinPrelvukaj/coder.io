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
    email: "",
    password: "",
  });

  const [errors, setErrors] = React.useState({
    email: "",
    password: "",
  });

  // Form validation logic
  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    // Check if email is filled
    if (formData.email === "") {
      newErrors.email = "Email is required";
      isValid = false;
    } else {
      newErrors.email = "";
    }

    // Check if password is filled
    if (formData.password === "") {
      newErrors.password = "Password is required";
      isValid = false;
    } else {
      newErrors.password = "";
    }

    setErrors(newErrors);
    return isValid;
  };

  // Handle login submission
  const handleLogin = async () => {
    const isValid = validateForm();

    if (isValid) {
      console.log("Form Data:", formData);
      try {
        const response = await fetch("http://localhost:5002/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }

        const loginData = await response.json();
        console.log("Login response:", loginData);

        // Save the token in local storage or in a cookie
        localStorage.setItem("token", loginData.token);

        // You can handle the successful login response here, e.g., redirect the user to another page
      } catch (error) {
        console.error("Login error:", error.message);
        // You can handle the login error here
      }
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
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            contentLeft={<Mail fill="currentColor" />}
            error={errors.email}
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
            <Text size={14}>New User?</Text>
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
