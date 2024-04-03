import Component from "@glimmer/component";
import { inject as service } from "@ember/service";
import { defaultHomepage } from "discourse/lib/utilities";

export default class CategoryListHeading extends Component {
  @service router;

  constructor() {
    super(...arguments);
  }

  get shouldRender() {
    return this.router.currentRouteName === `discovery.${defaultHomepage()}`;
  }
}