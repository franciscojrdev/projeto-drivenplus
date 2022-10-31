import { Form } from "../../components/Form/Form";
import { MainContent } from "../../components/MainContainer";
import logo from "../../assets/images/logo.png";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import UserContext from "../../context/UserContext";
export default function Login() {
  const navigate = useNavigate();
  const { setPersistToken, setPersistName} = useContext(UserContext);
  const [form, setForm] = useState({ email: "", password: "" });

  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function signIn(e) {
    e.preventDefault();
    const URL_LOGIN =
      "https://mock-api.driven.com.br/api/v4/driven-plus/auth/login";
    axios
      .post(URL_LOGIN, form)
      .then((res) => {
        setPersistName(res.data.name)
        setPersistToken(res.data.token);
        if (res.data.membership === null) {
          navigate("/subscripitions");
        }else{
          navigate("/home",{state:res.data.membership})
        }
      })
      .catch((err) => console.log(err.response.data.message));
  }
  return (
    <MainContent>
      <LogoImage src={logo} />
      <Form onSubmit={signIn}>
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
        <button type="submit">ENTRAR</button>
      </Form>
      <LinkStyled to="/sign-up">Não possuí uma conta? Cadastre-se</LinkStyled>
    </MainContent>
  );
}

const LogoImage = styled.img`
  height: 50px;
  width: 299px;
  margin: 0 auto 100px;
`;

export const LinkStyled = styled(Link)`
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  color: white;
  text-align: left;
  margin: 24px auto;
`;
