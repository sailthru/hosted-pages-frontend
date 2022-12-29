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

  // function to check for empty, alphanumeric, and 'oc' page names
  const handleNamingError = function () {
    setNamingError("");
    const alphanumericRegex = /^\d*[a-zA-Z][a-zA-Z0-9]*$/;
    const allowDashInName = name.replace("-", "");
    if (name.length < 1) {
      setNamingError("Please enter a page name.");
      return;
    }
    if (!allowDashInName.match(alphanumericRegex)) {
      setNamingError("Page names must be alphanumeric.");
      return;
    }
    if (name == "oc") {
      setNamingError(
        "'oc' is a reserved page name. Please select a unique page name."
      );
      return;
    }
    setNamingError(false);
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
        <RadioGroup>
          <Radio
            id="signup"
            name="category"
            value="signup"
            disabled={namingError}
            onChange={(e) => onChange({ type: e.target.value })}
          >
            Signup
          </Radio>
          <Radio
            id="manage"
            name="category"
            value="manage"
            disabled={namingError}
            onChange={(e) => onChange({ type: e.target.value })}
          >
            User Management
          </Radio>
          <Radio
            id="other"
            name="category"
            value="other"
            disabled={namingError}
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
