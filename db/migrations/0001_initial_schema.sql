-- Migration: 0001_initial_schema
-- Created: 2026-04-09
-- Target: Supabase (PostgreSQL 15+)
-- Purpose: Foundation tables for contact form submissions and newsletter sign-ups.
--          Run this when a contact form or newsletter feature is added to the site.

-- ─── Tracking Table ───────────────────────────────────────────────────────────
-- Records which migrations have been applied. Created first.
CREATE TABLE IF NOT EXISTS _migrations (
  id         SERIAL PRIMARY KEY,
  filename   TEXT        NOT NULL UNIQUE,
  applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ─── Contacts ─────────────────────────────────────────────────────────────────
-- Stores form submissions when a "Get in Touch" form is added to the site.
CREATE TABLE IF NOT EXISTS contacts (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name         TEXT        NOT NULL,
  email        TEXT        NOT NULL,
  phone        TEXT,
  message      TEXT        NOT NULL,
  service_type TEXT        CHECK (service_type IN ('discovery_call', 'therapy_session', 'general')),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index for lookups by email (admin queries)
CREATE INDEX IF NOT EXISTS contacts_email_idx ON contacts (email);

-- ─── Newsletter Subscribers ───────────────────────────────────────────────────
-- Stores email sign-ups if a newsletter opt-in is added to the site.
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id              UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  email           TEXT        NOT NULL UNIQUE,
  subscribed_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ             -- NULL = active subscriber
);

-- Index for active subscriber queries
CREATE INDEX IF NOT EXISTS newsletter_active_idx
  ON newsletter_subscribers (email)
  WHERE unsubscribed_at IS NULL;

-- ─── Row-Level Security (Supabase) ────────────────────────────────────────────
-- Enable RLS so the anon key can only INSERT (submit), never SELECT.
ALTER TABLE contacts               ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow anon (frontend) to insert only
CREATE POLICY "anon_insert_contacts"
  ON contacts FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "anon_insert_newsletter"
  ON newsletter_subscribers FOR INSERT
  TO anon
  WITH CHECK (true);

-- Service role (backend/admin) gets full access via default Supabase grants
