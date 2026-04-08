-- =====================================================
-- Migration 004: Exchange Rates (BCV)
-- Stores daily BCV exchange rates for automatic
-- USD → Bs conversion
-- =====================================================

-- Create exchange_rates table
CREATE TABLE IF NOT EXISTS exchange_rates (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  source TEXT NOT NULL DEFAULT 'bcv',           -- 'bcv', 'paralelo', etc.
  rate DECIMAL(12, 4) NOT NULL,                 -- e.g., 396.3674
  currency_pair TEXT NOT NULL DEFAULT 'USD/VES', -- pair identifier
  fetched_at TIMESTAMPTZ NOT NULL DEFAULT now(), -- when the rate was fetched from API
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index for fast lookups of latest rate
CREATE INDEX idx_exchange_rates_source_fetched
  ON exchange_rates (source, fetched_at DESC);

-- Enable RLS
ALTER TABLE exchange_rates ENABLE ROW LEVEL SECURITY;

-- Everyone can read exchange rates (public data)
CREATE POLICY "Exchange rates are public" ON exchange_rates
  FOR SELECT USING (true);

-- Only service role (cron job) can insert
-- No INSERT policy needed for anon — the cron job uses the service role key

-- Insert a default rate so the site works immediately
INSERT INTO exchange_rates (source, rate, currency_pair, fetched_at)
VALUES ('bcv', 396.3674, 'USD/VES', now());
