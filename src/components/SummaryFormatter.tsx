import React, { Children } from "react";
import "../styles/SummaryFormatter.css";
import MJ from "react-mathjax-ts";
import Latex from "react-latex";
import { join } from "path";

interface SummaryFormatterProps {
    text: string;
    isList: boolean;
}
function escapeString(str: string) {
    // return str.replace(/\\/g, "\\\\");
}

function formatText(text: string, isList: boolean) {
    // let inList = false;
    //replace all Latex with '__latex__'
    //make a regex to find all latex
    console.log(text);
    // text = escapeString(text);
    console.log(text);
    const jsxArray: JSX.Element[] = [];
    let latexArray: string[] = [];
    const latexRegex = /\$.*?\$/g;
    const latexMatches = text.match(latexRegex);
    if (latexMatches) {
        latexMatches.forEach((latex) => {
            latexArray.push(latex);
            text = text.replace(latex, "__latex__");
        });
    }
    //make into a list
    if (isList) {
        const splitText = text.split("-");
        splitText.forEach((line, index) => {
            jsxArray.push(<li key={index}>{line}</li>);
        });
    } else {
        //split by latex expressions
        const splitText = text.split(" ");
        splitText.forEach((line, index) => {
            jsxArray.push(<span key={index}>{line +" "}</span>);
        });
    }
    //loop through the jsxArray and replace all __latex__ with the latex
    //TODO make this work with multiple latex expressions in a single line
    let latexIndex = 0;
    const updatedJsxArray = jsxArray.map((element, index) => {
        if (element.props.children.includes("__latex__")) {
            console.log(`found latex: ${element.props.children}`);
            const updatedChildren = element.props.children.replace(
                "__latex__",
                // `$latex$${latexArray[latexIndex]}$latex$`
                latexArray[latexIndex]
            );
            console.log(`latex: ${latexArray[latexIndex]}`)
            console.log(updatedChildren);
            latexIndex++;
            // return jsxArray;
            return (
                <>
                {isList ? <li><Latex>{updatedChildren}</Latex></li> : <Latex>{updatedChildren}</Latex>}
              </>
            );
        } else {
            return element;
        }
    });

    return updatedJsxArray;
    console.log(latexArray);
    return <Latex>{text}</Latex>;
    // if(isList)
}

// function formatText(text: string, isList: boolean) {
//     let inList = false;
//     const splitText = text.split(" ");
//     const formattedText = splitText.map((word, index) => {
//         if (word.includes("$")) {
//             return <Latex>{word}</Latex>;
//         }
//         if (word.startsWith("-")) {
//             if (!inList) {
//                 inList = true;
//                 return (
//                     <ul key={index}>
//                         <li>{word.slice(1)}</li>
//                     </ul>
//                 );
//             } else {
//                 return <li key={index}>{word.slice(1)}</li>;
//             }
//         } else {
//             // This is a regular word, close the current list element (if inList is true) and add the word
//             inList = false;
//             const element = inList ? "</ul>" : "";
//             return element + " " + word;
//         }
//     });
//     //remove all - from the formatted
//     return formattedText;
// }


const SummaryFormatter = ({ text, isList }: SummaryFormatterProps) => {
    if (isList) {
        return <ul className="bullet-list">{formatText(text, true)}</ul>;
    } else {
        return (
            <>
                {/* {isList && <ul>{text}</ul>} */}
                {!isList && <p>{formatText(text, false)}</p>}
            </>
        );
    }
};
export default SummaryFormatter;
