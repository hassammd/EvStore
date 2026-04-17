import { useState } from "react";
import { FiLock, FiMail } from "react-icons/fi";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { signInUser } from "../Redux/AuthSlice/SignInSlice";

const SignIn = ({ setIsUserCreate }) => {
  const { isDark } = useSelector((state) => state.theme);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({});

  const dispatch = useDispatch();

  const loginHandler = (e) => {
    e.preventDefault();
    const newError = {};
    if (!email.trim()) {
      newError.email = "Enter Email";
    }
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      newError.email = "Invalid Email";
    }
    if (Object.keys(newError).length > 0) {
      setError(newError);
    } else {
      setEmail("");
      setPassword("");
      dispatch(signInUser(email, password));
    }
  };

  return (
    <>
      <div className="mx-auto bg-gray-100 w-full md:w-1/2 lg:w-1/3   lg:p-15 p-10 rounded-xl">
        <h3 className="text-center text-2xl">Login</h3>
        <form action="" onSubmit={loginHandler}>
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2 relative">
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="p-3 pl-8 border-b-1 border-gray-200 border-b-2 outline-0"
                type="text"
                placeholder="Email"
                value={email}
              />
              <span className="absolute top-4">
                <MdOutlineMailOutline className="text-xl" />
              </span>
              <span className="text-sm text-red-600">{error.email}</span>
            </div>
            <div className="flex flex-col gap-2 relative">
              <input
                onChange={(e) => setPassword(e.target.value)}
                className="p-3 pl-8 border-b-1 border-b-2 border-gray-200  outline-0"
                type="password"
                placeholder="Password"
                value={password}
              />
              <span className="absolute top-4">
                <RiLockPasswordLine className="text-xl " />
              </span>
              <span className="text-sm text-red-600">{error.password}</span>
            </div>
            <div>
              <input
                type="submit"
                className="bg-orange w-full text-white py-3 rounded-sm cursor-pointer"
              />
            </div>
          </div>
          <span className="text-right block pt-1 text-sm w-full">
            Forgot Password?
          </span>
        </form>
        {/* <span className="text-right block w-full bg-red-400">
          Or Sign Up Using
        </span> */}
        <div
          onClick={() => setIsUserCreate(false)}
          class="w-full text-center pt-6"
        >
          <span class="w-100 cursor-pointer">SIGN UP</span>
        </div>
      </div>
    </>
  );
};

export default SignIn;
