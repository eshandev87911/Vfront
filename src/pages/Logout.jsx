import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useContext } from "react";
import { Context } from "../contexts/Context";

const Logout = () => {
  const { setToken, setUser } = useAuth();
  const { setarr} = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken();
    setUser();
    setarr([]);
    navigate("/", { replace: true });
  };

  setTimeout(() => {
    handleLogout();
  }, 1);

  return <></>;
};

export default Logout;