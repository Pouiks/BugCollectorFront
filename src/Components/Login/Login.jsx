import { useState } from 'react';
import './Login.css';
import CardContainerLogin from '../CardContainerLogin/CardContainerLogin.jsx';
import SignUpContainer from '../SignUpContainer/SignUpContainer.jsx';

const LoginLayout = ({ onLogin }) => {
  const [loginOrSignup, setLoginOrSignup] = useState(false);

  const handleLoginOrSignup = () => {
    setLoginOrSignup(!loginOrSignup);
  };

  return (
    <>
      <h1 style={{ color: 'white' }}>Découvrez dès maintenant votre outil de gestion de bugs</h1>
      {loginOrSignup ? (
        <SignUpContainer handleLoginOrSignup={handleLoginOrSignup} />
      ) : (
        <CardContainerLogin handleLoginOrSignup={handleLoginOrSignup} onLogin={onLogin} />
      )}
    </>
  );
};

export default LoginLayout;
