import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { inject as service } from "@ember/service";
import { withPluginApi } from "discourse/lib/plugin-api";
import { lookupCategoryByPath } from "../../utils/categoryLookup";

export default class CategoryStats extends Component {
  @service router;
  @tracked category = null;

  constructor() {
    super(...arguments);
    this.loadCategory();

    withPluginApi("1.8", (api) => {
      api.onPageChange(() => {
        this.loadCategory();
      });
    });
  }

  async loadCategory() {
    this.category = null;
    const result = await lookupCategoryByPath(this.router.currentURL);
    if (result.found) {
      this.category = result.match;
    }
  }

  get shouldRender() {
    return this.category != null;
  }
}
