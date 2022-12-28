import React, { useState } from "react";

import { Modal, Notification } from "@sailthru/stui-components";
import * as pagesApi from "../../../core/pagesApi";
import { CreatePageForm } from "./CreatePageForm";

function CreatePageModal({ title, mode, setDisplayModal }) {
  const [state, setState] = useState({});
  const [error, setError] = useState(false);
  const [isDuplicateName, setIsDuplicateName] = useState(false);

  function handleCreate() {
    pagesApi
      .createPage({ ...state, mode })
      .then(function (response) {
        if (response._data.editor_url) {
          window.location.href = `${window.location.origin}${response._data.editor_url}`;
        } else {
          // this should never happen
          setError("Something went wrong and we could not load the page.");
          console.log("An error occurred redirecting to the new page");
          window.location.href = `${window.location.origin}/hosted-pages-list`;
        }
        return response._data;
      })
      .catch(function (serverError) {
        let duplicateNameError = "There is already a page named";
        let serverErrorMessage = serverError.error_message;
        if (
          serverErrorMessage &&
          serverErrorMessage.includes(duplicateNameError)
        ) {
          setIsDuplicateName("Unique page name required.");
        } else {
          console.log("ERROR: ", serverError.error_message);
          setError(
            "An error occurred and the page could not be created. Please try again or contact support if the issue persists"
          );
        }
      });
  }

  const getSubmitButtonText = () => {
    if (error) {
      return "Retry Create";
    }
    return "Create";
  };

  function handleFormChange(changedField) {
    const newState = Object.assign({}, state, changedField);
    setError(false);
    setState(newState);
  }

  return (
    <Modal
      title={title}
      applyButtonText={getSubmitButtonText()}
      disableApply={!state.name || !state.type}
      onApply={handleCreate}
      onDismiss={() => setDisplayModal(false)}
    >
      {error && <Notification type="error">{error}</Notification>}
      <CreatePageForm
        name={state.name}
        onChange={handleFormChange}
        isDuplicateName={isDuplicateName}
      />
    </Modal>
  );
}

export { CreatePageModal };
