import React, { useState } from "react";
import {
  HoverDisclosure,
  ModalWrapper,
  OptionsMenu,
} from "@sailthru/stui-components";
import { DeletePageModal } from "./DeletePageModal";

function PageTableHoverOptions({
  pageId,
  pageEditorUrl,
  pageName,
  setNotificationType,
  setNotificationMessage,
}) {
  const [displayDeleteModal, setDisplayDeleteModal] = useState(false);

  const clickOptions = [
    {
      label: "Edit",
      icon: "fal fa-edit fa-fw",
      iconHover: "fas fa-edit fa-fw",
      onClick: () => window.open(`${pageEditorUrl}`, "_self"),
    },
    {
      label: "Delete",
      icon: "fal fa-trash fa-fw",
      iconHover: "fas fa-trash fa-fw",
      onClick: () => {
        setDisplayDeleteModal((state) => !state);
      },
    },
  ];

  return (
    <>
      <HoverDisclosure disclosureWidth="150px">
        <OptionsMenu options={clickOptions} />
      </HoverDisclosure>

      <ModalWrapper display={displayDeleteModal}>
        <DeletePageModal
          pageId={pageId}
          pageName={pageName}
          setDisplayDeleteModal={setDisplayDeleteModal}
          setNotificationType={setNotificationType}
          setPageDeletedMessage={setNotificationMessage}
        />
      </ModalWrapper>
    </>
  );
}

export { PageTableHoverOptions };
