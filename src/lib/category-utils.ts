import type { Category } from '@/types';

/**
 * Separate a flat list of categories into top-level parents and a children map.
 * Top-level = categories with no parent_id.
 */
export function buildCategoryTree(categories: Category[]): {
  topLevel: Category[];
  childrenMap: Map<string, Category[]>;
} {
  const childrenMap = new Map<string, Category[]>();
  const topLevel: Category[] = [];

  for (const cat of categories) {
    if (cat.parent_id) {
      const siblings = childrenMap.get(cat.parent_id) || [];
      siblings.push(cat);
      childrenMap.set(cat.parent_id, siblings);
    } else {
      topLevel.push(cat);
    }
  }

  // Sort children by display_order
  for (const [key, children] of childrenMap) {
    childrenMap.set(
      key,
      children.sort((a, b) => (a.display_order ?? 0) - (b.display_order ?? 0))
    );
  }

  // Attach children to parents for convenience
  for (const parent of topLevel) {
    parent.children = childrenMap.get(parent.id) || [];
  }

  return { topLevel, childrenMap };
}

/**
 * Given a parent category ID, return all descendant category IDs (children, grandchildren, etc.)
 */
export function getDescendantIds(
  categoryId: string,
  childrenMap: Map<string, Category[]>
): string[] {
  const ids: string[] = [];
  const children = childrenMap.get(categoryId) || [];
  for (const child of children) {
    ids.push(child.id);
    ids.push(...getDescendantIds(child.id, childrenMap));
  }
  return ids;
}
