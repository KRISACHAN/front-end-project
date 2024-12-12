-- 插入默认角色到 `role` 表

INSERT INTO `role` (`name`, `description`, `created_at`, `updated_at`) VALUES
('admin', '系统管理员，拥有所有权限。', NOW(), NOW()),
('editor', '内容编辑者，负责管理和编辑内容。', NOW(), NOW()),
('viewer', '查看者，仅具有查看权限。', NOW(), NOW());
