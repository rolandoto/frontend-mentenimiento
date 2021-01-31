import React, { useState } from "react";
import { Text } from "../../atoms";
import { Search as SearchIcon } from "@material-ui/icons";
import "./search.scss";

export const Search = ({ background_dark }) => {
    const [showDetail, setShowDetail] = useState(true);

    const evaluateAnimation = (e) => {
        if (e.target.value.length === 0 && showDetail) {
            setShowDetail(false);
        }

        if (e.target.value.length === 0 && !showDetail) {
            setShowDetail(true);
        }
    };

    const evaluateClass = (_) => {
        const extraClass = background_dark
            ? "background_dark"
            : "background_border";
        return "search_bar " + extraClass;
    };

    return (
        <div className={evaluateClass()}>
            {showDetail && (
                <div className="input_ovew_items">
                    <SearchIcon />
                    <Text
                        type="span"
                        text="Buscar..."
                        color="#DCE1E7"
                        weight="500"
                    />
                </div>
            )}

            <input
                type="text"
                onClick={(e) => evaluateAnimation(e)}
                onBlur={(e) => evaluateAnimation(e)}
            />
        </div>
    );
};
