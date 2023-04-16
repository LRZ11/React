import React, { useState } from "react";
import {
  Card,
  Form,
  Typography,
  Input,
  Button,
  Alert,
  message,
  Spin,
} from "antd";
import "./Login.modul.css";
import Title from "antd/es/skeleton/Title";

export default function LoginPage() {
  const { Title } = Typography;
  const [spinLoading, setSpinLoading] = useState(false);

  const [form] = Form.useForm();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  // const [errorType, setErrorType] = useState("");

  function onAlert(errorType, errorMessage) {
    messageApi.open({
      type: `${errorType}`,
      content: `${errorMessage}`,
    });
    setSpinLoading(false);
  }

  const handleSubmit = async (values) => {
    setSpinLoading(true);
    await fetch("http://localhost:7048/api/login", {
      method: "POST",
      crossorigin: true,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then(async (res) => {
        
        return await res.json();
      })
      .then((resp) => {
        if (resp.status == "401") {
          onAlert("error", resp.message);
        } else {
          onAlert("success", resp.message);
        }
      })
      .catch(async (err) => {
        onAlert("error", "Server Error " + err.message);
      });
  };

  return (
    <>
      {/* <div style={{display:'flex', justifyContent:'center'}}>
        {errorMessage && (
          <Alert
            className="alert"
            type="success"
            message={errorMessage}
            showIcon
          />
        )}
      </div> */}
      {contextHolder}
      <Spin tip="Loading..." spinning={spinLoading}>
        <div className="div">
          <Card className="card">
            <Title level={3}>Login</Title>

            <div style={{ paddingTop: "50px", width: "100%" }}>
              <Form
                name="login"
                className="form"
                initialValues={{
                  remember: true,
                }}
                form={form}
                onFinish={handleSubmit}
              >
                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Please input username.",
                    },
                  ]}
                >
                  <Input
                    className="input"
                    value={username}
                    size="large"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Please input password.",
                    },
                  ]}
                >
                  <Input.Password
                    className="input"
                    value={password}
                    size="large"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Item>
                <br />
                <Button
                  className="button"
                  htmlType="submit"
                  type="primary"
                  size="large"
                >
                  Login
                </Button>
                {/* {errorMessage && <p className="errmessage">{errorMessage}</p>} */}
              </Form>
            </div>
          </Card>
        </div>
      </Spin>
    </>
  );
}
