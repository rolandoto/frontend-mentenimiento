import React, { useEffect, useState } from "react";
import "./list.scss";
import { Search } from "../../molecules";
import {
    ArrowBackIos,
    ArrowForwardIos,
    Edit,
    Delete,
    Apps,
    Visibility,
    Category,
} from "@material-ui/icons";
import { history } from "../../../helpers";

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

const ListItems = ({
    items = [],
    EditC,
    showKeys = [],
    onDelete,
    details,
    visibility,
    rows,
    assignSparePart,
}) => {
    const [edit, setEdit] = useState("");
    const evalueEdit = (item) => {
        if (item._id === edit) {
            setEdit("");
            return false;
        }

        setEdit(item._id);
    };

    return (
        <ul className="list_body">
            {items.map((item) => (
                <div key={item._id}>
                    <li
                        className="list_item"
                        style={{
                            gridTemplateColumns: `repeat(${rows}, 1fr)`,
                        }}
                    >
                        {showKeys.map((k, i) => {
                            if (k !== "complete") {
                                return <p key={i}>{item[k]}</p>;
                            } else {
                                return (
                                    <p key={i}>
                                        {item[k] ? "Completado" : "En curso"}
                                    </p>
                                );
                            }
                        })}
                        <div className="item_actions">
                            {EditC && (
                                <div
                                    className="item_edit_trigger edit_item"
                                    onClick={() => evalueEdit(item)}
                                >
                                    <Edit />
                                </div>
                            )}
                            {details && (
                                <div
                                    className="item_edit_trigger show_item"
                                    onClick={() => details(item)}
                                >
                                    <Apps />
                                </div>
                            )}
                            {assignSparePart && (
                                <div
                                    className="item_edit_trigger show_item"
                                    onClick={() => assignSparePart(item)}
                                >
                                    <Category />
                                </div>
                            )}
                            {visibility && (
                                <div
                                    className="item_edit_trigger status_item"
                                    onClick={() =>
                                        history.push(visibility + item._id)
                                    }
                                >
                                    <Visibility />
                                </div>
                            )}
                            {onDelete && (
                                <div
                                    className="item_edit_trigger delete_item"
                                    onClick={() => onDelete(item)}
                                >
                                    <Delete />
                                </div>
                            )}
                        </div>
                    </li>
                    {EditC && edit === item._id && <EditC edit={item} />}
                </div>
            ))}
        </ul>
    );
};

export const List = ({
    header = [],
    items = [],
    EditComponent,
    keys = [],
    onDelete,
    details,
    visibility,
    totalRows = 3,
    assignSparePart,
}) => {
    const [itemsPerView, setItemsPerView] = useState(6);
    const [showItems, setShowItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const getTotalPages = (_) => {
        return Math.ceil(items.length / itemsPerView);
    };

    useEffect(
        (_) => {
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
                <ListItems
                    items={showItems}
                    EditC={EditComponent}
                    showKeys={keys}
                    onDelete={onDelete}
                    details={details}
                    visibility={visibility}
                    rows={totalRows}
                    assignSparePart={assignSparePart}
                />
            </div>
        </ListContainer>
    );
};
