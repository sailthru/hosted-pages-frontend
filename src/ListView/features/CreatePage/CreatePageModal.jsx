import React, { useState } from "react";

import { Modal, Notification } from "@sailthru/stui-components";
import * as pagesApi from "../../../core/api";
import { CreatePageForm } from "./CreatePageForm";

function CreatePageModal({ title, mode, setDisplayModal }) {
  const [state, setState] = useState({});
  const [error, setError] = useState(false);

  function handleCreate() {
    pagesApi
      .createPage({ ...state, mode })
      .then(function (response) {
        console.log("RESPONSE", response);
      })
      .catch(function (serverError) {
        alert(JSON.stringify(serverError));
        console.log("ERROR:", serverError);
        setError(true);
      });
    // TODO add error handling
  }

  function handleSubmit() {
    handleCreate().then();
    // TODO add redirect etc
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
      onApply={handleSubmit}
      onDismiss={() => setDisplayModal(false)}
    >
      {error && (
        <Notification type="error">
          An error occurred and the page could not be created. Please try again
          or contact support if the issue persists.
        </Notification>
      )}
      <CreatePageForm name={state.name} onChange={handleFormChange} />
    </Modal>
  );
}

export { CreatePageModal };
