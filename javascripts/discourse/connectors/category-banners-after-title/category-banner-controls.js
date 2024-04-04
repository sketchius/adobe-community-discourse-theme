import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import { service } from "@ember/service";
import { withPluginApi } from "discourse/lib/plugin-api";
import { lookupCategoryByPath } from "../../../utils/categoryLookup";

export default class CategoryBannerControls extends Component {
  @service router;
  @service composer;

  @tracked installLink = undefined;
  @tracked customCategoryData = undefined;

  constructor() {
    super(...arguments);
    this.loadCustomCategoryData();

    withPluginApi("1.8", (api) => {
      api.onPageChange(() => {
        this.loadCustomCategoryData();
      });
    });
  }

  get showInstall() {
    return this.installLink !== undefined;
  }

  @action
  newTopic() {
    this.composer.openNewTopic();
  }

  async loadCustomCategoryData() {
    this.customCategoryData = undefined;
    const result = await lookupCategoryByPath(this.router.currentURL);
    if (result.found) {
      this.customCategoryData = await this.getCustomCategoryData(result.match);
      this.installLink = this.customCategoryData?.install_url;

      if (!this.customCategoryData && result.isSubcategory) {
        this.customCategoryData = await this.getCustomCategoryData(
          result.parent,
        );
        this.installLink = this.customCategoryData?.install_url;
      }
    }
  }

  async getCustomCategoryData(category) {
    try {
      const parsedData = JSON.parse(settings.custom_category_data);
      return parsedData.find(
        (categoryData) => categoryData.category_slug === category.slug,
      );
    } catch {
      return undefined;
    }
  }
}
