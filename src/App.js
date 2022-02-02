import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import React from "react";
import {HeaderComponent} from "./components/headerComponent";
import {Container} from "reactstrap";
import {ListComponent} from "./components/listComponent";
import {ListOfSongsComponent} from "./components/listOfSongsComponent";
import {FooterComponent} from "./components/footerComponent";
import {NotFoundComponent} from "./components/notFoundComponent";
import CreateNewPlaylistComponent from "./components/createNewPlaylistComponent";

function App() {
  return (
    <>
        <BrowserRouter>
            <HeaderComponent/>
            <Container className="bg-black mt-5">
                <Routes>
                    <Route path={"/playlists"} element={<ListComponent/>}/>
                    <Route path={'/playlists/:playlistId'} element={<ListOfSongsComponent/>}/>
                    <Route path={'*'} element={<NotFoundComponent/>}/>
                    <Route index element={<ListComponent/>}/>
                    <Route path={'/newPlaylist'} element={<CreateNewPlaylistComponent/>}/>
                </Routes>
            </Container>
            <FooterComponent/>
        </BrowserRouter>
    </>
  );
}

export default App;
