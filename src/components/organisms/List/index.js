import React, { useEffect, useState } from "react";
import "./list.scss";
import { Search } from "../../molecules";
import { AddEnvironmentComponent } from "../../organisms/Modals";
import {
    ArrowDropDown,
    ArrowBackIos,
    ArrowForwardIos,
} from "@material-ui/icons";

const ListContainer = ({ children }) => {
    return children;
};

const ListHeader = ({ items = [] }) => (
    <ul
        className="list_header list_item"
        style={{
            gridTemplateColumns: `repeat(${items.length}, 1fr)`,
        }}
    >
        {items.map((item) => (
            <li key={item}>{item}</li>
        ))}
    </ul>
);

const ListItems = ({ items = [] }) => {
    const [edit, setEdit] = useState("");
    const evalueEdit = (item) => {
        if (item._id === edit) {
            setEdit("");
            return false;
        }

        setEdit(item._id);

        console.log(item);
    };

    return (
        <ul className="list_body">
            {items.map((item) => (
                <div key={item._id}>
                    <li
                        className="list_item"
                        style={{
                            gridTemplateColumns: `repeat(3, 1fr)`,
                        }}
                    >
                        <p>{item.environmentCode}</p>
                        <p>{item.name}</p>
                        <div className="item_actions">
                            <div
                                className="item_edit_trigger"
                                onClick={() => evalueEdit(item)}
                            >
                                <ArrowDropDown />
                            </div>
                        </div>
                    </li>
                    {edit === item._id && <AddEnvironmentComponent edit={item} />}
                </div>
            ))}
        </ul>
    );
};

export const List = ({ header = [], items = [] }) => {
    const [itemsPerView, setItemsPerView] = useState(6);
    const [showItems, setShowItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const getTotalPages = (_) => {
        return Math.ceil(items.length / itemsPerView);
    };

    useEffect(
        (_) => {
            items.reverse();
            let firstRender = [];
            setItemsPerView(6);
            for (let i = 0; i < itemsPerView; i++) {
                if (i > items.length - 1) {
                    break;
                }

                firstRender.push(items[i]);
            }

            setShowItems(firstRender);
        },
        [items, itemsPerView]
    );

    const changePage = (page) => {
        setCurrentPage(page);
        let renderItems = [];
        for (let i = itemsPerView * (page - 1); i < itemsPerView * page; i++) {
            if (i > items.length - 1) {
                break;
            }
            renderItems.push(items[i]);
        }

        setShowItems(renderItems);
    };

    return (
        <ListContainer>
            <div className="list_filters">
                <Search />
                <div className="pagination_list">
                    {currentPage > 1 && (
                        <ArrowBackIos
                            onClick={() => changePage(currentPage - 1)}
                        />
                    )}
                    <span>{currentPage + " - " + getTotalPages()}</span>
                    {currentPage < getTotalPages() && (
                        <ArrowForwardIos
                            onClick={() => changePage(currentPage + 1)}
                        />
                    )}
                </div>
            </div>
            <div>
                <ListHeader items={header} />
                <ListItems items={showItems} />
            </div>
        </ListContainer>
    );
};
