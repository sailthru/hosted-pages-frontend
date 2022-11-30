import React from "react";

const PageTableIcons = ({ page }) => {
    if (page.mode == "visual") {
        return <i className="fal fa-pencil-ruler" title="Visual Template" />;
    } else {
        return (
            <>
                <i className="fal fa-code" title="HTML Template" />
            </>
        );
    }
};

export default PageTableIcons;
