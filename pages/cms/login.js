import NoAuthLayout from "../../layouts/NoAuthLayout";
import Signin from "../../components/auth/Signin";

const Login = () => {
  return (
    <NoAuthLayout>
      <Signin></Signin>
    </NoAuthLayout>
  );
};

export default Login;
