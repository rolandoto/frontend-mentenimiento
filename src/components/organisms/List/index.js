import React from "react";

export const ListContainer = (_) => {};

export const ListParent = (_) => {};

export const ListItem = (_) => {};

const listHeader = ["Código del ambiente", "Nombre"];
const listItems = [
    { environmentCode: "SDC-23", name: "puente C", _id: "DCS33" },
    { environmentCode: "SDC-63", name: "puente D", _id: "DCS66" },
];

export const Example = (_) => (
    <div>
        <div className="list_filters"></div>
        <div>
            <ul className="list_header">
                {listHeader.map((item) => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
            <ul className="list_body">
                {listItems.map((item) => (
                    <li key={item._id}>
                        
                    </li>
                ))}
            </ul>
        </div>
    </div>
);
