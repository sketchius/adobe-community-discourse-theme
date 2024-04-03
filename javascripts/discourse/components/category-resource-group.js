import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";

export default class CategoryResourceGroup extends Component {
  @tracked expanded = false;

  constructor() {
    super(...arguments);
  }

  get isExpanded() {
    return this.expanded;
  }

  get toggleClass() {
    return this.expanded ? 'toggled' : '';
  }

  @action
  toggle() {
    this.expanded = !this.expanded;
  }
}
