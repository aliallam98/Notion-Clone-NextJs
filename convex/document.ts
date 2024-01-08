import { Doc, Id } from "./_generated/dataModel";
import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

//achieve documents and check if the document has a children to achieve them as well
export const achieve = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not Authenticated");
    }
    const userId = identity.subject;
    const isExistingDocument = await ctx.db.get(args.id);

    if (!isExistingDocument) {
      throw new Error("Cannot Find This Doc");
    }

    if (isExistingDocument.userId !== userId) {
      throw new Error("Unauthorized");
    }

    const recursiveArchive = async (documentId: Id<"documents">) => {
      const children = await ctx.db
        .query("documents")
        .withIndex("by_user_parent", (q) =>
          q.eq("userId", userId).eq("parentDocument", documentId)
        )
        .collect();

      for (const child of children) {
        await ctx.db.patch(child._id, {
          isArchived: true,
        });
        await recursiveArchive(child._id); // check again that each child does not has children
      }
    };

    const document = await ctx.db.patch(args.id, {
      isArchived: true,
    });
    await recursiveArchive(args.id);
    return document;
  },
});

//get sidebar data
export const getSidebar = query({
  args: {
    parentDocument: v.optional(v.id("documents")),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not Authenticated");
    }
    const userId = identity.subject;

    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user_parent", (q) =>
        q.eq("userId", userId).eq("parentDocument", args.parentDocument)
      )
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect();
    return documents;
  },
});

// Get All Achieved Docs
export const getAchievedDocs = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not Authenticated");
    }
    const userId = identity.subject;
    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .filter((q) => q.eq(q.field("isArchived"), true))
      .order("desc")
      .collect();
    return documents;
  },
});

// Restore  Achieved Docs
// export const restoreAchievedDocs = mutation({
//   args: { id: v.id("documents") },
//   handler : async (ctx,args)=>{
//     const identity = await ctx.auth.getUserIdentity();
//     if (!identity) {
//       throw new Error("Not Authenticated");
//     }
//     const userId = identity.subject;
//     const document = await ctx.db.get(args.id)
//     if(!document){
//       throw new Error("Cannot Find This Doc")
//     }
//     if(document.userId !== userId){
//       throw new Error("Unauthorized")
//     }
//     console.log(document);


//     if(document.parentDocument){
//       const parent = await ctx.db.get(document.parentDocument)
//       if(parent?.isArchived){
//         console.log(parent);
//       }
//     }
    
//     return document
//   }
// })
export const restore = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Not authenticated");
    }

    const userId = identity.subject;

    const existingDocument = await ctx.db.get(args.id);

    if (!existingDocument) {
      throw new Error("Not found");
    }

    if (existingDocument.userId !== userId) {
      throw new Error("Unauthorized");
    }
    

    const recursiveRestore = async (documentId: Id<"documents">) => {
      const children = await ctx.db
        .query("documents")
        .withIndex("by_user_parent", (q) => (
          q
            .eq("userId", userId)
            .eq("parentDocument", documentId)
        ))
        .collect();

      for (const child of children) {
        await ctx.db.patch(child._id, {
          isArchived: false,
        });

        await recursiveRestore(child._id);
      }
    }

    const options: Partial<Doc<"documents">> = {
      isArchived: false,
    };

    if (existingDocument.parentDocument) {
      const parent = await ctx.db.get(existingDocument.parentDocument);
      if (parent?.isArchived) {
        options.parentDocument = undefined;
      }
    }

    const document = await ctx.db.patch(args.id, options);

    recursiveRestore(args.id);

    return document;
  }
});


//Delete Doc By Id
export const deleteDoc = mutation({
  args:{
    id:v.id("documents")
  },
  handler : async (ctx,args)=>{
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not Authenticated");
    }
    const userId = identity.subject;

    const isExistingDocument = await ctx.db.get(args.id);

    if (!isExistingDocument) {
      throw new Error("Cannot Find This Doc");
    }

    if (isExistingDocument.userId !== userId) {
      throw new Error("Unauthorized");
    }

    await ctx.db.delete(args.id)
      return "Doc Is Deleted"
  }
})

//get all data data
export const get = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not Authenticated");
    }
    const documents = await ctx.db.query("documents").collect();
    return documents;
  },
});

//Create Document
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
      isArchived: false,
      isPublished: false,
    });

    return document;
  },
});
