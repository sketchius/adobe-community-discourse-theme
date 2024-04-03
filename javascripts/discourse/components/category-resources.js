import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { inject as service } from "@ember/service";
import { withPluginApi } from 'discourse/lib/plugin-api';
import { lookupCategoryByPath } from "../../utils/categoryLookup";

export default class CategoryResources extends Component {
  @service router;
  @tracked customCategoryData = undefined;
  category = null;

  constructor() {
    super(...arguments);
    this.loadCustomCategoryData();

    withPluginApi('1.8', api => {
      api.onPageChange(() => {
        this.loadCustomCategoryData();
      });
    });
  }

  async loadCustomCategoryData() {
    this.customCategoryData = undefined;
    const result = await lookupCategoryByPath(this.router.currentURL);
    if (result.found) {
      this.customCategoryData = await this.getCustomCategoryData(result.match);
      if (!this.customCategoryData && result.isSubcategory) {
        this.customCategoryData = await this.getCustomCategoryData(
          result.parent,
        );
      }
    }
  }

  get shouldRender() {
    return this.customCategoryData !== undefined;
  }

  async getCustomCategoryData(category) {
    try {
        const parsedData = JSON.parse(settings.custom_category_data);
        return parsedData.find( (categoryData) => categoryData.category_slug === category.slug );
    } catch {
        return undefined;
    }
  }
}
