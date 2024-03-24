import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getFiles = query({
  args: {
    teamId: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("files")
      .filter((q) => q.eq(q.field("teamId"), args.teamId))
      .order("desc")
      .collect();

    return result;
  },
});

export const createFile = mutation({
  args: {
    fileName: v.string(),
    createdBy: v.string(),
    teamId: v.string(),
    archive: v.boolean(),
    document: v.string(),
    whiteBoard: v.string(),
  },
  handler: async (ctx, args) => {
    const fileCreated = await ctx.db.insert("files", args);
    return fileCreated;
  },
});

export const updateDocument = mutation({
  args: {
    _id: v.id("files"),
    document: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.patch(args._id, { document: args.document });
    return result;
  },
});

export const updateWhiteBoard = mutation({
  args: {
    _id: v.id("files"),
    whiteBoard: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.patch(args._id, {
      whiteBoard: args.whiteBoard,
    });
    return result;
  },
});

export const getFileById = query({
  args: {
    _id: v.id("files"),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.get(args._id);
    return result;
  },
});
