import React from "react";
import { Navbar, Sidebar } from "../components/organisms";
import { Link } from "../components/atoms";
import { Home , SupervisorAccount , Settings , Build , Folder , Category , Memory , Eco} from "@material-ui/icons";

export const MainLayout = (props) => (
    <>
        <Navbar />
        <div className="separator_top"></div>
        <div className="container rows">
            <div className="col3">
                <Sidebar>
                    <Link path="/" text="Inicio" Icon={Home} organized />
                    <Link path="/profile" text="Perfil" Icon={SupervisorAccount} organized />

                    <div className="separator_top"></div>

                    <Link path="/environments" text="Ambientes" Icon={Eco} organized />
                    <Link path="/machines" text="Maquinas" Icon={Memory} organized />
                    <Link path="/spareParts" text="Repuestos" Icon={Category} organized />
                    <Link
                        path="/maintenances"
                        text="Mantenimeintos"
                        Icon={Build}
                        organized
                    />

                    <div className="separator_top"></div>

                    <Link path="/reports" text="Reportes" Icon={Folder} organized />
                    <Link path="/setting" text="Ajustes" Icon={Settings} organized />
                </Sidebar>
            </div>
            <div className="col9">{props.children}</div>
        </div>
    </>
);
