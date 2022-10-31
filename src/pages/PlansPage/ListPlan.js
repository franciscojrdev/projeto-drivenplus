import { MainContent } from "../../components/MainContainer";
import seta from "../../assets/images/seta.svg";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import list from "../../assets/images/list.svg";
import money from "../../assets/images/money.svg";


import axios from "axios";

export default function ListPlan() {
  const { idPlan } = useParams();
  const { token } = useContext(UserContext);
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({
    membershipId: idPlan,
    cardName: "",
    cardNumber: "",
    securityNumber: "",
    expirationDate: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const URL = `https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships/${idPlan}`;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(URL, config)
      .then((res) => {
        setItems(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err.response.data.message));
  }, []);

  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  function buyPlan(e) {
    e.preventDefault();

    const URL_POST =
      "https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions";

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(URL_POST, form, config)
      .then((res) => {
        console.log(res.data);
        navigate("/home", { state: res.data.membership});
      })
      .catch((err) => console.log(err.response.data.message));
  }

  return (
    <MainContent>
      <Link to="/subscripitions">
        <Seta src={seta} />
      </Link>
      <Container>
        <Logo>
          <img src={items.image} alt="logo do plano" />
          <h1>{items.name}</h1>
        </Logo>
        <Main>
          <Labels>
            <img src={list} /> Benefícios:
          </Labels>
          {items.perks?.map((item, i) => (
            <h2>
              {i + 1}. {item.title}
            </h2>
          ))}
          <Labels>
            <img src={money} /> Preço:
          </Labels>
          <h2>R$ {items.price} cobrados mensalmente</h2>

          <form onSubmit={buyPlan}>
            <input
              type="text"
              name="cardName"
              value={form.cardName}
              onChange={handleForm}
              required
              placeholder="Nome impresso no cartão"
            />
            <input
              type="text"
              name="cardNumber"
              value={form.cardNumber}
              onChange={handleForm}
              required
              placeholder="Digitos do cartão"
            />
            <div>
              <input
                type="text"
                name="securityNumber"
                value={form.securityNumber}
                onChange={handleForm}
                required
                placeholder="Código de segurança"
              />
              <div> </div>
              <input
                type="text"
                name="expirationDate"
                value={form.expirationDate}
                onChange={handleForm}
                required
                placeholder="Validade"
              />
            </div>
            <button type="submit">ASSINAR</button>
          </form>
        </Main>
      </Container>
    </MainContent>
  );
}

const Seta = styled.img`
  height: 32px;
  width: 28px;
  border-radius: 0px;
`;
export const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Logo = styled.header`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
  img {
    height: 96px;
    width: 140px;
    margin-bottom: 10px;
  }
  h1 {
    font-weight: 700;
    font-size: 32px;
    color: #fff;
    text-align: center;
  }
`;
const Main = styled.main`
  width: 100%;
  height: auto;
  padding: 0 10px;
  color: #fff;
  font-weight: 400;
  font-size: 14px;
  text-align: start;

  form {
    width: 100%;
    height: auto;
    margin: 34px 0;
    input {
      background-color: #fff;
      width: 100%;
      height: 52px;
      margin-bottom: 8px;
      border-radius: 8px;
      outline: none;
      border: none;
      font-size: 14px;
      font-weight: 400;
      color: #7e7e7e;
      padding-left: 10px;

      ::placeholder {
        font-size: 14px;
        font-weight: 400;
        color: #7e7e7e;
      }
    }
    div {
      display: flex;
      input {
        height: 52px;
        width: 100%;
      }
      div {
        width: 10px;
      }
    }
    button {
      height: 52px;
      width: 100%;
      border-radius: 8px;
      background-color: #ff4791;
      border-color: #ff4791;
      font-size: 14px;
      font-weight: 700;
      color: white;
    }
  }
`;

const Labels = styled.div`
  margin: 10px auto;
  font-size: 16px;
`;
