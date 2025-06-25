# Ingestion Service

Fetches posts from Instagram, processes them, and updates Supabase. Handles OpenAI name extraction.

## Endpoints

- `GET /health` — Health check
- (TODO) `POST /ingest` — Trigger ingestion from Instagram

## Setup

- Requires Supabase, Instagram, and OpenAI environment variables in `../.env`
- Run with `npm start` or via Docker
