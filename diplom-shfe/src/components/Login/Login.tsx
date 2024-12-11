import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../Header";
import { useAuth } from "../../hooks/useAuth";

export interface ILoginForm {
  email: string;
  password: string;
}

export const Login = () => {
  const [form, setForm] = useState<ILoginForm>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);

  const { login } = useAuth();

  // const adminEmail = "shfe-diplom@netology.ru";
  // const adminPassword = "shfe-diplom"
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      form.email !== "1@1" ||
      form.password !== "1"
      // form.email !== adminEmail ||
      // form.password !== adminPassword
    ) {
      setError("Неверный email или пароль");
      return;
    }

    try {
      const response = await fetch("https://shfe-diplom.neto-server.ru/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login: form.email,
          password: form.password,
        }),
      });

      if (response.ok) {
        localStorage.setItem("isAuthenticated", "true");
        login();
        navigate("/movies/edit");
        console.log("Авторизация пройдена успешно!");
      } else {
        setError("Ошибка сервера. Попробуйте позже.");
      }
    } catch (e) {
      setError(`Произошла ошибка ${e}. Попробуйте позже.`);
    }
  };

  return (
    <div>
      <Header />
      <form className="login__form" autoComplete="off" onSubmit={handleSubmit}>
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
        <button type="submit">Отправить</button>
      </form>
    </div>
  );
};
