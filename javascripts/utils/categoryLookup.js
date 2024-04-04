import { ajax } from "discourse/lib/ajax";
import CategoryList from "discourse/models/category-list";

export async function lookupCategoryByPath(path) {
  const pattern = /^\/c\/[^\/]+(?:\/[^\/]+)?\/(\d+)/;
  const match = path.match(pattern);

  if (match) {
    return lookupCategoryById(match[1]);
  } else {
    return { found: false };
  }
}

export async function lookupCategoryById(categoryId) {
  const searchId =
    typeof categoryId === "string" ? parseInt(categoryId, 10) : categoryId;
  try {
    const result = await CategoryList.list();

    const categories = result.categories.content;

    // First we'll look through top-level categories for a matching id.
    const categoryMatch = categories.find(
      (category) => category.id === searchId,
    );

    if (categoryMatch) {
      return { found: true, match: categoryMatch, isSubcategory: false };
    }

    // If no category is found, we'll look for a subcategory with that id.
    for (let category of categories) {
      if (category.subcategory_ids.includes(searchId)) {
        const parentSearchResult = await ajax(
          `/categories.json?parent_category_id=${category.id}`,
        );
        const subcategory = parentSearchResult.category_list.categories.find(
          (child) => child.id === searchId,
        );
        if (subcategory) {
          return {
            found: true,
            match: subcategory,
            isSubcategory: true,
            parent: category,
          };
        }
      }
    }

    return { found: false };
  } catch (error) {
    return { found: false };
  }
}

export async function getSubcategoriesByParentSlug(slug) {
  try {
    const result = await CategoryList.list();
    const categories = result.categories.content;
    const categoryMatch = categories.find((category) => category.slug === slug);

    if (categoryMatch) {
      const queryResult = await ajax(
        `/categories.json?parent_category_id=${categoryMatch.id}`,
      );
      return queryResult.category_list.categories;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
}
