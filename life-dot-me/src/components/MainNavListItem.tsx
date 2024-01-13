import React from "react";

export function MainNavListItem(props) {
    return (
        <li className="flex items-center">
            {props.children}
        </li>
    );
}
