/*
  # Admin Roles and Permissions

  1. New Tables
    - `admin_permissions`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `created_at` (timestamp)

    - `admin_roles`
      - `id` (uuid, primary key) 
      - `name` (text)
      - `description` (text)
      - `created_at` (timestamp)

    - `admin_role_permissions`
      - `role_id` (uuid, references admin_roles)
      - `permission_id` (uuid, references admin_permissions)
      - Primary key (role_id, permission_id)

  2. Security
    - Enable RLS
    - Add policies for admin access
*/

-- Create admin_permissions table
CREATE TABLE IF NOT EXISTS admin_permissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Create admin_roles table
CREATE TABLE IF NOT EXISTS admin_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Create admin_role_permissions table
CREATE TABLE IF NOT EXISTS admin_role_permissions (
  role_id uuid REFERENCES admin_roles(id) ON DELETE CASCADE,
  permission_id uuid REFERENCES admin_permissions(id) ON DELETE CASCADE,
  PRIMARY KEY (role_id, permission_id)
);

-- Enable RLS
ALTER TABLE admin_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_role_permissions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Only admins can view permissions"
  ON admin_permissions
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Only admins can view roles"
  ON admin_roles
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Only admins can view role permissions"
  ON admin_role_permissions
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Insert default permissions
INSERT INTO admin_permissions (name, description) VALUES
  ('manage_users', 'Can manage user accounts'),
  ('manage_products', 'Can manage products'),
  ('manage_orders', 'Can manage orders'),
  ('view_analytics', 'Can view analytics'),
  ('manage_settings', 'Can manage system settings');

-- Insert default admin role
INSERT INTO admin_roles (name, description) VALUES
  ('super_admin', 'Has full system access');

-- Assign all permissions to super_admin role
INSERT INTO admin_role_permissions (role_id, permission_id)
SELECT 
  (SELECT id FROM admin_roles WHERE name = 'super_admin'),
  id
FROM admin_permissions;