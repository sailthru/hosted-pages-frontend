import React from "react";

import { FormGroup, Radio, RadioGroup } from "@sailthru/stui-components";
import { Fieldset, Label, Input } from "@sailthru/stui-elements";

function CreatePageForm({ name = "", type = "", onChange }) {
  return (
    <Fieldset>
      <FormGroup>
        <Label>Name</Label>
        <Input
          value={name}
          onChange={(e) => onChange({ name: e.target.value })}
        />
        <Label>Category</Label>
        <RadioGroup>
          <Radio
            id="signup"
            name="category"
            value="join"
            onChange={(e) => onChange({ type: e.target.value })}
          >
            Signup
          </Radio>
          <Radio
            id="manage"
            name="category"
            value="manage"
            onChange={(e) => onChange({ type: e.target.value })}
          >
            User Management
          </Radio>
          <Radio
            id="other"
            name="category"
            value="page"
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
