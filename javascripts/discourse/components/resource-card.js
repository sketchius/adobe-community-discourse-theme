import Component from "@glimmer/component";

export default class ResourceCard extends Component {
  get title() {
    return settings[`${this.args.group}_resource_${this.args.cardId}_title`];
  }

  get description() {
    return settings[
      `${this.args.group}_resource_${this.args.cardId}_description`
    ];
  }

  get caption() {
    return settings[`${this.args.group}_resource_${this.args.cardId}_caption`];
  }

  get logo() {
    return settings[`${this.args.group}_resource_${this.args.cardId}_logo`];
  }

  get background() {
    return settings[
      `${this.args.group}_resource_${this.args.cardId}_background`
    ];
  }

  get invertStyle() {
    return settings[`${this.args.group}_resource_${this.args.cardId}_invert`]
      ? "invert "
      : "";
  }

  get headingStyle() {
    return settings[`${this.args.group}_resource_${this.args.cardId}_logo`]
      ? "large "
      : "";
  }

  get bgcolor() {
    return settings[`${this.args.group}_resource_${this.args.cardId}_bgcolor`];
  }
}
