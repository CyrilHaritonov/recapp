import React from "react";
import {HeaderComponent} from "./headerComponent";
import {ListComponent} from "./listComponent";
import {FooterComponent} from "./footerComponent";
import {Route, Routes} from "react-router-dom";
import {ListOfSongsComponent} from "./listOfSongsComponent";
import {Container} from "reactstrap";

export const MainComponent = () => {
    return (
        <>
            <HeaderComponent/>
            <Container className="bg-black mt-5">
                <Routes>
                    <Route path={"/playlists"} element={<ListComponent/>}/>
                    <Route path={'/playlists/:playlistId'} element={<ListOfSongsComponent/>}/>
                </Routes>
            </Container>
            <FooterComponent/>
        </>
    );
}