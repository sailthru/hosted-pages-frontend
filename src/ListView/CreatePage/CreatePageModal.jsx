import React, { useEffect, useState } from "react";

import { Modal, Notification } from "@sailthru/stui-components";
import * as pagesApi from "../../core/pagesApi";
import { CreatePageForm } from "./CreatePageForm";

function CreatePageModal({ title, mode, setDisplayModal }) {
  const [state, setState] = useState({});
  const [error, setError] = useState("");
  const [isDuplicateName, setIsDuplicateName] = useState(false);
  useEffect(() => {
    setIsDuplicateName(false);
  }, [isDuplicateName]);
  const [isNameChanged, setIsNameChanged] = useState(false);
  const [isValidName, setIsValidName] = useState(true);

  function handleCreate() {
    pagesApi
      .createPage({ ...state, mode })
      .then(function (response) {
        if (response._data.editor_url) {
          window.location.href = `${window.location.origin}${response._data.editor_url}`;
        } else {
          // this should never happen
          setError(
            // TODO move displaying this error to ListView (EPT-1713)
            `Something went wrong and we could not load the new page: ${response._data.name}`
          );
          console.error(
            `Error redirecting to page: ${JSON.stringify(response._data)}`
          );
          window.location.href = `${window.location.origin}/hosted-pages-list`;
        }
        return response._data;
      })
      .catch(function (serverError) {
        let serverErrorMessage = serverError.error_message;
        if (
          serverErrorMessage &&
          serverErrorMessage.includes("There is already a page named")
        ) {
          setIsDuplicateName(true);
        } else {
          console.log("ERROR: ", serverError.error_message);
          setError(
            "An error occurred and the page could not be created. Please try again or contact support if the issue persists."
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
    const changedFieldKeys = Object.keys(changedField);
    setError("");
    setState(newState);
    if (changedFieldKeys.includes("name")) {
      setIsNameChanged(true);
    }
  }

  return (
    <Modal
      title={title}
      applyButtonText={getSubmitButtonText()}
      disableApply={!state.name || !state.type || !isValidName}
      onApply={handleCreate}
      onDismiss={() => setDisplayModal(false)}
    >
      {error && <Notification type="error">{error}</Notification>}
      <CreatePageForm
        name={state.name}
        onChange={handleFormChange}
        isDuplicateName={isDuplicateName}
        isNameChanged={isNameChanged}
        setIsValidName={setIsValidName}
      />
    </Modal>
  );
}

export { CreatePageModal };
