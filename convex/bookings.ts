import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { internal } from "./_generated/api";

export const submitBookingRequest = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    tier: v.string(),
    category: v.union(v.literal("Athletics"), v.literal("Portraits")),
    sportDetails: v.optional(v.string()),
    portraitDetails: v.optional(v.string()),
    extraInfo: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const bookingId = await ctx.db.insert("bookings", {
      name: args.name,
      email: args.email,
      tier: args.tier,
      category: args.category,
      sportDetails: args.sportDetails,
      portraitDetails: args.portraitDetails,
      extraInfo: args.extraInfo,
      status: "pending",
    });

    // Schedule email sending
    await ctx.scheduler.runAfter(0, internal.emailActions.sendBookingConfirmationEmail, {
      bookingId: bookingId,
      name: args.name,
      email: args.email, // The user's email
      tier: args.tier,
      category: args.category,
    });
    
    await ctx.scheduler.runAfter(0, internal.emailActions.sendBookingNotificationEmailToAdmin, {
      bookingId: bookingId,
      name: args.name,
      email: args.email,
      tier: args.tier,
      category: args.category,
      sportDetails: args.sportDetails,
      portraitDetails: args.portraitDetails,
      extraInfo: args.extraInfo,
    });


    return bookingId;
  },
});
