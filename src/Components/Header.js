import { onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { auth } from "../utils/firebase";
import { addUser, removeUser } from "../utils/userSlice";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => { })
      .catch((error) => {
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });

    // Unsiubscribe when component unmounts
    return () => unsubscribe();
  }, [dispatch, navigate]);

  const handleGptSearchClick = () => {
    // Toggle GPT Search
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="fixed w-full px-3 md:px-8 py-2 md:py-3 bg-gradient-to-b from-black via-black/80 to-transparent z-50 flex flex-col md:flex-row justify-between items-center backdrop-blur-sm transition-all duration-300">
      {/* Logo with animation */}
      <img
        className="w-28 md:w-44 mb-2 md:mb-0 mx-auto md:mx-0 hover:scale-105 transition-transform duration-300 cursor-pointer"
        src={LOGO}
        alt="logo"
        onClick={() => navigate("/browse")}
      />

      {user && (
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 w-full md:w-auto">
          {/* Language Selector with modern styling */}
          {showGptSearch && (
            <select
              className="px-2 py-1.5 md:px-3 md:py-2 text-sm bg-gray-800/80 backdrop-blur-md text-white rounded-lg border border-gray-700 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all duration-200 cursor-pointer"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}

          {/* GPT Search Toggle Button with gradient and animation */}
          <button
            className="px-3 py-1.5 md:px-5 md:py-2.5 text-sm md:text-base bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-purple-500/50 transform hover:scale-105 transition-all duration-200 active:scale-95 whitespace-nowrap"
            onClick={handleGptSearchClick}
          >
            <span className="hidden sm:inline">{showGptSearch ? "🏠 Homepage" : "✨ GPT Search"}</span>
            <span className="sm:hidden">{showGptSearch ? "🏠" : "✨ GPT"}</span>
          </button>

          {/* User Avatar with border and hover effect */}
          <img
            className="hidden md:block w-9 h-9 rounded-full border-2 border-gray-600 hover:border-purple-500 transition-all duration-200 cursor-pointer shadow-lg"
            alt="usericon"
            src={user?.photoURL}
          />

          {/* Sign Out Button with modern styling */}
          <button
            onClick={handleSignOut}
            className="px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base font-semibold text-white bg-red-600/80 hover:bg-red-600 rounded-lg backdrop-blur-sm transition-all duration-200 hover:shadow-lg hover:shadow-red-500/30 active:scale-95 whitespace-nowrap"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};
export default Header;