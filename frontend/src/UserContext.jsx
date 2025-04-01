import {
  createContext,
  useContext,
  useState,
  useEffect,
  useReducer,
} from "react";
import axios from "axios";

const UserVerification = createContext();

const UserVerificationProvider = ({ children }) => {
  const INITIAL_STATE = {
    userData: {},
    isAuthenticated: false,
  };

  function reducer(state, action) {
    switch (action.type) {
      case "LOG_IN":
        return action.payload;
      case "LOG_OUT":
        return INITIAL_STATE;

      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  // const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const userLogin = async (email, password) => {
    console.log(email, password);

    setLoading(true);
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login/", {
        email: email,
        password: password,
      });
      if (response.status !== 200) {
        alert("Email or password might be wrong. Please try again");
        return false;
      }

      dispatch({
        type: "LOG_IN",
        payload: { userData: response.data.user, isAuthenticated: true },
      });
      localStorage.setItem("token", response.data.token);
      // console.log(localStorage.getItem("token"));

      return true;
    } catch (error) {
      alert("Something went wrong. Please try again");
      console.log(e);

      return false;
    } finally {
      setLoading(false);
    }
  };

  const userLogout = () => {
    axios
      .post(
        "http://127.0.0.1:8000/api/logout/",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      // .then((response) => response.json())
      .then((response) => {
        dispatch({ type: "LOG_OUT" });
        localStorage.removeItem("token");
        window.location.href = "/login";
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <UserVerification.Provider
      value={{
        userData: state.userData,
        isAuthenticated: state.isAuthenticated,
        userLogin,
        userLogout,
        loading,
      }}
    >
      {children}
    </UserVerification.Provider>
  );
};

export default UserVerificationProvider;

export const UseUserContext = () => {
  return useContext(UserVerification);
};
