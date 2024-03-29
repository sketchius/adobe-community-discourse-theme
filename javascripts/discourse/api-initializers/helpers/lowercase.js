import { registerUnbound } from "discourse-common/lib/helpers";

export default {
    name: 'lowercase-helper',
    initialize() {
        registerUnbound("lowercase", function (value) {
            return value && typeof value === "string" ? value.toLowerCase() : "";
          });
    }
  };