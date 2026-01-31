import { createContext, useContext, useReducer } from "react";
const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
};
const AuthContext = createContext();
const initialstate = {
  user: null,
  isAuthenticated: false,
};
function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { ...state, isAuthenticated: true, user: action.payload };
    case "logout":
      return { ...state, isAuthenticated: false, user: null };
    default:
      throw new Error("unknown action");
  }
}
function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialstate,
  );
  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "login", payload: FAKE_USER });
    }
  }
  function logout() {
    dispatch({ type: "logout" });
  }
  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        user,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("auth was used outside its location");
  return context;
}
export { AuthProvider, useAuth };
