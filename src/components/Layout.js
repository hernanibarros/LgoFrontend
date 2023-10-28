// Layout.js
import React, { useState } from 'react';
import Menu from './Menu';
import LineDemo from './LineDemo';
import Revenu from './Revenu';
import DepartmentList from './DepartmentList';
import Copmannuelle from './Copmannuelle';
import Copmmensuelle from './Copmmensuelle';
import Copmdepartement from './Copmdepartement';
import Copmtrimestrielle from './Copmtrimestrielle';


import '../css/Layout.css';
import logo from '../img/logo.png';


function Layout({ children }) {
   
    const [currentContent, setCurrentContent] = useState("default");
    return (
        <div className="layout-container">
             <header className="layout-header">
                <img src={logo} alt="Logo" className="logo" />
                
                <div className="user-info">
                    <i className="icon pi pi-user"></i>
                    Bienvenu user
                </div>
            </header>
            <div className="layout-body">

                
                <nav className="layout-menu">
                  
                  
                    <Menu setCurrentContent={setCurrentContent} />
                </nav>
                
                <main className="layout-content">
                    {currentContent === "default" && <LineDemo />}
                    {currentContent === "gererDepartements" && <DepartmentList />}
                    {currentContent === "Copmannuelle" && <Copmannuelle />}
                    {currentContent === "Copmtrimestrielle" && <Copmtrimestrielle />}
                    {currentContent === "Copmmensuelle" && <Copmmensuelle />}
                    {currentContent === "Copmdepartement" && <Copmdepartement />}
                    {currentContent === "Revenu" && <Revenu />}
                   
                  

                    {/* Ajoutez d'autres contenus conditionnels ici */}
                </main>

            </div>
            <footer className="layout-footer">Votre Footer Ici</footer>
        </div>
    );
}

export default Layout;
