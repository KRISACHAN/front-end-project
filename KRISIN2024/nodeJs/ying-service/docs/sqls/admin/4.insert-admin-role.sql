-- 插入默认管理员角色关联到 `admin_role` 表

INSERT INTO `admin_role` (`admin_id`, `role_id`, `created_at`, `updated_at`) VALUES
-- 假设 admin 表中已有以下管理员:
-- 1. admin_id: 1, username: 'superadmin'
-- 2. admin_id: 2, username: 'editorUser'
-- 3. admin_id: 3, username: 'viewerUser'

-- 将 'superadmin' 分配为 'admin' 角色
(1, (SELECT id FROM `role` WHERE `name` = 'admin'), NOW(), NOW()),

-- 将 'editorUser' 分配为 'editor' 角色
(2, (SELECT id FROM `role` WHERE `name` = 'editor'), NOW(), NOW()),

-- 将 'viewerUser' 分配为 'viewer' 角色
(3, (SELECT id FROM `role` WHERE `name` = 'viewer'), NOW(), NOW());
