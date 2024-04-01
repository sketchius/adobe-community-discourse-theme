import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import { inject as service } from "@ember/service";
import { defaultHomepage } from "discourse/lib/utilities";
import Category from "discourse/models/category";

export default class FeaturedCategories extends Component {
  @service store;
  @service router;
  @tracked categories = [];
  @tracked transform = "";
  @tracked position = 0;

  constructor() {
    super(...arguments);
    this.loadFeaturedCategories();
  }

  get shouldRender() {
    return this.router.currentRouteName === `discovery.${defaultHomepage()}`;
  }
  get isLeftArrowVisible() {
    return this.position > 0;
  }
  get isRightArrowVisible() {
    return this.position + 3 < this.categories.length;
  }

  @action
  moveLeft() {
    this.position -= 3;
    this.position = Math.max(this.position, 0);
    this.transform = `transform: translateX(-${(this.position / 3) * 960}px);`;
  }

  @action
  moveRight() {
    this.position += 3;
    this.position = Math.min(this.position, this.categories.length - 3);
    this.transform = `transform: translateX(-${(this.position / 3) * 960}px);`;
  }

  async loadFeaturedCategories() {
    try {
      const featuredCategoryIds = settings.featured_categories.split("|");
      this.categories = featuredCategoryIds.map((categoryId) =>
        Category.findById(categoryId)
      );
    } catch (error) {
      this.categories = [];
    }
  }
}
