import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

import { Card } from 'primereact/card';
import { useHistory } from 'react-router-dom';
import logo from '../img/logo.png';
import '../App.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory(); 

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Email:', email);
        console.log('Password:', password);
        history.push('/Layout'); 
    }
    const header = (
        <img alt="Card" src={logo} className="card-header-image" />
    );
    const footer = (
        <span>
            <Button label="Se connecter" onClick={handleSubmit} />
        </span>
    );

    return (
        <div  className="centered-content"> 
            <Card   footer={footer} header={header} className="login-card">
                <div className="p-field">
                    <label htmlFor="email">Login</label>
                    
                    
                    <InputText 
                        id="email"
                        type="email" 
                        placeholder="Exemple@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                </div>
                <div className="p-field">
                    <label htmlFor="password">Mot de passe</label>
                   
                    <InputText 
                        id="password"
                        type="password" 
                        placeholder="Entrez votre mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                </div>
            </Card>
        </div>
    );
}

export default Login;
