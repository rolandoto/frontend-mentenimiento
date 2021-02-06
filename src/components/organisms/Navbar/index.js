import React from "react";
import { Dropdown, Search, Notifications } from "../../molecules";
import { Text } from "../../atoms";
import { Link } from "react-router-dom";
import "./navbar.scss";

export const Navbar = (_) => {
    return (
        <nav>
            <div className="container navbar">
                <div className="brand">
                    <img
                        src="/img/logoSena.png"
                        alt="main logo"
                        className="responsive_image"
                    />
                    <Text
                        type="span"
                        text="Siesa"
                        weight="bold"
                        color="#83889c"
                        size={13}
                        colored
                    />
                </div>
                <Search background_dark />
                <div className="action_section">
                    <Notifications />
                    
                    <Dropdown image username logoutAction>
                        <li>
                            <Link to="/profile">Perfil</Link>
                        </li>
                    </Dropdown>
                </div>
            </div>
        </nav>
    );
};
