import { apiInitializer } from "discourse/lib/api";
import { defaultHomepage } from "discourse/lib/utilities";

export default apiInitializer("1.8.0", (api) => {
  api.onPageChange(() => {
    const router = api.container.lookup("service:router");

    if (router.currentRoute.name === `discovery.${defaultHomepage()}`) {
      document.querySelectorAll(
        ".d-header .floating-search-input-wrapper"
      )[0].style.display = "none";
    } else {
      document.querySelectorAll(
        ".d-header .floating-search-input-wrapper"
      )[0].style.display = "flex";
    }
  });
});
