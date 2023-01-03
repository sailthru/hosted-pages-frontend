import React, { useEffect, useState } from "react";
import { colorTextErrorOnLight } from "@sailthru/design-tokens";
import {
  FormGroup,
  Radio,
  RadioGroup,
  Subtext,
} from "@sailthru/stui-components";
import { Fieldset, Label, Input } from "@sailthru/stui-elements";

function CreatePageForm({
  name = "",
  onChange,
  isDuplicateName,
  isNameChanged,
}) {
  const [namingError, setNamingError] = useState(false);
  const [optoutNamingError, setOptoutNamingError] = useState(false);

  // function to check for empty, alphanumeric, and 'oc' page names
  const handleNamingError = function () {
    setNamingError("");
    const alphanumericRegex = /^\d*[a-zA-Z0-9][a-zA-Z0-9]*$/;
    const allowDashInName = name.replace(new RegExp("-", "g"), "");
    if (name.length < 1) {
      setNamingError("Please enter a page name.");
      return;
    }
    if (!allowDashInName.match(alphanumericRegex)) {
      setNamingError("Page names must be alphanumeric.");
      return;
    }
    if (name === "oc") {
      setNamingError(
        "The page name 'oc' is a reserved page name. Please select a new page name."
      );
      return;
    }
    if (name == "optout") {
      setOptoutNamingError(
        "The page name 'optout' requires 'User Management' as the category. Please select 'User Management' below."
      );
      return;
    }
    setNamingError(false);
    setOptoutNamingError(false);
    return;
  };

  // sets the error if the name is a duplicate (returned from the backend)
  useEffect(() => {
    if (isDuplicateName) {
      setNamingError(isDuplicateName);
    }
  }, [isDuplicateName]);

  // function to reset the name error when the name is changed
  const onChangeResetNamingError = (e) => {
    if (isNameChanged) {
      setNamingError(false);
    }
    onChange({ name: e.target.value });
  };

  return (
    <Fieldset>
      <FormGroup>
        <Label error={namingError}>Name</Label>
        <Input
          autoFocus
          value={name}
          onChange={onChangeResetNamingError}
          onBlur={handleNamingError}
          error={namingError}
        />
        {namingError ? (
          <p style={{ color: colorTextErrorOnLight }}>{namingError}</p>
        ) : null}
        <Subtext>
          Page name must follow URL standards and only contain alphanumeric
          characters and dashes. It is recommended to use dashes instead of
          spaces.
        </Subtext>
        <Label>Category</Label>
        {optoutNamingError ? (
          <p style={{ color: colorTextErrorOnLight }}>{optoutNamingError}</p>
        ) : null}
        <RadioGroup>
          <Radio
            id="signup"
            name="category"
            value="signup"
            disabled={namingError || optoutNamingError}
            onChange={(e) => onChange({ type: e.target.value })}
          >
            Signup
          </Radio>
          <Radio
            id="manage"
            name="category"
            value="manage"
            disabled={namingError}
            onChange={(e) => {
              onChange({ type: e.target.value });
              setOptoutNamingError(" ");
            }}
          >
            User Management
          </Radio>
          <Radio
            id="other"
            name="category"
            value="other"
            disabled={namingError || optoutNamingError}
            onChange={(e) => onChange({ type: e.target.value })}
          >
            Other
          </Radio>
        </RadioGroup>
      </FormGroup>
    </Fieldset>
  );
}

export { CreatePageForm };
