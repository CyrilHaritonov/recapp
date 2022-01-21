import React from "react";
import {HeaderComponent} from "./headerComponent";
import {ListComponent} from "./listComponent";
import {FooterComponent} from "./footerComponent";

export const MainComponent = () => {
    return (
        <>
            <HeaderComponent/>
            <ListComponent/>
            <FooterComponent/>
        </>
    );
}