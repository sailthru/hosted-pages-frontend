import React, { useEffect, useState } from "react";
import { colorTextErrorOnLight } from "@sailthru/design-tokens";
import {
  FormGroup,
  Radio,
  RadioGroup,
  Subtext,
} from "@sailthru/stui-components";
import { Fieldset, Label, Input } from "@sailthru/stui-elements";

function CreatePageForm({ name = "", onChange, isDuplicateName }) {
  const [namingError, setNamingError] = useState(false);

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
    setNamingError(false);
    return;
  };

  useEffect(() => {
    if (isDuplicateName) {
      setNamingError(isDuplicateName);
    }
  }, [isDuplicateName]);

  return (
    <Fieldset>
      <FormGroup>
        <Label error={namingError}>Name</Label>
        <Input
          autoFocus
          value={name}
          onChange={(e) => onChange({ name: e.target.value })}
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
