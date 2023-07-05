import React, { useState, useEffect } from "react";
import "./PageSwitcher.css";

interface Props {
    currentPageNumberProp?: number;
    totalPageNumber: number;
    updateCurrentPageIndex?: (pageNumber: number) => void;
}

const PageSwitcher = ({currentPageNumberProp, totalPageNumber, updateCurrentPageIndex: updateCurrentPageIndex }: Props) => {
    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    
    useEffect(() => {
        if(currentPageNumberProp && currentPageNumberProp > 0 && currentPageNumberProp <= totalPageNumber){
            setPage(currentPageNumberProp);
        }
    }, [currentPageNumberProp]);

    const backPage = () => {
        if(currentPageNumber > 1){
            setPage(currentPageNumber - 1)
        }
    }
    
    const forwardPage = () => {
        if(currentPageNumber < totalPageNumber){
            setPage(currentPageNumber + 1)
        }
    }

    const setPage = (pageNumber: number) => {
        updateCurrentPageIndex && updateCurrentPageIndex(pageNumber - 1)
        setCurrentPageNumber(pageNumber)
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
