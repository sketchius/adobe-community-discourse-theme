import Component from "@glimmer/component";
import { inject as service } from "@ember/service";
import { defaultHomepage } from "discourse/lib/utilities";

export default class ResourceCards extends Component {
  @service store;
  @service router;

  get shouldRender() {
    return this.router.currentRouteName === `discovery.${defaultHomepage()}`;
  }
}
