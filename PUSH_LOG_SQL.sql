create table if not exists push_logs (
  id uuid default gen_random_uuid() primary key,
  title text,
  body text,
  sent int,
  created_at timestamp default now()
);
