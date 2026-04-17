import { useState } from "react";
import SignIn from "../Components/SignIn";
import SignUp from "../Components/SignUp";

const Auth = () => {
  const [isUserCreated, setIsUserCreate] = useState(true);
  return (
    <>
      <div className="w-full h-screen  flex items-center justify-center">
        <div className="container mx-auto px-4">
          {isUserCreated ? (
            <SignIn setIsUserCreate={setIsUserCreate} />
          ) : (
            <SignUp />
          )}
        </div>
      </div>
    </>
  );
};
export default Auth;
