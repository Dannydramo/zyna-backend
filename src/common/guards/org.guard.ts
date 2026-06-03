import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

/**
 * Ensures every request has an org context and stamps it on request.orgId.
 *
 * Phase 1: reads `x-org-id` header or DEFAULT_ORG_ID env.
 * Phase 5: TODO derive orgId from JWT payload (request.user.organizationId).
 */
@Injectable()
export class OrgGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Skip guard for public routes
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<{
      headers: Record<string, string>;
      orgId?: string;
      user?: { organizationId?: string };
    }>();

    const orgId =
      request.user?.organizationId ??
      request.headers['x-org-id'] ??
      process.env.DEFAULT_ORG_ID;

    if (!orgId) {
      throw new BadRequestException(
        'Organization context required. Provide x-org-id header.',
      );
    }

    request.orgId = orgId;
    return true;
  }
}
