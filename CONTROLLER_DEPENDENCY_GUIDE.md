# Controller Dependency Guide

## Issue: Controllers Missing Module Imports

Controllers can inject services from other modules, but those modules must be imported.

### The Pattern

```typescript
// In controller
constructor(private readonly someService: SomeService) {}

// SomeService comes from SomeModule
// So the controller's module must import SomeModule
```

### Fixed Issues

#### ChatModule
**Issue:** ChatController needed ChannelConnectionsService  
**Fix:** Added `ChannelConnectionsModule` to imports

```typescript
@Module({
  imports: [IngestionModule, ChannelDispatcherModule, ChannelConnectionsModule],  // ← Added
  controllers: [ChatController],
  providers: [ChatSender, ChatGateway],
})
```

#### WhatsAppModule
**Issue:** WhatsAppController needed ChannelConnectionsService  
**Fix:** Added `ChannelConnectionsModule` to imports

```typescript
@Module({
  imports: [IngestionModule, ChannelDispatcherModule, ChannelConnectionsModule],  // ← Added
  controllers: [WhatsAppController, WhatsAppIngestionController],
  providers: [WhatsAppSender],
})
```

## How to Identify This Issue

### Error Pattern
```
Nest can't resolve dependencies of the [ControllerName]Controller (?, ServiceName)
```

### Root Cause Analysis
1. Look at the controller's constructor
2. Find what service it needs (ServiceName in error)
3. Find what module provides that service
4. Check if the controller's module imports that module
5. If not, add the import

### Quick Fix

**Step 1:** Find the error - which service is missing?
```
Error: can't resolve ... ChannelConnectionsService
```

**Step 2:** Find the module
```
ChannelConnectionsService is in ChannelConnectionsModule
```

**Step 3:** Import it
```typescript
import { ChannelConnectionsModule } from '../channel-connections/channel-connections.module';

@Module({
  imports: [OtherModule, ChannelConnectionsModule],  // ← Add this
})
```

## Checklist for Module Configuration

When a module has controllers:

- [ ] **Controllers:** List all controllers
- [ ] **Providers:** Services created in this module
- [ ] **Imports:** All modules needed by controllers or providers
- [ ] **Exports:** Services other modules can use

```typescript
@Module({
  imports: [OtherModule1, OtherModule2],  // ← Needed by controllers/providers
  controllers: [MyController],            // ← Needs services from imports
  providers: [MyService],                 // ← Available to controllers
  exports: [MyService],                   // ← Available to other modules
})
```

## Prevention Checklist

Before marking a module as complete:

- [ ] All controller dependencies are imported
- [ ] All provider dependencies are imported
- [ ] Public services are exported
- [ ] Module starts without UnknownDependenciesException

## Related Files

- `MODULE_EXPORTS_GUIDE.md` - How to properly export services
- `CHANNEL_MODULES_FIX.md` - Complete module fixes
- `src/modules/channels/chat/chat.module.ts` - Fixed example
- `src/modules/channels/whatsapp/whatsapp.module.ts` - Fixed example
- `src/modules/channels/channel-connections/channel-connections.module.ts` - Provides ChannelConnectionsService

## Testing

After adding imports:

```bash
npm run start:dev
```

Expected: No `UnknownDependenciesException` for the affected module
