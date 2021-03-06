import React, { useEffect, useState } from "react";
import { ArrowBackIos, ArrowForwardIos, Check , VisibilityOutlined } from "@material-ui/icons";
import "./listDetail.scss";

export const ListDetail = ({ items = [], keysToShow = [], complete, show }) => {
    const [itemsToShow, setItemsToShow] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerView = 5;
    const totalPages = Math.ceil(items.length / itemsPerView);

    const changePage = (page) => {
        let itemsArr = [];
        for (let i = itemsPerView * (page - 1); i < itemsPerView * page; i++) {
            if (!items[i]) {
                continue;
            }
            itemsArr.push(items[i]);
        }
        setItemsToShow(itemsArr);
    };

    useEffect(
        (_) => {
            let itemsArr = [];
            for (let i = 0; i < itemsPerView; i++) {
                if (!items[i]) {
                    continue;
                }
                itemsArr.push(items[i]);
            }
            setItemsToShow(itemsArr);
        },
        [items]
    );

    return (
        <div className="list_item_container">
            <ul className="list_body">
                {itemsToShow.map((item) => (
                    <li
                        className="list_item_detail direction_column list_item_shadow"
                        key={"LTS"  + Math.random() * (2500000 - 2500)}
                    >
                        {keysToShow.map((key) => {
                            return (
                                <p key={"ITM"  + Math.random() * (2500000 - 2500)}>
                                    {key === "stockUsed" && (
                                        <span>Cantidad usada: </span>
                                    )}
                                    {item[key]}
                                </p>
                            );
                        })}
                        {item.complete
                            ? item.complete === false && (
                                  <div
                                      className="complete_check"
                                      onClick={() => complete(item)}
                                      key={"CMC"  + Math.random() * (2500000 - 2500)}
                                  >
                                      <Check />
                                  </div>
                              )
                            : null}
                        {show && (
                            <div
                                className="complete_check icon_show"
                                onClick={() => show(item)}
                                key={"VBO"  + Math.random() * (2500000 - 2500)}
                            >
                                <VisibilityOutlined />
                            </div>
                        )}
                    </li>
                ))}
            </ul>
            {totalPages > 1 && (
                <div className="pagintaion_items">
                    {currentPage > 1 && (
                        <div
                            className="icon_pagination"
                            onClick={() => [
                                setCurrentPage(currentPage - 1),
                                changePage(currentPage - 1),
                            ]}
                        >
                            <ArrowBackIos />
                        </div>
                    )}
                    <span>{currentPage + " - " + totalPages}</span>
                    {currentPage < totalPages && (
                        <div
                            className="icon_pagination"
                            onClick={() => [
                                setCurrentPage(currentPage + 1),
                                changePage(currentPage + 1),
                            ]}
                        >
                            <ArrowForwardIos />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
