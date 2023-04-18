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
  ConfigProvider,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import "./Login.modul.css";
import Title from "antd/es/skeleton/Title";
import MIcons from "../../MIcons";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const { Title } = Typography;
  const { Text, Link } = Typography;
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

  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    setSpinLoading(true);
    await fetch("http://localhost:7048/api/login", {
      method: "POST",
      // crossorigin: true,
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
          navigate('/Home');
        }
      })
      .catch((err) => {
        onAlert("error", "Server Error " + err.message);
      });
  };

  return (
    <>
      {/* <div style={{display:'flex', justifyContent:'center'}}>
        {errorMessage && (
          <Alert
            className="alert"
            type="success"s
            message={errorMessage}
            showIcon
          />
        )}
      </div> */}
      {contextHolder}

      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#4B973C",
          },
        }}
      >
        <div className="div">
          <Spin tip="Loading..." spinning={spinLoading}>
            <Card type="secondary" className="card">
              <h3 style={{marginTop:'35px'}}>Sign in to your account </h3>
              <div style={{ paddingTop: "20px", width: "100%" }}>
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
                    <div className="input-field">
                      <svg
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        height="16"
                        width="16"
                        xmlns="http://www.w3.org/2000/svg"
                        class="input-icon"
                      >
                        <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
                      </svg>
                      <input
                        className="input"
                        value={username}
                        size="large"
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
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
                    <div className="input-field">
                      <svg
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        height="16"
                        width="16"
                        xmlns="http://www.w3.org/2000/svg"
                        class="input-icon"
                      >
                        <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
                      </svg>
                      <input
                        className="input"
                        type="password"
                        value={password}
                        size="large"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </Form.Item>
                  <br />
                  <Button
                    className="button"
                    htmlType="submit"
                    type="primary"
                    size="large"
                  >
                    Sign In
                  </Button>

                  <div style={{ marginTop: "20px", textAlign: "end" }}>
                    <a style={{ color: "gray" }}>Forget Password</a>
                  </div>

                  {/* {errorMessage && <p className="errmessage">{errorMessage}</p>} */}
                </Form>
              </div>
            </Card>
          </Spin>
        </div>
      </ConfigProvider>
    </>
  );
}
