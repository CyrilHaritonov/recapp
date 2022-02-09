import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import React from "react";
import {HeaderComponent} from "./components/headerComponent";
import {Container} from "reactstrap";
import {ListComponent} from "./components/listComponent";
import {ListOfSongsComponent} from "./components/listOfSongsComponent";
import {NotFoundComponent} from "./components/notFoundComponent";
import CreateNewPlaylistComponent from "./components/createNewPlaylistComponent";
import RequireAuth from "./components/requireAuth";
import SubscriptionComponent from "./components/subscriptionComponent";

function App() {
  return (
    <>
        <BrowserRouter>
            <HeaderComponent/>
            <Container style={{marginTop: "40px"}}>
                <Routes>
                    <Route path={'/playlists/:playlistId'} element={<RequireAuth><ListOfSongsComponent/></RequireAuth>}/>
                    <Route path={'*'} element={<NotFoundComponent/>}/>
                    <Route index element={<ListComponent/>}/>
                    <Route path={'/newPlaylist'} element={<RequireAuth><CreateNewPlaylistComponent/></RequireAuth>}/>
                    <Route path={'/subscription'} element={<SubscriptionComponent />}/>
                </Routes>
            </Container>
        </BrowserRouter>
    </>
  );
}

export default App;
