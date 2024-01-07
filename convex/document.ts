import { mutation, query } from "./_generated/server";
import { v } from "convex/values";


export const getSidebar = query({
 args:{
  parentDocument : v.optional(v.id("documents")),
 },
 handler :async (ctx,args)=>{
  const identity = await ctx.auth.getUserIdentity()
  if (!identity) {
    throw new Error("Not Authenticated");
  }
  const userId = identity.subject;

  const documents = await ctx.db.query("documents")
  .withIndex("by_user_parent",(q)=> q.eq("userId",userId).eq("parentDocument",args.parentDocument))
  .filter((q)=> q.eq(q.field("isAchieved"),false))
  .order("desc")
  .collect()
  return documents
 }
}) 

export const get = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not Authenticated");
    }
    const documents = await ctx.db.query("documents").collect()
    return documents
  },
});




export const create = mutation({
  args: { title: v.string(), parentDocument: v.optional(v.id("documents")) },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    console.log(identity);
    if (!identity) {
      throw new Error("Not Authenticated");
    }

    const userId = identity.subject;

    const document = await ctx.db.insert("documents", {
      title: args.title,
      parentDocument: args.parentDocument,
      userId,
      isAchieved: false,
      isPublished: false,
    });

    return document;
  },
});
