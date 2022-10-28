import styled from "styled-components";

//#FF4791
export const Form = styled.form`
  width: 100%;
  height: auto;

  input {
    height: 52px;
    width: 100%;
    padding-left: 14px;
    border-radius: 8px;
    background-color: #fff;
    outline: none;
    border: none;
    margin-bottom: 16px;

    font-size: 14px;
    font-weight: 400;
    color: #7e7e7e;

    ::placeholder {
      font-size: 14px;
      font-weight: 400;
      color: #7e7e7e;
    }
  }
  button {
    height: 52px;
    width: 100%;
    left: 38px;
    top: 427px;
    border-radius: 8px;
    background-color: #ff4791;
    border-color: #ff4791;
    font-size: 14px;
    font-weight: 700;
    color: white;
  }
`;
