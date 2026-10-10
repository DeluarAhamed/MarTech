-- Immutable store for every public form submission (docs/redesign/08 §4.2).
-- Written only by the server route using the service-role key. RLS is enabled with NO policies,
-- so the anon and authenticated roles cannot read or write it. Dashboard access arrives with
-- role-based policies in the admin phase.

create extension if not exists pgcrypto;

create table if not exists public.form_submissions (
  id              uuid primary key default gen_random_uuid(),
  form_type       text not null check (form_type in ('project', 'tour')),
  payload         jsonb not null,
  attribution     jsonb,
  score           integer,
  band            text check (band in ('priority', 'qualified', 'nurture')),
  score_breakdown jsonb,
  rubric_version  text,
  page_url        text not null default '',
  user_agent      text not null default '',
  ip_hash         text not null,
  received_at     timestamptz not null default now()
);

create index if not exists form_submissions_received_at_idx on public.form_submissions (received_at desc);
create index if not exists form_submissions_band_idx on public.form_submissions (band);

alter table public.form_submissions enable row level security;

-- Belt-and-braces: even if a policy is added later, client roles can never rewrite submissions.
revoke update, delete on public.form_submissions from anon, authenticated;
