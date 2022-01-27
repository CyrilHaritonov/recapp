import React from "react";

export const SongComponent = ({thumbnail, name, length, author, id}) => {
    return (
        <>
            <div className={'d-flex bg-dark text-white-50 ps-2 pt-2 pb-2'}>
                <div className={"mt-4 mb-1"}>{id+1}</div>
                <div className={"flex-shrink-0 ms-3"}>
                    <img className={"rounded-1 "} src={thumbnail} alt={name} width={"75px"} height={"75px"}/>
                </div>
                <div className={"flex-grow-1 ms-4 mt-3"}>
                    <h5>{name}</h5>
                    <p className={"small"}>{author}</p>
                </div>
                <div className={"me-3 mt-3"}>
                    {length}
                </div>
            </div>
        </>
    );
}