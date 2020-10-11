import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import Maps from './components/Maps';
import fire from './fire'


function App() {
  const [user, setUser] = useState('');
  const [email, setEmail ] = useState('');
  const [password, SetPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passError, setPassError] = useState('');
  const [hasAccount, setHasAccount] = useState(false);
  const [stores, setStores] = React.useState([]);

  const clearInputs = () => {
    setEmail('');
    SetPassword('');
  };

  const clearError = () => {
    setEmailError('');
    setPassError('');
  };

  const handleLogin = () => {
    clearError();
    fire.auth().signInWithEmailAndPassword(email, password)
    .catch((err) => {
      switch (err.code){
        case "auth/invalid-email":
        case "auth/user-disabled":
        case "auth/user-not-found":       
          setEmailError(err.message);
          break;
        case "auth/wrong-password":
          setPassError(err.message);
          break;
      }      
    }
    )};

  const handleSignup = ()  => {
    clearError();
    fire.auth().createUserWithEmailAndPassword(email, password)
    .catch((err) => {
      switch (err.code){
        case "auth/email-already-in-use":
        case "auth/invalid-email":       
          setEmailError(err.message);
          break;
        case "auth/weak-password":
          setPassError(err.message);
          break;
      }      
    }
    )
  };

  const handleLogout = () => {
    fire.auth().signOut();
  };

  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        clearInputs();
        setUser(user);
      } else {
        setUser('');
      }
    })
  };

  const fetchData = async () => {
    const db = fire.firestore();
    const data = await db.collection("Stores").get();
    setStores(data.docs.map(store => store.data()))
  };

  useEffect(() => {
    authListener();
    fetchData();
  }, []); 

  return (
    <div className="App">
      {user ? (
        <Maps handleLogout={handleLogout}        
        stores={stores}/>
      ) : (
        <Login
        email={email}
        setEmail={setEmail}
        password={password}
        SetPassword={SetPassword}
        handleLogin={handleLogin}
        handleSignup={handleSignup}
        hasAccount={hasAccount}
        setHasAccount={setHasAccount}
        emailError={emailError}
        passError={passError}
      />
      )}
    </div>
  );
}

export default App;
