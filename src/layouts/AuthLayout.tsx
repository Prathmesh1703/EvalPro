import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

export const AuthLayout = () => {
  const { loginWithRedirect, user, isAuthenticated, logout } = useAuth0();
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 right-0 z-50 p-4 text-right">
      {isAuthenticated && user ? (
        <div className="relative inline-block">
          {/* Profile picture */}
          <img
            src={user.picture}
            alt={user.name}
            className="w-12 h-12  rounded-full cursor-pointer border-2 border-white bg-black shadow"
            onClick={() => setShowPopup((prev) => !prev)}
          />
          {/* Glass-like popup menu */}
          {showPopup && (
            <div className="absolute top-10 right-0 min-w-[200px] bg-black/70 text-white rounded-xl shadow-lg border border-white/20 backdrop-blur-md">
              <div className="flex flex-col gap-3 py-3 px-2 text-center">
                {/* Navigation buttons */}
                <button
                  className="bg-transparent border-none text-white text-base cursor-pointer w-full transition-colors hover:text-blue-400 active:text-blue-600"
                  onClick={() => {
                    navigate("/profile");
                    setShowPopup(false);
                  }}
                >
                  Profile
                </button>
                <button
                  className="bg-transparent border-none text-white text-base cursor-pointer w-full transition-colors hover:text-blue-400 active:text-blue-600"
                  onClick={() => {
                    navigate("/dashboard");
                    setShowPopup(false);
                  }}
                >
                  Dashboard
                </button>
                <button
                  className="bg-transparent border-none text-white text-base cursor-pointer w-full transition-colors hover:text-blue-400 active:text-blue-600"
                  onClick={() => {
                    navigate("/results");
                    setShowPopup(false);
                  }}
                >
                  Results
                </button>
                <button
                  className="bg-transparent border-none text-white text-base cursor-pointer w-full transition-colors hover:text-blue-400 active:text-blue-600"
                  onClick={() => {
                    navigate("/settings");
                    setShowPopup(false);
                  }}
                >
                  Settings
                </button>
                <button
                  className="bg-transparent border-none text-white text-base cursor-pointer w-full transition-colors hover:text-blue-400 active:text-blue-600"
                  onClick={() => {
                    navigate("/help");
                    setShowPopup(false);
                  }}
                >
                  Help
                </button>
              </div>
              {/* Divider */}
              <hr className="border-white/20 my-2" />
              {/* Logout button */}
              <div className="text-center pb-2">
                <button
                  className="bg-transparent border-none text-red-500 font-bold text-base cursor-pointer w-full transition-colors active:text-blue-600"
                  onClick={() => {
                    logout({});
                    setShowPopup(false);
                  }}
                >
                  Log Out
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <button
          className="h-15 bg-transparent border-none text-white text-base cursor-pointer transition-colors hover:text-blue-400 active:text-blue-600"
          onClick={() => loginWithRedirect()}
        >
          Get Started
        </button>
      )}
    </div>
  );
};

export default AuthLayout;