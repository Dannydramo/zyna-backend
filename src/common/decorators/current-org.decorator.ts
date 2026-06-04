import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Extracts the current organization ID from the request.
 *
 * Phase 1: reads from `x-org-id` header, falls back to DEFAULT_ORG_ID env.
 * Phase 5: TODO swap to `request.user.organizationId` after JWT auth is added.
 */
export const CurrentOrg = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest<{
      headers: Record<string, string>;
      orgId?: string;
      user?: { organizationId?: string };
    }>();

    // ALWAYS use the authenticated user's organizationId from JWT
    // Never fall back to defaults - ensures users can only access their own org's data
    const orgId = request.user?.organizationId;

    if (!orgId) {
      throw new Error('No organization context. User must be authenticated.');
    }

    return orgId;
  },
);
