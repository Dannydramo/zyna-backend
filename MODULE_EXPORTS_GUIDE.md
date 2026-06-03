# NestJS Module Exports Guide

## Issue Found & Fixed

**ChatGateway** needed `IngestionService` but `IngestionModule` wasn't exporting it.

### The Fix
**File:** `src/modules/ingestion/ingestion.module.ts`

```typescript
@Module({
  controllers: [IngestionController],
  providers: [IngestionService],
  exports: [IngestionService],  // ← ADDED
})
export class IngestionModule {}
```

## When to Export Services

### ✅ Export if:
- Other modules need to inject this service
- The service is core functionality used elsewhere
- You'll import this module in other modules

### ❌ Don't export if:
- The service is only used internally
- Only controllers in this module use it
- It's a private/internal utility

## Module Export Patterns

### Pattern 1: Standalone Service (used by other modules)
```typescript
// ✅ CORRECT - Exports the service
@Module({
  controllers: [MyController],
  providers: [MyService],
  exports: [MyService],  // Other modules can use it
})
export class MyModule {}
```

### Pattern 2: Internal Service (not used elsewhere)
```typescript
// ✅ CORRECT - No export needed
@Module({
  controllers: [MyController],
  providers: [MyService],
  // No exports - internal only
})
export class MyModule {}
```

### Pattern 3: Multiple Services (export what's needed)
```typescript
// ✅ CORRECT - Export only public services
@Module({
  providers: [
    PublicService,
    InternalService,  // Private utility
  ],
  exports: [PublicService],  // Only public is exported
})
export class MyModule {}
```

### Pattern 4: Importing and Re-exporting
```typescript
// ✅ CORRECT - Re-export for convenience
@Module({
  imports: [OtherModule],
  exports: [OtherModule],  // Re-export so users of this module get it too
})
export class ProxyModule {}
```

## Common Dependency Errors & Fixes

### Error: "Nest can't resolve dependencies of [Service]"
```
argument [InjectedService] at index [0] is available
```

**Causes:**
1. Module providing [InjectedService] not imported
2. Module imported but [InjectedService] not exported
3. [InjectedService] not provided by the module

**Solutions:**
```typescript
// Solution 1: Import the module
@Module({
  imports: [ModuleProvidingService],  // ← Add this
  providers: [MyService],
})

// Solution 2: Export the service from its module
@Module({
  providers: [NeededService],
  exports: [NeededService],  // ← Add this
})

// Solution 3: Provide it locally
@Module({
  providers: [NeededService, MyService],  // ← Add to providers
})
```

## Best Practices

### 1. Be Explicit About Exports
```typescript
// ❌ Bad - Implicit
@Module({
  providers: [ServiceA, ServiceB, ServiceC],
})

// ✅ Good - Clear what's exported
@Module({
  providers: [ServiceA, ServiceB, ServiceC],
  exports: [ServiceA, ServiceC],  // Explicitly declare public API
})
```

### 2. Group Related Exports
```typescript
// ✅ Good - Group by feature
@Module({
  providers: [
    UserService,
    UserRepository,
    UserValidator,
  ],
  exports: [
    UserService,      // Main service
    UserRepository,   // If others need direct DB access
  ],
})
```

### 3. Document Module Dependencies
```typescript
// ✅ Good - Comments explain what's needed
@Module({
  imports: [
    PrismaModule,         // Needs database
    ChannelDispatcherModule,  // Register with dispatcher
    IngestionModule,      // For message handling
  ],
  providers: [ChatGateway, ChatSender],
  exports: [ChatSender],  // Only sender is public
})
```

## Checklist for Module Configuration

When creating or modifying a module:

- [ ] **Providers**: List all services/classes the module creates
- [ ] **Imports**: List all modules this module depends on
- [ ] **Controllers**: List all controllers (if any)
- [ ] **Exports**: Explicitly list what other modules can use
  - [ ] Export main services
  - [ ] Don't export internal utilities
  - [ ] Don't forget to export (it's not implicit!)

## Fixed Modules

### ✅ IngestionModule
```typescript
@Module({
  controllers: [IngestionController],
  providers: [IngestionService],
  exports: [IngestionService],  // FIXED
})
```

## Verification

To verify all modules are correctly configured:

1. **Check for export errors:**
   ```bash
   npm run start:dev
   ```
   Look for: `Nest can't resolve dependencies`

2. **Check module structure:**
   - All providers are listed
   - All imports are listed
   - Public services are exported

## Related Files

- `src/modules/ingestion/ingestion.module.ts` - Fixed
- `CHANNEL_MODULES_FIX.md` - Previous module fixes
- `DEPENDENCY_FIX.md` - Original dependency resolution guide

## Summary

When a service needs to be used by another module:

```
Service is in Module A
  ↓
Module A must export it: exports: [Service]
  ↓
Module B must import Module A: imports: [ModuleA]
  ↓
Now Module B can inject Service
```

**Key insight:** Modules are the unit of encapsulation in NestJS. To use something from another module, that module must explicitly export it.
