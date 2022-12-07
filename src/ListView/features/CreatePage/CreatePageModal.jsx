import React, { useState, useEffect } from "react";

import { Modal } from "@sailthru/stui-components";
import * as pagesApi from "../../../core/api";
import { CreatePageForm } from "./CreatePageForm";

function CreatePageModal({ title, mode, setDisplayModal }) {
  const [state, setState] = useState({});
  const [disableSubmitButton, setDisableSubmitButton] = useState(false);
  const [error, setError] = useState(false);

  function handleSubmit(done) {
    //FIXME
    setDisableSubmitButton(true);
    pagesApi
      .createPage({ ...state, mode })
      .then(done)
      .catch((e) => setError(true));
    //             .finally(setDisplayModal((state) => !state))
  }
  useEffect(() => {
    setDisableSubmitButton(false);
    if (!state.name || !state.type) {
      setDisableSubmitButton(true);
    }
  });

  function handleFormChange(changedField) {
    const newState = Object.assign({}, state, changedField);
    setError(false);
    setState(newState);
  }

  return (
    <Modal
      title={title}
      applyButtonText="Create"
      disableApply={disableSubmitButton}
      onApply={handleSubmit}
      onDismiss={() => setDisplayModal(false)}
    >
      <CreatePageForm
        name={state.name}
        type={state.type}
        onChange={handleFormChange}
      />
    </Modal>
  );
}

export { CreatePageModal };
