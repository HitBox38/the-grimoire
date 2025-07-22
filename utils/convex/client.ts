"use client";

import { ConvexReactClient } from "convex/react";

// Handle missing Convex URL during build time
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL || "https://placeholder.convex.cloud";
const convex = new ConvexReactClient(convexUrl);

export default convex;