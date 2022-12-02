import React from "react";
import { HoverDisclosure, OptionsMenu } from "@sailthru/stui-components";

const PageTableHoverOptions = ({ pageId, pageEditorUrl }) => {
  const clickOptions = [
    {
      label: "Edit",
      icon: "fal fa-edit fa-fw",
      iconHover: "fas fa-edit fa-fw",
      onClick: () => window.open(`${pageEditorUrl}`, "_self"), // TODO see EPT-1713 (add routing?)
    },
    {
      label: "Delete",
      icon: "fal fa-trash fa-fw",
      iconHover: "fal fa-trash fa-fw",
      onClick: () => {
        console.log("Deleting", pageId);
        //         displayModal({
        // TODO see EPT-1713
        //         });
      },
    },
  ];

  return (
    <HoverDisclosure disclosureWidth="150px">
      <OptionsMenu options={clickOptions} />
    </HoverDisclosure>
  );
};

export default PageTableHoverOptions;
