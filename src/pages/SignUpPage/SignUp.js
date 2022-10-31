import { Form } from "../../components/Form/Form";
import { useState } from "react";
import { MainContent } from "../../components/MainContainer";
import { LinkStyled } from "../LoginPage/Login";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [form, setForm] = useState({
    email: "",
    name: "",
    cpf: "",
    password: "",
  });
  const navigate = useNavigate();

  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  function createAccount(e) {
    e.preventDefault();
    const URL =
      "https://mock-api.driven.com.br/api/v4/driven-plus/auth/sign-up";
    axios
      .post(URL, form)
      .then((res) => {
        console.log(res.data);
        navigate("/");
      })
      .catch((err) => {
        alert("Erro no cadastro");
        console.log(err.response.data.message);
      });
  }
  return (
    <MainContent>
      <Form onSubmit={createAccount}>
        <input
          type="text"
          placeholder="Nome"
          name="name"
          value={form.name}
          onChange={handleForm}
          required
        />
        <input
          type="text"
          placeholder="CPF"
          name="cpf"
          value={form.cpf}
          onChange={handleForm}
          required
        />
        <input
          type="email"
          placeholder="E-mail"
          name="email"
          value={form.email}
          onChange={handleForm}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          name="password"
          value={form.password}
          onChange={handleForm}
          required
        />
        <button type="submit">CADASTRAR</button>
      </Form>
      <LinkStyled to="/">Já possuí uma conta? Entre</LinkStyled>
    </MainContent>
  );
}
