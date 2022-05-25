import {createContext, useCallback, useContext, useEffect, useRef, useState} from "react";
import {useToast} from "../hooks/use-toast";
import {useHttpClient} from "../hooks/use-http-client";

const initialState = {
  user: null,
  login() {
  },
  logout() {
  },
};

export const AuthContext = createContext(initialState);

export const AuthProvider = ({children}) => {
  const logoutTimer = useRef(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('currentUser') || null));
  const toast = useToast(5000)
  const {sendRequest} = useHttpClient();

  const logout = useCallback(() => {
    toast('success', `Goodbye ${user.name}!`)
    setUser(null);
  }, [toast, user]);

  const register = useCallback(async (formData) => {
    const data = await sendRequest("/api/users/signup","POST", formData);
    if (data.message) return null;
    setUser(data);
  }, [sendRequest]);

  const login = useCallback(async (formData) => {
    const body = Object.fromEntries(formData.entries())
    const data = await sendRequest(`/api/users/login`, 'POST', JSON.stringify(body), {
      'Content-Type': 'application/json',
    })
    if (data.message) return null;
    setUser(data);
  }, [sendRequest]);

  useEffect(() => {
    if (!user) {
      logoutTimer.current && clearTimeout(logoutTimer.current)
      return localStorage.removeItem('currentUser')
    }

    const expiresIn = new Date(user.expiresIn);
    const now = new Date()
    const valid = expiresIn > now;

    if (!valid) return;
    localStorage.setItem('currentUser', JSON.stringify(user))
    const remainingTime = expiresIn.getTime() - now.getTime();
    logoutTimer.current = setTimeout(() => {
      toast('error', 'Session expired, please log back in.')
      localStorage.removeItem('currentUser')
      setUser(null)
    }, remainingTime)
  }, [toast, user])

  return (
    <AuthContext.Provider value={{user, login, logout, register}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
