import React, { useState } from "react";
import { Modal } from "@sailthru/stui-components";
import { deletePage } from "../core/pagesApi";

const PageSuccessDeleteMessage = "Page successfully deleted.";
const PageErrorDeleteMessage =
  "Page was unable to be deleted, please try again later.";

function DeletePageModal({
  pageId,
  pageName,
  setDisplayDeleteModal,
  setNotificationType,
  setPageDeletedMessage,
}) {
  const [disableSubmitButton, setDisableSubmitButton] = useState(false);

  function handleSubmit() {
    setDisableSubmitButton(true);
    deletePage(pageId)
      .then(function () {
        setNotificationType("success");
        setPageDeletedMessage(PageSuccessDeleteMessage);
        return true;
      })
      .catch(function (error) {
        console.log("Error deleting page", error);
        setNotificationType("error");
        setPageDeletedMessage(PageErrorDeleteMessage);
      })
      .finally(function () {
        setDisplayDeleteModal(false);
        window.location.href = `${window.location.origin}/hosted-pages-list`;
      });
  }
  return (
    <Modal
      title="Delete Page"
      applyButtonText="Delete Page"
      disableApply={disableSubmitButton}
      onApply={handleSubmit}
      onDismiss={() => setDisplayDeleteModal(false)}
    >
      <p>
        Page <strong>{pageName}</strong>
      </p>
      <p>Are you sure you want to delete this page?</p>
    </Modal>
  );
}

export { DeletePageModal };
