/* eslint-disable */
/**
 * Generated utilities for implementing server-side Convex query and mutation functions.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import {
  ActionBuilder,
  MutationBuilder,
  QueryBuilder,
  SchemaType,
  TableNamesInDataModel,
  internalActionGeneric,
  internalMutationGeneric,
  internalQueryGeneric,
  queryGeneric,
  mutationGeneric,
  actionGeneric,
  httpActionGeneric,
} from "convex/server";
import type { DataModel } from "./dataModel.js";

/**
 * Define a query in this Convex app's public API.
 *
 * This function will be allowed to read your Convex database and will be accessible from the client.
 *
 * @param func - The query function. It receives a `QueryCtx` as its first argument.
 * @returns The wrapped query. Include this as an `export` to add it to your app's API.
 */
export const query = queryGeneric as QueryBuilder<DataModel, "public">;

/**
 * Define a mutation in this Convex app's public API.
 *
 * This function will be allowed to modify your Convex database and will be accessible from the client.
 *
 * @param func - The mutation function. It receives a `MutationCtx` as its first argument.
 * @returns The wrapped mutation. Include this as an `export` to add it to your app's API.
 */
export const mutation = mutationGeneric as MutationBuilder<DataModel, "public">;

/**
 * Define an action in this Convex app's public API.
 *
 * An action can run any JavaScript code, including non-deterministic code and code with side-effects.
 * Actions can also call into third-party services.
 * Actions execute in a Node.js environment and can interact with the database indirectly by calling queries and mutations.
 *
 * @param func - The action function. It receives an `ActionCtx` as its first argument.
 * @returns The wrapped action. Include this as an `export` to add it to your app's API.
 */
export const action = actionGeneric as ActionBuilder<DataModel, "public">;

/**
 * Define an internal query function.
 *
 * Internal functions are only accessible from other Convex functions and not from the client.
 *
 * @param func - The query function. It receives a `QueryCtx` as its first argument.
 * @returns The wrapped query.
 */
export const internalQuery = internalQueryGeneric as QueryBuilder<DataModel, "internal">;

/**
 * Define an internal mutation function.
 *
 * Internal functions are only accessible from other Convex functions and not from the client.
 *
 * @param func - The mutation function. It receives a `MutationCtx` as its first argument.
 * @returns The wrapped mutation.
 */
export const internalMutation = internalMutationGeneric as MutationBuilder<DataModel, "internal">;

/**
 * Define an internal action function.
 *
 * Internal functions are only accessible from other Convex functions and not from the client.
 *
 * @param func - The action function. It receives an `ActionCtx` as its first argument.
 * @returns The wrapped action.
 */
export const internalAction = internalActionGeneric as ActionBuilder<DataModel, "internal">;

/**
 * Define an HTTP action.
 *
 * This function will be used to respond to HTTP requests received by a Convex
 * deployment if the requests matches the path and method where this action
 * was registered in `convex/http.js`.
 *
 * @param func - The function to route requests to. It receives an `ActionCtx`
 * as its first argument, and a `Request` object as its second.
 * @returns The wrapped endpoint function. Import this function from
 * `convex/http.js` and route requests to it using the `route` function in
 * `convex/http.js`.
 */
export const httpAction = httpActionGeneric;