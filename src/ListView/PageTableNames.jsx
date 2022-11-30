import React from "react";

const PageTableNames = ({ page }) => {
    const htmlPageUrl = `/page?page_id=${page.pageId}`;
    const visualPageUrl = "/hosted-pages-list"; // TODO add click through see EPT-1713
    if (page.mode == "visual") {
        return (
            <a target="_self" href={visualPageUrl}>
                {" "}
                {page.name}{" "}
            </a>
        );
    } else {
        return (
            <a target="_self" href={htmlPageUrl}>
                {" "}
                {page.name}{" "}
            </a>
        );
    }
};

export default PageTableNames;
