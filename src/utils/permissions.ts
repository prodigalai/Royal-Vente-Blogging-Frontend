import { RolePermissions, User, UserRole, OrganizationRole } from '../types';

export const rolePermissions: RolePermissions = {
  super_admin: [
    { resource: 'articles', action: 'create' },
    { resource: 'articles', action: 'read' },
    { resource: 'articles', action: 'update' },
    { resource: 'articles', action: 'delete' },
    { resource: 'users', action: 'create' },
    { resource: 'users', action: 'read' },
    { resource: 'users', action: 'update' },
    { resource: 'users', action: 'delete' },
    { resource: 'organizations', action: 'create' },
    { resource: 'organizations', action: 'read' },
    { resource: 'organizations', action: 'update' },
    { resource: 'organizations', action: 'delete' },
    { resource: 'settings', action: 'manage' },
  ],
  admin: [
    { resource: 'articles', action: 'create' },
    { resource: 'articles', action: 'read' },
    { resource: 'articles', action: 'update' },
    { resource: 'articles', action: 'delete', conditions: { scope: 'organization' } },
    { resource: 'users', action: 'read' },
    { resource: 'users', action: 'update', conditions: { scope: 'organization' } },
    { resource: 'organizations', action: 'read' },
    { resource: 'organizations', action: 'update', conditions: { scope: 'own' } },
  ],
  editor: [
    { resource: 'articles', action: 'create' },
    { resource: 'articles', action: 'read' },
    { resource: 'articles', action: 'update' },
    { resource: 'articles', action: 'delete', conditions: { scope: 'own' } },
    { resource: 'users', action: 'read', conditions: { scope: 'organization' } },
  ],
  author: [
    { resource: 'articles', action: 'create' },
    { resource: 'articles', action: 'read' },
    { resource: 'articles', action: 'update', conditions: { scope: 'own' } },
    { resource: 'articles', action: 'delete', conditions: { scope: 'own' } },
  ],
  reader: [
    { resource: 'articles', action: 'read' },
  ],
};

export const organizationRolePermissions: Record<OrganizationRole, string[]> = {
  owner: ['manage_organization', 'manage_members', 'create_articles', 'edit_articles', 'delete_articles'],
  admin: ['manage_members', 'create_articles', 'edit_articles', 'delete_articles'],
  editor: ['create_articles', 'edit_articles'],
  member: ['create_articles'],
};

export const hasPermission = (
  user: User | null,
  resource: string,
  action: string,
  context?: any
): boolean => {
  if (!user) return false;

  const permissions = rolePermissions[user.role] || [];
  
  return permissions.some(permission => {
    if (permission.resource !== resource || permission.action !== action) {
      return false;
    }

    if (permission.conditions) {
      if (permission.conditions.scope === 'own' && context?.ownerId !== user.id) {
        return false;
      }
      if (permission.conditions.scope === 'organization' && 
          context?.organizationId !== user.organizationId) {
        return false;
      }
    }

    return true;
  });
};

export const canAccessOrganizationFeature = (
  user: User | null,
  organizationRole: OrganizationRole | null,
  feature: string
): boolean => {
  if (!user || !organizationRole) return false;
  
  const permissions = organizationRolePermissions[organizationRole] || [];
  return permissions.includes(feature);
};