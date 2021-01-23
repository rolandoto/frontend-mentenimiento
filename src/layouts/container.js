import React from "react";
import cx from "classnames";

export const Container = ({ children, extraClass }) => {
    return <div className={cx("main_container", extraClass)}>{children}</div>;
};
