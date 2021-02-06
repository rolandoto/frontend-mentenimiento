import React from "react";
import { Text } from "../";
import "./infoBox.scss";

export const InfoBox = ({ conunter = 0, text = "", Icon, color = "#fff" , iconColor = "#83889C" }) => {
    return (
        <div className="rows">
            <div className="col6">
                <div
                    className="icon_desing absolute_center"
                    style={{ backgroundColor: color }}
                >
                    {Icon && <Icon style={{ fill: iconColor }} />}
                </div>
            </div>

            <div className="col6 align_vertical">
                <Text type="p" text={text} />
                <Text type="strong" size={30} weight={600} text={conunter} />
            </div>
        </div>
    );
};
