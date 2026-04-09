-- Migration: 0002_insights_cms
-- Created: 2026-04-09
-- Target: Supabase (PostgreSQL 15+)
-- Purpose: Schema for moving the hardcoded "Kahneman Library" insights array
--          (currently in src/components/Insights.tsx) into a database table.
--          Run this when insights need to be editable without a code deploy.
--
-- Depends on: 0001_initial_schema (for _migrations table)

CREATE TABLE IF NOT EXISTS insights (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  slug         TEXT        NOT NULL UNIQUE,       -- URL-friendly identifier
  title        TEXT        NOT NULL,
  tag          TEXT        NOT NULL,              -- e.g. 'System 1', 'PTSD', 'Burnout'
  excerpt      TEXT        NOT NULL,              -- Short preview text shown on card
  content      TEXT,                             -- Full markdown body (for detail page)
  published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for tag filtering (used by category filter UI)
CREATE INDEX IF NOT EXISTS insights_tag_idx ON insights (tag);

-- Index for chronological listing
CREATE INDEX IF NOT EXISTS insights_published_idx ON insights (published_at DESC);

-- Auto-update updated_at on row change
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

CREATE OR REPLACE TRIGGER insights_updated_at
  BEFORE UPDATE ON insights
  FOR EACH ROW EXECUTE FUNCTION set_updated_at();

-- ─── RLS ──────────────────────────────────────────────────────────────────────
ALTER TABLE insights ENABLE ROW LEVEL SECURITY;

-- Public read access (site visitors can fetch insights)
CREATE POLICY "public_read_insights"
  ON insights FOR SELECT
  TO anon
  USING (published_at <= NOW());

-- ─── Seed: Current hardcoded insights ─────────────────────────────────────────
-- Run this block ONCE to migrate the existing static data.
-- Remove after first run.
INSERT INTO insights (slug, title, tag, excerpt) VALUES
  ('fast-slow-thinking',    'The Two Systems of Thought',       'System 1',        'How automatic and deliberate thinking shape every decision you make.'),
  ('system2-effort',        'When Slow Thinking Wins',          'System 2',        'The conditions under which effortful, deliberate reasoning outperforms instinct.'),
  ('ptsd-rewiring',         'Rewriting Traumatic Memory',       'PTSD',            'Neuroplasticity and evidence-based pathways to trauma recovery.'),
  ('neuroplasticity',       'Your Brain is Not Fixed',          'Neuroplasticity', 'How experience, therapy, and habit reshape neural architecture throughout life.'),
  ('burnout-recovery',      'The Science of Burnout',           'Burnout',         'Why burnout is not weakness — and what the research says about recovery.'),
  ('attachment-styles',     'How Early Bonds Shape Adult Life', 'Attachment',      'Bowlby and Ainsworth on how childhood attachment patterns repeat in adulthood.'),
  ('emotional-regulation',  'Regulating the Nervous System',    'Regulation',      'Evidence-based tools for managing emotional intensity without suppression.'),
  ('healthy-boundaries',    'Boundaries are Not Walls',         'Boundaries',      'The psychology of healthy limits and why guilt is not a reliable moral compass.'),
  ('loss-aversion',         'Why Losses Hurt More Than Gains',  'Loss Aversion',   'Kahneman and Tversky on the asymmetric weight we assign to loss vs. reward.'),
  ('gender-and-stress',     'Stress Through a Gender Lens',     'Gender',          'How socialised gender roles shape stress responses, coping, and help-seeking.')
ON CONFLICT (slug) DO NOTHING;
