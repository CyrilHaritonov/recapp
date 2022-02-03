import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay} from "@fortawesome/free-solid-svg-icons";

export const SongComponent = ({thumbnail, name, length, author, id}) => {
    const [isOnHover, changeHover] = useState(false);
    return (
        <>
            <div className={'d-flex text-white-50 ps-2 pt-2 pb-2 songInstance'}
                 style={{backgroundColor: "rgba(0, 0, 0, 0.6)"}}
                 onMouseEnter={() => {changeHover(true)}} onMouseLeave={() => {changeHover(false)}}>
                <div className={"mt-4 mb-1 ms-2"}>{id+1}</div>
                <div className={"flex-shrink-0 ms-3"} style={{position: "relative"}}>
                    <img className={"rounded-1"} src={thumbnail} alt={name} width={"75px"} height={"75px"}/>
                    {isOnHover && <FontAwesomeIcon icon={faPlay} style={{position: "absolute", bottom: "33", left: "20", fontSize: "2rem"}}/>}
                </div>
                <div className={"flex-grow-1 ms-4 mt-3"}>
                    <h5>{name}</h5>
                    <p className={"small"}>{author}</p>
                </div>
                <div className={"me-3 align-items-center d-flex"}>
                    {length}
                </div>
            </div>
        </>
    );
}