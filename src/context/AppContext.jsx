import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [credit, setCredit] = useState(0);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const loadCreditsData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/credits`, {
        headers: { token },
      });

      if (data.success) {
        setCredit(data.credits);
        setUser(data.user);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

 const generateImage = async (prompt) => {
  if (!user) {
    toast.error("No user logged in. Please sign in first.");
    return null;
  }

  console.log("Using userId for generation:", user._id);

  try {
    const { data } = await axios.post(
      `${backendUrl}/api/image/generate-image`,  // ✅ CORRECT: use template literal properly!
      { prompt },
      { headers: { token } }
    );

    if (data.success) {
      // ✅ Update credits immediately
      setCredit(data.creditBalance);

      return data.image;
    } else {
      toast.error(data.message || "Image generation failed.");
      return null;
    }

  } catch (err) {
    console.error("Image generation error:", err);
    toast.error(err.message || "Something went wrong while generating image.");
    return null;
  }
};


  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
    toast.success("Logged out!");
  };

  useEffect(() => {
    if (token) {
      loadCreditsData();
    } else {
      setUser(null);
      setCredit(0);
    }
  }, [token]);

  const value = {
    user,
    setUser,
    showLogin,
    setShowLogin,
    backendUrl,
    token,
    setToken,
    credit,
    setCredit,
    loadCreditsData,
    logout,
    generateImage,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
