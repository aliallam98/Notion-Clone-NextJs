import {defineSchema,defineTable} from "convex/server"
import { v } from "convex/values"

const schema = defineSchema({
    documents:defineTable({
        title:v.string(),
        userId:v.string(),
        parentDocument:v.optional(v.id("documents")),
        icon:v.optional(v.string()),
        coverImage:v.optional(v.string()),
        isPublished:v.boolean(),
        isArchived:v.boolean(),
        content:v.optional(v.string()),
    }).index("by_user",["userId"])
    .index("by_user_parent",["userId","parentDocument"])
})

export default schema