#!/bin/sh
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL
# must quote extension names or else symbolic error will be thrown.
  create extension if not exists "unaccent";
  select * FROM pg_extension;
EOSQL