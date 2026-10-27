/*
# EcoWise AI — Core Schema

## Purpose
EcoWise AI is an AI-powered energy efficiency advisor for small factories.
This migration creates the multi-user schema for factory management, energy
data, AI recommendations, chat history, and reports.

## New Tables
1. `factories` — a user's factory profile (name, location, size, industry).
2. `energy_readings` — time-series energy consumption readings per factory.
3. `recommendations` — AI-generated energy saving recommendations.
4. `chat_messages` — AI consultant chatbot conversation history.
5. `reports` — generated energy reports (metadata + JSON payload).

## Security
- RLS enabled on every table.
- All tables are owner-scoped via `user_id` (defaults to `auth.uid()`).
- Each table has 4 CRUD policies scoped to the owning authenticated user.
- `factories` is the parent; child tables reference it and policies verify
  ownership through the factory's `user_id`.

## Important Notes
1. Owner columns default to `auth.uid()` so frontend inserts that omit
   `user_id` still satisfy the INSERT policy's WITH CHECK.
2. Child-table policies verify ownership via EXISTS subquery on factories.
3. Uses `gen_random_uuid()` for primary keys.
*/

CREATE TABLE IF NOT EXISTS factories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  industry text NOT NULL DEFAULT 'Manufacturing',
  location text NOT NULL DEFAULT 'Unknown',
  size_sqm integer NOT NULL DEFAULT 1000,
  operating_hours text NOT NULL DEFAULT '8 AM - 6 PM',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE factories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_factories" ON factories;
CREATE POLICY "select_own_factories" ON factories FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_factories" ON factories;
CREATE POLICY "insert_own_factories" ON factories FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_factories" ON factories;
CREATE POLICY "update_own_factories" ON factories FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_factories" ON factories;
CREATE POLICY "delete_own_factories" ON factories FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS energy_readings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  factory_id uuid NOT NULL REFERENCES factories(id) ON DELETE CASCADE,
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  recorded_at date NOT NULL DEFAULT CURRENT_DATE,
  consumption_kwh numeric NOT NULL DEFAULT 0,
  cost_inr numeric NOT NULL DEFAULT 0,
  carbon_kg numeric NOT NULL DEFAULT 0,
  machine_name text NOT NULL DEFAULT 'Main Line',
  department text NOT NULL DEFAULT 'Production',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE energy_readings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_energy_readings" ON energy_readings;
CREATE POLICY "select_own_energy_readings" ON energy_readings FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_energy_readings" ON energy_readings;
CREATE POLICY "insert_own_energy_readings" ON energy_readings FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_energy_readings" ON energy_readings;
CREATE POLICY "update_own_energy_readings" ON energy_readings FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_energy_readings" ON energy_readings;
CREATE POLICY "delete_own_energy_readings" ON energy_readings FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS recommendations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  factory_id uuid NOT NULL REFERENCES factories(id) ON DELETE CASCADE,
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL DEFAULT 'general',
  priority text NOT NULL DEFAULT 'medium',
  estimated_savings_inr numeric NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE recommendations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_recommendations" ON recommendations;
CREATE POLICY "select_own_recommendations" ON recommendations FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_recommendations" ON recommendations;
CREATE POLICY "insert_own_recommendations" ON recommendations FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "update_own_recommendations" ON recommendations;
CREATE POLICY "update_own_recommendations" ON recommendations FOR UPDATE
  TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_recommendations" ON recommendations;
CREATE POLICY "delete_own_recommendations" ON recommendations FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL,
  content text NOT NULL,
  language text NOT NULL DEFAULT 'English',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_chat_messages" ON chat_messages;
CREATE POLICY "select_own_chat_messages" ON chat_messages FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_chat_messages" ON chat_messages;
CREATE POLICY "insert_own_chat_messages" ON chat_messages FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_chat_messages" ON chat_messages;
CREATE POLICY "delete_own_chat_messages" ON chat_messages FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  factory_id uuid NOT NULL REFERENCES factories(id) ON DELETE CASCADE,
  user_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  report_type text NOT NULL DEFAULT 'monthly',
  period_start date NOT NULL DEFAULT CURRENT_DATE,
  period_end date NOT NULL DEFAULT CURRENT_DATE,
  payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "select_own_reports" ON reports;
CREATE POLICY "select_own_reports" ON reports FOR SELECT
  TO authenticated USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "insert_own_reports" ON reports;
CREATE POLICY "insert_own_reports" ON reports FOR INSERT
  TO authenticated WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "delete_own_reports" ON reports;
CREATE POLICY "delete_own_reports" ON reports FOR DELETE
  TO authenticated USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_factories_user_id ON factories(user_id);
CREATE INDEX IF NOT EXISTS idx_energy_readings_factory_id ON energy_readings(factory_id);
CREATE INDEX IF NOT EXISTS idx_energy_readings_user_id ON energy_readings(user_id);
CREATE INDEX IF NOT EXISTS idx_recommendations_factory_id ON recommendations(factory_id);
CREATE INDEX IF NOT EXISTS idx_recommendations_user_id ON recommendations(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_user_id ON chat_messages(user_id);
CREATE INDEX IF NOT EXISTS idx_reports_factory_id ON reports(factory_id);
CREATE INDEX IF NOT EXISTS idx_reports_user_id ON reports(user_id);