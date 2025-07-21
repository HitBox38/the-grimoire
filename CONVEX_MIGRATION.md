# Migration from Firebase to Convex

This document outlines the migration from Firebase Firestore to Convex that has been completed for your D&D reference application.

## What was migrated

### Database Collections
- **Monsters**: Migrated from Firebase `monsters` collection to Convex `monsters` table
- **Items**: Created schema and functions for future implementation  
- **Spells**: Created schema and functions for future implementation

### Code Changes
1. **Removed Firebase dependencies**:
   - Removed `firebase` package from package.json
   - Deleted `utils/firebase/` directory

2. **Added Convex**:
   - Added `convex` package to dependencies
   - Created `convex/` directory with schema and functions
   - Added ConvexProvider to app layout

3. **Updated components**:
   - `app/references/bestiary/actions.ts`: Replaced Firebase calls with Convex hooks
   - `app/references/bestiary/data-table.tsx`: Updated to use Convex data fetching
   - `app/references/bestiary/monsterView.tsx`: Updated to use Convex data fetching
   - `app/references/bestiary/type.ts`: Updated to use Convex ID types

## Files created

### Convex Configuration
- `convex.json` - Convex project configuration
- `convex/schema.ts` - Database schema for monsters, items, and spells
- `convex/_generated/` - Generated type files

### Convex Functions
- `convex/monsters.ts` - CRUD operations for monsters
- `convex/items.ts` - CRUD operations for items
- `convex/spells.ts` - CRUD operations for spells

### Client Configuration
- `utils/convex/client.ts` - Convex client setup
- `utils/convex/provider.tsx` - React provider component

## Next Steps

### 1. Set up Convex deployment
```bash
npx convex dev
```
This will:
- Create a new Convex deployment
- Generate the deployment URL
- Push your schema to Convex

### 2. Update environment variables
Add to your `.env.local`:
```
NEXT_PUBLIC_CONVEX_URL=https://your-deployment-name.convex.cloud
```

Remove any Firebase environment variables:
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

### 3. Data Migration
You'll need to export your existing monster data from Firebase and import it into Convex. You can:

1. **Export from Firebase**: Use Firebase Admin SDK or console export
2. **Import to Convex**: Use the Convex mutations to insert your data

Example migration script structure:
```javascript
// migration script (run in convex/migration.js)
import { mutation } from "./_generated/server";

export const migrateMonsters = mutation({
  args: {},
  handler: async (ctx) => {
    // Your Firebase data here
    const firebaseMonsters = [...]; 
    
    for (const monster of firebaseMonsters) {
      await ctx.db.insert("monsters", {
        // Transform Firebase data to match Convex schema
        ...monster,
        // Handle complex fields by stringifying them
        specialAbilities: monster.specialAbilities ? JSON.stringify(monster.specialAbilities) : undefined,
        actions: monster.actions ? JSON.stringify(monster.actions) : undefined,
        // ... other complex fields
      });
    }
  },
});
```

### 4. Test the application
1. Start the development server: `npm run dev`
2. Start Convex development: `npx convex dev` (in another terminal)
3. Test the bestiary functionality to ensure data loads correctly

### 5. Future enhancements
- Implement items and spells pages using the created Convex functions
- Add search functionality using Convex's filtering capabilities
- Consider adding real-time features using Convex's built-in reactivity

## Benefits of migration

1. **Real-time updates**: Convex provides automatic real-time updates to all connected clients
2. **TypeScript-first**: Better type safety with generated types
3. **Simpler architecture**: No need for separate state management for server state
4. **Better developer experience**: Automatic code generation and local development tools
5. **Scalability**: Built-in scaling and performance optimization

## Rollback plan

If you need to rollback:
1. Restore the deleted Firebase files from git history
2. Remove Convex dependencies and files
3. Revert the component changes
4. Add back Firebase environment variables

The Firebase configuration and functions are preserved in git history and can be easily restored if needed.