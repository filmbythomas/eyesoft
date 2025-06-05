// convex/likeImage.ts
import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

// Check if this device already liked this image
export const hasLiked = query({
  args: { imageId: v.string(), deviceId: v.string() },
  handler: async (ctx, { imageId, deviceId }) => {
    const existing = await ctx.db
      .query('likes')
      .withIndex('by_device_image', (q) =>
        q.eq('imageId', imageId).eq('deviceId', deviceId)
      )
      .first();
    return !!existing;
  },
});

// Get current like count for image
export const getLikes = query({
  args: { imageId: v.string() },
  handler: async (ctx, { imageId }) => {
    const likes = await ctx.db
      .query('likes')
      .withIndex('by_image', (q) => q.eq('imageId', imageId))
      .collect();
    return likes.length;
  },
});

// Like an image (only once per device)
export const like = mutation({
  args: { imageId: v.string(), deviceId: v.string() },
  handler: async (ctx, { imageId, deviceId }) => {
    const alreadyLiked = await ctx.db
      .query('likes')
      .withIndex('by_device_image', (q) =>
        q.eq('imageId', imageId).eq('deviceId', deviceId)
      )
      .first();

    if (!alreadyLiked) {
      await ctx.db.insert('likes', { imageId, deviceId });
    }
  },
});
