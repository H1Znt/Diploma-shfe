import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Header } from "../../components/Header";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useAuth } from "../../hooks/useAuth";
import { ChangeBgImage } from "../../components/ChangeBgImage/ChangeBgImage";
import Form from "react-bootstrap/Form";
import "../../styles/_login.scss";

export interface ILoginForm {
  email: string;
  password: string;
}

export const Login: React.FC = () => {
  const [form, setForm] = useState<ILoginForm>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [disabled, setDisabled] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { login, logout, transferIn } = useAuth();

  const adminEmail = "shfe-diplom@netology.ru";
  const adminPassword = "shfe-diplom"
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/movies/edit";

  useEffect(() => {
    transferIn();
    logout();
  }, [logout, transferIn]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      // form.email !== "1@1" ||
      // form.password !== "1"
      form.email !== adminEmail ||
      form.password !== adminPassword
    ) {
      setError("Неверный email или пароль");
      return;
    }

    const params = new FormData();
    params.set("login", form.email);
    params.set("password", form.password)

    try {
      setLoading(true);
      setDisabled(true);
      const response = await fetch("https://shfe-diplom.neto-server.ru/login", {
        method: "POST",
        body: params,
      });

      if (response.ok) {
        login();
        setLoading(false);
        navigate(from, { replace: true });
        console.log("Авторизация пройдена успешно!");
      } else {
        setError("Ошибка сервера. Попробуйте позже.");
      }
    } catch (e) {
      setError(`Произошла ошибка ${e}. Попробуйте позже.`);
    }
  };

  return (
    <ChangeBgImage>
      <div className="login">
        <Container className="p-0 login__container">
          <Row className="login__header mx-auto">
            <Col>
              <div className="">
                <Header />
              </div>
            </Col>
          </Row>
          <Row className="login__container-form  mx-auto">
            <Col className="p-0">
              <div className="login__title p-3">Авторизация</div>
              <Form
                className="login__form p-3"
                autoComplete="off"
                onSubmit={handleSubmit}
              >
                <Form.Group
                  className="login__input email mb-2"
                  controlId="formBasicEmail"
                >
                  <Form.Label className="mb-0">E-mail</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="shfe-diplom@netology.ru"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group
                  className="login__input password mb-3"
                  controlId="formBasicPassword"
                >
                  <Form.Label className="mb-0">Пароль</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="shfe-diplom"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                {error && (
                  <p style={{ color: "red", fontWeight: "600" }}>{error}</p>
                )}
                <Button
                  className="mb-3"
                  variant="secondary"
                  type="submit"
                  disabled={disabled}
                >
                  {isLoading ? "Загрузка…" : "Авторизоваться"}
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </div>
    </ChangeBgImage>
  );
};

{
  /* <div className="login">
      <Header />
      <div className="login__container-form">
        <div className="login__title">
          Авторизация
        </div>
        <form
          className="login__form"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <div className="login__input email">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="shfe-diplom@netology.ru"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="login__input password">
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              placeholder="shfe-diplom"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit" disabled={disabled}>
            Авторизоваться
          </button>
        </form>
      </div>
    </div> */
}
