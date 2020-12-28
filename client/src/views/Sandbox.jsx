import React, { useState } from "react";
import { Checkbox } from "../components";

function Sandbox() {
  const [checked, setChecked] = useState(false);
  return (
    <div className="app_main">
      <div>
        <Checkbox
          checked={checked}
          onChange={(checked) => setChecked(checked)}
          label="Baby"
        />
      </div>
    </div>
  );
}

export default Sandbox;
