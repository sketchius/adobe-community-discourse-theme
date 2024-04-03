import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { inject as service } from "@ember/service";
import { withPluginApi } from "discourse/lib/plugin-api";
import { getSubcategoriesByParentSlug } from "../../utils/categoryLookup";

export default class CategoryResources extends Component {
  @service router;
  @tracked relatedSubcategories = [];
  @tracked isSubcategory = undefined;

  constructor() {
    super(...arguments);
    this.loadRelatedSubcategories();

    withPluginApi("1.8", (api) => {
      api.onPageChange(() => {
        this.loadRelatedSubcategories();
      });
    });
  }

  async loadRelatedSubcategories() {
    this.relatedSubcategories = [];
    this.isSubcategory = undefined;
    const pathParts = this.router.currentURL.split("/");
    let slug;
    if (pathParts.length >= 3) {
      slug = pathParts[2];
      this.relatedSubcategories = await getSubcategoriesByParentSlug(slug);
      if (pathParts.length >= 5) {
        this.isSubcategory = true;
        const subcategorySlug = pathParts[3];
        this.relatedSubcategories = this.relatedSubcategories.filter(
          (item) => item.slug !== subcategorySlug,
        );
      }
      this.relatedSubcategories.forEach((subcategory) => {
        subcategory.link_url = `/c/${slug}/${subcategory.slug}/${subcategory.id}`;
      });
    }
  }

  get shouldRender() {
    return this.relatedSubcategories && this.relatedSubcategories.length > 0;
  }

  get title() {
    return this.isSubcategory ? "Related Subcategories" : "Subcategories";
  }
}
