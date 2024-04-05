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
    const columns = this.getVisibileColumns();
    return this.position + columns < this.categories.length;
  }

  @action
  moveLeft() {
    const columns = this.getVisibileColumns();
    this.position -= columns;
    this.position = Math.max(this.position, 0);
    this.transform = `transform: translateX(calc(${(-1 * this.position) / columns} * var(--featured-categories-width)));`;
  }

  @action
  moveRight() {
    const columns = this.getVisibileColumns();
    this.position += columns;
    this.position = Math.min(this.position, this.categories.length - columns);
    this.transform = `transform: translateX(calc(${(-1 * this.position) / columns} * var(--featured-categories-width)));`;
  }

  getVisibileColumns() {
    const element = document.querySelector(
      ".featured-categories-wrapper .featured-categories",
    );
    const style = getComputedStyle(element);
    try {
      return parseInt(
        style.getPropertyValue("--featured-categories-columns"),
        10,
      );
    } catch {
      return 1;
    }
  }

  async loadFeaturedCategories() {
    try {
      const featuredCategoryIds = settings.featured_categories.split("|");
      this.categories = featuredCategoryIds.map((categoryId) =>
        Category.findById(categoryId),
      );
    } catch (error) {
      this.categories = [];
    }
  }
}
