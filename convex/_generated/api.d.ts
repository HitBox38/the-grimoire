/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as monsters from "../monsters.js";
import type * as items from "../items.js";
import type * as spells from "../spells.js";
import type * as migration from "../migration.js";

/**
 * A utility for referencing Convex functions in your app's API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
declare const api: FilterApi<
  ApiFromModules<{
    monsters: typeof monsters;
    items: typeof items;
    spells: typeof spells;
    migration: typeof migration;
  }>,
  FunctionReference<any, "public">
>;
export default api;