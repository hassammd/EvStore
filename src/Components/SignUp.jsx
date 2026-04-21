import { useState } from "react";
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { signUpUser } from "../Redux/AuthSlice/SignUpSlice";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({});

  console.log(error);

  //handle form

  const SignUpHandler = (e) => {
    e.preventDefault();
    console.log("all ok");

    const newError = {};
    if (!name.trim()) {
      newError.name = "Enter your Name";
    }
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!email.trim()) {
      newError.email = "Enter Your Email";
    } else if (!emailRegex.test(email)) {
      newError.email = "Enter valid email";
    }
    if (!password.trim()) {
      newError.password = "Enter Your Password";
    }
    if (!confirmPassword.trim()) {
      newError.confirmPassword = "Enter your Confirm Password";
    } else if (password !== confirmPassword) {
      newError.passowrdNotMatch = "Password Not Match";
    }
    if (Object.keys(newError).length > 0) {
      setError(newError);
    } else {
      setError("");
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      dispatch(signUpUser({ name, email, password }));

      navigate("/");
    }
  };
  return (
    <>
      <div className="mx-auto bg-gray-100 w-full md:w-1/2 lg:w-1/3   lg:p-15 p-10 rounded-xl">
        <h3 className="text-center text-2xl">Sign Up</h3>
        <form onSubmit={SignUpHandler} action="">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2 relative">
              <input
                onChange={(e) => setName(e.target.value)}
                className="p-3 pl-8 border-b-1 border-gray-200 border-b-2 outline-0"
                type="text"
                name="name"
                value={name}
                placeholder="Name"
              />
              <span className="absolute top-4">
                <FaRegUser className="text-xl" />
              </span>
              <span className="text-sm text-red-600">{error.name}</span>
            </div>
            <div className="flex flex-col gap-2 relative">
              <input
                onChange={(e) => setEmail(e.target.value)}
                className="p-3 pl-8 border-b-1 border-gray-200 border-b-2 outline-0"
                type="text"
                value={email}
                placeholder="Email"
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
            <div className="flex flex-col gap-2 relative">
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="p-3 pl-8 border-b-1 border-b-2 border-gray-200  outline-0"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
              />
              <span className="absolute top-4">
                <RiLockPasswordLine className="text-xl " />
              </span>
              <span className="text-sm text-red-600">
                {error.confirmPassword}
              </span>
              <span className="text-sm text-red-600">
                {error.passowrdNotMatch}
              </span>
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
      </div>
    </>
  );
};

export default SignUp;
