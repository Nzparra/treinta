import React from 'react';

const Login = (props) => {
    const {
        email,
        setEmail,
        password,
        SetPassword,
        handleLogin,
        handleSignup,
        hasAccount,
        setHasAccount,
        emailError,
        passError
    } = props;
    
    return (
        <section className="login">
            <nav>
                <img src="https://www.treinta.co/wp-content/uploads/2020/08/treinta-logo-yellow-gmail-1.png"/>
            </nav>
            <div className="Mobile">
            </div>
            <div className="loginContainer">
                <label>Usuario</label>
                <input
                    type="text"
                    autoFocus
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <p className="errorMsg">{emailError}</p>
                <label>Contraseña</label>
                <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => SetPassword(e.target.value)}
                />
                <p className="errorMsg">{passError}</p>
                <div className="btnContainer">
                    {hasAccount ? (
                        <>
                        <button onClick={handleLogin}>Ingreso</button>
                        <p>¿Aún no tienes cuenta?<span onClick={() => setHasAccount(!hasAccount)}>Registrate</span></p>
                        </>
                    ) : (
                        <>
                        <button onClick={handleSignup}>Registrate</button>
                        <p>Ya tienes una cuenta? <span onClick={() => setHasAccount(!hasAccount)}>Ingresa</span></p>
                        </>
                    )}
                </div>
            </div>
        </section>
    )

};

export default Login;