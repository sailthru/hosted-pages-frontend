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
  setIsValidName,
}) {
  const [namingError, setNamingError] = useState("");
  const [optoutNamingError, setOptoutNamingError] = useState("");

  const checkForNamingError = function () {
    setNamingError("");
    setOptoutNamingError("");
    if (name.length < 1) {
      setNamingError("Please enter a page name.");
      setIsValidName(false);
      return;
    }
    if (name === "oc") {
      setNamingError(
        "The name 'oc' is a reserved page name. Please use a different page name."
      );
      setIsValidName(false);
      return;
    }
    if (name === "optout") {
      setOptoutNamingError(
        "The page name 'optout' requires 'User Management' as the category. Please select 'User Management' below."
      );
      return;
    }
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    const nameWithoutDashes = name.replace(new RegExp("-", "g"), "");
    if (!nameWithoutDashes.match(alphanumericRegex)) {
      setNamingError(
        "The page name must contain at least one alphanumeric character and may contain dashes. Please use a different page name."
      );
      setIsValidName(false);
      return;
    }
  };

  useEffect(() => {
    if (isDuplicateName) {
      setNamingError(
        "The page name must be unique. Please use a different page name."
      );
    }
  }, [isDuplicateName]);

  const onChangeHandler = (e) => {
    if (isNameChanged) {
      setNamingError("");
      setOptoutNamingError("");
    }
    onChange({ name: e.target.value });
  };

  const onOptoutChangeHandler = (e) => {
    if (name === "optout") {
      setOptoutNamingError(" "); //this must be a space and not an empty string or the error will clear
    }
    onChange({ type: e.target.value });
  };

  return (
    <Fieldset>
      <FormGroup>
        <Label error={namingError}>Name</Label>
        <Subtext>
          Page name must follow URL standards and only contain alphanumeric
          characters and dashes. It is recommended to use dashes instead of
          spaces.
        </Subtext>
        <Input
          autoFocus
          value={name}
          onChange={onChangeHandler}
          onBlur={checkForNamingError}
          error={namingError}
        />
        {namingError ? (
          <p style={{ color: colorTextErrorOnLight }}>{namingError}</p>
        ) : null}
        <Label>Category</Label>
        {optoutNamingError ? <Subtext>{optoutNamingError}</Subtext> : null}
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
            onChange={onOptoutChangeHandler}
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
