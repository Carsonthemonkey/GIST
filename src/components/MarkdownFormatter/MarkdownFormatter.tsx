import React from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

import "katex/dist/katex.min.css";
import "./MarkdownFormatter.css";

interface Props {
    text: string;
}

const MarkdownFormatter = ({ text }: Props) => {
    return (
        <ReactMarkdown
            children={text}
            className="markdown-body"
            remarkPlugins={[remarkMath]}
            rehypePlugins={[rehypeKatex]}
        />
    );
};

export default MarkdownFormatter;
