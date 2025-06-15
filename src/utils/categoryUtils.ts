
// Enhanced unslugify with acronym/edge-case handling
const slugToCategoryMap: Record<string, string> = {
  tv: 'TV',
  headphones: 'Electronics',
  smartphone: 'Electronics',
  monitor: 'Computers',
  shirt: 'Clothing',
  dress: 'Clothing',
  // Add other mappings as needed
};

export const unslugify = (slug: string) => {
  if (!slug) return '';
  const base = slug.toLowerCase();
  if (slugToCategoryMap[base]) return slugToCategoryMap[base];
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
