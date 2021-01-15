import React from "react";
import { Dropdown, Search } from "../../molecules";
import { Text } from "../../atoms";
import "./navbar.scss";

export const Navbar = (_) => {
    return (
        <nav>
            <div className="container navbar">
                <div className="brand">
                    <img
                        src="/img/logo.png"
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
                <Search />
                <div className="action_section">
                    <Dropdown image username  />
                </div>
            </div>
        </nav>
    );
};
