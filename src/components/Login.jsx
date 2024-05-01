import { useState, useEffect } from "react";

const Login = ({ setVerified }) => {
  const [pw, setPW] = useState("");

  const checkPW = () => {
    if (pw === "pedropedropedro") {
      setVerified(true);
    }
  };
  checkPW();

  return (
    <div className="fixed top-1/4 left-1/2 -translate-x-1/2">
      <h1 className="text-7xl font-bold tracking-widest text-main mb-3">
        LOGIN
      </h1>
      <input
        type="password"
        className="input"
        value={pw}
        onChange={(e) => {
          setPW(e.target.value);
        }}
      />
    </div>
  );
};

export default Login;
