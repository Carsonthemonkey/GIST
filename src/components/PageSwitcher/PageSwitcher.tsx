import React, { useState, useEffect } from "react";
import "./PageSwitcher.css";

interface Props {
    currentPageNumber: number;
    setCurrentPageNumber: React.Dispatch<React.SetStateAction<number>>;
    totalPageNumber: number;
}

const PageSwitcher = ({currentPageNumber, setCurrentPageNumber, totalPageNumber}: Props) => {

    const backPage = () => {
        if(currentPageNumber > 1){
            setCurrentPageNumber(currentPageNumber - 1);
        }
    }
    
    const forwardPage = () => {
        if(currentPageNumber < totalPageNumber){
            setCurrentPageNumber(currentPageNumber + 1);
        }
    }

    return (
        <>
        {/* Make these buttons icons */}
            <button onClick={backPage}>&lt;</button>
            <span>
                {currentPageNumber} / {totalPageNumber}
            </span>
            <button onClick={forwardPage}>&gt;</button>
        </>
    );
};

export default PageSwitcher;
