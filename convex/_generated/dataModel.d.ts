/* eslint-disable */
/**
 * Generated types for your Convex schema.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  DataModelFromSchemaDefinition,
  DocumentByName,
  TableNamesInDataModel,
} from "convex/server";
import type { GenericId } from "convex/values";
import schema from "../schema.js";

/**
 * The names of all of your Convex tables.
 */
export type TableNames = TableNamesInDataModel<DataModel>;

/**
 * The type of a document stored in Convex.
 */
export type Doc<TableName extends TableNames> = DocumentByName<DataModel, TableName>;

/**
 * An identifier for a document in Convex.
 *
 * Convex documents are uniquely identified by their `Id`, which is accessible
 * on the `_id` field. To learn more, see https://docs.convex.dev/database/document-ids.
 *
 * Documents can be loaded using `db.get(id)` in query and mutation functions.
 */
export type Id<TableName extends TableNames> = GenericId<TableName>;

/**
 * A type describing your Convex data model.
 *
 * This type is used to parameterize methods like `queryGeneric` and
 * `mutationGeneric` in `convex/server.js`.
 */
export type DataModel = DataModelFromSchemaDefinition<typeof schema>;