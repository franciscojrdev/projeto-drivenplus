import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { MainContent } from "../../components/MainContainer";
import UserContext from "../../context/UserContext";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { Container } from "./ListPlan";
// import { Link } from "react-router-dom";

export default function Plans() {
  const { token } = useContext(UserContext);
  const [plans, setPlans] = useState([]);
  useEffect(() => {
    const URL =
      "https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions/memberships";
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(URL, config)
      .then((res) => {
        setPlans(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err.response.data.message));
  }, []);
  return (
    <MainContent>
      <Container>
        <Title>Escolha seu Plano</Title>
        {plans.map((plan) => (
          <StyledLink to={`/subscripitions/${plan.id}`}>
            <Card>
              <img src={plan.image} />
              <span>R$ {plan.price}</span>
            </Card>
          </StyledLink>
        ))}
      </Container>
    </MainContent>
  );
}
const StyledLink = styled(Link)`
  text-decoration: none;
`


const Title = styled.h1`
  font-weight: 700;
  font-size: 32px;
  margin: 20px auto;
  color: #fff;
  text-align: center;
`;

const Card = styled.div`
  height: 180px;
  width: 100%;
  border-radius: 12px;
  border: 1px solid white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  padding: 0 20px;

  img {
    height: 96px;
    width: 140px;
  }
  span {
    color: #fff;
    font-weight: 700;
    font-size: 24px;
  }
`;
