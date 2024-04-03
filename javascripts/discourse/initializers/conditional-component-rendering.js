import { apiInitializer } from "discourse/lib/api";
import { defaultHomepage } from "discourse/lib/utilities";

export default apiInitializer("1.8.0", (api) => {
  api.onPageChange(() => {
    const router = api.container.lookup("service:router");

    if (router.currentRoute.name === `discovery.${defaultHomepage()}`) {
      const headerSearchElement = document.querySelectorAll(
        ".d-header .floating-search-input-wrapper",
      )[0];
      if (headerSearchElement) {
        headerSearchElement.style.display = "none";
      }
      document
        .querySelectorAll(".navigation-container .select-kit-header")
        .forEach((element) => {
          element.style.display = "none";
        });
    } else {
      const headerSearchElement = document.querySelectorAll(
        ".d-header .floating-search-input-wrapper",
      )[0];
      if (headerSearchElement) {
        headerSearchElement.style.display = "flex";
      }
      document
        .querySelectorAll(".navigation-container .select-kit-header")
        .forEach((element) => {
          element.style.display = "flex";
        });
    }
  });
});
