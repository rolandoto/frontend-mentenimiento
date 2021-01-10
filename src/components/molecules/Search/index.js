import React, { useState } from "react";
import { Text } from "../../atoms";
import { Search as SearchIcon } from "@material-ui/icons";
import "./search.scss";

export const Search = (_) => {
    const [showDetail, setShowDetail] = useState(true);

    const evaluateAnimation = (e) => {
        if (e.target.value.length === 0 && showDetail) {
            setShowDetail(false);
        }

        if (e.target.value.length === 0 && !showDetail) {
            setShowDetail(true);
        }
    };

    return (
        <div className="search_bar">
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
