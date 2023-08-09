import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("messages").collect();
  },
});

export const create = mutation({
  args: { body: v.string(), author: v.string() },
  handler: async (ctx, args) => {
    const newMessageId = await ctx.db.insert("messages", {
      body: args.body,
      author: args.author,
    });
  },
});
