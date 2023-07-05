import React, { useState } from "react";
import "./PageSwitcher.css";

interface Props {
    totalPageNumber: number;
    updateCurrentPageNumbe?: (pageNumber: number) => void;
}

const PageSwitcher = ({ totalPageNumber, updateCurrentPageNumbe: updateCurrentPageNumber }: Props) => {
    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    
    const backPage = () => {
        if(currentPageNumber > 1){
            updateCurrentPageNumber && updateCurrentPageNumber(currentPageNumber - 1)
            setCurrentPageNumber(currentPageNumber - 1)
        }
    }
    
    const forwardPage = () => {
        if(currentPageNumber < totalPageNumber){
            updateCurrentPageNumber && updateCurrentPageNumber(currentPageNumber+ 1)
            setCurrentPageNumber(currentPageNumber+ 1)
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
