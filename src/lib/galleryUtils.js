export const CATEGORIES = [
  { id: 'abdomen', title: 'Abdomen' },
  { id: 'flanks', title: 'Flanks (Love Handles)' },
  { id: 'thighs', title: 'Thighs' },
  { id: 'chin', title: 'Chin & Jawline' },
  { id: 'arms', title: 'Upper Arms' },
  { id: 'bra-fat', title: 'Bra Fat' },
  { id: 'back-fat', title: 'Back Fat' },
  { id: 'buttocks', title: 'Banana Roll' }
];

export const groupGalleryData = (flatItems) => {
  if (!Array.isArray(flatItems)) return [];

  const grouped = CATEGORIES.map(cat => ({
    ...cat,
    pairs: []
  }));

  flatItems.forEach(item => {
    const group = grouped.find(g => g.id === item.category);
    if (group) {
      group.pairs.push({
        id: item.id,
        label: item.title,
        before: item.before_image_url,
        after: item.after_image_url,
        description: item.description,
        order: item.order
      });
    }
  });

  return grouped;
};

export const flattenGalleryData = (groupedData) => {
    // Helper if we ever need to go reverse, though usually we construct items individually
    const flat = [];
    groupedData.forEach(cat => {
        cat.pairs.forEach(pair => {
            flat.push({
                title: pair.label,
                before_image_url: pair.before,
                after_image_url: pair.after,
                category: cat.id,
                description: pair.description
            });
        });
    });
    return flat;
};