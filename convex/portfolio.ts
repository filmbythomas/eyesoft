import { query, mutation, internalMutation } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

// Generate paths like /portfolio/athletics/sample-1.jpg to /portfolio/athletics/sample-20.jpg
const generateImagePaths = (category: "athletics" | "portraits", count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    src: `/portfolio/${category}/sample-${i + 1}.jpg`,
    alt: `${category.charAt(0).toUpperCase() + category.slice(1)} Sample ${i + 1}`,
    category: category,
    likes: 0,
    // Add an order field based on the number in the filename for reliable sorting
    order: i + 1, 
  }));
};

const initialAthleticsImages = generateImagePaths("athletics", 20);
const initialPortraitsImages = generateImagePaths("portraits", 20);

export const seedPortfolioImages = internalMutation({
  args: {},
  handler: async (ctx) => {
    const allInitialImages = [...initialAthleticsImages, ...initialPortraitsImages];
    let seededCount = 0;
    let updatedCount = 0;

    for (const imgData of allInitialImages) {
      const existingImage = await ctx.db
        .query("portfolioImages")
        .withIndex("by_src", (q) => q.eq("src", imgData.src))
        .unique();

      if (!existingImage) {
        await ctx.db.insert("portfolioImages", {
          src: imgData.src,
          alt: imgData.alt,
          category: imgData.category,
          likes: imgData.likes,
          order: imgData.order, // Make sure to insert the order field
        });
        seededCount++;
      } else {
        // Optionally update existing images if needed, e.g., to add the order field
        if (existingImage.order !== imgData.order) {
          await ctx.db.patch(existingImage._id, { order: imgData.order });
          updatedCount++;
        }
      }
    }
    return `Seeded ${seededCount} new images. Updated ${updatedCount} existing images. Total initial images: ${allInitialImages.length}.`;
  },
});


export const listImagesByCategory = query({
  args: { category: v.union(v.literal("athletics"), v.literal("portraits")) },
  handler: async (ctx, args) => {
    const images = await ctx.db
      .query("portfolioImages")
      .withIndex("by_category", (q) => q.eq("category", args.category))
      // .order("asc") // Convex sorts by index fields first, then by _creationTime.
      // To sort by filename number, we'll sort on the client or add an 'order' field.
      // For now, let's add an 'order' field to the schema and sort by it.
      .collect();
    
    // Sort by the 'order' field after fetching
    return images.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  },
});

export const likeImage = mutation({
  args: { imageId: v.id("portfolioImages") },
  handler: async (ctx, args) => {
    const image = await ctx.db.get(args.imageId);
    if (image) {
      await ctx.db.patch(args.imageId, { likes: image.likes + 1 });
      return true;
    }
    return false;
  },
});
