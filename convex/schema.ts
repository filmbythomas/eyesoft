import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  bookings: defineTable({
    name: v.string(),
    email: v.string(),
    tier: v.string(),
    category: v.union(v.literal("Athletics"), v.literal("Portraits")),
    sportDetails: v.optional(v.string()),
    portraitDetails: v.optional(v.string()),
    extraInfo: v.optional(v.string()),
    status: v.optional(v.string()), 
  }).index("by_email", ["email"]),

  portfolioImages: defineTable({
    src: v.string(),
    alt: v.string(),
    category: v.union(v.literal("athletics"), v.literal("portraits")),
    order: v.optional(v.number()),
  })
    .index("by_category", ["category", "order"])
    .index("by_src", ["src"]),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
