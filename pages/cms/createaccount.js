import NoAuthLayout from "../../layouts/NoAuthLayout";
import Signup from "../../components/auth/Signup";

const Login = () => {
  return (
    <NoAuthLayout>
      <Signup />
    </NoAuthLayout>
  );
};

export default Login;
