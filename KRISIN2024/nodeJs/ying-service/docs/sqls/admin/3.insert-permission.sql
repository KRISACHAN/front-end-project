-- 插入默认权限到 `permissions` 表

INSERT INTO `permissions` (`name`, `description`, `created_at`, `updated_at`) VALUES
('manage_users', '管理用户，包括创建、编辑和删除用户。', NOW(), NOW()),
('manage_roles', '管理角色，包括创建、编辑和删除角色。', NOW(), NOW()),
('manage_permissions', '管理权限，包括创建、编辑和删除权限。', NOW(), NOW()),
('view_reports', '查看系统报告和分析数据。', NOW(), NOW()),
('edit_content', '编辑系统内容，如文章、页面等。', NOW(), NOW()),
('delete_content', '删除系统内容，如文章、页面等。', NOW(), NOW()),
('publish_content', '发布系统内容，使其对外可见。', NOW(), NOW()),
('archive_content', '归档系统内容，进行长期保存。', NOW(), NOW());
