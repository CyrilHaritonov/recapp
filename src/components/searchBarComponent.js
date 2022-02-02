import React, {useState} from "react";
import {Form, Input, ListGroup, ListGroupItem} from "reactstrap";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";

export const SearchBarComponent = () => {
    const [suggestions, setSuggestions] = useState([]);
    const [searchWord, setSearchWord] = useState('');
    const playlists = useSelector(state => state.playlists.playlists);
    const handleChange = (event) => {
        setSearchWord(event.target.value);
        setSuggestions(playlists.filter(value => value.name.toLowerCase().includes(searchWord.toLowerCase())));
    }
    return (
        <Form className="mt-2 mb-2 ms-auto">
            <Input className="ms-md-auto" type="search" style={{width: "inherit", boxSizing: "border-box"}}
                   placeholder="Search"
                   aria-label="Search"
            onChange={handleChange}/>
            {searchWord.length !== 0 && <ListGroup className={"searchSuggestions"} style={{position: "absolute", height: "167px", overflowY: "auto"}}>
                {suggestions.map(result => <Link to={`/playlists/${result.id}`}><ListGroupItem key={result.id} action style={{width: "207px"}}>{result.name}</ListGroupItem></Link>)}
            </ListGroup>}
        </Form>
    );
}