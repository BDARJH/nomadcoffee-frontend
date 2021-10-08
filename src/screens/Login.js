import styled from "styled-components";
import { darkModeVar, isLoggedInVar } from "../apollo";

const Title = styled.h1`
  color: ${(props) => props.theme.fontColor};
`;

const Container = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const ToggleButton = styled.button`
  margin: 5px;
  padding: 10px;
`;

function Login() {
  const toggleColorMode = () => darkModeVar(!darkModeVar());
  return (
    <Container>
      <Title>Login</Title>
      <ToggleButton onClick={() => isLoggedInVar(true)}>
        Log in now!
      </ToggleButton>
      <ToggleButton onClick={toggleColorMode}>
        {darkModeVar() ? "To light" : "To dark"}
      </ToggleButton>
    </Container>
  );
}
export default Login;
