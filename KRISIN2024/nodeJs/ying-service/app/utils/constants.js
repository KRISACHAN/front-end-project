import { eq } from 'lodash';

// 定义角色常量
export const adminMap = Object.freeze({
    ADMIN: 'admin', // 数据库中的角色名称
    EDITOR: 'editor', // 数据库中的角色名称
    VIEWER: 'viewer', // 数据库中的角色名称
    MEMBER: 'MEMBER', // 其他角色
});

// 检查是否为管理员
export const isAdmin = role => eq(role, adminMap.ADMIN);

// 检查是否为编辑者
export const isEditor = role => eq(role, adminMap.EDITOR);

// 检查是否为查看者
export const isViewer = role => eq(role, adminMap.VIEWER);

// 检查是否有 manage_users 权限
export const hasManageUsersPermission = permissions =>
    permissions.some(permission => permission.name === 'manage_users');

// 检查是否有 manage_roles 权限
export const hasManageRolesPermission = permissions =>
    permissions.some(permission => permission.name === 'manage_roles');

// 检查是否有 manage_permissions 权限
export const hasManagePermissionsPermission = permissions =>
    permissions.some(permission => permission.name === 'manage_permissions');

// 检查是否有 view_reports 权限
export const hasViewReportsPermission = permissions =>
    permissions.some(permission => permission.name === 'view_reports');

// 检查是否有 edit_content 权限
export const hasEditContentPermission = permissions =>
    permissions.some(permission => permission.name === 'edit_content');

// 检查是否有 delete_content 权限
export const hasDeleteContentPermission = permissions =>
    permissions.some(permission => permission.name === 'delete_content');

// 检查是否有 publish_content 权限
export const hasPublishContentPermission = permissions =>
    permissions.some(permission => permission.name === 'publish_content');

// 检查是否有 archive_content 权限
export const hasArchiveContentPermission = permissions =>
    permissions.some(permission => permission.name === 'archive_content');
