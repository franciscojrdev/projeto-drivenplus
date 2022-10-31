import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MainContent } from "../../components/MainContainer";
import { Container } from "../PlansPage/ListPlan";
import profile from "../../assets/images/perfil.svg";
import { useContext } from "react";
import UserContext from "../../context/UserContext";
import axios from "axios";

export default function Home() {
  const location = useLocation();
  const { name, token } = useContext(UserContext);
  const navigate = useNavigate();

  const openInNewTab = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };
  console.log("teste", name);

  function cancelPlan() {
    const URL_DEL =
      "https://mock-api.driven.com.br/api/v4/driven-plus/subscriptions";
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .delete(URL_DEL, config)
      .then((res) => {
        console.log(res.data);
        navigate("/subscripitions");
      })
      .catch((err) => console.log(err.response.data.message));
  }

  return (
    <MainContent>
      <Container>
        <Header>
          <img src={location.state.image} />
          <ProfileImage src={profile} />
        </Header>

        <User>Olá, {name}</User>

        {location.state.perks?.map((el) => (
          <Button
            key={el.id}
            cor="#FF4791"
            onClick={() => openInNewTab(el.link)}
          >
            {el.title}
          </Button>
        ))}

        <Footer>
          <Link to={"/subscripitions"}>
            <Button cor="#FF4791">Mudar plano</Button>
          </Link>
          <Button cor="#FF4747" onClick={cancelPlan}>
            Cancelar plano
          </Button>
        </Footer>
      </Container>
    </MainContent>
  );
}
const Header = styled.header`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 10px;

  div {
    height: 50px;
    width: 74px;
  }
`;

const ProfileImage = styled.img`
  height: 34px;
  width: 34px;
  border-radius: 50%;
  object-fit: cover;
`;
const User = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  text-align: center;
  margin-bottom: 50px;
`;

const Footer = styled.footer`
  bottom: 0;
  position: absolute;
  width: 100%;
  height: auto;
`;

const Button = styled.button`
  background-color: ${(props) => props.cor};
  height: 52px;
  width: 100%;
  border-radius: 8px;
  margin-bottom: 8px;

  font-size: 14px;
  font-weight: 700;
  color: white;
`;
