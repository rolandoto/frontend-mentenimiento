import React from "react";
import { Dropdown, Search } from "../../molecules";
import { Text } from "../../atoms";
import { Notifications , Textsms} from "@material-ui/icons";
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
                <Search background_dark />
                <div className="action_section">
                    <Notifications className="icon_space_right" />
                    <Textsms className="icon_space_right" />
                    <Dropdown image username  />
                </div>
            </div>
        </nav>
    );
};
