--
-- PostgreSQL database dump
--

\restrict nS9kzPiGT0xSyv40VlA0iR8IvF1QKzn0jfkj4MCAZfe1VZUc8iX2ERHSmUnKcsc

-- Dumped from database version 17.6
-- Dumped by pg_dump version 17.10

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP EVENT TRIGGER IF EXISTS pgrst_drop_watch;
DROP EVENT TRIGGER IF EXISTS pgrst_ddl_watch;
DROP EVENT TRIGGER IF EXISTS issue_pg_net_access;
DROP EVENT TRIGGER IF EXISTS issue_pg_graphql_access;
DROP EVENT TRIGGER IF EXISTS issue_pg_cron_access;
DROP EVENT TRIGGER IF EXISTS issue_graphql_placeholder;
DROP PUBLICATION IF EXISTS supabase_realtime;
DROP POLICY IF EXISTS "Public can view games" ON public.games;
DROP POLICY IF EXISTS "Parents can view their own profile" ON public.parents;
DROP POLICY IF EXISTS "Parents can view their own child profiles" ON public.children;
DROP POLICY IF EXISTS "Parents can update their own child profiles" ON public.children;
DROP POLICY IF EXISTS "Parents can update their children assessments" ON public.assessments;
DROP POLICY IF EXISTS "Parents can update assessments" ON public.assessments;
DROP POLICY IF EXISTS "Parents can select assessments" ON public.assessments;
DROP POLICY IF EXISTS "Parents can read their children assessments" ON public.assessments;
DROP POLICY IF EXISTS "Parents can read survey responses for their children" ON public.survey_responses;
DROP POLICY IF EXISTS "Parents can insert survey responses for their children" ON public.survey_responses;
DROP POLICY IF EXISTS "Parents can insert survey responses" ON public.survey_responses;
DROP POLICY IF EXISTS "Parents can insert assessments for their children" ON public.assessments;
DROP POLICY IF EXISTS "Parents can insert assessments" ON public.assessments;
DROP POLICY IF EXISTS "Parents can delete their own child profiles" ON public.children;
DROP POLICY IF EXISTS "Parents can create their own profile" ON public.parents;
DROP POLICY IF EXISTS "Parents can create their own child profiles" ON public.children;
DROP POLICY IF EXISTS "Logged in parents can read survey questions" ON public.survey_questions;
DROP POLICY IF EXISTS "Anyone can insert scores" ON public.game_scores;
DROP POLICY IF EXISTS "Allow public read on survey_questions" ON public.survey_questions;
DROP POLICY IF EXISTS "Allow parents to view own child game scores" ON public.game_scores;
DROP POLICY IF EXISTS "Allow parents to insert own child game scores" ON public.game_scores;
DROP POLICY IF EXISTS "Allow insert survey_questions" ON public.survey_questions;
DROP POLICY IF EXISTS "Allow authenticated insert" ON public.survey_responses;
DROP POLICY IF EXISTS "Allow authenticated insert" ON public.assessments;
DROP POLICY IF EXISTS "Allow all select survey_responses" ON public.survey_responses;
DROP POLICY IF EXISTS "Allow all select assessments" ON public.assessments;
DROP POLICY IF EXISTS "Allow all insert survey_responses" ON public.survey_responses;
DROP POLICY IF EXISTS "Allow all insert assessments" ON public.assessments;
ALTER TABLE IF EXISTS ONLY storage.vector_indexes DROP CONSTRAINT IF EXISTS vector_indexes_bucket_id_fkey;
ALTER TABLE IF EXISTS ONLY storage.s3_multipart_uploads_parts DROP CONSTRAINT IF EXISTS s3_multipart_uploads_parts_upload_id_fkey;
ALTER TABLE IF EXISTS ONLY storage.s3_multipart_uploads_parts DROP CONSTRAINT IF EXISTS s3_multipart_uploads_parts_bucket_id_fkey;
ALTER TABLE IF EXISTS ONLY storage.s3_multipart_uploads DROP CONSTRAINT IF EXISTS s3_multipart_uploads_bucket_id_fkey;
ALTER TABLE IF EXISTS ONLY storage.objects DROP CONSTRAINT IF EXISTS "objects_bucketId_fkey";
ALTER TABLE IF EXISTS ONLY public.survey_responses DROP CONSTRAINT IF EXISTS survey_responses_question_id_fkey;
ALTER TABLE IF EXISTS ONLY public.survey_responses DROP CONSTRAINT IF EXISTS survey_responses_child_id_fkey;
ALTER TABLE IF EXISTS ONLY public.survey_responses DROP CONSTRAINT IF EXISTS survey_responses_assessment_id_fkey;
ALTER TABLE IF EXISTS ONLY public.game_scores DROP CONSTRAINT IF EXISTS game_scores_game_id_fkey;
ALTER TABLE IF EXISTS ONLY public.game_scores DROP CONSTRAINT IF EXISTS game_scores_child_id_fkey;
ALTER TABLE IF EXISTS ONLY public.children DROP CONSTRAINT IF EXISTS children_parent_id_fkey;
ALTER TABLE IF EXISTS ONLY public.assessments DROP CONSTRAINT IF EXISTS assessments_child_id_fkey;
ALTER TABLE IF EXISTS ONLY auth.webauthn_credentials DROP CONSTRAINT IF EXISTS webauthn_credentials_user_id_fkey;
ALTER TABLE IF EXISTS ONLY auth.webauthn_challenges DROP CONSTRAINT IF EXISTS webauthn_challenges_user_id_fkey;
ALTER TABLE IF EXISTS ONLY auth.sso_domains DROP CONSTRAINT IF EXISTS sso_domains_sso_provider_id_fkey;
ALTER TABLE IF EXISTS ONLY auth.sessions DROP CONSTRAINT IF EXISTS sessions_user_id_fkey;
ALTER TABLE IF EXISTS ONLY auth.sessions DROP CONSTRAINT IF EXISTS sessions_oauth_client_id_fkey;
ALTER TABLE IF EXISTS ONLY auth.saml_relay_states DROP CONSTRAINT IF EXISTS saml_relay_states_sso_provider_id_fkey;
ALTER TABLE IF EXISTS ONLY auth.saml_relay_states DROP CONSTRAINT IF EXISTS saml_relay_states_flow_state_id_fkey;
ALTER TABLE IF EXISTS ONLY auth.saml_providers DROP CONSTRAINT IF EXISTS saml_providers_sso_provider_id_fkey;
ALTER TABLE IF EXISTS ONLY auth.refresh_tokens DROP CONSTRAINT IF EXISTS refresh_tokens_session_id_fkey;
ALTER TABLE IF EXISTS ONLY auth.one_time_tokens DROP CONSTRAINT IF EXISTS one_time_tokens_user_id_fkey;
ALTER TABLE IF EXISTS ONLY auth.oauth_consents DROP CONSTRAINT IF EXISTS oauth_consents_user_id_fkey;
ALTER TABLE IF EXISTS ONLY auth.oauth_consents DROP CONSTRAINT IF EXISTS oauth_consents_client_id_fkey;
ALTER TABLE IF EXISTS ONLY auth.oauth_authorizations DROP CONSTRAINT IF EXISTS oauth_authorizations_user_id_fkey;
ALTER TABLE IF EXISTS ONLY auth.oauth_authorizations DROP CONSTRAINT IF EXISTS oauth_authorizations_client_id_fkey;
ALTER TABLE IF EXISTS ONLY auth.mfa_factors DROP CONSTRAINT IF EXISTS mfa_factors_user_id_fkey;
ALTER TABLE IF EXISTS ONLY auth.mfa_challenges DROP CONSTRAINT IF EXISTS mfa_challenges_auth_factor_id_fkey;
ALTER TABLE IF EXISTS ONLY auth.mfa_amr_claims DROP CONSTRAINT IF EXISTS mfa_amr_claims_session_id_fkey;
ALTER TABLE IF EXISTS ONLY auth.identities DROP CONSTRAINT IF EXISTS identities_user_id_fkey;
DROP TRIGGER IF EXISTS update_objects_updated_at ON storage.objects;
DROP TRIGGER IF EXISTS protect_objects_delete ON storage.objects;
DROP TRIGGER IF EXISTS protect_buckets_delete ON storage.buckets;
DROP TRIGGER IF EXISTS enforce_bucket_name_length_trigger ON storage.buckets;
DROP TRIGGER IF EXISTS tr_check_filters ON realtime.subscription;
DROP INDEX IF EXISTS storage.vector_indexes_name_bucket_id_idx;
DROP INDEX IF EXISTS storage.name_prefix_search;
DROP INDEX IF EXISTS storage.idx_objects_bucket_id_name_lower;
DROP INDEX IF EXISTS storage.idx_objects_bucket_id_name;
DROP INDEX IF EXISTS storage.idx_multipart_uploads_list;
DROP INDEX IF EXISTS storage.buckets_analytics_unique_name_idx;
DROP INDEX IF EXISTS storage.bucketid_objname;
DROP INDEX IF EXISTS storage.bname;
DROP INDEX IF EXISTS realtime.subscription_subscription_id_entity_filters_action_filter_selec;
DROP INDEX IF EXISTS realtime.messages_inserted_at_topic_index;
DROP INDEX IF EXISTS realtime.ix_realtime_subscription_entity;
DROP INDEX IF EXISTS auth.webauthn_credentials_user_id_idx;
DROP INDEX IF EXISTS auth.webauthn_credentials_credential_id_key;
DROP INDEX IF EXISTS auth.webauthn_challenges_user_id_idx;
DROP INDEX IF EXISTS auth.webauthn_challenges_expires_at_idx;
DROP INDEX IF EXISTS auth.users_is_anonymous_idx;
DROP INDEX IF EXISTS auth.users_instance_id_idx;
DROP INDEX IF EXISTS auth.users_instance_id_email_idx;
DROP INDEX IF EXISTS auth.users_email_partial_key;
DROP INDEX IF EXISTS auth.user_id_created_at_idx;
DROP INDEX IF EXISTS auth.unique_phone_factor_per_user;
DROP INDEX IF EXISTS auth.sso_providers_resource_id_pattern_idx;
DROP INDEX IF EXISTS auth.sso_providers_resource_id_idx;
DROP INDEX IF EXISTS auth.sso_domains_sso_provider_id_idx;
DROP INDEX IF EXISTS auth.sso_domains_domain_idx;
DROP INDEX IF EXISTS auth.sessions_user_id_idx;
DROP INDEX IF EXISTS auth.sessions_oauth_client_id_idx;
DROP INDEX IF EXISTS auth.sessions_not_after_idx;
DROP INDEX IF EXISTS auth.saml_relay_states_sso_provider_id_idx;
DROP INDEX IF EXISTS auth.saml_relay_states_for_email_idx;
DROP INDEX IF EXISTS auth.saml_relay_states_created_at_idx;
DROP INDEX IF EXISTS auth.saml_providers_sso_provider_id_idx;
DROP INDEX IF EXISTS auth.refresh_tokens_updated_at_idx;
DROP INDEX IF EXISTS auth.refresh_tokens_session_id_revoked_idx;
DROP INDEX IF EXISTS auth.refresh_tokens_parent_idx;
DROP INDEX IF EXISTS auth.refresh_tokens_instance_id_user_id_idx;
DROP INDEX IF EXISTS auth.refresh_tokens_instance_id_idx;
DROP INDEX IF EXISTS auth.recovery_token_idx;
DROP INDEX IF EXISTS auth.reauthentication_token_idx;
DROP INDEX IF EXISTS auth.one_time_tokens_user_id_token_type_key;
DROP INDEX IF EXISTS auth.one_time_tokens_token_hash_hash_idx;
DROP INDEX IF EXISTS auth.one_time_tokens_relates_to_hash_idx;
DROP INDEX IF EXISTS auth.oauth_consents_user_order_idx;
DROP INDEX IF EXISTS auth.oauth_consents_active_user_client_idx;
DROP INDEX IF EXISTS auth.oauth_consents_active_client_idx;
DROP INDEX IF EXISTS auth.oauth_clients_deleted_at_idx;
DROP INDEX IF EXISTS auth.oauth_auth_pending_exp_idx;
DROP INDEX IF EXISTS auth.mfa_factors_user_id_idx;
DROP INDEX IF EXISTS auth.mfa_factors_user_friendly_name_unique;
DROP INDEX IF EXISTS auth.mfa_challenge_created_at_idx;
DROP INDEX IF EXISTS auth.idx_users_name;
DROP INDEX IF EXISTS auth.idx_users_last_sign_in_at_desc;
DROP INDEX IF EXISTS auth.idx_users_email;
DROP INDEX IF EXISTS auth.idx_users_created_at_desc;
DROP INDEX IF EXISTS auth.idx_user_id_auth_method;
DROP INDEX IF EXISTS auth.idx_oauth_client_states_created_at;
DROP INDEX IF EXISTS auth.idx_auth_code;
DROP INDEX IF EXISTS auth.identities_user_id_idx;
DROP INDEX IF EXISTS auth.identities_email_idx;
DROP INDEX IF EXISTS auth.flow_state_created_at_idx;
DROP INDEX IF EXISTS auth.factor_id_created_at_idx;
DROP INDEX IF EXISTS auth.email_change_token_new_idx;
DROP INDEX IF EXISTS auth.email_change_token_current_idx;
DROP INDEX IF EXISTS auth.custom_oauth_providers_provider_type_idx;
DROP INDEX IF EXISTS auth.custom_oauth_providers_identifier_idx;
DROP INDEX IF EXISTS auth.custom_oauth_providers_enabled_idx;
DROP INDEX IF EXISTS auth.custom_oauth_providers_created_at_idx;
DROP INDEX IF EXISTS auth.confirmation_token_idx;
DROP INDEX IF EXISTS auth.audit_logs_instance_id_idx;
ALTER TABLE IF EXISTS ONLY storage.vector_indexes DROP CONSTRAINT IF EXISTS vector_indexes_pkey;
ALTER TABLE IF EXISTS ONLY storage.s3_multipart_uploads DROP CONSTRAINT IF EXISTS s3_multipart_uploads_pkey;
ALTER TABLE IF EXISTS ONLY storage.s3_multipart_uploads_parts DROP CONSTRAINT IF EXISTS s3_multipart_uploads_parts_pkey;
ALTER TABLE IF EXISTS ONLY storage.objects DROP CONSTRAINT IF EXISTS objects_pkey;
ALTER TABLE IF EXISTS ONLY storage.migrations DROP CONSTRAINT IF EXISTS migrations_pkey;
ALTER TABLE IF EXISTS ONLY storage.migrations DROP CONSTRAINT IF EXISTS migrations_name_key;
ALTER TABLE IF EXISTS ONLY storage.buckets_vectors DROP CONSTRAINT IF EXISTS buckets_vectors_pkey;
ALTER TABLE IF EXISTS ONLY storage.buckets DROP CONSTRAINT IF EXISTS buckets_pkey;
ALTER TABLE IF EXISTS ONLY storage.buckets_analytics DROP CONSTRAINT IF EXISTS buckets_analytics_pkey;
ALTER TABLE IF EXISTS ONLY realtime.schema_migrations DROP CONSTRAINT IF EXISTS schema_migrations_pkey;
ALTER TABLE IF EXISTS ONLY realtime.subscription DROP CONSTRAINT IF EXISTS pk_subscription;
ALTER TABLE IF EXISTS ONLY realtime.messages DROP CONSTRAINT IF EXISTS messages_pkey;
ALTER TABLE IF EXISTS realtime.messages DROP CONSTRAINT IF EXISTS messages_payload_exclusive;
ALTER TABLE IF EXISTS ONLY public.survey_responses DROP CONSTRAINT IF EXISTS survey_responses_pkey;
ALTER TABLE IF EXISTS ONLY public.survey_questions DROP CONSTRAINT IF EXISTS survey_questions_pkey;
ALTER TABLE IF EXISTS ONLY public.parents DROP CONSTRAINT IF EXISTS parents_pkey;
ALTER TABLE IF EXISTS ONLY public.parents DROP CONSTRAINT IF EXISTS parents_email_key;
ALTER TABLE IF EXISTS ONLY public.games DROP CONSTRAINT IF EXISTS games_pkey;
ALTER TABLE IF EXISTS ONLY public.game_scores DROP CONSTRAINT IF EXISTS game_scores_pkey;
ALTER TABLE IF EXISTS ONLY public.children DROP CONSTRAINT IF EXISTS children_pkey;
ALTER TABLE IF EXISTS ONLY public.assessments DROP CONSTRAINT IF EXISTS assessments_pkey;
ALTER TABLE IF EXISTS ONLY auth.webauthn_credentials DROP CONSTRAINT IF EXISTS webauthn_credentials_pkey;
ALTER TABLE IF EXISTS ONLY auth.webauthn_challenges DROP CONSTRAINT IF EXISTS webauthn_challenges_pkey;
ALTER TABLE IF EXISTS ONLY auth.users DROP CONSTRAINT IF EXISTS users_pkey;
ALTER TABLE IF EXISTS ONLY auth.users DROP CONSTRAINT IF EXISTS users_phone_key;
ALTER TABLE IF EXISTS ONLY auth.sso_providers DROP CONSTRAINT IF EXISTS sso_providers_pkey;
ALTER TABLE IF EXISTS ONLY auth.sso_domains DROP CONSTRAINT IF EXISTS sso_domains_pkey;
ALTER TABLE IF EXISTS ONLY auth.sessions DROP CONSTRAINT IF EXISTS sessions_pkey;
ALTER TABLE IF EXISTS ONLY auth.schema_migrations DROP CONSTRAINT IF EXISTS schema_migrations_pkey;
ALTER TABLE IF EXISTS ONLY auth.saml_relay_states DROP CONSTRAINT IF EXISTS saml_relay_states_pkey;
ALTER TABLE IF EXISTS ONLY auth.saml_providers DROP CONSTRAINT IF EXISTS saml_providers_pkey;
ALTER TABLE IF EXISTS ONLY auth.saml_providers DROP CONSTRAINT IF EXISTS saml_providers_entity_id_key;
ALTER TABLE IF EXISTS ONLY auth.refresh_tokens DROP CONSTRAINT IF EXISTS refresh_tokens_token_unique;
ALTER TABLE IF EXISTS ONLY auth.refresh_tokens DROP CONSTRAINT IF EXISTS refresh_tokens_pkey;
ALTER TABLE IF EXISTS ONLY auth.one_time_tokens DROP CONSTRAINT IF EXISTS one_time_tokens_pkey;
ALTER TABLE IF EXISTS ONLY auth.oauth_consents DROP CONSTRAINT IF EXISTS oauth_consents_user_client_unique;
ALTER TABLE IF EXISTS ONLY auth.oauth_consents DROP CONSTRAINT IF EXISTS oauth_consents_pkey;
ALTER TABLE IF EXISTS ONLY auth.oauth_clients DROP CONSTRAINT IF EXISTS oauth_clients_pkey;
ALTER TABLE IF EXISTS ONLY auth.oauth_client_states DROP CONSTRAINT IF EXISTS oauth_client_states_pkey;
ALTER TABLE IF EXISTS ONLY auth.oauth_authorizations DROP CONSTRAINT IF EXISTS oauth_authorizations_pkey;
ALTER TABLE IF EXISTS ONLY auth.oauth_authorizations DROP CONSTRAINT IF EXISTS oauth_authorizations_authorization_id_key;
ALTER TABLE IF EXISTS ONLY auth.oauth_authorizations DROP CONSTRAINT IF EXISTS oauth_authorizations_authorization_code_key;
ALTER TABLE IF EXISTS ONLY auth.mfa_factors DROP CONSTRAINT IF EXISTS mfa_factors_pkey;
ALTER TABLE IF EXISTS ONLY auth.mfa_factors DROP CONSTRAINT IF EXISTS mfa_factors_last_challenged_at_key;
ALTER TABLE IF EXISTS ONLY auth.mfa_challenges DROP CONSTRAINT IF EXISTS mfa_challenges_pkey;
ALTER TABLE IF EXISTS ONLY auth.mfa_amr_claims DROP CONSTRAINT IF EXISTS mfa_amr_claims_session_id_authentication_method_pkey;
ALTER TABLE IF EXISTS ONLY auth.instances DROP CONSTRAINT IF EXISTS instances_pkey;
ALTER TABLE IF EXISTS ONLY auth.identities DROP CONSTRAINT IF EXISTS identities_provider_id_provider_unique;
ALTER TABLE IF EXISTS ONLY auth.identities DROP CONSTRAINT IF EXISTS identities_pkey;
ALTER TABLE IF EXISTS ONLY auth.flow_state DROP CONSTRAINT IF EXISTS flow_state_pkey;
ALTER TABLE IF EXISTS ONLY auth.custom_oauth_providers DROP CONSTRAINT IF EXISTS custom_oauth_providers_pkey;
ALTER TABLE IF EXISTS ONLY auth.custom_oauth_providers DROP CONSTRAINT IF EXISTS custom_oauth_providers_identifier_key;
ALTER TABLE IF EXISTS ONLY auth.audit_log_entries DROP CONSTRAINT IF EXISTS audit_log_entries_pkey;
ALTER TABLE IF EXISTS ONLY auth.mfa_amr_claims DROP CONSTRAINT IF EXISTS amr_id_pk;
ALTER TABLE IF EXISTS auth.refresh_tokens ALTER COLUMN id DROP DEFAULT;
DROP TABLE IF EXISTS storage.vector_indexes;
DROP TABLE IF EXISTS storage.s3_multipart_uploads_parts;
DROP TABLE IF EXISTS storage.s3_multipart_uploads;
DROP TABLE IF EXISTS storage.objects;
DROP TABLE IF EXISTS storage.migrations;
DROP TABLE IF EXISTS storage.buckets_vectors;
DROP TABLE IF EXISTS storage.buckets_analytics;
DROP TABLE IF EXISTS storage.buckets;
DROP TABLE IF EXISTS realtime.subscription;
DROP TABLE IF EXISTS realtime.schema_migrations;
DROP TABLE IF EXISTS realtime.messages;
DROP TABLE IF EXISTS public.survey_responses;
DROP TABLE IF EXISTS public.survey_questions;
DROP TABLE IF EXISTS public.parents;
DROP TABLE IF EXISTS public.games;
DROP TABLE IF EXISTS public.game_scores;
DROP TABLE IF EXISTS public.children;
DROP TABLE IF EXISTS public.assessments;
DROP TABLE IF EXISTS auth.webauthn_credentials;
DROP TABLE IF EXISTS auth.webauthn_challenges;
DROP TABLE IF EXISTS auth.users;
DROP TABLE IF EXISTS auth.sso_providers;
DROP TABLE IF EXISTS auth.sso_domains;
DROP TABLE IF EXISTS auth.sessions;
DROP TABLE IF EXISTS auth.schema_migrations;
DROP TABLE IF EXISTS auth.saml_relay_states;
DROP TABLE IF EXISTS auth.saml_providers;
DROP SEQUENCE IF EXISTS auth.refresh_tokens_id_seq;
DROP TABLE IF EXISTS auth.refresh_tokens;
DROP TABLE IF EXISTS auth.one_time_tokens;
DROP TABLE IF EXISTS auth.oauth_consents;
DROP TABLE IF EXISTS auth.oauth_clients;
DROP TABLE IF EXISTS auth.oauth_client_states;
DROP TABLE IF EXISTS auth.oauth_authorizations;
DROP TABLE IF EXISTS auth.mfa_factors;
DROP TABLE IF EXISTS auth.mfa_challenges;
DROP TABLE IF EXISTS auth.mfa_amr_claims;
DROP TABLE IF EXISTS auth.instances;
DROP TABLE IF EXISTS auth.identities;
DROP TABLE IF EXISTS auth.flow_state;
DROP TABLE IF EXISTS auth.custom_oauth_providers;
DROP TABLE IF EXISTS auth.audit_log_entries;
DROP FUNCTION IF EXISTS storage.update_updated_at_column();
DROP FUNCTION IF EXISTS storage.search_v2(prefix text, bucket_name text, limits integer, levels integer, start_after text, sort_order text, sort_column text, sort_column_after text);
DROP FUNCTION IF EXISTS storage.search_by_timestamp(p_prefix text, p_bucket_id text, p_limit integer, p_level integer, p_start_after text, p_sort_order text, p_sort_column text, p_sort_column_after text);
DROP FUNCTION IF EXISTS storage.search(prefix text, bucketname text, limits integer, levels integer, offsets integer, search text, sortcolumn text, sortorder text);
DROP FUNCTION IF EXISTS storage.protect_delete();
DROP FUNCTION IF EXISTS storage.operation();
DROP FUNCTION IF EXISTS storage.list_objects_with_delimiter(_bucket_id text, prefix_param text, delimiter_param text, max_keys integer, start_after text, next_token text, sort_order text);
DROP FUNCTION IF EXISTS storage.list_multipart_uploads_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer, next_key_token text, next_upload_token text);
DROP FUNCTION IF EXISTS storage.get_size_by_bucket();
DROP FUNCTION IF EXISTS storage.get_common_prefix(p_key text, p_prefix text, p_delimiter text);
DROP FUNCTION IF EXISTS storage.foldername(name text);
DROP FUNCTION IF EXISTS storage.filename(name text);
DROP FUNCTION IF EXISTS storage.extension(name text);
DROP FUNCTION IF EXISTS storage.enforce_bucket_name_length();
DROP FUNCTION IF EXISTS storage.can_insert_object(bucketid text, name text, owner uuid, metadata jsonb);
DROP FUNCTION IF EXISTS storage.allow_only_operation(expected_operation text);
DROP FUNCTION IF EXISTS storage.allow_any_operation(expected_operations text[]);
DROP FUNCTION IF EXISTS realtime.wal2json_escape_identifier(name text);
DROP FUNCTION IF EXISTS realtime.topic();
DROP FUNCTION IF EXISTS realtime.to_regrole(role_name text);
DROP FUNCTION IF EXISTS realtime.subscription_check_filters();
DROP FUNCTION IF EXISTS realtime.send_binary(payload bytea, event text, topic text, private boolean);
DROP FUNCTION IF EXISTS realtime.send(payload jsonb, event text, topic text, private boolean);
DROP FUNCTION IF EXISTS realtime.quote_wal2json(entity regclass);
DROP FUNCTION IF EXISTS realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer);
DROP FUNCTION IF EXISTS realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]);
DROP FUNCTION IF EXISTS realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text, negate boolean);
DROP FUNCTION IF EXISTS realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text);
DROP FUNCTION IF EXISTS realtime."cast"(val text, type_ regtype);
DROP FUNCTION IF EXISTS realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]);
DROP FUNCTION IF EXISTS realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text);
DROP FUNCTION IF EXISTS realtime.apply_rls(wal jsonb, max_record_bytes integer);
DROP FUNCTION IF EXISTS pgbouncer.get_auth(p_usename text);
DROP FUNCTION IF EXISTS graphql_public.graphql("operationName" text, query text, variables jsonb, extensions jsonb);
DROP FUNCTION IF EXISTS extensions.set_graphql_placeholder();
DROP FUNCTION IF EXISTS extensions.pgrst_drop_watch();
DROP FUNCTION IF EXISTS extensions.pgrst_ddl_watch();
DROP FUNCTION IF EXISTS extensions.grant_pg_net_access();
DROP FUNCTION IF EXISTS extensions.grant_pg_graphql_access();
DROP FUNCTION IF EXISTS extensions.grant_pg_cron_access();
DROP FUNCTION IF EXISTS auth.uid();
DROP FUNCTION IF EXISTS auth.role();
DROP FUNCTION IF EXISTS auth.jwt();
DROP FUNCTION IF EXISTS auth.email();
DROP TYPE IF EXISTS storage.buckettype;
DROP TYPE IF EXISTS realtime.wal_rls;
DROP TYPE IF EXISTS realtime.wal_column;
DROP TYPE IF EXISTS realtime.user_defined_filter;
DROP TYPE IF EXISTS realtime.equality_op;
DROP TYPE IF EXISTS realtime.action;
DROP TYPE IF EXISTS auth.one_time_token_type;
DROP TYPE IF EXISTS auth.oauth_response_type;
DROP TYPE IF EXISTS auth.oauth_registration_type;
DROP TYPE IF EXISTS auth.oauth_client_type;
DROP TYPE IF EXISTS auth.oauth_authorization_status;
DROP TYPE IF EXISTS auth.factor_type;
DROP TYPE IF EXISTS auth.factor_status;
DROP TYPE IF EXISTS auth.code_challenge_method;
DROP TYPE IF EXISTS auth.aal_level;
DROP EXTENSION IF EXISTS "uuid-ossp";
DROP EXTENSION IF EXISTS supabase_vault;
DROP EXTENSION IF EXISTS pgcrypto;
DROP EXTENSION IF EXISTS pg_stat_statements;
DROP SCHEMA IF EXISTS vault;
DROP SCHEMA IF EXISTS storage;
DROP SCHEMA IF EXISTS realtime;
DROP SCHEMA IF EXISTS pgbouncer;
DROP SCHEMA IF EXISTS graphql_public;
DROP SCHEMA IF EXISTS graphql;
DROP SCHEMA IF EXISTS extensions;
DROP SCHEMA IF EXISTS auth;
--
-- Name: auth; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA auth;


--
-- Name: extensions; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA extensions;


--
-- Name: graphql; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA graphql;


--
-- Name: graphql_public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA graphql_public;


--
-- Name: pgbouncer; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA pgbouncer;


--
-- Name: realtime; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA realtime;


--
-- Name: storage; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA storage;


--
-- Name: vault; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA vault;


--
-- Name: pg_stat_statements; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_stat_statements WITH SCHEMA extensions;


--
-- Name: EXTENSION pg_stat_statements; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION pg_stat_statements IS 'track planning and execution statistics of all SQL statements executed';


--
-- Name: pgcrypto; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA extensions;


--
-- Name: EXTENSION pgcrypto; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION pgcrypto IS 'cryptographic functions';


--
-- Name: supabase_vault; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS supabase_vault WITH SCHEMA vault;


--
-- Name: EXTENSION supabase_vault; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION supabase_vault IS 'Supabase Vault Extension';


--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA extensions;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: aal_level; Type: TYPE; Schema: auth; Owner: -
--

CREATE TYPE auth.aal_level AS ENUM (
    'aal1',
    'aal2',
    'aal3'
);


--
-- Name: code_challenge_method; Type: TYPE; Schema: auth; Owner: -
--

CREATE TYPE auth.code_challenge_method AS ENUM (
    's256',
    'plain'
);


--
-- Name: factor_status; Type: TYPE; Schema: auth; Owner: -
--

CREATE TYPE auth.factor_status AS ENUM (
    'unverified',
    'verified'
);


--
-- Name: factor_type; Type: TYPE; Schema: auth; Owner: -
--

CREATE TYPE auth.factor_type AS ENUM (
    'totp',
    'webauthn',
    'phone'
);


--
-- Name: oauth_authorization_status; Type: TYPE; Schema: auth; Owner: -
--

CREATE TYPE auth.oauth_authorization_status AS ENUM (
    'pending',
    'approved',
    'denied',
    'expired'
);


--
-- Name: oauth_client_type; Type: TYPE; Schema: auth; Owner: -
--

CREATE TYPE auth.oauth_client_type AS ENUM (
    'public',
    'confidential'
);


--
-- Name: oauth_registration_type; Type: TYPE; Schema: auth; Owner: -
--

CREATE TYPE auth.oauth_registration_type AS ENUM (
    'dynamic',
    'manual'
);


--
-- Name: oauth_response_type; Type: TYPE; Schema: auth; Owner: -
--

CREATE TYPE auth.oauth_response_type AS ENUM (
    'code'
);


--
-- Name: one_time_token_type; Type: TYPE; Schema: auth; Owner: -
--

CREATE TYPE auth.one_time_token_type AS ENUM (
    'confirmation_token',
    'reauthentication_token',
    'recovery_token',
    'email_change_token_new',
    'email_change_token_current',
    'phone_change_token'
);


--
-- Name: action; Type: TYPE; Schema: realtime; Owner: -
--

CREATE TYPE realtime.action AS ENUM (
    'INSERT',
    'UPDATE',
    'DELETE',
    'TRUNCATE',
    'ERROR'
);


--
-- Name: equality_op; Type: TYPE; Schema: realtime; Owner: -
--

CREATE TYPE realtime.equality_op AS ENUM (
    'eq',
    'neq',
    'lt',
    'lte',
    'gt',
    'gte',
    'in',
    'like',
    'ilike',
    'is',
    'match',
    'imatch',
    'isdistinct'
);


--
-- Name: user_defined_filter; Type: TYPE; Schema: realtime; Owner: -
--

CREATE TYPE realtime.user_defined_filter AS (
	column_name text,
	op realtime.equality_op,
	value text,
	negate boolean
);


--
-- Name: wal_column; Type: TYPE; Schema: realtime; Owner: -
--

CREATE TYPE realtime.wal_column AS (
	name text,
	type_name text,
	type_oid oid,
	value jsonb,
	is_pkey boolean,
	is_selectable boolean
);


--
-- Name: wal_rls; Type: TYPE; Schema: realtime; Owner: -
--

CREATE TYPE realtime.wal_rls AS (
	wal jsonb,
	is_rls_enabled boolean,
	subscription_ids uuid[],
	errors text[]
);


--
-- Name: buckettype; Type: TYPE; Schema: storage; Owner: -
--

CREATE TYPE storage.buckettype AS ENUM (
    'STANDARD',
    'ANALYTICS',
    'VECTOR'
);


--
-- Name: email(); Type: FUNCTION; Schema: auth; Owner: -
--

CREATE FUNCTION auth.email() RETURNS text
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.email', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'email')
  )::text
$$;


--
-- Name: FUNCTION email(); Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON FUNCTION auth.email() IS 'Deprecated. Use auth.jwt() -> ''email'' instead.';


--
-- Name: jwt(); Type: FUNCTION; Schema: auth; Owner: -
--

CREATE FUNCTION auth.jwt() RETURNS jsonb
    LANGUAGE sql STABLE
    AS $$
  select 
    coalesce(
        nullif(current_setting('request.jwt.claim', true), ''),
        nullif(current_setting('request.jwt.claims', true), '')
    )::jsonb
$$;


--
-- Name: role(); Type: FUNCTION; Schema: auth; Owner: -
--

CREATE FUNCTION auth.role() RETURNS text
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.role', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'role')
  )::text
$$;


--
-- Name: FUNCTION role(); Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON FUNCTION auth.role() IS 'Deprecated. Use auth.jwt() -> ''role'' instead.';


--
-- Name: uid(); Type: FUNCTION; Schema: auth; Owner: -
--

CREATE FUNCTION auth.uid() RETURNS uuid
    LANGUAGE sql STABLE
    AS $$
  select 
  coalesce(
    nullif(current_setting('request.jwt.claim.sub', true), ''),
    (nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub')
  )::uuid
$$;


--
-- Name: FUNCTION uid(); Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON FUNCTION auth.uid() IS 'Deprecated. Use auth.jwt() -> ''sub'' instead.';


--
-- Name: grant_pg_cron_access(); Type: FUNCTION; Schema: extensions; Owner: -
--

CREATE FUNCTION extensions.grant_pg_cron_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF EXISTS (
    SELECT
    FROM pg_event_trigger_ddl_commands() AS ev
    JOIN pg_extension AS ext
    ON ev.objid = ext.oid
    WHERE ext.extname = 'pg_cron'
  )
  THEN
    grant usage on schema cron to postgres with grant option;

    alter default privileges in schema cron grant all on tables to postgres with grant option;
    alter default privileges in schema cron grant all on functions to postgres with grant option;
    alter default privileges in schema cron grant all on sequences to postgres with grant option;

    alter default privileges for user supabase_admin in schema cron grant all
        on sequences to postgres with grant option;
    alter default privileges for user supabase_admin in schema cron grant all
        on tables to postgres with grant option;
    alter default privileges for user supabase_admin in schema cron grant all
        on functions to postgres with grant option;

    grant all privileges on all tables in schema cron to postgres with grant option;
    revoke all on table cron.job from postgres;
    grant select on table cron.job to postgres with grant option;
  END IF;
END;
$$;


--
-- Name: FUNCTION grant_pg_cron_access(); Type: COMMENT; Schema: extensions; Owner: -
--

COMMENT ON FUNCTION extensions.grant_pg_cron_access() IS 'Grants access to pg_cron';


--
-- Name: grant_pg_graphql_access(); Type: FUNCTION; Schema: extensions; Owner: -
--

CREATE FUNCTION extensions.grant_pg_graphql_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $_$
begin
    if not exists (
        select 1
        from pg_event_trigger_ddl_commands() ev
        join pg_catalog.pg_extension e on ev.objid = e.oid
        where e.extname = 'pg_graphql'
    ) then
        return;
    end if;

    drop function if exists graphql_public.graphql;
    create or replace function graphql_public.graphql(
        "operationName" text default null,
        query text default null,
        variables jsonb default null,
        extensions jsonb default null
    )
        returns jsonb
        language sql
    as $$
        select graphql.resolve(
            query := query,
            variables := coalesce(variables, '{}'),
            "operationName" := "operationName",
            extensions := extensions
        );
    $$;

    -- Attach the wrapper to the extension so DROP EXTENSION cascades to it,
    -- which in turn triggers set_graphql_placeholder to reinstall the "not enabled" stub.
    alter extension pg_graphql add function graphql_public.graphql(text, text, jsonb, jsonb);

    grant usage on schema graphql to postgres, anon, authenticated, service_role;
    grant execute on function graphql.resolve to postgres, anon, authenticated, service_role;
    grant usage on schema graphql to postgres with grant option;
    grant usage on schema graphql_public to postgres with grant option;
end;
$_$;


--
-- Name: FUNCTION grant_pg_graphql_access(); Type: COMMENT; Schema: extensions; Owner: -
--

COMMENT ON FUNCTION extensions.grant_pg_graphql_access() IS 'Grants access to pg_graphql';


--
-- Name: grant_pg_net_access(); Type: FUNCTION; Schema: extensions; Owner: -
--

CREATE FUNCTION extensions.grant_pg_net_access() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_event_trigger_ddl_commands() AS ev
    JOIN pg_extension AS ext
    ON ev.objid = ext.oid
    WHERE ext.extname = 'pg_net'
  )
  THEN
    IF NOT EXISTS (
      SELECT 1
      FROM pg_roles
      WHERE rolname = 'supabase_functions_admin'
    )
    THEN
      CREATE USER supabase_functions_admin NOINHERIT CREATEROLE LOGIN NOREPLICATION;
    END IF;

    GRANT USAGE ON SCHEMA net TO supabase_functions_admin, postgres, anon, authenticated, service_role;

    IF EXISTS (
      SELECT FROM pg_extension
      WHERE extname = 'pg_net'
      -- all versions in use on existing projects as of 2025-02-20
      -- version 0.12.0 onwards don't need these applied
      AND extversion IN ('0.2', '0.6', '0.7', '0.7.1', '0.8', '0.10.0', '0.11.0')
    ) THEN
      ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;
      ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SECURITY DEFINER;

      ALTER function net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;
      ALTER function net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) SET search_path = net;

      REVOKE ALL ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;
      REVOKE ALL ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) FROM PUBLIC;

      GRANT EXECUTE ON FUNCTION net.http_get(url text, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;
      GRANT EXECUTE ON FUNCTION net.http_post(url text, body jsonb, params jsonb, headers jsonb, timeout_milliseconds integer) TO supabase_functions_admin, postgres, anon, authenticated, service_role;
    END IF;
  END IF;
END;
$$;


--
-- Name: FUNCTION grant_pg_net_access(); Type: COMMENT; Schema: extensions; Owner: -
--

COMMENT ON FUNCTION extensions.grant_pg_net_access() IS 'Grants access to pg_net';


--
-- Name: pgrst_ddl_watch(); Type: FUNCTION; Schema: extensions; Owner: -
--

CREATE FUNCTION extensions.pgrst_ddl_watch() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  cmd record;
BEGIN
  FOR cmd IN SELECT * FROM pg_event_trigger_ddl_commands()
  LOOP
    IF cmd.command_tag IN (
      'CREATE SCHEMA', 'ALTER SCHEMA'
    , 'CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO', 'ALTER TABLE'
    , 'CREATE FOREIGN TABLE', 'ALTER FOREIGN TABLE'
    , 'CREATE VIEW', 'ALTER VIEW'
    , 'CREATE MATERIALIZED VIEW', 'ALTER MATERIALIZED VIEW'
    , 'CREATE FUNCTION', 'ALTER FUNCTION'
    , 'CREATE TRIGGER'
    , 'CREATE TYPE', 'ALTER TYPE'
    , 'CREATE RULE'
    , 'COMMENT'
    )
    -- don't notify in case of CREATE TEMP table or other objects created on pg_temp
    AND cmd.schema_name is distinct from 'pg_temp'
    THEN
      NOTIFY pgrst, 'reload schema';
    END IF;
  END LOOP;
END; $$;


--
-- Name: pgrst_drop_watch(); Type: FUNCTION; Schema: extensions; Owner: -
--

CREATE FUNCTION extensions.pgrst_drop_watch() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $$
DECLARE
  obj record;
BEGIN
  FOR obj IN SELECT * FROM pg_event_trigger_dropped_objects()
  LOOP
    IF obj.object_type IN (
      'schema'
    , 'table'
    , 'foreign table'
    , 'view'
    , 'materialized view'
    , 'function'
    , 'trigger'
    , 'type'
    , 'rule'
    )
    AND obj.is_temporary IS false -- no pg_temp objects
    THEN
      NOTIFY pgrst, 'reload schema';
    END IF;
  END LOOP;
END; $$;


--
-- Name: set_graphql_placeholder(); Type: FUNCTION; Schema: extensions; Owner: -
--

CREATE FUNCTION extensions.set_graphql_placeholder() RETURNS event_trigger
    LANGUAGE plpgsql
    AS $_$
    DECLARE
    graphql_is_dropped bool;
    BEGIN
    graphql_is_dropped = (
        SELECT ev.schema_name = 'graphql_public'
        FROM pg_event_trigger_dropped_objects() AS ev
        WHERE ev.schema_name = 'graphql_public'
    );

    IF graphql_is_dropped
    THEN
        create or replace function graphql_public.graphql(
            "operationName" text default null,
            query text default null,
            variables jsonb default null,
            extensions jsonb default null
        )
            returns jsonb
            language plpgsql
        as $$
            DECLARE
                server_version float;
            BEGIN
                server_version = (SELECT (SPLIT_PART((select version()), ' ', 2))::float);

                IF server_version >= 14 THEN
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql extension is not enabled.'
                            )
                        )
                    );
                ELSE
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql is only available on projects running Postgres 14 onwards.'
                            )
                        )
                    );
                END IF;
            END;
        $$;
    END IF;

    END;
$_$;


--
-- Name: FUNCTION set_graphql_placeholder(); Type: COMMENT; Schema: extensions; Owner: -
--

COMMENT ON FUNCTION extensions.set_graphql_placeholder() IS 'Reintroduces placeholder function for graphql_public.graphql';


--
-- Name: graphql(text, text, jsonb, jsonb); Type: FUNCTION; Schema: graphql_public; Owner: -
--

CREATE FUNCTION graphql_public.graphql("operationName" text DEFAULT NULL::text, query text DEFAULT NULL::text, variables jsonb DEFAULT NULL::jsonb, extensions jsonb DEFAULT NULL::jsonb) RETURNS jsonb
    LANGUAGE plpgsql
    AS $$
            DECLARE
                server_version float;
            BEGIN
                server_version = (SELECT (SPLIT_PART((select version()), ' ', 2))::float);

                IF server_version >= 14 THEN
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql extension is not enabled.'
                            )
                        )
                    );
                ELSE
                    RETURN jsonb_build_object(
                        'errors', jsonb_build_array(
                            jsonb_build_object(
                                'message', 'pg_graphql is only available on projects running Postgres 14 onwards.'
                            )
                        )
                    );
                END IF;
            END;
        $$;


--
-- Name: get_auth(text); Type: FUNCTION; Schema: pgbouncer; Owner: -
--

CREATE FUNCTION pgbouncer.get_auth(p_usename text) RETURNS TABLE(username text, password text)
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO ''
    AS $_$
  BEGIN
      RAISE DEBUG 'PgBouncer auth request: %', p_usename;

      RETURN QUERY
      SELECT
          rolname::text,
          CASE WHEN rolvaliduntil < now()
              THEN null
              ELSE rolpassword::text
          END
      FROM pg_authid
      WHERE rolname=$1 and rolcanlogin;
  END;
  $_$;


--
-- Name: apply_rls(jsonb, integer); Type: FUNCTION; Schema: realtime; Owner: -
--

CREATE FUNCTION realtime.apply_rls(wal jsonb, max_record_bytes integer DEFAULT (1024 * 1024)) RETURNS SETOF realtime.wal_rls
    LANGUAGE plpgsql
    AS $$
declare
    -- Regclass of the table e.g. public.notes
    entity_ regclass = (quote_ident(wal ->> 'schema') || '.' || quote_ident(wal ->> 'table'))::regclass;

    -- I, U, D, T: insert, update ...
    action realtime.action = (
        case wal ->> 'action'
            when 'I' then 'INSERT'
            when 'U' then 'UPDATE'
            when 'D' then 'DELETE'
            else 'ERROR'
        end
    );

    -- Is row level security enabled for the table
    is_rls_enabled bool = relrowsecurity from pg_class where oid = entity_;

    subscriptions realtime.subscription[] = array_agg(subs)
        from
            realtime.subscription subs
        where
            subs.entity = entity_
            -- Filter by action early - only get subscriptions interested in this action
            -- action_filter column can be: '*' (all), 'INSERT', 'UPDATE', or 'DELETE'
            and (subs.action_filter = '*' or subs.action_filter = action::text);

    -- Subscription vars
    working_role regrole;
    working_selected_columns text[];
    claimed_role regrole;
    claims jsonb;

    subscription_id uuid;
    subscription_has_access bool;
    visible_to_subscription_ids uuid[] = '{}';

    -- structured info for wal's columns
    columns realtime.wal_column[];
    -- previous identity values for update/delete
    old_columns realtime.wal_column[];

    error_record_exceeds_max_size boolean = octet_length(wal::text) > max_record_bytes;

    -- Primary jsonb output for record
    output jsonb;

    -- Loop record for iterating unique roles (outer loop)
    role_record record;
    -- Loop record for iterating unique selected_columns within a role (inner loop)
    cols_record record;
    -- Subscription ids visible at the role level (before fanning out by selected_columns)
    visible_role_sub_ids uuid[] = '{}';

begin
    perform set_config('role', null, true);

    columns =
        array_agg(
            (
                x->>'name',
                x->>'type',
                x->>'typeoid',
                realtime.cast(
                    (x->'value') #>> '{}',
                    coalesce(
                        (x->>'typeoid')::regtype, -- null when wal2json version <= 2.4
                        (x->>'type')::regtype
                    )
                ),
                (pks ->> 'name') is not null,
                true
            )::realtime.wal_column
        )
        from
            jsonb_array_elements(wal -> 'columns') x
            left join jsonb_array_elements(wal -> 'pk') pks
                on (x ->> 'name') = (pks ->> 'name');

    old_columns =
        array_agg(
            (
                x->>'name',
                x->>'type',
                x->>'typeoid',
                realtime.cast(
                    (x->'value') #>> '{}',
                    coalesce(
                        (x->>'typeoid')::regtype, -- null when wal2json version <= 2.4
                        (x->>'type')::regtype
                    )
                ),
                (pks ->> 'name') is not null,
                true
            )::realtime.wal_column
        )
        from
            jsonb_array_elements(wal -> 'identity') x
            left join jsonb_array_elements(wal -> 'pk') pks
                on (x ->> 'name') = (pks ->> 'name');

    for role_record in
        select claims_role
        from (select distinct claims_role from unnest(subscriptions)) t
        order by claims_role::text
    loop
        working_role := role_record.claims_role;

        -- Update `is_selectable` for columns and old_columns (once per role)
        columns =
            array_agg(
                (
                    c.name,
                    c.type_name,
                    c.type_oid,
                    c.value,
                    c.is_pkey,
                    pg_catalog.has_column_privilege(working_role, entity_, c.name, 'SELECT')
                )::realtime.wal_column
            )
            from
                unnest(columns) c;

        old_columns =
                array_agg(
                    (
                        c.name,
                        c.type_name,
                        c.type_oid,
                        c.value,
                        c.is_pkey,
                        pg_catalog.has_column_privilege(working_role, entity_, c.name, 'SELECT')
                    )::realtime.wal_column
                )
                from
                    unnest(old_columns) c;

        if action <> 'DELETE' and count(1) = 0 from unnest(columns) c where c.is_pkey then
            -- Fan out 400 error per distinct selected_columns for this role
            for cols_record in
                select selected_columns
                from (select distinct selected_columns from unnest(subscriptions) s where s.claims_role = working_role) t
                order by coalesce(array_to_string(selected_columns, ','), '')
            loop
                working_selected_columns := cols_record.selected_columns;
                return next (
                    jsonb_build_object(
                        'schema', wal ->> 'schema',
                        'table', wal ->> 'table',
                        'type', action
                    ),
                    is_rls_enabled,
                    (select array_agg(s.subscription_id) from unnest(subscriptions) as s where s.claims_role = working_role and (s.selected_columns is not distinct from working_selected_columns)),
                    array['Error 400: Bad Request, no primary key']
                )::realtime.wal_rls;
            end loop;

        -- The claims role does not have SELECT permission to the primary key of entity
        elsif action <> 'DELETE' and sum(c.is_selectable::int) <> count(1) from unnest(columns) c where c.is_pkey then
            -- Fan out 401 error per distinct selected_columns for this role
            for cols_record in
                select selected_columns
                from (select distinct selected_columns from unnest(subscriptions) s where s.claims_role = working_role) t
                order by coalesce(array_to_string(selected_columns, ','), '')
            loop
                working_selected_columns := cols_record.selected_columns;
                return next (
                    jsonb_build_object(
                        'schema', wal ->> 'schema',
                        'table', wal ->> 'table',
                        'type', action
                    ),
                    is_rls_enabled,
                    (select array_agg(s.subscription_id) from unnest(subscriptions) as s where s.claims_role = working_role and (s.selected_columns is not distinct from working_selected_columns)),
                    array['Error 401: Unauthorized']
                )::realtime.wal_rls;
            end loop;

        else
            -- Create the prepared statement (once per role)
            if is_rls_enabled and action <> 'DELETE' then
                if (select 1 from pg_prepared_statements where name = 'walrus_rls_stmt' limit 1) > 0 then
                    deallocate walrus_rls_stmt;
                end if;
                execute realtime.build_prepared_statement_sql('walrus_rls_stmt', entity_, columns);
            end if;

            -- Collect all visible subscription IDs for this role (filter check + RLS check)
            visible_role_sub_ids = '{}';

            for subscription_id, claims in (
                    select
                        subs.subscription_id,
                        subs.claims
                    from
                        unnest(subscriptions) subs
                    where
                        subs.entity = entity_
                        and subs.claims_role = working_role
                        and (
                            realtime.is_visible_through_filters(columns, subs.filters)
                            or (
                              action = 'DELETE'
                              and realtime.is_visible_through_filters(old_columns, subs.filters)
                            )
                        )
            ) loop

                if not is_rls_enabled or action = 'DELETE' then
                    visible_role_sub_ids = visible_role_sub_ids || subscription_id;
                else
                    -- Check if RLS allows the role to see the record
                    perform
                        -- Trim leading and trailing quotes from working_role because set_config
                        -- doesn't recognize the role as valid if they are included
                        set_config('role', trim(both '"' from working_role::text), true),
                        set_config('request.jwt.claims', claims::text, true);

                    execute 'execute walrus_rls_stmt' into subscription_has_access;

                    -- Reset the role on every FOR..LOOP batch execution.
                    -- The first batch of 10 rows is pre-fetched using the current connection role (PG internal behaviour)
                    -- then we have to reset it again otherwise it would use the role defined in the `set_config` above
                    -- to fetch the remaining rows when rows>10, which could be a user-defined role that lacks execution grants.
                    -- The flow is:
                    --   1. run batch with conn role
                    --   2. set_config working_role
                    --   3. execute walrus
                    --   4. reset role (revert)
                    --   5. repeat
                    perform set_config('role', null, true);

                    if subscription_has_access then
                        visible_role_sub_ids = visible_role_sub_ids || subscription_id;
                    end if;
                end if;
            end loop;

            perform set_config('role', null, true);

            -- Inner loop: per distinct selected_columns for this role
            for cols_record in
                select selected_columns
                from (select distinct selected_columns from unnest(subscriptions) s where s.claims_role = working_role) t
                order by coalesce(array_to_string(selected_columns, ','), '')
            loop
                working_selected_columns := cols_record.selected_columns;

                output = jsonb_build_object(
                    'schema', wal ->> 'schema',
                    'table', wal ->> 'table',
                    'type', action,
                    'commit_timestamp', to_char(
                        ((wal ->> 'timestamp')::timestamptz at time zone 'utc'),
                        'YYYY-MM-DD"T"HH24:MI:SS.MS"Z"'
                    ),
                    'columns', (
                        select
                            jsonb_agg(
                                jsonb_build_object(
                                    'name', pa.attname,
                                    'type', pt.typname
                                )
                                order by pa.attnum asc
                            )
                        from
                            pg_attribute pa
                            join pg_type pt
                                on pa.atttypid = pt.oid
                            left join (
                                select unnest(conkey) as pkey_attnum
                                from pg_constraint
                                where conrelid = entity_ and contype = 'p'
                            ) pk on pk.pkey_attnum = pa.attnum
                        where
                            attrelid = entity_
                            and attnum > 0
                            and pg_catalog.has_column_privilege(working_role, entity_, pa.attname, 'SELECT')
                            and (working_selected_columns is null or pa.attname = any(working_selected_columns) or pk.pkey_attnum is not null)
                    )
                )
                -- Add "record" key for insert and update
                || case
                    when action in ('INSERT', 'UPDATE') then
                        jsonb_build_object(
                            'record',
                            (
                                select
                                    jsonb_object_agg(
                                        -- if unchanged toast, get column name and value from old record
                                        coalesce((c).name, (oc).name),
                                        case
                                            when (c).name is null then (oc).value
                                            else (c).value
                                        end
                                    )
                                from
                                    unnest(columns) c
                                    full outer join unnest(old_columns) oc
                                        on (c).name = (oc).name
                                where
                                    coalesce((c).is_selectable, (oc).is_selectable)
                                    and (working_selected_columns is null or coalesce((c).name, (oc).name) = any(working_selected_columns) or coalesce((c).is_pkey, (oc).is_pkey))
                                    and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                            )
                        )
                    else '{}'::jsonb
                end
                -- Add "old_record" key for update and delete
                || case
                    when action = 'UPDATE' then
                        jsonb_build_object(
                                'old_record',
                                (
                                    select jsonb_object_agg((c).name, (c).value)
                                    from unnest(old_columns) c
                                    where
                                        (c).is_selectable
                                        and (working_selected_columns is null or (c).name = any(working_selected_columns) or (c).is_pkey)
                                        and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                                )
                            )
                    when action = 'DELETE' then
                        jsonb_build_object(
                            'old_record',
                            (
                                select jsonb_object_agg((c).name, (c).value)
                                from unnest(old_columns) c
                                where
                                    (c).is_selectable
                                    and (working_selected_columns is null or (c).name = any(working_selected_columns) or (c).is_pkey)
                                    and ( not error_record_exceeds_max_size or (octet_length((c).value::text) <= 64))
                                    and ( not is_rls_enabled or (c).is_pkey ) -- if RLS enabled, we can't secure deletes so filter to pkey
                            )
                        )
                    else '{}'::jsonb
                end;

                -- Filter visible_role_sub_ids to those matching the current selected_columns group
                visible_to_subscription_ids = coalesce(
                    (
                        select array_agg(s.subscription_id)
                        from unnest(subscriptions) s
                        where s.claims_role = working_role
                          and (s.selected_columns is not distinct from working_selected_columns)
                          and s.subscription_id = any(visible_role_sub_ids)
                    ),
                    '{}'::uuid[]
                );

                return next (
                    output,
                    is_rls_enabled,
                    visible_to_subscription_ids,
                    case
                        when error_record_exceeds_max_size then array['Error 413: Payload Too Large']
                        else '{}'
                    end
                )::realtime.wal_rls;
            end loop;

        end if;
    end loop;

    perform set_config('role', null, true);
end;
$$;


--
-- Name: broadcast_changes(text, text, text, text, text, record, record, text); Type: FUNCTION; Schema: realtime; Owner: -
--

CREATE FUNCTION realtime.broadcast_changes(topic_name text, event_name text, operation text, table_name text, table_schema text, new record, old record, level text DEFAULT 'ROW'::text) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
    -- Declare a variable to hold the JSONB representation of the row
    row_data jsonb := '{}'::jsonb;
BEGIN
    IF level = 'STATEMENT' THEN
        RAISE EXCEPTION 'function can only be triggered for each row, not for each statement';
    END IF;
    -- Check the operation type and handle accordingly
    IF operation = 'INSERT' OR operation = 'UPDATE' OR operation = 'DELETE' THEN
        row_data := jsonb_build_object('old_record', OLD, 'record', NEW, 'operation', operation, 'table', table_name, 'schema', table_schema);
        PERFORM realtime.send (row_data, event_name, topic_name);
    ELSE
        RAISE EXCEPTION 'Unexpected operation type: %', operation;
    END IF;
EXCEPTION
    WHEN OTHERS THEN
        RAISE EXCEPTION 'Failed to process the row: %', SQLERRM;
END;

$$;


--
-- Name: build_prepared_statement_sql(text, regclass, realtime.wal_column[]); Type: FUNCTION; Schema: realtime; Owner: -
--

CREATE FUNCTION realtime.build_prepared_statement_sql(prepared_statement_name text, entity regclass, columns realtime.wal_column[]) RETURNS text
    LANGUAGE sql
    AS $$
      /*
      Builds a sql string that, if executed, creates a prepared statement to
      tests retrive a row from *entity* by its primary key columns.
      Example
          select realtime.build_prepared_statement_sql('public.notes', '{"id"}'::text[], '{"bigint"}'::text[])
      */
          select
      'prepare ' || prepared_statement_name || ' as
          select
              exists(
                  select
                      1
                  from
                      ' || entity || '
                  where
                      ' || string_agg(quote_ident(pkc.name) || '=' || quote_nullable(pkc.value #>> '{}') , ' and ') || '
              )'
          from
              unnest(columns) pkc
          where
              pkc.is_pkey
          group by
              entity
      $$;


--
-- Name: cast(text, regtype); Type: FUNCTION; Schema: realtime; Owner: -
--

CREATE FUNCTION realtime."cast"(val text, type_ regtype) RETURNS jsonb
    LANGUAGE plpgsql IMMUTABLE
    AS $$
declare
  res jsonb;
begin
  if type_::text = 'bytea' then
    return to_jsonb(val);
  end if;
  execute format('select to_jsonb(%L::'|| type_::text || ')', val) into res;
  return res;
end
$$;


--
-- Name: check_equality_op(realtime.equality_op, regtype, text, text); Type: FUNCTION; Schema: realtime; Owner: -
--

CREATE FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text) RETURNS boolean
    LANGUAGE plpgsql IMMUTABLE
    AS $$
/*
Casts *val_1* and *val_2* as type *type_* and check the *op* condition for truthiness
*/
declare
    op_symbol text = (
        case
            when op = 'eq' then '='
            when op = 'neq' then '!='
            when op = 'lt' then '<'
            when op = 'lte' then '<='
            when op = 'gt' then '>'
            when op = 'gte' then '>='
            when op = 'in' then '= any'
            else 'UNKNOWN OP'
        end
    );
    res boolean;
begin
    execute format(
        'select %L::'|| type_::text || ' ' || op_symbol
        || ' ( %L::'
        || (
            case
                when op = 'in' then type_::text || '[]'
                else type_::text end
        )
        || ')', val_1, val_2) into res;
    return res;
end;
$$;


--
-- Name: check_equality_op(realtime.equality_op, regtype, text, text, boolean); Type: FUNCTION; Schema: realtime; Owner: -
--

CREATE FUNCTION realtime.check_equality_op(op realtime.equality_op, type_ regtype, val_1 text, val_2 text, negate boolean) RETURNS boolean
    LANGUAGE plpgsql STABLE
    AS $$
declare
    op_symbol text;
    res boolean;
begin
    -- IS DISTINCT FROM / IS NOT DISTINCT FROM: infix, both sides typed literals
    if op = 'isdistinct' then
        execute format(
            'select %L::%s %s %L::%s',
            val_1,
            type_::text,
            case when negate then 'IS NOT DISTINCT FROM' else 'IS DISTINCT FROM' end,
            val_2,
            type_::text
        ) into res;
        return res;
    end if;

    -- IS requires a keyword RHS (NULL, TRUE, FALSE, UNKNOWN), not a typed literal
    if op = 'is' then
        if val_2 not in ('null', 'true', 'false', 'unknown') then
            raise exception 'invalid value for is filter: must be null, true, false, or unknown';
        end if;
        execute format(
            'select %L::%s %s %s',
            val_1,
            type_::text,
            case when negate then 'IS NOT' else 'IS' end,
            upper(val_2)
        ) into res;
        return res;
    end if;

    op_symbol = case
        when op = 'eq'    then '='
        when op = 'neq'   then '!='
        when op = 'lt'    then '<'
        when op = 'lte'   then '<='
        when op = 'gt'    then '>'
        when op = 'gte'   then '>='
        when op = 'in'    then '= any'
        when op = 'like'   then 'LIKE'
        when op = 'ilike'  then 'ILIKE'
        when op = 'match'  then '~'
        when op = 'imatch' then '~*'
        else null
    end;

    if op_symbol is null then
        raise exception 'unsupported equality operator: %', op::text;
    end if;

    execute format(
        'select %L::%s %s (%L::%s)',
        val_1,
        type_::text,
        op_symbol,
        val_2,
        case when op = 'in' then type_::text || '[]' else type_::text end
    ) into res;

    return case when negate then not res else res end;
end;
$$;


--
-- Name: is_visible_through_filters(realtime.wal_column[], realtime.user_defined_filter[]); Type: FUNCTION; Schema: realtime; Owner: -
--

CREATE FUNCTION realtime.is_visible_through_filters(columns realtime.wal_column[], filters realtime.user_defined_filter[]) RETURNS boolean
    LANGUAGE sql STABLE
    AS $$
    select
        filters is null
        or array_length(filters, 1) is null
        or coalesce(
            count(col.name) = count(1)
            and sum(
                realtime.check_equality_op(
                    op:=f.op,
                    type_:=coalesce(col.type_oid::regtype, col.type_name::regtype),
                    val_1:=col.value #>> '{}',
                    val_2:=f.value,
                    negate:=coalesce(f.negate, false)
                )::int
            ) filter (where col.name is not null) = count(col.name),
            false
        )
    from
        unnest(filters) f
        left join unnest(columns) col
            on f.column_name = col.name;
$$;


--
-- Name: list_changes(name, name, integer, integer); Type: FUNCTION; Schema: realtime; Owner: -
--

CREATE FUNCTION realtime.list_changes(publication name, slot_name name, max_changes integer, max_record_bytes integer) RETURNS TABLE(wal jsonb, is_rls_enabled boolean, subscription_ids uuid[], errors text[], slot_changes_count bigint)
    LANGUAGE sql
    SET log_min_messages TO 'fatal'
    AS $$
  WITH pub AS (
    SELECT
      concat_ws(
        ',',
        CASE WHEN bool_or(pubinsert) THEN 'insert' ELSE NULL END,
        CASE WHEN bool_or(pubupdate) THEN 'update' ELSE NULL END,
        CASE WHEN bool_or(pubdelete) THEN 'delete' ELSE NULL END
      ) AS w2j_actions,
      coalesce(
        string_agg(
          realtime.quote_wal2json(format('%I.%I', schemaname, tablename)::regclass),
          ','
        ) filter (WHERE ppt.tablename IS NOT NULL),
        ''
      ) AS w2j_add_tables
    FROM pg_publication pp
    LEFT JOIN pg_publication_tables ppt ON pp.pubname = ppt.pubname
    WHERE pp.pubname = publication
    GROUP BY pp.pubname
    LIMIT 1
  ),
  -- MATERIALIZED ensures pg_logical_slot_get_changes is called exactly once
  w2j AS MATERIALIZED (
    SELECT x.*, pub.w2j_add_tables
    FROM pub,
         pg_logical_slot_get_changes(
           slot_name, null, max_changes,
           'include-pk', 'true',
           'include-transaction', 'false',
           'include-timestamp', 'true',
           'include-type-oids', 'true',
           'format-version', '2',
           'actions', pub.w2j_actions,
           'add-tables', pub.w2j_add_tables
         ) x
  ),
  slot_count AS (
    SELECT count(*)::bigint AS cnt
    FROM w2j
    WHERE w2j.w2j_add_tables <> ''
  ),
  rls_filtered AS (
    SELECT xyz.wal, xyz.is_rls_enabled, xyz.subscription_ids, xyz.errors
    FROM w2j,
         realtime.apply_rls(
           wal := w2j.data::jsonb,
           max_record_bytes := max_record_bytes
         ) xyz(wal, is_rls_enabled, subscription_ids, errors)
    WHERE w2j.w2j_add_tables <> ''
      AND xyz.subscription_ids[1] IS NOT NULL
  )
  SELECT rf.wal, rf.is_rls_enabled, rf.subscription_ids, rf.errors, sc.cnt
  FROM rls_filtered rf, slot_count sc

  UNION ALL

  SELECT null, null, null, null, sc.cnt
  FROM slot_count sc
  WHERE NOT EXISTS (SELECT 1 FROM rls_filtered)
$$;


--
-- Name: quote_wal2json(regclass); Type: FUNCTION; Schema: realtime; Owner: -
--

CREATE FUNCTION realtime.quote_wal2json(entity regclass) RETURNS text
    LANGUAGE sql IMMUTABLE STRICT
    AS $$
  SELECT
    realtime.wal2json_escape_identifier(nsp.nspname::text)
    || '.'
    || realtime.wal2json_escape_identifier(pc.relname::text)
  FROM pg_class pc
  JOIN pg_namespace nsp ON pc.relnamespace = nsp.oid
  WHERE pc.oid = entity
$$;


--
-- Name: send(jsonb, text, text, boolean); Type: FUNCTION; Schema: realtime; Owner: -
--

CREATE FUNCTION realtime.send(payload jsonb, event text, topic text, private boolean DEFAULT true) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
  generated_id uuid;
  final_payload jsonb;
BEGIN
  BEGIN
    generated_id := gen_random_uuid();

    -- Check if payload has an 'id' key, if not, add the generated UUID
    IF payload ? 'id' THEN
      final_payload := payload;
    ELSE
      final_payload := jsonb_set(payload, '{id}', to_jsonb(generated_id));
    END IF;

    -- Set the topic configuration
    EXECUTE format('SET LOCAL realtime.topic TO %L', topic);

    INSERT INTO realtime.messages (id, payload, event, topic, private, extension)
    VALUES (generated_id, final_payload, event, topic, private, 'broadcast');
  EXCEPTION
    WHEN OTHERS THEN
      RAISE WARNING 'WarnSendingBroadcastMessage: %', SQLERRM;
  END;
END;
$$;


--
-- Name: send_binary(bytea, text, text, boolean); Type: FUNCTION; Schema: realtime; Owner: -
--

CREATE FUNCTION realtime.send_binary(payload bytea, event text, topic text, private boolean DEFAULT true) RETURNS void
    LANGUAGE plpgsql
    AS $$
DECLARE
  generated_id uuid;
BEGIN
  BEGIN
    generated_id := gen_random_uuid();

    EXECUTE format('SET LOCAL realtime.topic TO %L', topic);

    INSERT INTO realtime.messages (id, binary_payload, event, topic, private, extension)
    VALUES (generated_id, payload, event, topic, private, 'broadcast');
  EXCEPTION
    WHEN OTHERS THEN
      RAISE WARNING 'WarnSendingBroadcastMessage: %', SQLERRM;
  END;
END;
$$;


--
-- Name: subscription_check_filters(); Type: FUNCTION; Schema: realtime; Owner: -
--

CREATE FUNCTION realtime.subscription_check_filters() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
declare
    col_names text[] = coalesce(
            array_agg(a.attname order by a.attnum),
            '{}'::text[]
        )
        from
            pg_catalog.pg_attribute a
        where
            a.attrelid = new.entity
            and a.attnum > 0
            and not a.attisdropped
            and pg_catalog.has_column_privilege(
                (new.claims ->> 'role'),
                a.attrelid,
                a.attnum,
                'SELECT'
            );
    filter realtime.user_defined_filter;
    col_type regtype;
    in_val jsonb;
    selected_col text;
begin
    for filter in select * from unnest(new.filters) loop
        if not filter.column_name = any(col_names) then
            raise exception 'invalid column for filter %', filter.column_name;
        end if;

        col_type = (
            select atttypid::regtype
            from pg_catalog.pg_attribute
            where attrelid = new.entity
                  and attname = filter.column_name
        );
        if col_type is null then
            raise exception 'failed to lookup type for column %', filter.column_name;
        end if;

        if filter.op = 'in'::realtime.equality_op then
            in_val = realtime.cast(filter.value, (col_type::text || '[]')::regtype);
            if coalesce(jsonb_array_length(in_val), 0) > 100 then
                raise exception 'too many values for `in` filter. Maximum 100';
            end if;
        elsif filter.op = 'is'::realtime.equality_op then
            -- `is` requires a keyword RHS rather than a typed literal
            if filter.value not in ('null', 'true', 'false', 'unknown') then
                raise exception 'invalid value for is filter: must be null, true, false, or unknown';
            end if;
            -- IS NULL works for any type, but IS TRUE/FALSE/UNKNOWN require a boolean
            -- operand. Reject the non-null keywords on non-boolean columns here so they
            -- don't abort apply_rls at WAL time.
            if filter.value <> 'null' and col_type <> 'boolean'::regtype then
                raise exception 'is % filter requires a boolean column, got %', filter.value, col_type::text;
            end if;
        elsif filter.op in ('like'::realtime.equality_op, 'ilike'::realtime.equality_op) then
            -- like/ilike apply the text pattern operator (~~); reject column types that
            -- have no such operator instead of failing at WAL time
            if not exists (
                select 1 from pg_catalog.pg_operator
                where oprname = '~~' and oprleft = col_type
            ) then
                raise exception 'operator % requires a text-compatible column type, got %', filter.op::text, col_type::text;
            end if;
        elsif filter.op in ('match'::realtime.equality_op, 'imatch'::realtime.equality_op) then
            -- match/imatch apply the regex operators ~ / ~*; reject column types that have
            -- no such operator (e.g. integer) instead of failing at WAL time, mirroring the
            -- like/ilike guard above.
            if not exists (
                select 1 from pg_catalog.pg_operator
                where oprname = case when filter.op = 'imatch'::realtime.equality_op then '~*' else '~' end
                  and oprleft = col_type
                  and oprright = col_type
                  and oprresult = 'boolean'::regtype
            ) then
                raise exception 'operator % requires a text-compatible column type, got %', filter.op::text, col_type::text;
            end if;
            -- validate the regex eagerly so a bad pattern is rejected here, not inside
            -- apply_rls where it would abort the WAL stream for the entity
            begin
                perform '' ~ filter.value;
            exception when others then
                raise exception 'invalid regular expression for % filter: %', filter.op::text, sqlerrm;
            end;
        else
            -- eq/neq/lt/lte/gt/gte: value must be coercable to the type
            perform realtime.cast(filter.value, col_type);
        end if;
    end loop;

    if new.selected_columns is not null then
        for selected_col in select * from unnest(new.selected_columns) loop
            if not selected_col = any(col_names) then
                raise exception 'invalid column for select %', selected_col;
            end if;
        end loop;
    end if;

    -- Apply consistent order to filters so the unique constraint can't be tricked by a
    -- different filter order. negate is part of the sort key.
    new.filters = coalesce(
        array_agg(f order by f.column_name, f.op, f.value, f.negate),
        '{}'
    ) from unnest(new.filters) f;

    new.selected_columns = (
        select array_agg(c order by c)
        from unnest(new.selected_columns) c
    );

    return new;
end;
$$;


--
-- Name: to_regrole(text); Type: FUNCTION; Schema: realtime; Owner: -
--

CREATE FUNCTION realtime.to_regrole(role_name text) RETURNS regrole
    LANGUAGE sql IMMUTABLE
    AS $$ select role_name::regrole $$;


--
-- Name: topic(); Type: FUNCTION; Schema: realtime; Owner: -
--

CREATE FUNCTION realtime.topic() RETURNS text
    LANGUAGE sql STABLE
    AS $$
select nullif(current_setting('realtime.topic', true), '')::text;
$$;


--
-- Name: wal2json_escape_identifier(text); Type: FUNCTION; Schema: realtime; Owner: -
--

CREATE FUNCTION realtime.wal2json_escape_identifier(name text) RETURNS text
    LANGUAGE sql IMMUTABLE STRICT
    AS $$
  -- Prefix `\`, `,`, `.`, and any whitespace with `\`
  SELECT regexp_replace(name, '([\\,.[:space:]])', '\\\1', 'g')
$$;


--
-- Name: allow_any_operation(text[]); Type: FUNCTION; Schema: storage; Owner: -
--

CREATE FUNCTION storage.allow_any_operation(expected_operations text[]) RETURNS boolean
    LANGUAGE sql STABLE
    AS $$
  WITH current_operation AS (
    SELECT storage.operation() AS raw_operation
  ),
  normalized AS (
    SELECT CASE
      WHEN raw_operation LIKE 'storage.%' THEN substr(raw_operation, 9)
      ELSE raw_operation
    END AS current_operation
    FROM current_operation
  )
  SELECT EXISTS (
    SELECT 1
    FROM normalized n
    CROSS JOIN LATERAL unnest(expected_operations) AS expected_operation
    WHERE expected_operation IS NOT NULL
      AND expected_operation <> ''
      AND n.current_operation = CASE
        WHEN expected_operation LIKE 'storage.%' THEN substr(expected_operation, 9)
        ELSE expected_operation
      END
  );
$$;


--
-- Name: allow_only_operation(text); Type: FUNCTION; Schema: storage; Owner: -
--

CREATE FUNCTION storage.allow_only_operation(expected_operation text) RETURNS boolean
    LANGUAGE sql STABLE
    AS $$
  WITH current_operation AS (
    SELECT storage.operation() AS raw_operation
  ),
  normalized AS (
    SELECT
      CASE
        WHEN raw_operation LIKE 'storage.%' THEN substr(raw_operation, 9)
        ELSE raw_operation
      END AS current_operation,
      CASE
        WHEN expected_operation LIKE 'storage.%' THEN substr(expected_operation, 9)
        ELSE expected_operation
      END AS requested_operation
    FROM current_operation
  )
  SELECT CASE
    WHEN requested_operation IS NULL OR requested_operation = '' THEN FALSE
    ELSE COALESCE(current_operation = requested_operation, FALSE)
  END
  FROM normalized;
$$;


--
-- Name: can_insert_object(text, text, uuid, jsonb); Type: FUNCTION; Schema: storage; Owner: -
--

CREATE FUNCTION storage.can_insert_object(bucketid text, name text, owner uuid, metadata jsonb) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
  INSERT INTO "storage"."objects" ("bucket_id", "name", "owner", "metadata") VALUES (bucketid, name, owner, metadata);
  -- hack to rollback the successful insert
  RAISE sqlstate 'PT200' using
  message = 'ROLLBACK',
  detail = 'rollback successful insert';
END
$$;


--
-- Name: enforce_bucket_name_length(); Type: FUNCTION; Schema: storage; Owner: -
--

CREATE FUNCTION storage.enforce_bucket_name_length() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
begin
    if length(new.name) > 100 then
        raise exception 'bucket name "%" is too long (% characters). Max is 100.', new.name, length(new.name);
    end if;
    return new;
end;
$$;


--
-- Name: extension(text); Type: FUNCTION; Schema: storage; Owner: -
--

CREATE FUNCTION storage.extension(name text) RETURNS text
    LANGUAGE plpgsql IMMUTABLE
    AS $$
DECLARE
    _parts text[];
    _filename text;
BEGIN
    -- Split on "/" to get path segments
    SELECT string_to_array(name, '/') INTO _parts;
    -- Get the last path segment (the actual filename)
    SELECT _parts[array_length(_parts, 1)] INTO _filename;
    -- Extract extension: reverse, split on '.', then reverse again
    RETURN reverse(split_part(reverse(_filename), '.', 1));
END
$$;


--
-- Name: filename(text); Type: FUNCTION; Schema: storage; Owner: -
--

CREATE FUNCTION storage.filename(name text) RETURNS text
    LANGUAGE plpgsql
    AS $$
DECLARE
_parts text[];
BEGIN
	select string_to_array(name, '/') into _parts;
	return _parts[array_length(_parts,1)];
END
$$;


--
-- Name: foldername(text); Type: FUNCTION; Schema: storage; Owner: -
--

CREATE FUNCTION storage.foldername(name text) RETURNS text[]
    LANGUAGE plpgsql IMMUTABLE
    AS $$
DECLARE
    _parts text[];
BEGIN
    -- Split on "/" to get path segments
    SELECT string_to_array(name, '/') INTO _parts;
    -- Return everything except the last segment
    RETURN _parts[1 : array_length(_parts,1) - 1];
END
$$;


--
-- Name: get_common_prefix(text, text, text); Type: FUNCTION; Schema: storage; Owner: -
--

CREATE FUNCTION storage.get_common_prefix(p_key text, p_prefix text, p_delimiter text) RETURNS text
    LANGUAGE sql IMMUTABLE
    AS $$
SELECT CASE
    WHEN position(p_delimiter IN substring(p_key FROM length(p_prefix) + 1)) > 0
    THEN left(p_key, length(p_prefix) + position(p_delimiter IN substring(p_key FROM length(p_prefix) + 1)))
    ELSE NULL
END;
$$;


--
-- Name: get_size_by_bucket(); Type: FUNCTION; Schema: storage; Owner: -
--

CREATE FUNCTION storage.get_size_by_bucket() RETURNS TABLE(size bigint, bucket_id text)
    LANGUAGE plpgsql STABLE
    AS $$
BEGIN
    return query
        select sum((metadata->>'size')::bigint)::bigint as size, obj.bucket_id
        from "storage".objects as obj
        group by obj.bucket_id;
END
$$;


--
-- Name: list_multipart_uploads_with_delimiter(text, text, text, integer, text, text); Type: FUNCTION; Schema: storage; Owner: -
--

CREATE FUNCTION storage.list_multipart_uploads_with_delimiter(bucket_id text, prefix_param text, delimiter_param text, max_keys integer DEFAULT 100, next_key_token text DEFAULT ''::text, next_upload_token text DEFAULT ''::text) RETURNS TABLE(key text, id text, created_at timestamp with time zone)
    LANGUAGE plpgsql
    AS $_$
BEGIN
    RETURN QUERY EXECUTE
        'SELECT DISTINCT ON(key COLLATE "C") * from (
            SELECT
                CASE
                    WHEN position($2 IN substring(key from length($1) + 1)) > 0 THEN
                        substring(key from 1 for length($1) + position($2 IN substring(key from length($1) + 1)))
                    ELSE
                        key
                END AS key, id, created_at
            FROM
                storage.s3_multipart_uploads
            WHERE
                bucket_id = $5 AND
                key ILIKE $1 || ''%'' AND
                CASE
                    WHEN $4 != '''' AND $6 = '''' THEN
                        CASE
                            WHEN position($2 IN substring(key from length($1) + 1)) > 0 THEN
                                substring(key from 1 for length($1) + position($2 IN substring(key from length($1) + 1))) COLLATE "C" > $4
                            ELSE
                                key COLLATE "C" > $4
                            END
                    ELSE
                        true
                END AND
                CASE
                    WHEN $6 != '''' THEN
                        id COLLATE "C" > $6
                    ELSE
                        true
                    END
            ORDER BY
                key COLLATE "C" ASC, created_at ASC) as e order by key COLLATE "C" LIMIT $3'
        USING prefix_param, delimiter_param, max_keys, next_key_token, bucket_id, next_upload_token;
END;
$_$;


--
-- Name: list_objects_with_delimiter(text, text, text, integer, text, text, text); Type: FUNCTION; Schema: storage; Owner: -
--

CREATE FUNCTION storage.list_objects_with_delimiter(_bucket_id text, prefix_param text, delimiter_param text, max_keys integer DEFAULT 100, start_after text DEFAULT ''::text, next_token text DEFAULT ''::text, sort_order text DEFAULT 'asc'::text) RETURNS TABLE(name text, id uuid, metadata jsonb, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone)
    LANGUAGE plpgsql STABLE
    AS $_$
DECLARE
    v_peek_name TEXT;
    v_current RECORD;
    v_common_prefix TEXT;

    -- Configuration
    v_is_asc BOOLEAN;
    v_prefix TEXT;
    v_start TEXT;
    v_upper_bound TEXT;
    v_file_batch_size INT;

    -- Seek state
    v_next_seek TEXT;
    v_count INT := 0;

    -- Dynamic SQL for batch query only
    v_batch_query TEXT;

BEGIN
    -- ========================================================================
    -- INITIALIZATION
    -- ========================================================================
    v_is_asc := lower(coalesce(sort_order, 'asc')) = 'asc';
    v_prefix := coalesce(prefix_param, '');
    v_start := CASE WHEN coalesce(next_token, '') <> '' THEN next_token ELSE coalesce(start_after, '') END;
    v_file_batch_size := LEAST(GREATEST(max_keys * 2, 100), 1000);

    -- Calculate upper bound for prefix filtering (bytewise, using COLLATE "C")
    IF v_prefix = '' THEN
        v_upper_bound := NULL;
    ELSIF right(v_prefix, 1) = delimiter_param THEN
        v_upper_bound := left(v_prefix, -1) || chr(ascii(delimiter_param) + 1);
    ELSE
        v_upper_bound := left(v_prefix, -1) || chr(ascii(right(v_prefix, 1)) + 1);
    END IF;

    -- Build batch query (dynamic SQL - called infrequently, amortized over many rows)
    IF v_is_asc THEN
        IF v_upper_bound IS NOT NULL THEN
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND o.name COLLATE "C" >= $2 ' ||
                'AND o.name COLLATE "C" < $3 ORDER BY o.name COLLATE "C" ASC LIMIT $4';
        ELSE
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND o.name COLLATE "C" >= $2 ' ||
                'ORDER BY o.name COLLATE "C" ASC LIMIT $4';
        END IF;
    ELSE
        IF v_upper_bound IS NOT NULL THEN
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND o.name COLLATE "C" < $2 ' ||
                'AND o.name COLLATE "C" >= $3 ORDER BY o.name COLLATE "C" DESC LIMIT $4';
        ELSE
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND o.name COLLATE "C" < $2 ' ||
                'ORDER BY o.name COLLATE "C" DESC LIMIT $4';
        END IF;
    END IF;

    -- ========================================================================
    -- SEEK INITIALIZATION: Determine starting position
    -- ========================================================================
    IF v_start = '' THEN
        IF v_is_asc THEN
            v_next_seek := v_prefix;
        ELSE
            -- DESC without cursor: find the last item in range
            IF v_upper_bound IS NOT NULL THEN
                SELECT o.name INTO v_next_seek FROM storage.objects o
                WHERE o.bucket_id = _bucket_id AND o.name COLLATE "C" >= v_prefix AND o.name COLLATE "C" < v_upper_bound
                ORDER BY o.name COLLATE "C" DESC LIMIT 1;
            ELSIF v_prefix <> '' THEN
                SELECT o.name INTO v_next_seek FROM storage.objects o
                WHERE o.bucket_id = _bucket_id AND o.name COLLATE "C" >= v_prefix
                ORDER BY o.name COLLATE "C" DESC LIMIT 1;
            ELSE
                SELECT o.name INTO v_next_seek FROM storage.objects o
                WHERE o.bucket_id = _bucket_id
                ORDER BY o.name COLLATE "C" DESC LIMIT 1;
            END IF;

            IF v_next_seek IS NOT NULL THEN
                v_next_seek := v_next_seek || delimiter_param;
            ELSE
                RETURN;
            END IF;
        END IF;
    ELSE
        -- Cursor provided: determine if it refers to a folder or leaf
        IF EXISTS (
            SELECT 1 FROM storage.objects o
            WHERE o.bucket_id = _bucket_id
              AND o.name COLLATE "C" LIKE v_start || delimiter_param || '%'
            LIMIT 1
        ) THEN
            -- Cursor refers to a folder
            IF v_is_asc THEN
                v_next_seek := v_start || chr(ascii(delimiter_param) + 1);
            ELSE
                v_next_seek := v_start || delimiter_param;
            END IF;
        ELSE
            -- Cursor refers to a leaf object
            IF v_is_asc THEN
                v_next_seek := v_start || delimiter_param;
            ELSE
                v_next_seek := v_start;
            END IF;
        END IF;
    END IF;

    -- ========================================================================
    -- MAIN LOOP: Hybrid peek-then-batch algorithm
    -- Uses STATIC SQL for peek (hot path) and DYNAMIC SQL for batch
    -- ========================================================================
    LOOP
        EXIT WHEN v_count >= max_keys;

        -- STEP 1: PEEK using STATIC SQL (plan cached, very fast)
        IF v_is_asc THEN
            IF v_upper_bound IS NOT NULL THEN
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = _bucket_id AND o.name COLLATE "C" >= v_next_seek AND o.name COLLATE "C" < v_upper_bound
                ORDER BY o.name COLLATE "C" ASC LIMIT 1;
            ELSE
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = _bucket_id AND o.name COLLATE "C" >= v_next_seek
                ORDER BY o.name COLLATE "C" ASC LIMIT 1;
            END IF;
        ELSE
            IF v_upper_bound IS NOT NULL THEN
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = _bucket_id AND o.name COLLATE "C" < v_next_seek AND o.name COLLATE "C" >= v_prefix
                ORDER BY o.name COLLATE "C" DESC LIMIT 1;
            ELSIF v_prefix <> '' THEN
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = _bucket_id AND o.name COLLATE "C" < v_next_seek AND o.name COLLATE "C" >= v_prefix
                ORDER BY o.name COLLATE "C" DESC LIMIT 1;
            ELSE
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = _bucket_id AND o.name COLLATE "C" < v_next_seek
                ORDER BY o.name COLLATE "C" DESC LIMIT 1;
            END IF;
        END IF;

        EXIT WHEN v_peek_name IS NULL;

        -- STEP 2: Check if this is a FOLDER or FILE
        v_common_prefix := storage.get_common_prefix(v_peek_name, v_prefix, delimiter_param);

        IF v_common_prefix IS NOT NULL THEN
            -- FOLDER: Emit and skip to next folder (no heap access needed)
            name := rtrim(v_common_prefix, delimiter_param);
            id := NULL;
            updated_at := NULL;
            created_at := NULL;
            last_accessed_at := NULL;
            metadata := NULL;
            RETURN NEXT;
            v_count := v_count + 1;

            -- Advance seek past the folder range
            IF v_is_asc THEN
                v_next_seek := left(v_common_prefix, -1) || chr(ascii(delimiter_param) + 1);
            ELSE
                v_next_seek := v_common_prefix;
            END IF;
        ELSE
            -- FILE: Batch fetch using DYNAMIC SQL (overhead amortized over many rows)
            -- For ASC: upper_bound is the exclusive upper limit (< condition)
            -- For DESC: prefix is the inclusive lower limit (>= condition)
            FOR v_current IN EXECUTE v_batch_query USING _bucket_id, v_next_seek,
                CASE WHEN v_is_asc THEN COALESCE(v_upper_bound, v_prefix) ELSE v_prefix END, v_file_batch_size
            LOOP
                v_common_prefix := storage.get_common_prefix(v_current.name, v_prefix, delimiter_param);

                IF v_common_prefix IS NOT NULL THEN
                    -- Hit a folder: exit batch, let peek handle it
                    v_next_seek := v_current.name;
                    EXIT;
                END IF;

                -- Emit file
                name := v_current.name;
                id := v_current.id;
                updated_at := v_current.updated_at;
                created_at := v_current.created_at;
                last_accessed_at := v_current.last_accessed_at;
                metadata := v_current.metadata;
                RETURN NEXT;
                v_count := v_count + 1;

                -- Advance seek past this file
                IF v_is_asc THEN
                    v_next_seek := v_current.name || delimiter_param;
                ELSE
                    v_next_seek := v_current.name;
                END IF;

                EXIT WHEN v_count >= max_keys;
            END LOOP;
        END IF;
    END LOOP;
END;
$_$;


--
-- Name: operation(); Type: FUNCTION; Schema: storage; Owner: -
--

CREATE FUNCTION storage.operation() RETURNS text
    LANGUAGE plpgsql STABLE
    AS $$
BEGIN
    RETURN current_setting('storage.operation', true);
END;
$$;


--
-- Name: protect_delete(); Type: FUNCTION; Schema: storage; Owner: -
--

CREATE FUNCTION storage.protect_delete() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    -- Check if storage.allow_delete_query is set to 'true'
    IF COALESCE(current_setting('storage.allow_delete_query', true), 'false') != 'true' THEN
        RAISE EXCEPTION 'Direct deletion from storage tables is not allowed. Use the Storage API instead.'
            USING HINT = 'This prevents accidental data loss from orphaned objects.',
                  ERRCODE = '42501';
    END IF;
    RETURN NULL;
END;
$$;


--
-- Name: search(text, text, integer, integer, integer, text, text, text); Type: FUNCTION; Schema: storage; Owner: -
--

CREATE FUNCTION storage.search(prefix text, bucketname text, limits integer DEFAULT 100, levels integer DEFAULT 1, offsets integer DEFAULT 0, search text DEFAULT ''::text, sortcolumn text DEFAULT 'name'::text, sortorder text DEFAULT 'asc'::text) RETURNS TABLE(name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql STABLE
    AS $_$
DECLARE
    v_peek_name TEXT;
    v_current RECORD;
    v_common_prefix TEXT;
    v_delimiter CONSTANT TEXT := '/';

    -- Configuration
    v_limit INT;
    v_prefix TEXT;
    v_prefix_lower TEXT;
    v_is_asc BOOLEAN;
    v_order_by TEXT;
    v_sort_order TEXT;
    v_upper_bound TEXT;
    v_file_batch_size INT;

    -- Dynamic SQL for batch query only
    v_batch_query TEXT;

    -- Seek state
    v_next_seek TEXT;
    v_count INT := 0;
    v_skipped INT := 0;
BEGIN
    -- ========================================================================
    -- INITIALIZATION
    -- ========================================================================
    v_limit := LEAST(coalesce(limits, 100), 1500);
    v_prefix := coalesce(prefix, '') || coalesce(search, '');
    v_prefix_lower := lower(v_prefix);
    v_is_asc := lower(coalesce(sortorder, 'asc')) = 'asc';
    v_file_batch_size := LEAST(GREATEST(v_limit * 2, 100), 1000);

    -- Validate sort column
    CASE lower(coalesce(sortcolumn, 'name'))
        WHEN 'name' THEN v_order_by := 'name';
        WHEN 'updated_at' THEN v_order_by := 'updated_at';
        WHEN 'created_at' THEN v_order_by := 'created_at';
        WHEN 'last_accessed_at' THEN v_order_by := 'last_accessed_at';
        ELSE v_order_by := 'name';
    END CASE;

    v_sort_order := CASE WHEN v_is_asc THEN 'asc' ELSE 'desc' END;

    -- ========================================================================
    -- NON-NAME SORTING: Use path_tokens approach (unchanged)
    -- ========================================================================
    IF v_order_by != 'name' THEN
        RETURN QUERY EXECUTE format(
            $sql$
            WITH folders AS (
                SELECT path_tokens[$1] AS folder
                FROM storage.objects
                WHERE objects.name ILIKE $2 || '%%'
                  AND bucket_id = $3
                  AND array_length(objects.path_tokens, 1) <> $1
                GROUP BY folder
                ORDER BY folder %s
            )
            (SELECT folder AS "name",
                   NULL::uuid AS id,
                   NULL::timestamptz AS updated_at,
                   NULL::timestamptz AS created_at,
                   NULL::timestamptz AS last_accessed_at,
                   NULL::jsonb AS metadata FROM folders)
            UNION ALL
            (SELECT path_tokens[$1] AS "name",
                   id, updated_at, created_at, last_accessed_at, metadata
             FROM storage.objects
             WHERE objects.name ILIKE $2 || '%%'
               AND bucket_id = $3
               AND array_length(objects.path_tokens, 1) = $1
             ORDER BY %I %s)
            LIMIT $4 OFFSET $5
            $sql$, v_sort_order, v_order_by, v_sort_order
        ) USING levels, v_prefix, bucketname, v_limit, offsets;
        RETURN;
    END IF;

    -- ========================================================================
    -- NAME SORTING: Hybrid skip-scan with batch optimization
    -- ========================================================================

    -- Calculate upper bound for prefix filtering
    IF v_prefix_lower = '' THEN
        v_upper_bound := NULL;
    ELSIF right(v_prefix_lower, 1) = v_delimiter THEN
        v_upper_bound := left(v_prefix_lower, -1) || chr(ascii(v_delimiter) + 1);
    ELSE
        v_upper_bound := left(v_prefix_lower, -1) || chr(ascii(right(v_prefix_lower, 1)) + 1);
    END IF;

    -- Build batch query (dynamic SQL - called infrequently, amortized over many rows)
    IF v_is_asc THEN
        IF v_upper_bound IS NOT NULL THEN
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND lower(o.name) COLLATE "C" >= $2 ' ||
                'AND lower(o.name) COLLATE "C" < $3 ORDER BY lower(o.name) COLLATE "C" ASC LIMIT $4';
        ELSE
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND lower(o.name) COLLATE "C" >= $2 ' ||
                'ORDER BY lower(o.name) COLLATE "C" ASC LIMIT $4';
        END IF;
    ELSE
        IF v_upper_bound IS NOT NULL THEN
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND lower(o.name) COLLATE "C" < $2 ' ||
                'AND lower(o.name) COLLATE "C" >= $3 ORDER BY lower(o.name) COLLATE "C" DESC LIMIT $4';
        ELSE
            v_batch_query := 'SELECT o.name, o.id, o.updated_at, o.created_at, o.last_accessed_at, o.metadata ' ||
                'FROM storage.objects o WHERE o.bucket_id = $1 AND lower(o.name) COLLATE "C" < $2 ' ||
                'ORDER BY lower(o.name) COLLATE "C" DESC LIMIT $4';
        END IF;
    END IF;

    -- Initialize seek position
    IF v_is_asc THEN
        v_next_seek := v_prefix_lower;
    ELSE
        -- DESC: find the last item in range first (static SQL)
        IF v_upper_bound IS NOT NULL THEN
            SELECT o.name INTO v_peek_name FROM storage.objects o
            WHERE o.bucket_id = bucketname AND lower(o.name) COLLATE "C" >= v_prefix_lower AND lower(o.name) COLLATE "C" < v_upper_bound
            ORDER BY lower(o.name) COLLATE "C" DESC LIMIT 1;
        ELSIF v_prefix_lower <> '' THEN
            SELECT o.name INTO v_peek_name FROM storage.objects o
            WHERE o.bucket_id = bucketname AND lower(o.name) COLLATE "C" >= v_prefix_lower
            ORDER BY lower(o.name) COLLATE "C" DESC LIMIT 1;
        ELSE
            SELECT o.name INTO v_peek_name FROM storage.objects o
            WHERE o.bucket_id = bucketname
            ORDER BY lower(o.name) COLLATE "C" DESC LIMIT 1;
        END IF;

        IF v_peek_name IS NOT NULL THEN
            v_next_seek := lower(v_peek_name) || v_delimiter;
        ELSE
            RETURN;
        END IF;
    END IF;

    -- ========================================================================
    -- MAIN LOOP: Hybrid peek-then-batch algorithm
    -- Uses STATIC SQL for peek (hot path) and DYNAMIC SQL for batch
    -- ========================================================================
    LOOP
        EXIT WHEN v_count >= v_limit;

        -- STEP 1: PEEK using STATIC SQL (plan cached, very fast)
        IF v_is_asc THEN
            IF v_upper_bound IS NOT NULL THEN
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = bucketname AND lower(o.name) COLLATE "C" >= v_next_seek AND lower(o.name) COLLATE "C" < v_upper_bound
                ORDER BY lower(o.name) COLLATE "C" ASC LIMIT 1;
            ELSE
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = bucketname AND lower(o.name) COLLATE "C" >= v_next_seek
                ORDER BY lower(o.name) COLLATE "C" ASC LIMIT 1;
            END IF;
        ELSE
            IF v_upper_bound IS NOT NULL THEN
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = bucketname AND lower(o.name) COLLATE "C" < v_next_seek AND lower(o.name) COLLATE "C" >= v_prefix_lower
                ORDER BY lower(o.name) COLLATE "C" DESC LIMIT 1;
            ELSIF v_prefix_lower <> '' THEN
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = bucketname AND lower(o.name) COLLATE "C" < v_next_seek AND lower(o.name) COLLATE "C" >= v_prefix_lower
                ORDER BY lower(o.name) COLLATE "C" DESC LIMIT 1;
            ELSE
                SELECT o.name INTO v_peek_name FROM storage.objects o
                WHERE o.bucket_id = bucketname AND lower(o.name) COLLATE "C" < v_next_seek
                ORDER BY lower(o.name) COLLATE "C" DESC LIMIT 1;
            END IF;
        END IF;

        EXIT WHEN v_peek_name IS NULL;

        -- STEP 2: Check if this is a FOLDER or FILE
        v_common_prefix := storage.get_common_prefix(lower(v_peek_name), v_prefix_lower, v_delimiter);

        IF v_common_prefix IS NOT NULL THEN
            -- FOLDER: Handle offset, emit if needed, skip to next folder
            IF v_skipped < offsets THEN
                v_skipped := v_skipped + 1;
            ELSE
                name := split_part(rtrim(storage.get_common_prefix(v_peek_name, v_prefix, v_delimiter), v_delimiter), v_delimiter, levels);
                id := NULL;
                updated_at := NULL;
                created_at := NULL;
                last_accessed_at := NULL;
                metadata := NULL;
                RETURN NEXT;
                v_count := v_count + 1;
            END IF;

            -- Advance seek past the folder range
            IF v_is_asc THEN
                v_next_seek := lower(left(v_common_prefix, -1)) || chr(ascii(v_delimiter) + 1);
            ELSE
                v_next_seek := lower(v_common_prefix);
            END IF;
        ELSE
            -- FILE: Batch fetch using DYNAMIC SQL (overhead amortized over many rows)
            -- For ASC: upper_bound is the exclusive upper limit (< condition)
            -- For DESC: prefix_lower is the inclusive lower limit (>= condition)
            FOR v_current IN EXECUTE v_batch_query
                USING bucketname, v_next_seek,
                    CASE WHEN v_is_asc THEN COALESCE(v_upper_bound, v_prefix_lower) ELSE v_prefix_lower END, v_file_batch_size
            LOOP
                v_common_prefix := storage.get_common_prefix(lower(v_current.name), v_prefix_lower, v_delimiter);

                IF v_common_prefix IS NOT NULL THEN
                    -- Hit a folder: exit batch, let peek handle it
                    v_next_seek := lower(v_current.name);
                    EXIT;
                END IF;

                -- Handle offset skipping
                IF v_skipped < offsets THEN
                    v_skipped := v_skipped + 1;
                ELSE
                    -- Emit file
                    name := split_part(v_current.name, v_delimiter, levels);
                    id := v_current.id;
                    updated_at := v_current.updated_at;
                    created_at := v_current.created_at;
                    last_accessed_at := v_current.last_accessed_at;
                    metadata := v_current.metadata;
                    RETURN NEXT;
                    v_count := v_count + 1;
                END IF;

                -- Advance seek past this file
                IF v_is_asc THEN
                    v_next_seek := lower(v_current.name) || v_delimiter;
                ELSE
                    v_next_seek := lower(v_current.name);
                END IF;

                EXIT WHEN v_count >= v_limit;
            END LOOP;
        END IF;
    END LOOP;
END;
$_$;


--
-- Name: search_by_timestamp(text, text, integer, integer, text, text, text, text); Type: FUNCTION; Schema: storage; Owner: -
--

CREATE FUNCTION storage.search_by_timestamp(p_prefix text, p_bucket_id text, p_limit integer, p_level integer, p_start_after text, p_sort_order text, p_sort_column text, p_sort_column_after text) RETURNS TABLE(key text, name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql STABLE
    AS $_$
DECLARE
    v_cursor_op text;
    v_query text;
    v_prefix text;
BEGIN
    v_prefix := coalesce(p_prefix, '');

    IF p_sort_order = 'asc' THEN
        v_cursor_op := '>';
    ELSE
        v_cursor_op := '<';
    END IF;

    v_query := format($sql$
        WITH raw_objects AS (
            SELECT
                o.name AS obj_name,
                o.id AS obj_id,
                o.updated_at AS obj_updated_at,
                o.created_at AS obj_created_at,
                o.last_accessed_at AS obj_last_accessed_at,
                o.metadata AS obj_metadata,
                storage.get_common_prefix(o.name, $1, '/') AS common_prefix
            FROM storage.objects o
            WHERE o.bucket_id = $2
              AND o.name COLLATE "C" LIKE $1 || '%%'
        ),
        -- Aggregate common prefixes (folders)
        -- Both created_at and updated_at use MIN(obj_created_at) to match the old prefixes table behavior
        aggregated_prefixes AS (
            SELECT
                rtrim(common_prefix, '/') AS name,
                NULL::uuid AS id,
                MIN(obj_created_at) AS updated_at,
                MIN(obj_created_at) AS created_at,
                NULL::timestamptz AS last_accessed_at,
                NULL::jsonb AS metadata,
                TRUE AS is_prefix
            FROM raw_objects
            WHERE common_prefix IS NOT NULL
            GROUP BY common_prefix
        ),
        leaf_objects AS (
            SELECT
                obj_name AS name,
                obj_id AS id,
                obj_updated_at AS updated_at,
                obj_created_at AS created_at,
                obj_last_accessed_at AS last_accessed_at,
                obj_metadata AS metadata,
                FALSE AS is_prefix
            FROM raw_objects
            WHERE common_prefix IS NULL
        ),
        combined AS (
            SELECT * FROM aggregated_prefixes
            UNION ALL
            SELECT * FROM leaf_objects
        ),
        filtered AS (
            SELECT *
            FROM combined
            WHERE (
                $5 = ''
                OR ROW(
                    date_trunc('milliseconds', %I),
                    name COLLATE "C"
                ) %s ROW(
                    COALESCE(NULLIF($6, '')::timestamptz, 'epoch'::timestamptz),
                    $5
                )
            )
        )
        SELECT
            split_part(name, '/', $3) AS key,
            name,
            id,
            updated_at,
            created_at,
            last_accessed_at,
            metadata
        FROM filtered
        ORDER BY
            COALESCE(date_trunc('milliseconds', %I), 'epoch'::timestamptz) %s,
            name COLLATE "C" %s
        LIMIT $4
    $sql$,
        p_sort_column,
        v_cursor_op,
        p_sort_column,
        p_sort_order,
        p_sort_order
    );

    RETURN QUERY EXECUTE v_query
    USING v_prefix, p_bucket_id, p_level, p_limit, p_start_after, p_sort_column_after;
END;
$_$;


--
-- Name: search_v2(text, text, integer, integer, text, text, text, text); Type: FUNCTION; Schema: storage; Owner: -
--

CREATE FUNCTION storage.search_v2(prefix text, bucket_name text, limits integer DEFAULT 100, levels integer DEFAULT 1, start_after text DEFAULT ''::text, sort_order text DEFAULT 'asc'::text, sort_column text DEFAULT 'name'::text, sort_column_after text DEFAULT ''::text) RETURNS TABLE(key text, name text, id uuid, updated_at timestamp with time zone, created_at timestamp with time zone, last_accessed_at timestamp with time zone, metadata jsonb)
    LANGUAGE plpgsql STABLE
    AS $$
DECLARE
    v_sort_col text;
    v_sort_ord text;
    v_limit int;
BEGIN
    -- Cap limit to maximum of 1500 records
    v_limit := LEAST(coalesce(limits, 100), 1500);

    -- Validate and normalize sort_order
    v_sort_ord := lower(coalesce(sort_order, 'asc'));
    IF v_sort_ord NOT IN ('asc', 'desc') THEN
        v_sort_ord := 'asc';
    END IF;

    -- Validate and normalize sort_column
    v_sort_col := lower(coalesce(sort_column, 'name'));
    IF v_sort_col NOT IN ('name', 'updated_at', 'created_at') THEN
        v_sort_col := 'name';
    END IF;

    -- Route to appropriate implementation
    IF v_sort_col = 'name' THEN
        -- Use list_objects_with_delimiter for name sorting (most efficient: O(k * log n))
        RETURN QUERY
        SELECT
            split_part(l.name, '/', levels) AS key,
            l.name AS name,
            l.id,
            l.updated_at,
            l.created_at,
            l.last_accessed_at,
            l.metadata
        FROM storage.list_objects_with_delimiter(
            bucket_name,
            coalesce(prefix, ''),
            '/',
            v_limit,
            start_after,
            '',
            v_sort_ord
        ) l;
    ELSE
        -- Use aggregation approach for timestamp sorting
        -- Not efficient for large datasets but supports correct pagination
        RETURN QUERY SELECT * FROM storage.search_by_timestamp(
            prefix, bucket_name, v_limit, levels, start_after,
            v_sort_ord, v_sort_col, sort_column_after
        );
    END IF;
END;
$$;


--
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: storage; Owner: -
--

CREATE FUNCTION storage.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW; 
END;
$$;


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: audit_log_entries; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.audit_log_entries (
    instance_id uuid,
    id uuid NOT NULL,
    payload json,
    created_at timestamp with time zone,
    ip_address character varying(64) DEFAULT ''::character varying NOT NULL
);


--
-- Name: TABLE audit_log_entries; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE auth.audit_log_entries IS 'Auth: Audit trail for user actions.';


--
-- Name: custom_oauth_providers; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.custom_oauth_providers (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    provider_type text NOT NULL,
    identifier text NOT NULL,
    name text NOT NULL,
    client_id text NOT NULL,
    client_secret text NOT NULL,
    acceptable_client_ids text[] DEFAULT '{}'::text[] NOT NULL,
    scopes text[] DEFAULT '{}'::text[] NOT NULL,
    pkce_enabled boolean DEFAULT true NOT NULL,
    attribute_mapping jsonb DEFAULT '{}'::jsonb NOT NULL,
    authorization_params jsonb DEFAULT '{}'::jsonb NOT NULL,
    enabled boolean DEFAULT true NOT NULL,
    email_optional boolean DEFAULT false NOT NULL,
    issuer text,
    discovery_url text,
    skip_nonce_check boolean DEFAULT false NOT NULL,
    cached_discovery jsonb,
    discovery_cached_at timestamp with time zone,
    authorization_url text,
    token_url text,
    userinfo_url text,
    jwks_uri text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    custom_claims_allowlist text[] DEFAULT '{}'::text[] NOT NULL,
    CONSTRAINT custom_oauth_providers_authorization_url_https CHECK (((authorization_url IS NULL) OR (authorization_url ~~ 'https://%'::text))),
    CONSTRAINT custom_oauth_providers_authorization_url_length CHECK (((authorization_url IS NULL) OR (char_length(authorization_url) <= 2048))),
    CONSTRAINT custom_oauth_providers_client_id_length CHECK (((char_length(client_id) >= 1) AND (char_length(client_id) <= 512))),
    CONSTRAINT custom_oauth_providers_discovery_url_length CHECK (((discovery_url IS NULL) OR (char_length(discovery_url) <= 2048))),
    CONSTRAINT custom_oauth_providers_identifier_format CHECK ((identifier ~ '^[a-z0-9][a-z0-9:-]{0,48}[a-z0-9]$'::text)),
    CONSTRAINT custom_oauth_providers_issuer_length CHECK (((issuer IS NULL) OR ((char_length(issuer) >= 1) AND (char_length(issuer) <= 2048)))),
    CONSTRAINT custom_oauth_providers_jwks_uri_https CHECK (((jwks_uri IS NULL) OR (jwks_uri ~~ 'https://%'::text))),
    CONSTRAINT custom_oauth_providers_jwks_uri_length CHECK (((jwks_uri IS NULL) OR (char_length(jwks_uri) <= 2048))),
    CONSTRAINT custom_oauth_providers_name_length CHECK (((char_length(name) >= 1) AND (char_length(name) <= 100))),
    CONSTRAINT custom_oauth_providers_oauth2_requires_endpoints CHECK (((provider_type <> 'oauth2'::text) OR ((authorization_url IS NOT NULL) AND (token_url IS NOT NULL) AND (userinfo_url IS NOT NULL)))),
    CONSTRAINT custom_oauth_providers_oidc_discovery_url_https CHECK (((provider_type <> 'oidc'::text) OR (discovery_url IS NULL) OR (discovery_url ~~ 'https://%'::text))),
    CONSTRAINT custom_oauth_providers_oidc_issuer_https CHECK (((provider_type <> 'oidc'::text) OR (issuer IS NULL) OR (issuer ~~ 'https://%'::text))),
    CONSTRAINT custom_oauth_providers_oidc_requires_issuer CHECK (((provider_type <> 'oidc'::text) OR (issuer IS NOT NULL))),
    CONSTRAINT custom_oauth_providers_provider_type_check CHECK ((provider_type = ANY (ARRAY['oauth2'::text, 'oidc'::text]))),
    CONSTRAINT custom_oauth_providers_token_url_https CHECK (((token_url IS NULL) OR (token_url ~~ 'https://%'::text))),
    CONSTRAINT custom_oauth_providers_token_url_length CHECK (((token_url IS NULL) OR (char_length(token_url) <= 2048))),
    CONSTRAINT custom_oauth_providers_userinfo_url_https CHECK (((userinfo_url IS NULL) OR (userinfo_url ~~ 'https://%'::text))),
    CONSTRAINT custom_oauth_providers_userinfo_url_length CHECK (((userinfo_url IS NULL) OR (char_length(userinfo_url) <= 2048)))
);


--
-- Name: flow_state; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.flow_state (
    id uuid NOT NULL,
    user_id uuid,
    auth_code text,
    code_challenge_method auth.code_challenge_method,
    code_challenge text,
    provider_type text NOT NULL,
    provider_access_token text,
    provider_refresh_token text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    authentication_method text NOT NULL,
    auth_code_issued_at timestamp with time zone,
    invite_token text,
    referrer text,
    oauth_client_state_id uuid,
    linking_target_id uuid,
    email_optional boolean DEFAULT false NOT NULL
);


--
-- Name: TABLE flow_state; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE auth.flow_state IS 'Stores metadata for all OAuth/SSO login flows';


--
-- Name: identities; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.identities (
    provider_id text NOT NULL,
    user_id uuid NOT NULL,
    identity_data jsonb NOT NULL,
    provider text NOT NULL,
    last_sign_in_at timestamp with time zone,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    email text GENERATED ALWAYS AS (lower((identity_data ->> 'email'::text))) STORED,
    id uuid DEFAULT gen_random_uuid() NOT NULL
);


--
-- Name: TABLE identities; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE auth.identities IS 'Auth: Stores identities associated to a user.';


--
-- Name: COLUMN identities.email; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON COLUMN auth.identities.email IS 'Auth: Email is a generated column that references the optional email property in the identity_data';


--
-- Name: instances; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.instances (
    id uuid NOT NULL,
    uuid uuid,
    raw_base_config text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone
);


--
-- Name: TABLE instances; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE auth.instances IS 'Auth: Manages users across multiple sites.';


--
-- Name: mfa_amr_claims; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.mfa_amr_claims (
    session_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    authentication_method text NOT NULL,
    id uuid NOT NULL
);


--
-- Name: TABLE mfa_amr_claims; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE auth.mfa_amr_claims IS 'auth: stores authenticator method reference claims for multi factor authentication';


--
-- Name: mfa_challenges; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.mfa_challenges (
    id uuid NOT NULL,
    factor_id uuid NOT NULL,
    created_at timestamp with time zone NOT NULL,
    verified_at timestamp with time zone,
    ip_address inet NOT NULL,
    otp_code text,
    web_authn_session_data jsonb
);


--
-- Name: TABLE mfa_challenges; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE auth.mfa_challenges IS 'auth: stores metadata about challenge requests made';


--
-- Name: mfa_factors; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.mfa_factors (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    friendly_name text,
    factor_type auth.factor_type NOT NULL,
    status auth.factor_status NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    secret text,
    phone text,
    last_challenged_at timestamp with time zone,
    web_authn_credential jsonb,
    web_authn_aaguid uuid,
    last_webauthn_challenge_data jsonb
);


--
-- Name: TABLE mfa_factors; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE auth.mfa_factors IS 'auth: stores metadata about factors';


--
-- Name: COLUMN mfa_factors.last_webauthn_challenge_data; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON COLUMN auth.mfa_factors.last_webauthn_challenge_data IS 'Stores the latest WebAuthn challenge data including attestation/assertion for customer verification';


--
-- Name: oauth_authorizations; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.oauth_authorizations (
    id uuid NOT NULL,
    authorization_id text NOT NULL,
    client_id uuid NOT NULL,
    user_id uuid,
    redirect_uri text NOT NULL,
    scope text NOT NULL,
    state text,
    resource text,
    code_challenge text,
    code_challenge_method auth.code_challenge_method,
    response_type auth.oauth_response_type DEFAULT 'code'::auth.oauth_response_type NOT NULL,
    status auth.oauth_authorization_status DEFAULT 'pending'::auth.oauth_authorization_status NOT NULL,
    authorization_code text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    expires_at timestamp with time zone DEFAULT (now() + '00:03:00'::interval) NOT NULL,
    approved_at timestamp with time zone,
    nonce text,
    CONSTRAINT oauth_authorizations_authorization_code_length CHECK ((char_length(authorization_code) <= 255)),
    CONSTRAINT oauth_authorizations_code_challenge_length CHECK ((char_length(code_challenge) <= 128)),
    CONSTRAINT oauth_authorizations_expires_at_future CHECK ((expires_at > created_at)),
    CONSTRAINT oauth_authorizations_nonce_length CHECK ((char_length(nonce) <= 255)),
    CONSTRAINT oauth_authorizations_redirect_uri_length CHECK ((char_length(redirect_uri) <= 2048)),
    CONSTRAINT oauth_authorizations_resource_length CHECK ((char_length(resource) <= 2048)),
    CONSTRAINT oauth_authorizations_scope_length CHECK ((char_length(scope) <= 4096)),
    CONSTRAINT oauth_authorizations_state_length CHECK ((char_length(state) <= 4096))
);


--
-- Name: oauth_client_states; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.oauth_client_states (
    id uuid NOT NULL,
    provider_type text NOT NULL,
    code_verifier text,
    created_at timestamp with time zone NOT NULL
);


--
-- Name: TABLE oauth_client_states; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE auth.oauth_client_states IS 'Stores OAuth states for third-party provider authentication flows where Supabase acts as the OAuth client.';


--
-- Name: oauth_clients; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.oauth_clients (
    id uuid NOT NULL,
    client_secret_hash text,
    registration_type auth.oauth_registration_type NOT NULL,
    redirect_uris text NOT NULL,
    grant_types text NOT NULL,
    client_name text,
    client_uri text,
    logo_uri text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    deleted_at timestamp with time zone,
    client_type auth.oauth_client_type DEFAULT 'confidential'::auth.oauth_client_type NOT NULL,
    token_endpoint_auth_method text NOT NULL,
    CONSTRAINT oauth_clients_client_name_length CHECK ((char_length(client_name) <= 1024)),
    CONSTRAINT oauth_clients_client_uri_length CHECK ((char_length(client_uri) <= 2048)),
    CONSTRAINT oauth_clients_logo_uri_length CHECK ((char_length(logo_uri) <= 2048)),
    CONSTRAINT oauth_clients_token_endpoint_auth_method_check CHECK ((token_endpoint_auth_method = ANY (ARRAY['client_secret_basic'::text, 'client_secret_post'::text, 'none'::text])))
);


--
-- Name: oauth_consents; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.oauth_consents (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    client_id uuid NOT NULL,
    scopes text NOT NULL,
    granted_at timestamp with time zone DEFAULT now() NOT NULL,
    revoked_at timestamp with time zone,
    CONSTRAINT oauth_consents_revoked_after_granted CHECK (((revoked_at IS NULL) OR (revoked_at >= granted_at))),
    CONSTRAINT oauth_consents_scopes_length CHECK ((char_length(scopes) <= 2048)),
    CONSTRAINT oauth_consents_scopes_not_empty CHECK ((char_length(TRIM(BOTH FROM scopes)) > 0))
);


--
-- Name: one_time_tokens; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.one_time_tokens (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    token_type auth.one_time_token_type NOT NULL,
    token_hash text NOT NULL,
    relates_to text NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    CONSTRAINT one_time_tokens_token_hash_check CHECK ((char_length(token_hash) > 0))
);


--
-- Name: refresh_tokens; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.refresh_tokens (
    instance_id uuid,
    id bigint NOT NULL,
    token character varying(255),
    user_id character varying(255),
    revoked boolean,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    parent character varying(255),
    session_id uuid
);


--
-- Name: TABLE refresh_tokens; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE auth.refresh_tokens IS 'Auth: Store of tokens used to refresh JWT tokens once they expire.';


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE; Schema: auth; Owner: -
--

CREATE SEQUENCE auth.refresh_tokens_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE OWNED BY; Schema: auth; Owner: -
--

ALTER SEQUENCE auth.refresh_tokens_id_seq OWNED BY auth.refresh_tokens.id;


--
-- Name: saml_providers; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.saml_providers (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    entity_id text NOT NULL,
    metadata_xml text NOT NULL,
    metadata_url text,
    attribute_mapping jsonb,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    name_id_format text,
    CONSTRAINT "entity_id not empty" CHECK ((char_length(entity_id) > 0)),
    CONSTRAINT "metadata_url not empty" CHECK (((metadata_url = NULL::text) OR (char_length(metadata_url) > 0))),
    CONSTRAINT "metadata_xml not empty" CHECK ((char_length(metadata_xml) > 0))
);


--
-- Name: TABLE saml_providers; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE auth.saml_providers IS 'Auth: Manages SAML Identity Provider connections.';


--
-- Name: saml_relay_states; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.saml_relay_states (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    request_id text NOT NULL,
    for_email text,
    redirect_to text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    flow_state_id uuid,
    CONSTRAINT "request_id not empty" CHECK ((char_length(request_id) > 0))
);


--
-- Name: TABLE saml_relay_states; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE auth.saml_relay_states IS 'Auth: Contains SAML Relay State information for each Service Provider initiated login.';


--
-- Name: schema_migrations; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.schema_migrations (
    version character varying(255) NOT NULL
);


--
-- Name: TABLE schema_migrations; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE auth.schema_migrations IS 'Auth: Manages updates to the auth system.';


--
-- Name: sessions; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.sessions (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    factor_id uuid,
    aal auth.aal_level,
    not_after timestamp with time zone,
    refreshed_at timestamp without time zone,
    user_agent text,
    ip inet,
    tag text,
    oauth_client_id uuid,
    refresh_token_hmac_key text,
    refresh_token_counter bigint,
    scopes text,
    CONSTRAINT sessions_scopes_length CHECK ((char_length(scopes) <= 4096))
);


--
-- Name: TABLE sessions; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE auth.sessions IS 'Auth: Stores session data associated to a user.';


--
-- Name: COLUMN sessions.not_after; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON COLUMN auth.sessions.not_after IS 'Auth: Not after is a nullable column that contains a timestamp after which the session should be regarded as expired.';


--
-- Name: COLUMN sessions.refresh_token_hmac_key; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON COLUMN auth.sessions.refresh_token_hmac_key IS 'Holds a HMAC-SHA256 key used to sign refresh tokens for this session.';


--
-- Name: COLUMN sessions.refresh_token_counter; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON COLUMN auth.sessions.refresh_token_counter IS 'Holds the ID (counter) of the last issued refresh token.';


--
-- Name: sso_domains; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.sso_domains (
    id uuid NOT NULL,
    sso_provider_id uuid NOT NULL,
    domain text NOT NULL,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    CONSTRAINT "domain not empty" CHECK ((char_length(domain) > 0))
);


--
-- Name: TABLE sso_domains; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE auth.sso_domains IS 'Auth: Manages SSO email address domain mapping to an SSO Identity Provider.';


--
-- Name: sso_providers; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.sso_providers (
    id uuid NOT NULL,
    resource_id text,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    disabled boolean,
    CONSTRAINT "resource_id not empty" CHECK (((resource_id = NULL::text) OR (char_length(resource_id) > 0)))
);


--
-- Name: TABLE sso_providers; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE auth.sso_providers IS 'Auth: Manages SSO identity provider information; see saml_providers for SAML.';


--
-- Name: COLUMN sso_providers.resource_id; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON COLUMN auth.sso_providers.resource_id IS 'Auth: Uniquely identifies a SSO provider according to a user-chosen resource ID (case insensitive), useful in infrastructure as code.';


--
-- Name: users; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.users (
    instance_id uuid,
    id uuid NOT NULL,
    aud character varying(255),
    role character varying(255),
    email character varying(255),
    encrypted_password character varying(255),
    email_confirmed_at timestamp with time zone,
    invited_at timestamp with time zone,
    confirmation_token character varying(255),
    confirmation_sent_at timestamp with time zone,
    recovery_token character varying(255),
    recovery_sent_at timestamp with time zone,
    email_change_token_new character varying(255),
    email_change character varying(255),
    email_change_sent_at timestamp with time zone,
    last_sign_in_at timestamp with time zone,
    raw_app_meta_data jsonb,
    raw_user_meta_data jsonb,
    is_super_admin boolean,
    created_at timestamp with time zone,
    updated_at timestamp with time zone,
    phone text DEFAULT NULL::character varying,
    phone_confirmed_at timestamp with time zone,
    phone_change text DEFAULT ''::character varying,
    phone_change_token character varying(255) DEFAULT ''::character varying,
    phone_change_sent_at timestamp with time zone,
    confirmed_at timestamp with time zone GENERATED ALWAYS AS (LEAST(email_confirmed_at, phone_confirmed_at)) STORED,
    email_change_token_current character varying(255) DEFAULT ''::character varying,
    email_change_confirm_status smallint DEFAULT 0,
    banned_until timestamp with time zone,
    reauthentication_token character varying(255) DEFAULT ''::character varying,
    reauthentication_sent_at timestamp with time zone,
    is_sso_user boolean DEFAULT false NOT NULL,
    deleted_at timestamp with time zone,
    is_anonymous boolean DEFAULT false NOT NULL,
    CONSTRAINT users_email_change_confirm_status_check CHECK (((email_change_confirm_status >= 0) AND (email_change_confirm_status <= 2)))
);


--
-- Name: TABLE users; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON TABLE auth.users IS 'Auth: Stores user login data within a secure schema.';


--
-- Name: COLUMN users.is_sso_user; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON COLUMN auth.users.is_sso_user IS 'Auth: Set this column to true when the account comes from SSO. These accounts can have duplicate emails.';


--
-- Name: webauthn_challenges; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.webauthn_challenges (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid,
    challenge_type text NOT NULL,
    session_data jsonb NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    expires_at timestamp with time zone NOT NULL,
    CONSTRAINT webauthn_challenges_challenge_type_check CHECK ((challenge_type = ANY (ARRAY['signup'::text, 'registration'::text, 'authentication'::text])))
);


--
-- Name: webauthn_credentials; Type: TABLE; Schema: auth; Owner: -
--

CREATE TABLE auth.webauthn_credentials (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    credential_id bytea NOT NULL,
    public_key bytea NOT NULL,
    attestation_type text DEFAULT ''::text NOT NULL,
    aaguid uuid,
    sign_count bigint DEFAULT 0 NOT NULL,
    transports jsonb DEFAULT '[]'::jsonb NOT NULL,
    backup_eligible boolean DEFAULT false NOT NULL,
    backed_up boolean DEFAULT false NOT NULL,
    friendly_name text DEFAULT ''::text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    last_used_at timestamp with time zone
);


--
-- Name: assessments; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.assessments (
    id bigint NOT NULL,
    child_id uuid,
    emotion_score integer,
    cognitive_score integer,
    self_awareness_score integer,
    math_score integer,
    total_score integer,
    predicted_level integer,
    created_at timestamp without time zone DEFAULT now(),
    recommendation text,
    confidence double precision,
    emotion_level integer,
    cognitive_level integer,
    self_awareness_level integer,
    math_level integer,
    main_support_area text,
    strongest_area text
);


--
-- Name: assessments_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.assessments ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.assessments_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: children; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.children (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    parent_id uuid,
    child_name text,
    age integer,
    gender text,
    created_at timestamp without time zone DEFAULT now()
);


--
-- Name: game_scores; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.game_scores (
    id bigint NOT NULL,
    child_id uuid,
    game_id bigint,
    final_score integer,
    correct_answers integer,
    wrong_answers integer,
    time_taken integer,
    played_at timestamp without time zone DEFAULT now(),
    attempts integer DEFAULT 0,
    area text,
    level integer
);


--
-- Name: game_scores_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.game_scores ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.game_scores_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: games; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.games (
    id bigint NOT NULL,
    area text,
    game_name text,
    level integer,
    game_slug text,
    description text,
    is_active boolean DEFAULT true
);


--
-- Name: games_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.games ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.games_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: parents; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.parents (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    full_name text,
    email text,
    created_at timestamp without time zone DEFAULT now()
);


--
-- Name: survey_questions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.survey_questions (
    id bigint NOT NULL,
    area text,
    question text,
    sort_order integer,
    is_active boolean DEFAULT true
);


--
-- Name: survey_questions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.survey_questions ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.survey_questions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: survey_responses; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.survey_responses (
    id bigint NOT NULL,
    child_id uuid,
    question_id bigint,
    answer_score integer,
    created_at timestamp without time zone DEFAULT now(),
    assessment_id bigint
);


--
-- Name: survey_responses_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

ALTER TABLE public.survey_responses ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.survey_responses_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: messages; Type: TABLE; Schema: realtime; Owner: -
--

CREATE TABLE realtime.messages (
    topic text NOT NULL,
    extension text NOT NULL,
    payload jsonb,
    event text,
    private boolean DEFAULT false,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    inserted_at timestamp without time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    binary_payload bytea
)
PARTITION BY RANGE (inserted_at);


--
-- Name: schema_migrations; Type: TABLE; Schema: realtime; Owner: -
--

CREATE TABLE realtime.schema_migrations (
    version bigint NOT NULL,
    inserted_at timestamp(0) without time zone DEFAULT now()
);


--
-- Name: subscription; Type: TABLE; Schema: realtime; Owner: -
--

CREATE TABLE realtime.subscription (
    id bigint NOT NULL,
    subscription_id uuid NOT NULL,
    entity regclass NOT NULL,
    filters realtime.user_defined_filter[] DEFAULT '{}'::realtime.user_defined_filter[] NOT NULL,
    claims jsonb NOT NULL,
    claims_role regrole GENERATED ALWAYS AS (realtime.to_regrole((claims ->> 'role'::text))) STORED NOT NULL,
    created_at timestamp without time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    action_filter text DEFAULT '*'::text,
    selected_columns text[],
    CONSTRAINT subscription_action_filter_check CHECK ((action_filter = ANY (ARRAY['*'::text, 'INSERT'::text, 'UPDATE'::text, 'DELETE'::text])))
);


--
-- Name: subscription_id_seq; Type: SEQUENCE; Schema: realtime; Owner: -
--

ALTER TABLE realtime.subscription ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME realtime.subscription_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: buckets; Type: TABLE; Schema: storage; Owner: -
--

CREATE TABLE storage.buckets (
    id text NOT NULL,
    name text NOT NULL,
    owner uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    public boolean DEFAULT false,
    avif_autodetection boolean DEFAULT false,
    file_size_limit bigint,
    allowed_mime_types text[],
    owner_id text,
    type storage.buckettype DEFAULT 'STANDARD'::storage.buckettype NOT NULL
);


--
-- Name: COLUMN buckets.owner; Type: COMMENT; Schema: storage; Owner: -
--

COMMENT ON COLUMN storage.buckets.owner IS 'Field is deprecated, use owner_id instead';


--
-- Name: buckets_analytics; Type: TABLE; Schema: storage; Owner: -
--

CREATE TABLE storage.buckets_analytics (
    name text NOT NULL,
    type storage.buckettype DEFAULT 'ANALYTICS'::storage.buckettype NOT NULL,
    format text DEFAULT 'ICEBERG'::text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    deleted_at timestamp with time zone
);


--
-- Name: buckets_vectors; Type: TABLE; Schema: storage; Owner: -
--

CREATE TABLE storage.buckets_vectors (
    id text NOT NULL,
    type storage.buckettype DEFAULT 'VECTOR'::storage.buckettype NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: migrations; Type: TABLE; Schema: storage; Owner: -
--

CREATE TABLE storage.migrations (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    hash character varying(40) NOT NULL,
    executed_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


--
-- Name: objects; Type: TABLE; Schema: storage; Owner: -
--

CREATE TABLE storage.objects (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    bucket_id text,
    name text,
    owner uuid,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    last_accessed_at timestamp with time zone DEFAULT now(),
    metadata jsonb,
    path_tokens text[] GENERATED ALWAYS AS (string_to_array(name, '/'::text)) STORED,
    version text,
    owner_id text,
    user_metadata jsonb
);


--
-- Name: COLUMN objects.owner; Type: COMMENT; Schema: storage; Owner: -
--

COMMENT ON COLUMN storage.objects.owner IS 'Field is deprecated, use owner_id instead';


--
-- Name: s3_multipart_uploads; Type: TABLE; Schema: storage; Owner: -
--

CREATE TABLE storage.s3_multipart_uploads (
    id text NOT NULL,
    in_progress_size bigint DEFAULT 0 NOT NULL,
    upload_signature text NOT NULL,
    bucket_id text NOT NULL,
    key text NOT NULL COLLATE pg_catalog."C",
    version text NOT NULL,
    owner_id text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    user_metadata jsonb,
    metadata jsonb
);


--
-- Name: s3_multipart_uploads_parts; Type: TABLE; Schema: storage; Owner: -
--

CREATE TABLE storage.s3_multipart_uploads_parts (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    upload_id text NOT NULL,
    size bigint DEFAULT 0 NOT NULL,
    part_number integer NOT NULL,
    bucket_id text NOT NULL,
    key text NOT NULL COLLATE pg_catalog."C",
    etag text NOT NULL,
    owner_id text,
    version text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: vector_indexes; Type: TABLE; Schema: storage; Owner: -
--

CREATE TABLE storage.vector_indexes (
    id text DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL COLLATE pg_catalog."C",
    bucket_id text NOT NULL,
    data_type text NOT NULL,
    dimension integer NOT NULL,
    distance_metric text NOT NULL,
    metadata_configuration jsonb,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: refresh_tokens id; Type: DEFAULT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.refresh_tokens ALTER COLUMN id SET DEFAULT nextval('auth.refresh_tokens_id_seq'::regclass);


--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.audit_log_entries (instance_id, id, payload, created_at, ip_address) FROM stdin;
\.


--
-- Data for Name: custom_oauth_providers; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.custom_oauth_providers (id, provider_type, identifier, name, client_id, client_secret, acceptable_client_ids, scopes, pkce_enabled, attribute_mapping, authorization_params, enabled, email_optional, issuer, discovery_url, skip_nonce_check, cached_discovery, discovery_cached_at, authorization_url, token_url, userinfo_url, jwks_uri, created_at, updated_at, custom_claims_allowlist) FROM stdin;
\.


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.flow_state (id, user_id, auth_code, code_challenge_method, code_challenge, provider_type, provider_access_token, provider_refresh_token, created_at, updated_at, authentication_method, auth_code_issued_at, invite_token, referrer, oauth_client_state_id, linking_target_id, email_optional) FROM stdin;
\.


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.identities (provider_id, user_id, identity_data, provider, last_sign_in_at, created_at, updated_at, id) FROM stdin;
11d46c3d-4a69-4a3a-ad2d-208a5ac2efba	11d46c3d-4a69-4a3a-ad2d-208a5ac2efba	{"sub": "11d46c3d-4a69-4a3a-ad2d-208a5ac2efba", "email": "educationteam061@gmail.com", "full_name": "educationteam061@gmail.com", "email_verified": true, "phone_verified": false}	email	2026-07-25 16:45:10.618816+00	2026-07-25 16:45:10.618865+00	2026-07-25 16:45:10.618865+00	9f951eb7-f452-4076-be75-9c237e5fc6c1
7b5de404-6dd3-4b43-a673-5f31c23f4b4b	7b5de404-6dd3-4b43-a673-5f31c23f4b4b	{"sub": "7b5de404-6dd3-4b43-a673-5f31c23f4b4b", "email": "education567purpose@gmail.com", "full_name": "education purpose", "email_verified": true, "phone_verified": false}	email	2026-07-29 22:02:30.043848+00	2026-07-29 22:02:30.04391+00	2026-07-29 22:02:30.04391+00	9ed53c19-3fbb-41c0-82e9-361fa46baf13
25c29867-fa04-472e-8dd3-27cfd90598c0	25c29867-fa04-472e-8dd3-27cfd90598c0	{"sub": "25c29867-fa04-472e-8dd3-27cfd90598c0", "email": "pathiranamelaka@gmail.com", "full_name": "pathiranamelaka@gmail.com", "email_verified": true, "phone_verified": false}	email	2026-07-30 18:30:10.136334+00	2026-07-30 18:30:10.136387+00	2026-07-30 18:30:10.136387+00	0ea9241b-91bc-458c-8510-59fb1a18f4f8
babf6a78-a12a-4814-b030-83d6a251c117	babf6a78-a12a-4814-b030-83d6a251c117	{"sub": "babf6a78-a12a-4814-b030-83d6a251c117", "email": "ranatunga.lk@gmail.com", "full_name": "Prasad RANATUNGA", "email_verified": true, "phone_verified": false}	email	2026-08-07 01:38:27.433125+00	2026-08-07 01:38:27.433834+00	2026-08-07 01:38:27.433834+00	e9d0359f-e27e-41b9-a420-e8501b7b4ce0
\.


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.instances (id, uuid, raw_base_config, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.mfa_amr_claims (session_id, created_at, updated_at, authentication_method, id) FROM stdin;
b2d59dc9-bd95-48fb-b20c-78361e6675e1	2026-07-30 06:05:27.922639+00	2026-07-30 06:05:27.922639+00	otp	e66a020a-26bd-4315-a4d5-ab4038c8ae43
a28a8c32-7c82-4a25-a7e3-1234344db662	2026-07-30 18:31:55.256981+00	2026-07-30 18:31:55.256981+00	otp	894355b8-de71-47e4-b065-349d77f51e7e
caa99351-5d82-43cd-81c4-9d1549732a29	2026-08-04 18:03:21.015439+00	2026-08-04 18:03:21.015439+00	password	871bb879-b655-45ab-aa41-84266d85680d
78567c90-e3b9-47a8-b109-b850a3eb98bc	2026-08-06 19:10:37.855473+00	2026-08-06 19:10:37.855473+00	password	c648bcd8-26d9-4b38-ba6d-986de4c01dd1
db5565cd-34ab-4385-afee-678ec7e54e36	2026-08-07 01:39:42.073409+00	2026-08-07 01:39:42.073409+00	otp	9b194e5c-928e-4c5c-b04d-0b912d869693
\.


--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.mfa_challenges (id, factor_id, created_at, verified_at, ip_address, otp_code, web_authn_session_data) FROM stdin;
\.


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.mfa_factors (id, user_id, friendly_name, factor_type, status, created_at, updated_at, secret, phone, last_challenged_at, web_authn_credential, web_authn_aaguid, last_webauthn_challenge_data) FROM stdin;
\.


--
-- Data for Name: oauth_authorizations; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.oauth_authorizations (id, authorization_id, client_id, user_id, redirect_uri, scope, state, resource, code_challenge, code_challenge_method, response_type, status, authorization_code, created_at, expires_at, approved_at, nonce) FROM stdin;
\.


--
-- Data for Name: oauth_client_states; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.oauth_client_states (id, provider_type, code_verifier, created_at) FROM stdin;
\.


--
-- Data for Name: oauth_clients; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.oauth_clients (id, client_secret_hash, registration_type, redirect_uris, grant_types, client_name, client_uri, logo_uri, created_at, updated_at, deleted_at, client_type, token_endpoint_auth_method) FROM stdin;
\.


--
-- Data for Name: oauth_consents; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.oauth_consents (id, user_id, client_id, scopes, granted_at, revoked_at) FROM stdin;
\.


--
-- Data for Name: one_time_tokens; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.one_time_tokens (id, user_id, token_type, token_hash, relates_to, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.refresh_tokens (instance_id, id, token, user_id, revoked, created_at, updated_at, parent, session_id) FROM stdin;
00000000-0000-0000-0000-000000000000	259	4g5hol5z22t2	c93ee442-2d01-44ff-85d7-ebfad396f60b	f	2026-07-30 06:05:27.906644+00	2026-07-30 06:05:27.906644+00	\N	b2d59dc9-bd95-48fb-b20c-78361e6675e1
00000000-0000-0000-0000-000000000000	263	z3ewjfxj2y43	25c29867-fa04-472e-8dd3-27cfd90598c0	f	2026-07-30 18:31:55.251816+00	2026-07-30 18:31:55.251816+00	\N	a28a8c32-7c82-4a25-a7e3-1234344db662
00000000-0000-0000-0000-000000000000	277	2qcz4akgka7b	d33c063d-6faa-414a-8b0a-25656dadf5f1	f	2026-08-04 18:03:20.977861+00	2026-08-04 18:03:20.977861+00	\N	caa99351-5d82-43cd-81c4-9d1549732a29
00000000-0000-0000-0000-000000000000	280	nlzul3evsiax	4d350c11-7ff8-4070-b46e-fc4fe2d9558b	f	2026-08-06 19:10:37.846398+00	2026-08-06 19:10:37.846398+00	\N	78567c90-e3b9-47a8-b109-b850a3eb98bc
00000000-0000-0000-0000-000000000000	281	niberqeqgbda	babf6a78-a12a-4814-b030-83d6a251c117	f	2026-08-07 01:39:42.04779+00	2026-08-07 01:39:42.04779+00	\N	db5565cd-34ab-4385-afee-678ec7e54e36
\.


--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.saml_providers (id, sso_provider_id, entity_id, metadata_xml, metadata_url, attribute_mapping, created_at, updated_at, name_id_format) FROM stdin;
\.


--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.saml_relay_states (id, sso_provider_id, request_id, for_email, redirect_to, created_at, updated_at, flow_state_id) FROM stdin;
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.schema_migrations (version) FROM stdin;
20171026211738
20171026211808
20171026211834
20180103212743
20180108183307
20180119214651
20180125194653
00
20210710035447
20210722035447
20210730183235
20210909172000
20210927181326
20211122151130
20211124214934
20211202183645
20220114185221
20220114185340
20220224000811
20220323170000
20220429102000
20220531120530
20220614074223
20220811173540
20221003041349
20221003041400
20221011041400
20221020193600
20221021073300
20221021082433
20221027105023
20221114143122
20221114143410
20221125140132
20221208132122
20221215195500
20221215195800
20221215195900
20230116124310
20230116124412
20230131181311
20230322519590
20230402418590
20230411005111
20230508135423
20230523124323
20230818113222
20230914180801
20231027141322
20231114161723
20231117164230
20240115144230
20240214120130
20240306115329
20240314092811
20240427152123
20240612123726
20240729123726
20240802193726
20240806073726
20241009103726
20250717082212
20250731150234
20250804100000
20250901200500
20250903112500
20250904133000
20250925093508
20251007112900
20251104100000
20251111201300
20251201000000
20260115000000
20260121000000
20260219120000
20260302000000
20260625000000
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.sessions (id, user_id, created_at, updated_at, factor_id, aal, not_after, refreshed_at, user_agent, ip, tag, oauth_client_id, refresh_token_hmac_key, refresh_token_counter, scopes) FROM stdin;
caa99351-5d82-43cd-81c4-9d1549732a29	d33c063d-6faa-414a-8b0a-25656dadf5f1	2026-08-04 18:03:20.937532+00	2026-08-04 18:03:20.937532+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36 Edg/151.0.0.0	212.104.228.196	\N	\N	\N	\N	\N
b2d59dc9-bd95-48fb-b20c-78361e6675e1	c93ee442-2d01-44ff-85d7-ebfad396f60b	2026-07-30 06:05:27.891871+00	2026-07-30 06:05:27.891871+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	124.43.11.78	\N	\N	\N	\N	\N
a28a8c32-7c82-4a25-a7e3-1234344db662	25c29867-fa04-472e-8dd3-27cfd90598c0	2026-07-30 18:31:55.247503+00	2026-07-30 18:31:55.247503+00	\N	aal1	\N	\N	Mozilla/5.0 (iPhone; CPU iPhone OS 15_7_9 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.6.6 Mobile/15E148 Safari/604.1	103.21.165.173	\N	\N	\N	\N	\N
78567c90-e3b9-47a8-b109-b850a3eb98bc	4d350c11-7ff8-4070-b46e-fc4fe2d9558b	2026-08-06 19:10:37.84181+00	2026-08-06 19:10:37.84181+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/151.0.0.0 Safari/537.36	103.21.165.85	\N	\N	\N	\N	\N
db5565cd-34ab-4385-afee-678ec7e54e36	babf6a78-a12a-4814-b030-83d6a251c117	2026-08-07 01:39:42.032294+00	2026-08-07 01:39:42.032294+00	\N	aal1	\N	\N	Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/150.0.0.0 Safari/537.36	143.198.208.19	\N	\N	\N	\N	\N
\.


--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.sso_domains (id, sso_provider_id, domain, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.sso_providers (id, resource_id, created_at, updated_at, disabled) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.users (instance_id, id, aud, role, email, encrypted_password, email_confirmed_at, invited_at, confirmation_token, confirmation_sent_at, recovery_token, recovery_sent_at, email_change_token_new, email_change, email_change_sent_at, last_sign_in_at, raw_app_meta_data, raw_user_meta_data, is_super_admin, created_at, updated_at, phone, phone_confirmed_at, phone_change, phone_change_token, phone_change_sent_at, email_change_token_current, email_change_confirm_status, banned_until, reauthentication_token, reauthentication_sent_at, is_sso_user, deleted_at, is_anonymous) FROM stdin;
00000000-0000-0000-0000-000000000000	a3a63a5c-f049-4c03-9fa5-4186fa52b316	authenticated	authenticated	piyumininiwarthana@gmail.com	$2a$10$yoyGlvltsdAZJptjUdP2UuMzIIu9TiY6N1/QfhFft6/t83qltb0/G	2026-07-03 16:59:01.419697+00	\N		\N		\N			\N	2026-07-04 13:59:24.822606+00	{"provider": "email", "providers": ["email"]}	{"sub": "a3a63a5c-f049-4c03-9fa5-4186fa52b316", "email": "piyumininiwarthana@gmail.com", "full_name": "piyumini niwarthana", "email_verified": true, "phone_verified": false}	\N	2026-07-03 16:59:01.350197+00	2026-07-05 00:08:57.662597+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	ea483f91-9a3d-47db-a1e6-b1c5e55f6229	authenticated	authenticated	slahiru018@gmail.com	$2a$10$dTJoBNVX061lURlbn0HYyuxRO4qrfwkM3amM2SOPhMMEhBypzf746	2026-05-11 10:45:04.050362+00	\N		2026-05-11 10:32:47.552623+00		\N			\N	2026-05-11 10:45:04.071495+00	{"provider": "email", "providers": ["email"]}	{"sub": "ea483f91-9a3d-47db-a1e6-b1c5e55f6229", "email": "slahiru018@gmail.com", "email_verified": true, "phone_verified": false}	\N	2026-05-11 10:08:35.883278+00	2026-05-11 10:45:04.098464+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	6ff96fc1-b18d-4c3d-b3f5-407f9fadd59c	authenticated	authenticated	test@gmail.com	$2a$10$bmmLlSHA31u5shbbm/TJo.lwCeKCn6yIRqsXWtW7KBOjZVHTIKsiy	2026-05-12 06:20:46.64477+00	\N		\N		\N			\N	2026-05-12 06:20:47.107569+00	{"provider": "email", "providers": ["email"]}	{"sub": "6ff96fc1-b18d-4c3d-b3f5-407f9fadd59c", "email": "test@gmail.com", "email_verified": true, "phone_verified": false}	\N	2026-05-12 06:20:46.603484+00	2026-05-12 06:20:47.11198+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	1ff0a5f7-ad5b-4070-aaf3-0b1ecf757537	authenticated	authenticated	shamal..geethanjanpathirana@gmail.com	$2a$10$TLWZBON6/dV5GKu810WMWuCHj.9dmuKc.HpQLC7qUFasGtj5iC0d6	2026-06-01 06:05:18.298008+00	\N		\N		\N			\N	2026-06-01 06:08:09.261375+00	{"provider": "email", "providers": ["email"]}	{"sub": "1ff0a5f7-ad5b-4070-aaf3-0b1ecf757537", "email": "shamal..geethanjanpathirana@gmail.com", "email_verified": true, "phone_verified": false}	\N	2026-06-01 06:05:18.264473+00	2026-06-01 06:08:09.271775+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	8287205a-d5cf-4f03-9105-e57021bcf773	authenticated	authenticated	geethgeeth@gmail.com	$2a$10$BJe8TgfmcggnxI9Zs1H2Oef4xEqQHf6GxWJf73P3qn1f1hY7KZKbC	2026-07-01 19:54:47.676255+00	\N		\N		\N			\N	2026-07-01 19:54:47.686775+00	{"provider": "email", "providers": ["email"]}	{"sub": "8287205a-d5cf-4f03-9105-e57021bcf773", "email": "geethgeeth@gmail.com", "full_name": "geethgeeth@gmail.com", "email_verified": true, "phone_verified": false}	\N	2026-07-01 19:54:47.637846+00	2026-07-01 19:54:47.706756+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	3eedbf5c-67cf-47d5-aae8-b73efabc5a8d	authenticated	authenticated	itbin-2211-0252@horizoncampus.edu.lk	$2a$10$rujpPK2NGqHLG1mPFcSUFOhu37TEaozeaunmm0q1lebSxiHvTFOSq	2026-05-19 04:07:07.784885+00	\N		\N		\N			\N	2026-05-19 04:07:08.293627+00	{"provider": "email", "providers": ["email"]}	{"sub": "3eedbf5c-67cf-47d5-aae8-b73efabc5a8d", "email": "itbin-2211-0252@horizoncampus.edu.lk", "email_verified": true, "phone_verified": false}	\N	2026-05-19 04:07:07.766971+00	2026-05-19 04:07:08.295696+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	ba71215b-47d9-4730-b4fa-9411b8c9e256	authenticated	authenticated	testparent@example.com	$2a$10$D7CQeGMupsGwR1EhptowM.N.8uEOfFq3sD1VPwOX/yN14zzF1rm7G	2026-05-15 05:22:20.496283+00	\N		\N		\N			\N	2026-05-15 05:22:20.854713+00	{"provider": "email", "providers": ["email"]}	{"sub": "ba71215b-47d9-4730-b4fa-9411b8c9e256", "email": "testparent@example.com", "email_verified": true, "phone_verified": false}	\N	2026-05-15 05:22:20.463868+00	2026-05-15 12:11:39.23083+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	58888517-1c18-409d-b7ca-85c78f25db99	authenticated	authenticated	lakshika.mmc@gmail.com	$2a$10$cBXwF38A/t1.b8A1D1thTu7GEWPJvtxrGZtD2a.DIg8E92VTWsmqu	2026-07-03 10:00:03.355397+00	\N		\N		\N			\N	2026-07-03 10:00:03.362372+00	{"provider": "email", "providers": ["email"]}	{"sub": "58888517-1c18-409d-b7ca-85c78f25db99", "email": "lakshika.mmc@gmail.com", "full_name": "Lakshika", "email_verified": true, "phone_verified": false}	\N	2026-07-03 10:00:03.337577+00	2026-07-04 14:25:44.276463+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	21bb3259-57c4-4295-9f87-d28fe7b72421	authenticated	authenticated	oviduranga88@gmail.com	$2a$10$hU6mI6VxPsS0U7dGxFBcFe0GRACTHJWen29gtNol4Bgy1O1CWpNsS	2026-07-04 19:13:55.253007+00	\N		\N		\N			\N	2026-07-04 19:13:55.264913+00	{"provider": "email", "providers": ["email"]}	{"sub": "21bb3259-57c4-4295-9f87-d28fe7b72421", "email": "oviduranga88@gmail.com", "full_name": "Oshan Viduranga", "email_verified": true, "phone_verified": false}	\N	2026-07-04 19:13:55.208226+00	2026-07-04 20:20:32.435715+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	df98e35e-6f42-4461-8cda-71185cc77971	authenticated	authenticated	kusarananayakkara15@gmail.com	$2a$10$lHOG226NjGohBmJXpLyl9u5IZ1UHerrrg9By49Jfs8ZlB02MqshRC	2026-07-03 17:30:28.048225+00	\N		\N		\N			\N	2026-07-04 20:34:11.336763+00	{"provider": "email", "providers": ["email"]}	{"sub": "df98e35e-6f42-4461-8cda-71185cc77971", "email": "kusarananayakkara15@gmail.com", "full_name": "Kusara Nanayakkara", "email_verified": true, "phone_verified": false}	\N	2026-07-03 17:30:28.00965+00	2026-07-04 20:34:11.362244+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	c93ee442-2d01-44ff-85d7-ebfad396f60b	authenticated	authenticated	virajiniathapaththu@gmail.com	$2a$10$SbDc3b8p6.HQ88MneFEcx.emJInerNiZZunPy1LROBGfNfm9wnfLO	2026-07-03 09:46:51.232927+00	\N		\N		2026-07-30 06:05:12.223805+00			\N	2026-07-30 06:05:27.891775+00	{"provider": "email", "providers": []}	{"sub": "c93ee442-2d01-44ff-85d7-ebfad396f60b", "email": "virajiniathapaththu@gmail.com", "full_name": "Virajini Athapaththu", "email_verified": true, "phone_verified": false}	\N	2026-07-03 09:46:51.19043+00	2026-07-30 06:05:27.922005+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	d33c063d-6faa-414a-8b0a-25656dadf5f1	authenticated	authenticated	lahiru@gmail.com	$2a$10$ZAHXed/XXomdtJxCSdvgm.5Tw2dtskdbqyUL9Y4cEJKGqPIfh3pdK	2026-05-11 11:41:10.384218+00	\N		\N		\N			\N	2026-08-04 18:03:20.936824+00	{"provider": "email", "providers": ["email"]}	{"sub": "d33c063d-6faa-414a-8b0a-25656dadf5f1", "email": "lahiru@gmail.com", "email_verified": true, "phone_verified": false}	\N	2026-05-11 11:41:10.365856+00	2026-08-04 18:03:20.99959+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	0a036553-6b10-4559-bcbb-9cfd347999c5	authenticated	authenticated	geethpathitana@gmail.com	$2a$10$DIqm6xlhC3q02HHmzE/W9OtWMk49Ue8JbXs4yJ13P/M/w94JCNiri	2026-07-02 20:13:21.086883+00	\N		\N		\N			\N	2026-07-30 21:47:05.495824+00	{"provider": "email", "providers": []}	{"sub": "0a036553-6b10-4559-bcbb-9cfd347999c5", "email": "geethpathitana@gmail.com", "full_name": "Kotte Pathirannehelage Shamal Geethanjan Pathirana", "email_verified": true, "phone_verified": false}	\N	2026-07-02 20:13:21.034335+00	2026-07-30 21:47:05.537137+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	babf6a78-a12a-4814-b030-83d6a251c117	authenticated	authenticated	ranatunga.lk@gmail.com	$2a$10$NdGZivZTCxSCBVBcGp7dUuoSlhc1R2j7G7dtihrDGLd4cqowpYld6	2026-08-07 01:39:42.026652+00	\N		2026-08-07 01:38:27.451834+00		\N			\N	2026-08-07 01:39:42.032179+00	{"provider": "email", "providers": ["email"]}	{"sub": "babf6a78-a12a-4814-b030-83d6a251c117", "email": "ranatunga.lk@gmail.com", "full_name": "Prasad RANATUNGA", "email_verified": true, "phone_verified": false}	\N	2026-08-07 01:38:27.366827+00	2026-08-07 01:39:42.071362+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	25c29867-fa04-472e-8dd3-27cfd90598c0	authenticated	authenticated	pathiranamelaka@gmail.com	$2a$10$Ag3qZ2YxnrE5o09OWMb86e5JKDA8t/EJQLW2zkWfC4OONK4U1Xjpe	2026-07-30 18:31:55.214456+00	\N		2026-07-30 18:30:10.140938+00		\N			\N	2026-07-30 18:31:55.246318+00	{"provider": "email", "providers": ["email"]}	{"sub": "25c29867-fa04-472e-8dd3-27cfd90598c0", "email": "pathiranamelaka@gmail.com", "full_name": "pathiranamelaka@gmail.com", "email_verified": true, "phone_verified": false}	\N	2026-07-30 18:30:10.111117+00	2026-07-30 18:31:55.256512+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	7b5de404-6dd3-4b43-a673-5f31c23f4b4b	authenticated	authenticated	education567purpose@gmail.com	$2a$10$aABBqmzQWG3dewCDlFACg.nYsYIo8kcGrtbXcC5GmUz7lJ10nSTji	2026-07-29 22:03:04.19769+00	\N		2026-07-29 22:02:30.05529+00		\N			\N	2026-07-30 00:51:04.522123+00	{"provider": "email", "providers": ["email"]}	{"sub": "7b5de404-6dd3-4b43-a673-5f31c23f4b4b", "email": "education567purpose@gmail.com", "full_name": "education purpose", "email_verified": true, "phone_verified": false}	\N	2026-07-29 22:02:30.013486+00	2026-07-30 00:51:04.552889+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	11d46c3d-4a69-4a3a-ad2d-208a5ac2efba	authenticated	authenticated	educationteam061@gmail.com	$2a$10$pZ1ACdeslvofjpUgz48l.OkKXZ7sYTG1H4R9STfZGPMJoilek7x2e	2026-07-25 16:45:39.148887+00	\N		2026-07-25 16:45:10.6285+00		\N			\N	2026-07-30 01:12:37.465413+00	{"provider": "email", "providers": ["email"]}	{"sub": "11d46c3d-4a69-4a3a-ad2d-208a5ac2efba", "email": "educationteam061@gmail.com", "full_name": "educationteam061@gmail.com", "email_verified": true, "phone_verified": false}	\N	2026-07-25 16:45:10.57871+00	2026-07-30 01:12:37.487896+00	\N	\N			\N		0	\N		\N	f	\N	f
00000000-0000-0000-0000-000000000000	4d350c11-7ff8-4070-b46e-fc4fe2d9558b	authenticated	authenticated	shamal.geethanjanpathirana@gmail.com	$2a$10$pHB7wXQJbg9kp3uH2wqnCepLXhcDR7dTNAvIsHTc/cuStX0q.RYRW	2026-05-13 07:29:07.161518+00	\N		\N		\N			\N	2026-08-06 19:10:37.84171+00	{"provider": "email", "providers": []}	{"sub": "4d350c11-7ff8-4070-b46e-fc4fe2d9558b", "email": "shamal.geethanjanpathirana@gmail.com", "email_verified": true, "phone_verified": false}	\N	2026-05-13 07:29:07.123963+00	2026-08-06 19:10:37.852669+00	\N	\N			\N		0	\N		\N	f	\N	f
\.


--
-- Data for Name: webauthn_challenges; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.webauthn_challenges (id, user_id, challenge_type, session_data, created_at, expires_at) FROM stdin;
\.


--
-- Data for Name: webauthn_credentials; Type: TABLE DATA; Schema: auth; Owner: -
--

COPY auth.webauthn_credentials (id, user_id, credential_id, public_key, attestation_type, aaguid, sign_count, transports, backup_eligible, backed_up, friendly_name, created_at, updated_at, last_used_at) FROM stdin;
\.


--
-- Data for Name: assessments; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.assessments (id, child_id, emotion_score, cognitive_score, self_awareness_score, math_score, total_score, predicted_level, created_at, recommendation, confidence, emotion_level, cognitive_level, self_awareness_level, math_level, main_support_area, strongest_area) FROM stdin;
1	6ebea2f7-6cc1-4987-94cc-0783131b5ebe	27	30	27	28	112	3	2026-05-12 11:47:22.905111	Suggested game level: Level 3	1	\N	\N	\N	\N	\N	\N
2	2f48b004-6f06-4f6d-9c92-3f5473d6c6c4	25	9	18	10	62	2	2026-05-13 04:56:02.84481	Suggested game level: Level 2	1	3	1	2	1	cognitive	emotion
3	9d1a37a9-49f6-46d0-afc1-abff419f8b5c	25	6	19	24	74	2	2026-05-13 06:05:54.192685	Suggested game level: Level 2	1	3	1	2	3	cognitive	emotion
4	63c0e6ca-7405-4d1c-b719-c04341064c30	6	4	4	4	18	1	2026-05-13 08:39:04.379231	Suggested game level: Level 1	1	1	1	1	1	cognitive	emotion
5	2ce9771a-81b2-40d4-b933-9f6c5c93529c	23	21	24	29	97	3	2026-05-19 04:37:14.998824	Suggested game level: Level 3	1	3	2	3	3	cognitive	mathematical
6	af9410ec-9cdb-4676-b682-b83458e72661	19	19	18	20	76	2	2026-06-01 06:10:08.35885	Suggested game level: Level 2	1	2	2	2	2	self_awareness	mathematical
7	63c0e6ca-7405-4d1c-b719-c04341064c30	4	23	25	26	78	2	2026-06-02 04:27:32.167965	Suggested game level: Level 2	1	1	3	3	3	emotion	mathematical
8	c2cb9402-3a9b-44dd-b469-48ca317828a8	28	32	32	32	124	3	2026-07-01 19:58:29.196177	Suggested game level: Level 3	1	3	3	3	3	emotion	cognitive
9	2ab6aa7a-b318-4f18-bcce-5a75df085df0	0	0	0	0	0	1	2026-07-01 20:14:35.536771	Suggested game level: Level 1	0.97	1	1	1	1	emotion	emotion
10	2ab6aa7a-b318-4f18-bcce-5a75df085df0	0	0	0	0	0	1	2026-07-01 20:14:39.539513	Suggested game level: Level 1	0.97	1	1	1	1	emotion	emotion
11	2ab6aa7a-b318-4f18-bcce-5a75df085df0	0	0	0	0	0	1	2026-07-01 20:14:44.722628	Suggested game level: Level 1	0.97	1	1	1	1	emotion	emotion
12	a11d7f21-021a-45cb-9751-8f4ee167efc1	16	16	16	16	64	2	2026-07-02 20:40:51.311843	Suggested game level: Level 2	1	2	2	2	2	emotion	emotion
13	627d51ce-3206-465d-82b5-15d7dc17405f	25	26	22	28	101	3	2026-07-03 09:18:49.333739	Suggested game level: Level 3	1	3	3	3	3	self_awareness	mathematical
14	a11d7f21-021a-45cb-9751-8f4ee167efc1	24	25	26	25	100	3	2026-07-03 09:32:36.213877	Suggested game level: Level 3	1	3	3	3	3	emotion	self_awareness
15	abfbdd22-2a3a-4129-a9fd-31b8c595b407	16	20	14	16	66	2	2026-07-03 09:50:31.201065	Suggested game level: Level 2	1	2	2	2	2	self_awareness	cognitive
16	b17e7f48-8115-4596-82b8-0ac2f0d4d8ff	32	32	32	32	128	3	2026-07-03 10:04:45.558225	Suggested game level: Level 3	1	3	3	3	3	emotion	emotion
17	65ab5dc6-2c20-44bb-90ca-44c1dc79a657	15	11	13	15	54	2	2026-07-04 19:22:54.758518	Suggested game level: Level 2	1	2	2	2	2	cognitive	emotion
18	cbb6e890-0459-4007-b142-70b6fefaad65	30	27	25	28	110	3	2026-07-25 17:05:04.55886	Suggested game level: Level 3	1	3	3	3	3	self_awareness	emotion
19	d992bb47-4c25-46c9-b3c2-7683de8b54e2	1	1	0	0	2	1	2026-07-26 17:36:30.466494	Suggested game level: Level 1	0.93	1	1	1	1	self_awareness	emotion
20	d992bb47-4c25-46c9-b3c2-7683de8b54e2	16	16	16	16	64	2	2026-07-26 18:04:24.042436	Suggested game level: Level 2	1	2	2	2	2	emotion	emotion
21	d992bb47-4c25-46c9-b3c2-7683de8b54e2	0	0	0	0	0	1	2026-07-26 18:06:21.392983	Suggested game level: Level 1	0.97	1	1	1	1	emotion	emotion
22	d992bb47-4c25-46c9-b3c2-7683de8b54e2	32	32	32	32	128	3	2026-07-26 18:07:44.556721	Suggested game level: Level 3	1	3	3	3	3	emotion	emotion
23	d992bb47-4c25-46c9-b3c2-7683de8b54e2	27	19	15	24	85	2	2026-07-26 18:28:02.088478	Suggested game level: Level 2	1	3	2	2	3	self_awareness	emotion
24	d992bb47-4c25-46c9-b3c2-7683de8b54e2	32	32	32	32	128	3	2026-07-26 18:59:51.619426	Suggested game level: Level 3	1	3	3	3	3	emotion	emotion
25	d992bb47-4c25-46c9-b3c2-7683de8b54e2	16	16	16	16	64	2	2026-07-26 19:03:27.561044	Suggested game level: Level 2	1	2	2	2	2	emotion	emotion
26	d992bb47-4c25-46c9-b3c2-7683de8b54e2	0	0	0	0	0	1	2026-07-26 19:05:21.492683	Suggested game level: Level 1	0.97	1	1	1	1	emotion	emotion
27	d992bb47-4c25-46c9-b3c2-7683de8b54e2	16	16	16	16	64	2	2026-07-26 19:10:50.279492	Suggested game level: Level 2	1	2	2	2	2	emotion	emotion
28	69f408c0-ebca-4907-8e52-3c3afdea4351	28	32	32	32	124	3	2026-07-27 15:38:48.594064	Recommended Level 3: Advanced interactive challenges across emotional, cognitive, and mathematical growth areas.	0.85	3	3	3	3	emotion	cognitive
29	a11d7f21-021a-45cb-9751-8f4ee167efc1	22	19	22	17	80	3	2026-07-27 15:53:39.418222	Recommended Level 3: Advanced interactive challenges across emotional, cognitive, and mathematical growth areas.	0.85	3	2	3	2	mathematical	emotion
30	69f408c0-ebca-4907-8e52-3c3afdea4351	0	0	0	0	0	1	2026-07-27 15:58:45.902377	Recommended Level 1: Gentle guided activities focusing on core emotional recognition and foundational skills.	0.85	1	1	1	1	emotion	emotion
31	fba59d49-42b8-4797-9980-368a59fdf7ce	24	30	26	23	103	3	2026-07-27 22:18:24.44263	Recommended Level 3: Advanced interactive challenges across emotional, cognitive, and mathematical growth areas.	0.85	3	3	3	3	mathematical	cognitive
32	9f8b188e-0f9a-422b-8b36-c1cb1fcd5efb	0	0	0	0	0	1	2026-07-29 18:39:42.921914	Recommended Level 1: Gentle guided activities focusing on core emotional recognition and foundational skills.	0.85	1	1	1	1	emotion	emotion
33	8d1be21c-1c5d-436e-b7ed-18db27ecf794	8	8	8	8	32	1	2026-07-29 21:46:02.793447	Suggested game level: Level 1	1	1	1	1	1	emotion	emotion
34	8d1be21c-1c5d-436e-b7ed-18db27ecf794	16	16	16	16	64	2	2026-07-29 21:47:38.581722	Suggested game level: Level 2	1	2	2	2	2	emotion	emotion
35	ece24477-8693-4124-97be-b845c9ccac28	16	16	16	16	64	2	2026-07-29 22:12:16.871405	Suggested game level: Level 2	1	2	2	2	2	emotion	emotion
36	c7c98263-499c-4f3d-ba66-cae4531aa6b9	29	14	10	16	69	2	2026-07-29 22:39:10.724251	Suggested game level: Level 2	1	3	2	1	2	self_awareness	emotion
37	d3d36d70-12dd-4704-89cb-301a0162f025	16	16	16	16	64	2	2026-07-30 00:40:45.459537	Suggested game level: Level 2	1	2	2	2	2	emotion	emotion
38	5d3a0cc1-a6d8-46dd-b756-636cf3cd5c8f	32	32	32	32	128	3	2026-08-06 19:22:14.5822	Suggested game level: Level 3	1	3	3	3	3	emotion	emotion
\.


--
-- Data for Name: children; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.children (id, parent_id, child_name, age, gender, created_at) FROM stdin;
2f48b004-6f06-4f6d-9c92-3f5473d6c6c4	d33c063d-6faa-414a-8b0a-25656dadf5f1	kamal	12	Male	2026-05-11 12:04:19.682119
6ebea2f7-6cc1-4987-94cc-0783131b5ebe	d33c063d-6faa-414a-8b0a-25656dadf5f1	Nimal	11	Male	2026-05-12 05:17:08.17881
462c01e3-80d1-4610-b30f-9c12a920f524	6ff96fc1-b18d-4c3d-b3f5-407f9fadd59c	test	12	Prefer not to say	2026-05-12 06:21:20.822112
9d1a37a9-49f6-46d0-afc1-abff419f8b5c	d33c063d-6faa-414a-8b0a-25656dadf5f1	Kasun	10	Male	2026-05-13 06:03:49.638324
2ce9771a-81b2-40d4-b933-9f6c5c93529c	4d350c11-7ff8-4070-b46e-fc4fe2d9558b	geeth	8	Male	2026-05-13 07:29:46.400568
63c0e6ca-7405-4d1c-b719-c04341064c30	d33c063d-6faa-414a-8b0a-25656dadf5f1	test	12	Male	2026-05-13 08:37:27.667744
ffd8d655-c6d9-4b14-b929-84170e1927e9	ba71215b-47d9-4730-b4fa-9411b8c9e256	Alex	5	Male	2026-05-15 05:22:56.699694
5d3a0cc1-a6d8-46dd-b756-636cf3cd5c8f	4d350c11-7ff8-4070-b46e-fc4fe2d9558b	geeth	10	\N	2026-05-19 03:39:07.205439
da8e3e59-f01e-46c9-a46d-e9085c1a5677	3eedbf5c-67cf-47d5-aae8-b73efabc5a8d	geeth	10	Male	2026-05-19 04:07:25.577161
af9410ec-9cdb-4676-b682-b83458e72661	1ff0a5f7-ad5b-4070-aaf3-0b1ecf757537	Bandara	7	Male	2026-06-01 06:08:36.300469
c2cb9402-3a9b-44dd-b469-48ca317828a8	8287205a-d5cf-4f03-9105-e57021bcf773	geethgeeth@gmail.com	12	Male	2026-07-01 19:56:14.11381
2ab6aa7a-b318-4f18-bcce-5a75df085df0	8287205a-d5cf-4f03-9105-e57021bcf773	ibbaa	10	Female	2026-07-01 20:12:29.401341
a11d7f21-021a-45cb-9751-8f4ee167efc1	0a036553-6b10-4559-bcbb-9cfd347999c5	bro	8	Male	2026-07-02 20:14:03.128356
627d51ce-3206-465d-82b5-15d7dc17405f	0a036553-6b10-4559-bcbb-9cfd347999c5	pathirana	3	Prefer not to say	2026-07-03 07:38:56.607951
abfbdd22-2a3a-4129-a9fd-31b8c595b407	c93ee442-2d01-44ff-85d7-ebfad396f60b	Shamal Athapaththu	8	Male	2026-07-03 09:47:21.207795
b17e7f48-8115-4596-82b8-0ac2f0d4d8ff	58888517-1c18-409d-b7ca-85c78f25db99	Chavidi	5	Female	2026-07-03 10:01:19.553067
0d3f1b46-3584-495f-b817-8a3b61c998d6	df98e35e-6f42-4461-8cda-71185cc77971	Baba	4	Male	2026-07-03 17:32:12.967671
6b871d1a-0070-4cb3-8d45-48904d862b59	a3a63a5c-f049-4c03-9fa5-4186fa52b316	piyavi	5	Female	2026-07-03 17:32:26.53596
65ab5dc6-2c20-44bb-90ca-44c1dc79a657	21bb3259-57c4-4295-9f87-d28fe7b72421	Polo	6	\N	2026-07-04 19:20:11.290993
ff2f53f3-8a8a-4ea5-9577-659f90442884	df98e35e-6f42-4461-8cda-71185cc77971	Manu	7	\N	2026-07-04 20:25:58.946375
69f408c0-ebca-4907-8e52-3c3afdea4351	0a036553-6b10-4559-bcbb-9cfd347999c5	ccvcv	8	\N	2026-07-06 08:05:47.45928
cbb6e890-0459-4007-b142-70b6fefaad65	d33c063d-6faa-414a-8b0a-25656dadf5f1	uvicorn main:app --reload	10	Male	2026-07-25 17:02:25.358678
d992bb47-4c25-46c9-b3c2-7683de8b54e2	d33c063d-6faa-414a-8b0a-25656dadf5f1	austin	6	Female	2026-07-26 17:34:49.31433
fba59d49-42b8-4797-9980-368a59fdf7ce	0a036553-6b10-4559-bcbb-9cfd347999c5	All	10	Male	2026-07-27 22:16:21.643994
9f8b188e-0f9a-422b-8b36-c1cb1fcd5efb	0a036553-6b10-4559-bcbb-9cfd347999c5	geeth12	12	Male	2026-07-29 18:34:22.811494
8d1be21c-1c5d-436e-b7ed-18db27ecf794	0a036553-6b10-4559-bcbb-9cfd347999c5	fgfgf	2	Male	2026-07-29 19:55:37.69622
c7c98263-499c-4f3d-ba66-cae4531aa6b9	7b5de404-6dd3-4b43-a673-5f31c23f4b4b	gf	7	Female	2026-07-29 22:10:34.757552
ece24477-8693-4124-97be-b845c9ccac28	7b5de404-6dd3-4b43-a673-5f31c23f4b4b	gry	5	Male	2026-07-29 22:11:05.839048
d3d36d70-12dd-4704-89cb-301a0162f025	0a036553-6b10-4559-bcbb-9cfd347999c5	dfre	10	Female	2026-07-30 00:39:23.344525
a766c0e6-42dc-4d31-9dee-44044b5830fb	0a036553-6b10-4559-bcbb-9cfd347999c5	rtrtrt	8	Female	2026-07-30 18:46:18.459434
\.


--
-- Data for Name: game_scores; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.game_scores (id, child_id, game_id, final_score, correct_answers, wrong_answers, time_taken, played_at, attempts, area, level) FROM stdin;
3	63c0e6ca-7405-4d1c-b719-c04341064c30	1	44	5	2	21	2026-05-13 09:18:20.502	7	emotion	1
4	63c0e6ca-7405-4d1c-b719-c04341064c30	1	50	5	0	14	2026-05-13 09:26:43.798	5	emotion	1
5	63c0e6ca-7405-4d1c-b719-c04341064c30	3	99	10	0	34	2026-05-13 09:27:39.766	10	emotion	3
6	63c0e6ca-7405-4d1c-b719-c04341064c30	1	47	5	1	19	2026-05-13 09:52:54.132	6	emotion	1
7	63c0e6ca-7405-4d1c-b719-c04341064c30	1	47	5	1	35	2026-05-13 10:13:23.76	6	emotion	1
8	63c0e6ca-7405-4d1c-b719-c04341064c30	1	50	5	0	24	2026-05-13 12:26:06.674	5	emotion	1
9	63c0e6ca-7405-4d1c-b719-c04341064c30	7	26	2	2	0	2026-05-15 07:17:43.424	4	cognitive	1
10	63c0e6ca-7405-4d1c-b719-c04341064c30	7	26	2	2	0	2026-05-15 07:33:32.72	4	cognitive	1
11	63c0e6ca-7405-4d1c-b719-c04341064c30	10	58	5	1	0	2026-05-15 07:56:17.113	5	cognitive	1
12	63c0e6ca-7405-4d1c-b719-c04341064c30	13	60	4	0	0	2026-05-15 09:04:35.565	3	self_awareness	1
13	9d1a37a9-49f6-46d0-afc1-abff419f8b5c	16	100	5	0	34	2026-05-15 09:29:08.916	5	self_awareness	1
14	63c0e6ca-7405-4d1c-b719-c04341064c30	19	60	5	0	39	2026-05-15 09:47:23.538	5	self_awareness	1
15	9d1a37a9-49f6-46d0-afc1-abff419f8b5c	24	40	5	5	65	2026-05-15 10:01:35.712	10	mathematical	1
16	63c0e6ca-7405-4d1c-b719-c04341064c30	27	48	5	1	57	2026-05-15 10:10:34.677	6	mathematical	1
17	63c0e6ca-7405-4d1c-b719-c04341064c30	27	50	5	0	21	2026-05-15 10:13:02.956	5	mathematical	1
18	6ebea2f7-6cc1-4987-94cc-0783131b5ebe	7	28	2	1	0	2026-05-15 12:28:11.274	3	cognitive	1
19	2ce9771a-81b2-40d4-b933-9f6c5c93529c	4	44	5	2	180	2026-05-19 05:23:42.641	7	emotion	1
20	2ce9771a-81b2-40d4-b933-9f6c5c93529c	1	50	5	0	36	2026-05-19 05:25:56.054	5	emotion	1
21	63c0e6ca-7405-4d1c-b719-c04341064c30	1	35	5	5	53	2026-05-28 05:16:40.621	10	emotion	1
22	af9410ec-9cdb-4676-b682-b83458e72661	4	44	5	2	35	2026-06-01 06:11:32.321	7	emotion	1
23	63c0e6ca-7405-4d1c-b719-c04341064c30	4	44	5	2	57	2026-06-01 07:09:10.723	7	emotion	1
24	63c0e6ca-7405-4d1c-b719-c04341064c30	4	50	5	0	35	2026-06-01 09:23:40.488	5	emotion	1
25	63c0e6ca-7405-4d1c-b719-c04341064c30	4	38	5	4	61	2026-06-02 02:49:04.013	9	emotion	1
26	63c0e6ca-7405-4d1c-b719-c04341064c30	4	26	5	8	62	2026-06-02 02:52:53.572	13	emotion	1
27	63c0e6ca-7405-4d1c-b719-c04341064c30	21	111	10	3	146	2026-06-11 03:52:20.397	13	self_awareness	3
28	63c0e6ca-7405-4d1c-b719-c04341064c30	5	73	8	2	72	2026-06-11 05:08:41.302	10	emotion	2
29	63c0e6ca-7405-4d1c-b719-c04341064c30	6	92	10	2	88	2026-06-11 05:10:41.261	12	emotion	3
30	63c0e6ca-7405-4d1c-b719-c04341064c30	8	54	4	3	41	2026-06-11 05:22:24.547	7	cognitive	2
31	63c0e6ca-7405-4d1c-b719-c04341064c30	2	76	8	1	66	2026-06-11 05:44:06.855	9	emotion	2
32	63c0e6ca-7405-4d1c-b719-c04341064c30	6	85	10	2	294	2026-06-18 06:45:59.269	12	emotion	3
33	63c0e6ca-7405-4d1c-b719-c04341064c30	2	79	8	0	87	2026-06-18 06:48:51.314	8	emotion	2
34	63c0e6ca-7405-4d1c-b719-c04341064c30	8	52	4	4	56	2026-06-18 06:50:23.92	8	cognitive	2
35	63c0e6ca-7405-4d1c-b719-c04341064c30	11	56	5	2	51	2026-06-18 07:12:08.876	7	cognitive	2
36	63c0e6ca-7405-4d1c-b719-c04341064c30	20	95	8	0	96	2026-06-18 07:15:05.251	8	self_awareness	2
37	63c0e6ca-7405-4d1c-b719-c04341064c30	14	59	4	0	66	2026-06-18 07:27:39.306	4	self_awareness	2
38	63c0e6ca-7405-4d1c-b719-c04341064c30	25	80	8	0	43	2026-06-18 07:29:16.449	8	mathematical	2
39	63c0e6ca-7405-4d1c-b719-c04341064c30	28	80	8	0	42	2026-06-18 07:30:44.714	8	mathematical	2
40	63c0e6ca-7405-4d1c-b719-c04341064c30	2	74	8	0	277	2026-06-20 19:46:03.035	8	emotion	2
41	63c0e6ca-7405-4d1c-b719-c04341064c30	8	56	4	2	53	2026-06-22 15:43:41.83	6	cognitive	2
42	63c0e6ca-7405-4d1c-b719-c04341064c30	7	26	2	2	0	2026-06-23 08:08:45.556	4	cognitive	1
43	63c0e6ca-7405-4d1c-b719-c04341064c30	1	47	5	1	875	2026-06-25 03:42:24.654	6	emotion	1
44	63c0e6ca-7405-4d1c-b719-c04341064c30	1	50	5	0	40	2026-06-25 03:59:54.868	5	emotion	1
45	63c0e6ca-7405-4d1c-b719-c04341064c30	1	50	5	0	27	2026-06-25 05:33:06.963	5	emotion	1
46	63c0e6ca-7405-4d1c-b719-c04341064c30	1	50	5	0	56	2026-06-25 14:07:10.876	5	emotion	1
47	63c0e6ca-7405-4d1c-b719-c04341064c30	1	44	5	2	38	2026-06-25 15:16:24.26	7	emotion	1
48	63c0e6ca-7405-4d1c-b719-c04341064c30	4	41	5	3	155	2026-06-25 17:40:50.81	8	emotion	1
49	c2cb9402-3a9b-44dd-b469-48ca317828a8	4	41	5	3	58	2026-07-01 20:00:34.339	8	emotion	1
50	2ab6aa7a-b318-4f18-bcce-5a75df085df0	4	47	5	1	43	2026-07-01 20:16:16.902	6	emotion	1
51	a11d7f21-021a-45cb-9751-8f4ee167efc1	4	50	5	0	48	2026-07-02 20:42:19.281	5	emotion	1
52	a11d7f21-021a-45cb-9751-8f4ee167efc1	5	54	8	7	260	2026-07-02 20:47:12.575	15	emotion	2
53	a11d7f21-021a-45cb-9751-8f4ee167efc1	6	20	10	22	435	2026-07-03 09:40:37.502	32	emotion	3
54	b17e7f48-8115-4596-82b8-0ac2f0d4d8ff	4	50	5	0	42	2026-07-03 10:06:04.195	5	emotion	1
55	a11d7f21-021a-45cb-9751-8f4ee167efc1	12	54	5	3	41	2026-07-03 10:20:22.29	8	cognitive	3
56	627d51ce-3206-465d-82b5-15d7dc17405f	7	30	2	0	0	2026-07-04 17:44:46.656	2	cognitive	1
57	63c0e6ca-7405-4d1c-b719-c04341064c30	4	44	5	2	43	2026-07-08 10:57:12.888	7	emotion	1
58	63c0e6ca-7405-4d1c-b719-c04341064c30	4	41	5	3	236	2026-07-16 18:16:53.206	8	emotion	1
59	cbb6e890-0459-4007-b142-70b6fefaad65	4	41	5	3	154	2026-07-25 20:29:42.756	8	emotion	1
60	cbb6e890-0459-4007-b142-70b6fefaad65	7	28	2	1	0	2026-07-25 20:31:45.778	3	cognitive	1
61	cbb6e890-0459-4007-b142-70b6fefaad65	8	50	4	5	36	2026-07-25 20:33:08.047	9	cognitive	2
62	cbb6e890-0459-4007-b142-70b6fefaad65	4	41	5	3	29	2026-07-25 20:40:52.777	8	emotion	1
63	d992bb47-4c25-46c9-b3c2-7683de8b54e2	5	43	8	12	85	2026-07-26 19:12:56.201	20	emotion	2
64	69f408c0-ebca-4907-8e52-3c3afdea4351	3	58	10	13	119	2026-07-27 15:41:40.076	23	emotion	3
65	fba59d49-42b8-4797-9980-368a59fdf7ce	1	50	5	0	32	2026-07-28 20:37:03.865	5	emotion	1
66	fba59d49-42b8-4797-9980-368a59fdf7ce	1	41	5	3	38	2026-07-28 20:38:02.601	8	emotion	1
67	fba59d49-42b8-4797-9980-368a59fdf7ce	1	47	5	1	129	2026-07-28 20:40:28.271	6	emotion	1
68	fba59d49-42b8-4797-9980-368a59fdf7ce	1	50	5	0	19	2026-07-28 20:47:31.63	5	emotion	1
69	fba59d49-42b8-4797-9980-368a59fdf7ce	4	41	5	3	28	2026-07-28 20:57:16.569	8	emotion	1
70	fba59d49-42b8-4797-9980-368a59fdf7ce	5	29	8	16	136	2026-07-28 21:00:01.919	24	emotion	2
71	fba59d49-42b8-4797-9980-368a59fdf7ce	2	36	8	13	241	2026-07-28 21:05:00.074	21	emotion	2
72	fba59d49-42b8-4797-9980-368a59fdf7ce	1	41	5	3	31	2026-07-28 21:10:51.256	8	emotion	1
73	fba59d49-42b8-4797-9980-368a59fdf7ce	4	41	5	3	33	2026-07-28 21:24:14.297	8	emotion	1
74	69f408c0-ebca-4907-8e52-3c3afdea4351	4	38	5	4	35	2026-07-28 22:01:00.584	9	emotion	1
75	69f408c0-ebca-4907-8e52-3c3afdea4351	4	47	5	1	27	2026-07-28 22:11:29.101	6	emotion	1
76	ece24477-8693-4124-97be-b845c9ccac28	4	47	5	1	24	2026-07-29 22:13:13.106	6	emotion	1
77	ece24477-8693-4124-97be-b845c9ccac28	5	64	8	5	61	2026-07-29 22:14:39.138	13	emotion	2
78	ece24477-8693-4124-97be-b845c9ccac28	7	24	2	3	0	2026-07-29 22:56:36.519	5	cognitive	1
79	ece24477-8693-4124-97be-b845c9ccac28	7	30	2	0	0	2026-07-29 22:57:56.703	2	cognitive	1
80	ece24477-8693-4124-97be-b845c9ccac28	4	47	5	1	22	2026-07-29 23:57:03.908	6	emotion	1
81	ece24477-8693-4124-97be-b845c9ccac28	5	64	8	5	54	2026-07-29 23:59:23.295	13	emotion	2
82	ece24477-8693-4124-97be-b845c9ccac28	8	50	4	5	34	2026-07-30 00:12:34.474	9	cognitive	2
83	ece24477-8693-4124-97be-b845c9ccac28	27	50	5	0	17	2026-07-30 00:18:05.35	5	mathematical	1
84	ece24477-8693-4124-97be-b845c9ccac28	4	47	5	1	23	2026-07-30 00:19:42.325	6	emotion	1
85	2ce9771a-81b2-40d4-b933-9f6c5c93529c	24	50	5	0	30	2026-07-31 03:35:09.993	5	mathematical	1
86	63c0e6ca-7405-4d1c-b719-c04341064c30	11	58	5	1	37	2026-08-04 18:04:52.85	6	cognitive	2
\.


--
-- Data for Name: games; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.games (id, area, game_name, level, game_slug, description, is_active) FROM stdin;
1	emotion	Emotion Face Match	1	emotion-face-match	Match the face with the correct emotion.	t
2	emotion	Emotion Face Match	2	emotion-face-match	Match the face with the correct emotion.	t
3	emotion	Emotion Face Match	3	emotion-face-match	Match the face with the correct emotion.	t
4	emotion	Emotion Story Choice	1	emotion-story-choice	Choose the feeling that matches a simple story situation.	t
5	emotion	Emotion Story Choice	2	emotion-story-choice	Choose the feeling that matches a simple story situation.	t
6	emotion	Emotion Story Choice	3	emotion-story-choice	Choose the feeling that matches a simple story situation.	t
7	cognitive	Memory Match	1	memory-match	Match the same cards to practice memory and focus.	t
8	cognitive	Memory Match	2	memory-match	Match the same cards to practice memory and focus.	t
9	cognitive	Memory Match	3	memory-match	Match the same cards to practice memory and focus.	t
10	cognitive	Pattern Builder	1	pattern-builder	Complete calm visual patterns to practice sequencing and logical thinking.	t
11	cognitive	Pattern Builder	2	pattern-builder	Complete calm visual patterns to practice sequencing and logical thinking.	t
12	cognitive	Pattern Builder	3	pattern-builder	Complete calm visual patterns to practice sequencing and logical thinking.	t
13	self_awareness	Daily Routine Order	1	daily-routine-order	Arrange daily routine steps in the correct order to support independence and sequencing.	t
14	self_awareness	Daily Routine Order	2	daily-routine-order	Arrange daily routine steps in the correct order to support independence and sequencing.	t
15	self_awareness	Daily Routine Order	3	daily-routine-order	Arrange daily routine steps in the correct order to support independence and sequencing.	t
16	self_awareness	Emotion Reflection Board	1	emotion-reflection-board	Practice understanding personal emotions through calm visual reflection activities.	f
17	self_awareness	Emotion Reflection Board	2	emotion-reflection-board	Practice understanding personal emotions through calm visual reflection activities.	f
18	self_awareness	Emotion Reflection Board	3	emotion-reflection-board	Practice understanding personal emotions through calm visual reflection activities.	f
19	self_awareness	Personal Choice Adventure	1	personal-choice-adventure	Practice daily-life choices, self-management, and safe decision-making through calm scenarios.	t
20	self_awareness	Personal Choice Adventure	2	personal-choice-adventure	Practice daily-life choices, self-management, and safe decision-making through calm scenarios.	t
21	self_awareness	Personal Choice Adventure	3	personal-choice-adventure	Practice daily-life choices, self-management, and safe decision-making through calm scenarios.	t
24	mathematical	Count the Objects	1	count-the-objects	Practice visual counting and number recognition through calm interactive activities.	t
25	mathematical	Count the Objects	2	count-the-objects	Practice visual counting and number recognition through calm interactive activities.	t
26	mathematical	Count the Objects	3	count-the-objects	Practice visual counting and number recognition through calm interactive activities.	t
27	mathematical	Shape & Number Match	1	shape-number-match	Practice matching numbers with visual quantities through calm interactive activities.	t
28	mathematical	Shape & Number Match	2	shape-number-match	Practice matching numbers with visual quantities through calm interactive activities.	t
29	mathematical	Shape & Number Match	3	shape-number-match	Practice matching numbers with visual quantities through calm interactive activities.	t
\.


--
-- Data for Name: parents; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.parents (id, full_name, email, created_at) FROM stdin;
d33c063d-6faa-414a-8b0a-25656dadf5f1	Lahiru Sandaruwan	Lahiru@gmail.com	2026-05-11 11:41:11.163714
6ff96fc1-b18d-4c3d-b3f5-407f9fadd59c	test	test@gmail.com	2026-05-12 06:20:47.854912
4d350c11-7ff8-4070-b46e-fc4fe2d9558b	shamal pathirana	shamal.geethanjanpathirana@gmail.com	2026-05-13 07:29:08.0305
ba71215b-47d9-4730-b4fa-9411b8c9e256	Test Parent	testparent@example.com	2026-05-15 05:22:21.129758
3eedbf5c-67cf-47d5-aae8-b73efabc5a8d	Kotte Pathirannehelage Shamal Geethanjan Pathirana	itbin-2211-0252@horizoncampus.edu.lk	2026-05-19 04:07:08.65037
1ff0a5f7-ad5b-4070-aaf3-0b1ecf757537	Geeth	shamal..geethanjanpathirana@gmail.com	2026-06-01 06:05:20.036176
8287205a-d5cf-4f03-9105-e57021bcf773	geethgeeth@gmail.com	geethgeeth@gmail.com	2026-07-01 19:54:49.459046
0a036553-6b10-4559-bcbb-9cfd347999c5	Kotte Pathirannehelage Shamal Geethanjan Pathirana	geethpathitana@gmail.com	2026-07-02 20:13:22.930546
c93ee442-2d01-44ff-85d7-ebfad396f60b	Virajini Athapaththu	virajiniathapaththu@gmail.com	2026-07-03 09:46:52.775341
58888517-1c18-409d-b7ca-85c78f25db99	Lakshika	lakshika.mmc@gmail.com	2026-07-03 10:00:03.961598
a3a63a5c-f049-4c03-9fa5-4186fa52b316	piyumini niwarthana	piyumininiwarthana@gmail.com	2026-07-03 16:59:02.487975
df98e35e-6f42-4461-8cda-71185cc77971	Kusara Nanayakkara	kusarananayakkara15@gmail.com	2026-07-03 17:30:29.197119
21bb3259-57c4-4295-9f87-d28fe7b72421	Oshan Viduranga	oviduranga88@gmail.com	2026-07-04 19:13:56.498464
11d46c3d-4a69-4a3a-ad2d-208a5ac2efba	educationteam061@gmail.com	educationteam061@gmail.com	2026-07-25 16:46:37.201983
7b5de404-6dd3-4b43-a673-5f31c23f4b4b	education purpose	education567purpose@gmail.com	2026-07-29 22:03:19.902502
babf6a78-a12a-4814-b030-83d6a251c117	Prasad RANATUNGA	ranatunga.lk@gmail.com	2026-08-07 01:39:45.358376
\.


--
-- Data for Name: survey_questions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.survey_questions (id, area, question, sort_order, is_active) FROM stdin;
1	emotion	Does your child recognize when someone is happy, sad, or angry?	1	t
2	emotion	Does your child express their feelings using words or clear gestures?	2	t
3	emotion	Can your child comfort others when they see someone upset?	3	t
4	emotion	Does your child respond appropriately when praised or encouraged?	4	t
5	emotion	Can your child manage frustration when a toy or task does not work?	5	t
6	emotion	Does your child show interest in emotional storybooks or pictures?	6	t
7	emotion	Can your child identify how they feel when asked directly?	7	t
8	emotion	Does your child stay calm during unexpected daily changes?	8	t
9	cognitive	Does your child complete simple visual puzzles or matching games?	9	t
10	cognitive	Can your child follow two-step instructions?	10	t
11	cognitive	Does your child remember where their favorite items are stored?	11	t
12	cognitive	Can your child sort objects by color, size, or shape?	12	t
13	cognitive	Does your child recognize repeating patterns in shapes or colors?	13	t
14	cognitive	Can your child focus on a single activity for 5 to 10 minutes?	14	t
15	cognitive	Does your child imitate actions or movements demonstrated by adults?	15	t
16	cognitive	Can your child find hidden objects under covers?	16	t
17	self_awareness	Does your child respond when their name is called?	17	t
18	self_awareness	Can your child point to basic body parts (e.g. eyes, ears, hands)?	18	t
19	self_awareness	Does your child recognize themselves in a mirror or photograph?	19	t
20	self_awareness	Can your child express personal preferences (e.g. favorite food or toy)?	20	t
21	self_awareness	Does your child indicate when they need help with a task?	21	t
22	self_awareness	Can your child follow basic personal hygiene routines with guidance?	22	t
23	self_awareness	Does your child recognize their own personal belongings?	23	t
24	self_awareness	Does your child show awareness of personal space around others?	24	t
25	mathematical	Can your child count objects up to 5 or 10 accurately?	25	t
26	mathematical	Does your child recognize basic written numbers (1 to 5)?	26	t
27	mathematical	Can your child compare groups of objects as more or less?	27	t
28	mathematical	Does your child understand basic shape names (circle, square, triangle)?	28	t
29	mathematical	Can your child match equal quantities of items together?	29	t
30	mathematical	Does your child understand simple concepts like in, out, top, bottom?	30	t
31	mathematical	Can your child understand very simple addition ideas such as one plus one?	31	t
32	mathematical	Does your child organize objects in order from smallest to largest?	32	t
\.


--
-- Data for Name: survey_responses; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.survey_responses (id, child_id, question_id, answer_score, created_at, assessment_id) FROM stdin;
1	8d1be21c-1c5d-436e-b7ed-18db27ecf794	1	1	2026-07-29 21:46:03.188065	33
2	8d1be21c-1c5d-436e-b7ed-18db27ecf794	2	1	2026-07-29 21:46:03.188065	33
3	8d1be21c-1c5d-436e-b7ed-18db27ecf794	3	1	2026-07-29 21:46:03.188065	33
4	8d1be21c-1c5d-436e-b7ed-18db27ecf794	4	1	2026-07-29 21:46:03.188065	33
5	8d1be21c-1c5d-436e-b7ed-18db27ecf794	5	1	2026-07-29 21:46:03.188065	33
6	8d1be21c-1c5d-436e-b7ed-18db27ecf794	6	1	2026-07-29 21:46:03.188065	33
7	8d1be21c-1c5d-436e-b7ed-18db27ecf794	7	1	2026-07-29 21:46:03.188065	33
8	8d1be21c-1c5d-436e-b7ed-18db27ecf794	8	1	2026-07-29 21:46:03.188065	33
9	8d1be21c-1c5d-436e-b7ed-18db27ecf794	9	1	2026-07-29 21:46:03.188065	33
10	8d1be21c-1c5d-436e-b7ed-18db27ecf794	10	1	2026-07-29 21:46:03.188065	33
11	8d1be21c-1c5d-436e-b7ed-18db27ecf794	11	1	2026-07-29 21:46:03.188065	33
12	8d1be21c-1c5d-436e-b7ed-18db27ecf794	12	1	2026-07-29 21:46:03.188065	33
13	8d1be21c-1c5d-436e-b7ed-18db27ecf794	13	1	2026-07-29 21:46:03.188065	33
14	8d1be21c-1c5d-436e-b7ed-18db27ecf794	14	1	2026-07-29 21:46:03.188065	33
15	8d1be21c-1c5d-436e-b7ed-18db27ecf794	15	1	2026-07-29 21:46:03.188065	33
16	8d1be21c-1c5d-436e-b7ed-18db27ecf794	16	1	2026-07-29 21:46:03.188065	33
17	8d1be21c-1c5d-436e-b7ed-18db27ecf794	17	1	2026-07-29 21:46:03.188065	33
18	8d1be21c-1c5d-436e-b7ed-18db27ecf794	18	1	2026-07-29 21:46:03.188065	33
19	8d1be21c-1c5d-436e-b7ed-18db27ecf794	19	1	2026-07-29 21:46:03.188065	33
20	8d1be21c-1c5d-436e-b7ed-18db27ecf794	20	1	2026-07-29 21:46:03.188065	33
21	8d1be21c-1c5d-436e-b7ed-18db27ecf794	21	1	2026-07-29 21:46:03.188065	33
22	8d1be21c-1c5d-436e-b7ed-18db27ecf794	22	1	2026-07-29 21:46:03.188065	33
23	8d1be21c-1c5d-436e-b7ed-18db27ecf794	23	1	2026-07-29 21:46:03.188065	33
24	8d1be21c-1c5d-436e-b7ed-18db27ecf794	24	1	2026-07-29 21:46:03.188065	33
25	8d1be21c-1c5d-436e-b7ed-18db27ecf794	25	1	2026-07-29 21:46:03.188065	33
26	8d1be21c-1c5d-436e-b7ed-18db27ecf794	26	1	2026-07-29 21:46:03.188065	33
27	8d1be21c-1c5d-436e-b7ed-18db27ecf794	27	1	2026-07-29 21:46:03.188065	33
28	8d1be21c-1c5d-436e-b7ed-18db27ecf794	28	1	2026-07-29 21:46:03.188065	33
29	8d1be21c-1c5d-436e-b7ed-18db27ecf794	29	1	2026-07-29 21:46:03.188065	33
30	8d1be21c-1c5d-436e-b7ed-18db27ecf794	30	1	2026-07-29 21:46:03.188065	33
31	8d1be21c-1c5d-436e-b7ed-18db27ecf794	31	1	2026-07-29 21:46:03.188065	33
32	8d1be21c-1c5d-436e-b7ed-18db27ecf794	32	1	2026-07-29 21:46:03.188065	33
33	8d1be21c-1c5d-436e-b7ed-18db27ecf794	1	2	2026-07-29 21:47:38.800208	34
34	8d1be21c-1c5d-436e-b7ed-18db27ecf794	2	2	2026-07-29 21:47:38.800208	34
35	8d1be21c-1c5d-436e-b7ed-18db27ecf794	3	2	2026-07-29 21:47:38.800208	34
36	8d1be21c-1c5d-436e-b7ed-18db27ecf794	4	2	2026-07-29 21:47:38.800208	34
37	8d1be21c-1c5d-436e-b7ed-18db27ecf794	5	2	2026-07-29 21:47:38.800208	34
38	8d1be21c-1c5d-436e-b7ed-18db27ecf794	6	2	2026-07-29 21:47:38.800208	34
39	8d1be21c-1c5d-436e-b7ed-18db27ecf794	7	2	2026-07-29 21:47:38.800208	34
40	8d1be21c-1c5d-436e-b7ed-18db27ecf794	8	2	2026-07-29 21:47:38.800208	34
41	8d1be21c-1c5d-436e-b7ed-18db27ecf794	9	2	2026-07-29 21:47:38.800208	34
42	8d1be21c-1c5d-436e-b7ed-18db27ecf794	10	2	2026-07-29 21:47:38.800208	34
43	8d1be21c-1c5d-436e-b7ed-18db27ecf794	11	2	2026-07-29 21:47:38.800208	34
44	8d1be21c-1c5d-436e-b7ed-18db27ecf794	12	2	2026-07-29 21:47:38.800208	34
45	8d1be21c-1c5d-436e-b7ed-18db27ecf794	13	2	2026-07-29 21:47:38.800208	34
46	8d1be21c-1c5d-436e-b7ed-18db27ecf794	14	2	2026-07-29 21:47:38.800208	34
47	8d1be21c-1c5d-436e-b7ed-18db27ecf794	15	2	2026-07-29 21:47:38.800208	34
48	8d1be21c-1c5d-436e-b7ed-18db27ecf794	16	2	2026-07-29 21:47:38.800208	34
49	8d1be21c-1c5d-436e-b7ed-18db27ecf794	17	2	2026-07-29 21:47:38.800208	34
50	8d1be21c-1c5d-436e-b7ed-18db27ecf794	18	2	2026-07-29 21:47:38.800208	34
51	8d1be21c-1c5d-436e-b7ed-18db27ecf794	19	2	2026-07-29 21:47:38.800208	34
52	8d1be21c-1c5d-436e-b7ed-18db27ecf794	20	2	2026-07-29 21:47:38.800208	34
53	8d1be21c-1c5d-436e-b7ed-18db27ecf794	21	2	2026-07-29 21:47:38.800208	34
54	8d1be21c-1c5d-436e-b7ed-18db27ecf794	22	2	2026-07-29 21:47:38.800208	34
55	8d1be21c-1c5d-436e-b7ed-18db27ecf794	23	2	2026-07-29 21:47:38.800208	34
56	8d1be21c-1c5d-436e-b7ed-18db27ecf794	24	2	2026-07-29 21:47:38.800208	34
57	8d1be21c-1c5d-436e-b7ed-18db27ecf794	25	2	2026-07-29 21:47:38.800208	34
58	8d1be21c-1c5d-436e-b7ed-18db27ecf794	26	2	2026-07-29 21:47:38.800208	34
59	8d1be21c-1c5d-436e-b7ed-18db27ecf794	27	2	2026-07-29 21:47:38.800208	34
60	8d1be21c-1c5d-436e-b7ed-18db27ecf794	28	2	2026-07-29 21:47:38.800208	34
61	8d1be21c-1c5d-436e-b7ed-18db27ecf794	29	2	2026-07-29 21:47:38.800208	34
62	8d1be21c-1c5d-436e-b7ed-18db27ecf794	30	2	2026-07-29 21:47:38.800208	34
63	8d1be21c-1c5d-436e-b7ed-18db27ecf794	31	2	2026-07-29 21:47:38.800208	34
64	8d1be21c-1c5d-436e-b7ed-18db27ecf794	32	2	2026-07-29 21:47:38.800208	34
65	ece24477-8693-4124-97be-b845c9ccac28	1	2	2026-07-29 22:12:17.402923	35
66	ece24477-8693-4124-97be-b845c9ccac28	2	2	2026-07-29 22:12:17.402923	35
67	ece24477-8693-4124-97be-b845c9ccac28	3	2	2026-07-29 22:12:17.402923	35
68	ece24477-8693-4124-97be-b845c9ccac28	4	2	2026-07-29 22:12:17.402923	35
69	ece24477-8693-4124-97be-b845c9ccac28	5	2	2026-07-29 22:12:17.402923	35
70	ece24477-8693-4124-97be-b845c9ccac28	6	2	2026-07-29 22:12:17.402923	35
71	ece24477-8693-4124-97be-b845c9ccac28	7	2	2026-07-29 22:12:17.402923	35
72	ece24477-8693-4124-97be-b845c9ccac28	8	2	2026-07-29 22:12:17.402923	35
73	ece24477-8693-4124-97be-b845c9ccac28	9	2	2026-07-29 22:12:17.402923	35
74	ece24477-8693-4124-97be-b845c9ccac28	10	2	2026-07-29 22:12:17.402923	35
75	ece24477-8693-4124-97be-b845c9ccac28	11	2	2026-07-29 22:12:17.402923	35
76	ece24477-8693-4124-97be-b845c9ccac28	12	2	2026-07-29 22:12:17.402923	35
77	ece24477-8693-4124-97be-b845c9ccac28	13	2	2026-07-29 22:12:17.402923	35
78	ece24477-8693-4124-97be-b845c9ccac28	14	2	2026-07-29 22:12:17.402923	35
79	ece24477-8693-4124-97be-b845c9ccac28	15	2	2026-07-29 22:12:17.402923	35
80	ece24477-8693-4124-97be-b845c9ccac28	16	2	2026-07-29 22:12:17.402923	35
81	ece24477-8693-4124-97be-b845c9ccac28	17	2	2026-07-29 22:12:17.402923	35
82	ece24477-8693-4124-97be-b845c9ccac28	18	2	2026-07-29 22:12:17.402923	35
83	ece24477-8693-4124-97be-b845c9ccac28	19	2	2026-07-29 22:12:17.402923	35
84	ece24477-8693-4124-97be-b845c9ccac28	20	2	2026-07-29 22:12:17.402923	35
85	ece24477-8693-4124-97be-b845c9ccac28	21	2	2026-07-29 22:12:17.402923	35
86	ece24477-8693-4124-97be-b845c9ccac28	22	2	2026-07-29 22:12:17.402923	35
87	ece24477-8693-4124-97be-b845c9ccac28	23	2	2026-07-29 22:12:17.402923	35
88	ece24477-8693-4124-97be-b845c9ccac28	24	2	2026-07-29 22:12:17.402923	35
89	ece24477-8693-4124-97be-b845c9ccac28	25	2	2026-07-29 22:12:17.402923	35
90	ece24477-8693-4124-97be-b845c9ccac28	26	2	2026-07-29 22:12:17.402923	35
91	ece24477-8693-4124-97be-b845c9ccac28	27	2	2026-07-29 22:12:17.402923	35
92	ece24477-8693-4124-97be-b845c9ccac28	28	2	2026-07-29 22:12:17.402923	35
93	ece24477-8693-4124-97be-b845c9ccac28	29	2	2026-07-29 22:12:17.402923	35
94	ece24477-8693-4124-97be-b845c9ccac28	30	2	2026-07-29 22:12:17.402923	35
95	ece24477-8693-4124-97be-b845c9ccac28	31	2	2026-07-29 22:12:17.402923	35
96	ece24477-8693-4124-97be-b845c9ccac28	32	2	2026-07-29 22:12:17.402923	35
97	c7c98263-499c-4f3d-ba66-cae4531aa6b9	1	4	2026-07-29 22:39:11.197461	36
98	c7c98263-499c-4f3d-ba66-cae4531aa6b9	2	4	2026-07-29 22:39:11.197461	36
99	c7c98263-499c-4f3d-ba66-cae4531aa6b9	3	4	2026-07-29 22:39:11.197461	36
100	c7c98263-499c-4f3d-ba66-cae4531aa6b9	4	4	2026-07-29 22:39:11.197461	36
101	c7c98263-499c-4f3d-ba66-cae4531aa6b9	5	4	2026-07-29 22:39:11.197461	36
102	c7c98263-499c-4f3d-ba66-cae4531aa6b9	6	4	2026-07-29 22:39:11.197461	36
103	c7c98263-499c-4f3d-ba66-cae4531aa6b9	7	4	2026-07-29 22:39:11.197461	36
104	c7c98263-499c-4f3d-ba66-cae4531aa6b9	8	1	2026-07-29 22:39:11.197461	36
105	c7c98263-499c-4f3d-ba66-cae4531aa6b9	9	1	2026-07-29 22:39:11.197461	36
106	c7c98263-499c-4f3d-ba66-cae4531aa6b9	10	2	2026-07-29 22:39:11.197461	36
107	c7c98263-499c-4f3d-ba66-cae4531aa6b9	11	0	2026-07-29 22:39:11.197461	36
108	c7c98263-499c-4f3d-ba66-cae4531aa6b9	12	1	2026-07-29 22:39:11.197461	36
109	c7c98263-499c-4f3d-ba66-cae4531aa6b9	13	2	2026-07-29 22:39:11.197461	36
110	c7c98263-499c-4f3d-ba66-cae4531aa6b9	14	3	2026-07-29 22:39:11.197461	36
111	c7c98263-499c-4f3d-ba66-cae4531aa6b9	15	3	2026-07-29 22:39:11.197461	36
112	c7c98263-499c-4f3d-ba66-cae4531aa6b9	16	2	2026-07-29 22:39:11.197461	36
113	c7c98263-499c-4f3d-ba66-cae4531aa6b9	17	1	2026-07-29 22:39:11.197461	36
114	c7c98263-499c-4f3d-ba66-cae4531aa6b9	18	0	2026-07-29 22:39:11.197461	36
115	c7c98263-499c-4f3d-ba66-cae4531aa6b9	19	2	2026-07-29 22:39:11.197461	36
116	c7c98263-499c-4f3d-ba66-cae4531aa6b9	20	1	2026-07-29 22:39:11.197461	36
117	c7c98263-499c-4f3d-ba66-cae4531aa6b9	21	3	2026-07-29 22:39:11.197461	36
118	c7c98263-499c-4f3d-ba66-cae4531aa6b9	22	0	2026-07-29 22:39:11.197461	36
119	c7c98263-499c-4f3d-ba66-cae4531aa6b9	23	1	2026-07-29 22:39:11.197461	36
120	c7c98263-499c-4f3d-ba66-cae4531aa6b9	24	2	2026-07-29 22:39:11.197461	36
121	c7c98263-499c-4f3d-ba66-cae4531aa6b9	25	3	2026-07-29 22:39:11.197461	36
122	c7c98263-499c-4f3d-ba66-cae4531aa6b9	26	4	2026-07-29 22:39:11.197461	36
123	c7c98263-499c-4f3d-ba66-cae4531aa6b9	27	1	2026-07-29 22:39:11.197461	36
124	c7c98263-499c-4f3d-ba66-cae4531aa6b9	28	3	2026-07-29 22:39:11.197461	36
125	c7c98263-499c-4f3d-ba66-cae4531aa6b9	29	2	2026-07-29 22:39:11.197461	36
126	c7c98263-499c-4f3d-ba66-cae4531aa6b9	30	1	2026-07-29 22:39:11.197461	36
127	c7c98263-499c-4f3d-ba66-cae4531aa6b9	31	2	2026-07-29 22:39:11.197461	36
128	c7c98263-499c-4f3d-ba66-cae4531aa6b9	32	0	2026-07-29 22:39:11.197461	36
129	d3d36d70-12dd-4704-89cb-301a0162f025	1	2	2026-07-30 00:40:47.403797	37
130	d3d36d70-12dd-4704-89cb-301a0162f025	2	2	2026-07-30 00:40:47.403797	37
131	d3d36d70-12dd-4704-89cb-301a0162f025	3	2	2026-07-30 00:40:47.403797	37
132	d3d36d70-12dd-4704-89cb-301a0162f025	4	2	2026-07-30 00:40:47.403797	37
133	d3d36d70-12dd-4704-89cb-301a0162f025	5	2	2026-07-30 00:40:47.403797	37
134	d3d36d70-12dd-4704-89cb-301a0162f025	6	2	2026-07-30 00:40:47.403797	37
135	d3d36d70-12dd-4704-89cb-301a0162f025	7	2	2026-07-30 00:40:47.403797	37
136	d3d36d70-12dd-4704-89cb-301a0162f025	8	2	2026-07-30 00:40:47.403797	37
137	d3d36d70-12dd-4704-89cb-301a0162f025	9	2	2026-07-30 00:40:47.403797	37
138	d3d36d70-12dd-4704-89cb-301a0162f025	10	2	2026-07-30 00:40:47.403797	37
139	d3d36d70-12dd-4704-89cb-301a0162f025	11	2	2026-07-30 00:40:47.403797	37
140	d3d36d70-12dd-4704-89cb-301a0162f025	12	2	2026-07-30 00:40:47.403797	37
141	d3d36d70-12dd-4704-89cb-301a0162f025	13	2	2026-07-30 00:40:47.403797	37
142	d3d36d70-12dd-4704-89cb-301a0162f025	14	2	2026-07-30 00:40:47.403797	37
143	d3d36d70-12dd-4704-89cb-301a0162f025	15	2	2026-07-30 00:40:47.403797	37
144	d3d36d70-12dd-4704-89cb-301a0162f025	16	2	2026-07-30 00:40:47.403797	37
145	d3d36d70-12dd-4704-89cb-301a0162f025	17	2	2026-07-30 00:40:47.403797	37
146	d3d36d70-12dd-4704-89cb-301a0162f025	18	2	2026-07-30 00:40:47.403797	37
147	d3d36d70-12dd-4704-89cb-301a0162f025	19	2	2026-07-30 00:40:47.403797	37
148	d3d36d70-12dd-4704-89cb-301a0162f025	20	2	2026-07-30 00:40:47.403797	37
149	d3d36d70-12dd-4704-89cb-301a0162f025	21	2	2026-07-30 00:40:47.403797	37
150	d3d36d70-12dd-4704-89cb-301a0162f025	22	2	2026-07-30 00:40:47.403797	37
151	d3d36d70-12dd-4704-89cb-301a0162f025	23	2	2026-07-30 00:40:47.403797	37
152	d3d36d70-12dd-4704-89cb-301a0162f025	24	2	2026-07-30 00:40:47.403797	37
153	d3d36d70-12dd-4704-89cb-301a0162f025	25	2	2026-07-30 00:40:47.403797	37
154	d3d36d70-12dd-4704-89cb-301a0162f025	26	2	2026-07-30 00:40:47.403797	37
155	d3d36d70-12dd-4704-89cb-301a0162f025	27	2	2026-07-30 00:40:47.403797	37
156	d3d36d70-12dd-4704-89cb-301a0162f025	28	2	2026-07-30 00:40:47.403797	37
157	d3d36d70-12dd-4704-89cb-301a0162f025	29	2	2026-07-30 00:40:47.403797	37
158	d3d36d70-12dd-4704-89cb-301a0162f025	30	2	2026-07-30 00:40:47.403797	37
159	d3d36d70-12dd-4704-89cb-301a0162f025	31	2	2026-07-30 00:40:47.403797	37
160	d3d36d70-12dd-4704-89cb-301a0162f025	32	2	2026-07-30 00:40:47.403797	37
161	5d3a0cc1-a6d8-46dd-b756-636cf3cd5c8f	1	4	2026-08-06 19:22:15.103704	38
162	5d3a0cc1-a6d8-46dd-b756-636cf3cd5c8f	2	4	2026-08-06 19:22:15.103704	38
163	5d3a0cc1-a6d8-46dd-b756-636cf3cd5c8f	3	4	2026-08-06 19:22:15.103704	38
164	5d3a0cc1-a6d8-46dd-b756-636cf3cd5c8f	4	4	2026-08-06 19:22:15.103704	38
165	5d3a0cc1-a6d8-46dd-b756-636cf3cd5c8f	5	4	2026-08-06 19:22:15.103704	38
166	5d3a0cc1-a6d8-46dd-b756-636cf3cd5c8f	6	4	2026-08-06 19:22:15.103704	38
167	5d3a0cc1-a6d8-46dd-b756-636cf3cd5c8f	7	4	2026-08-06 19:22:15.103704	38
168	5d3a0cc1-a6d8-46dd-b756-636cf3cd5c8f	8	4	2026-08-06 19:22:15.103704	38
169	5d3a0cc1-a6d8-46dd-b756-636cf3cd5c8f	9	4	2026-08-06 19:22:15.103704	38
170	5d3a0cc1-a6d8-46dd-b756-636cf3cd5c8f	10	4	2026-08-06 19:22:15.103704	38
171	5d3a0cc1-a6d8-46dd-b756-636cf3cd5c8f	11	4	2026-08-06 19:22:15.103704	38
172	5d3a0cc1-a6d8-46dd-b756-636cf3cd5c8f	12	4	2026-08-06 19:22:15.103704	38
173	5d3a0cc1-a6d8-46dd-b756-636cf3cd5c8f	13	4	2026-08-06 19:22:15.103704	38
174	5d3a0cc1-a6d8-46dd-b756-636cf3cd5c8f	14	4	2026-08-06 19:22:15.103704	38
175	5d3a0cc1-a6d8-46dd-b756-636cf3cd5c8f	15	4	2026-08-06 19:22:15.103704	38
176	5d3a0cc1-a6d8-46dd-b756-636cf3cd5c8f	16	4	2026-08-06 19:22:15.103704	38
177	5d3a0cc1-a6d8-46dd-b756-636cf3cd5c8f	17	4	2026-08-06 19:22:15.103704	38
178	5d3a0cc1-a6d8-46dd-b756-636cf3cd5c8f	18	4	2026-08-06 19:22:15.103704	38
179	5d3a0cc1-a6d8-46dd-b756-636cf3cd5c8f	19	4	2026-08-06 19:22:15.103704	38
180	5d3a0cc1-a6d8-46dd-b756-636cf3cd5c8f	20	4	2026-08-06 19:22:15.103704	38
181	5d3a0cc1-a6d8-46dd-b756-636cf3cd5c8f	21	4	2026-08-06 19:22:15.103704	38
182	5d3a0cc1-a6d8-46dd-b756-636cf3cd5c8f	22	4	2026-08-06 19:22:15.103704	38
183	5d3a0cc1-a6d8-46dd-b756-636cf3cd5c8f	23	4	2026-08-06 19:22:15.103704	38
184	5d3a0cc1-a6d8-46dd-b756-636cf3cd5c8f	24	4	2026-08-06 19:22:15.103704	38
185	5d3a0cc1-a6d8-46dd-b756-636cf3cd5c8f	25	4	2026-08-06 19:22:15.103704	38
186	5d3a0cc1-a6d8-46dd-b756-636cf3cd5c8f	26	4	2026-08-06 19:22:15.103704	38
187	5d3a0cc1-a6d8-46dd-b756-636cf3cd5c8f	27	4	2026-08-06 19:22:15.103704	38
188	5d3a0cc1-a6d8-46dd-b756-636cf3cd5c8f	28	4	2026-08-06 19:22:15.103704	38
189	5d3a0cc1-a6d8-46dd-b756-636cf3cd5c8f	29	4	2026-08-06 19:22:15.103704	38
190	5d3a0cc1-a6d8-46dd-b756-636cf3cd5c8f	30	4	2026-08-06 19:22:15.103704	38
191	5d3a0cc1-a6d8-46dd-b756-636cf3cd5c8f	31	4	2026-08-06 19:22:15.103704	38
192	5d3a0cc1-a6d8-46dd-b756-636cf3cd5c8f	32	4	2026-08-06 19:22:15.103704	38
\.


--
-- Data for Name: schema_migrations; Type: TABLE DATA; Schema: realtime; Owner: -
--

COPY realtime.schema_migrations (version, inserted_at) FROM stdin;
20211116024918	2026-07-25 14:33:46
20211116045059	2026-07-25 14:33:46
20211116050929	2026-07-25 14:33:46
20211116051442	2026-07-25 14:33:46
20211116212300	2026-07-25 14:33:46
20211116213355	2026-07-25 14:33:46
20211116213934	2026-07-25 14:33:46
20211116214523	2026-07-25 14:33:46
20211122062447	2026-07-25 14:33:46
20211124070109	2026-07-25 14:33:46
20211202204204	2026-07-25 14:33:46
20211202204605	2026-07-25 14:33:46
20211210212804	2026-07-25 14:33:46
20211228014915	2026-07-25 14:33:46
20220107221237	2026-07-25 14:33:46
20220228202821	2026-07-25 14:33:46
20220312004840	2026-07-25 14:33:46
20220603231003	2026-07-25 14:33:46
20220603232444	2026-07-25 14:33:46
20220615214548	2026-07-25 14:33:46
20220712093339	2026-07-25 14:33:46
20220908172859	2026-07-25 14:33:46
20220916233421	2026-07-25 14:33:46
20230119133233	2026-07-25 14:33:46
20230128025114	2026-07-25 14:33:46
20230128025212	2026-07-25 14:33:46
20230227211149	2026-07-25 14:33:46
20230228184745	2026-07-25 14:33:46
20230308225145	2026-07-25 14:33:46
20230328144023	2026-07-25 14:33:46
20231018144023	2026-07-25 14:33:46
20231204144023	2026-07-25 14:33:46
20231204144024	2026-07-25 14:33:46
20231204144025	2026-07-25 14:33:46
20240108234812	2026-07-25 14:33:46
20240109165339	2026-07-25 14:33:46
20240227174441	2026-07-25 14:33:46
20240311171622	2026-07-25 14:33:46
20240321100241	2026-07-25 14:33:46
20240401105812	2026-07-25 14:33:46
20240418121054	2026-07-25 14:33:46
20240523004032	2026-07-25 14:33:46
20240618124746	2026-07-25 14:33:46
20240801235015	2026-07-25 14:33:46
20240805133720	2026-07-25 14:33:46
20240827160934	2026-07-25 14:33:46
20240919163303	2026-07-25 14:33:46
20240919163305	2026-07-25 14:33:46
20241019105805	2026-07-25 14:33:46
20241030150047	2026-07-25 14:33:46
20241108114728	2026-07-25 14:33:46
20241121104152	2026-07-25 14:33:46
20241130184212	2026-07-25 14:33:46
20241220035512	2026-07-25 14:33:46
20241220123912	2026-07-25 14:33:46
20241224161212	2026-07-25 14:33:46
20250107150512	2026-07-25 14:33:46
20250110162412	2026-07-25 14:33:46
20250123174212	2026-07-25 14:33:46
20250128220012	2026-07-25 14:33:46
20250506224012	2026-07-25 14:33:46
20250523164012	2026-07-25 14:33:46
20250714121412	2026-07-25 14:33:46
20250905041441	2026-07-25 14:33:46
20251103001201	2026-07-25 14:33:46
20251120212548	2026-07-25 14:33:46
20251120215549	2026-07-25 14:33:46
20260218120000	2026-07-25 14:33:46
20260326120000	2026-07-25 14:33:46
20260514120000	2026-07-25 14:33:46
20260527120000	2026-07-25 14:33:46
20260528120000	2026-07-25 14:33:46
20260603120000	2026-07-25 14:33:46
20260605120000	2026-07-25 14:33:46
20260606110000	2026-07-25 14:33:46
20260616120000	2026-07-25 14:33:46
20260624120000	2026-07-25 14:33:46
20260626120000	2026-07-25 14:33:46
20260706120000	2026-07-25 14:33:46
20260707120000	2026-07-25 14:33:46
20260709120000	2026-07-25 14:33:46
\.


--
-- Data for Name: subscription; Type: TABLE DATA; Schema: realtime; Owner: -
--

COPY realtime.subscription (id, subscription_id, entity, filters, claims, created_at, action_filter, selected_columns) FROM stdin;
\.


--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: -
--

COPY storage.buckets (id, name, owner, created_at, updated_at, public, avif_autodetection, file_size_limit, allowed_mime_types, owner_id, type) FROM stdin;
\.


--
-- Data for Name: buckets_analytics; Type: TABLE DATA; Schema: storage; Owner: -
--

COPY storage.buckets_analytics (name, type, format, created_at, updated_at, id, deleted_at) FROM stdin;
\.


--
-- Data for Name: buckets_vectors; Type: TABLE DATA; Schema: storage; Owner: -
--

COPY storage.buckets_vectors (id, type, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: storage; Owner: -
--

COPY storage.migrations (id, name, hash, executed_at) FROM stdin;
0	create-migrations-table	e18db593bcde2aca2a408c4d1100f6abba2195df	2026-07-25 14:33:46.562411
1	initialmigration	6ab16121fbaa08bbd11b712d05f358f9b555d777	2026-07-25 14:33:46.568297
2	storage-schema	f6a1fa2c93cbcd16d4e487b362e45fca157a8dbd	2026-07-25 14:33:46.570625
3	pathtoken-column	2cb1b0004b817b29d5b0a971af16bafeede4b70d	2026-07-25 14:33:46.582728
4	add-migrations-rls	427c5b63fe1c5937495d9c635c263ee7a5905058	2026-07-25 14:33:46.61597
5	add-size-functions	79e081a1455b63666c1294a440f8ad4b1e6a7f84	2026-07-25 14:33:46.619373
6	change-column-name-in-get-size	ded78e2f1b5d7e616117897e6443a925965b30d2	2026-07-25 14:33:46.622925
7	add-rls-to-buckets	e7e7f86adbc51049f341dfe8d30256c1abca17aa	2026-07-25 14:33:46.625781
8	add-public-to-buckets	fd670db39ed65f9d08b01db09d6202503ca2bab3	2026-07-25 14:33:46.628152
9	fix-search-function	af597a1b590c70519b464a4ab3be54490712796b	2026-07-25 14:33:46.631866
10	search-files-search-function	b595f05e92f7e91211af1bbfe9c6a13bb3391e16	2026-07-25 14:33:46.634485
11	add-trigger-to-auto-update-updated_at-column	7425bdb14366d1739fa8a18c83100636d74dcaa2	2026-07-25 14:33:46.637683
12	add-automatic-avif-detection-flag	8e92e1266eb29518b6a4c5313ab8f29dd0d08df9	2026-07-25 14:33:46.640481
13	add-bucket-custom-limits	cce962054138135cd9a8c4bcd531598684b25e7d	2026-07-25 14:33:50.455792
14	use-bytes-for-max-size	941c41b346f9802b411f06f30e972ad4744dad27	2026-07-25 14:33:50.477386
15	add-can-insert-object-function	934146bc38ead475f4ef4b555c524ee5d66799e5	2026-07-25 14:33:50.577383
16	add-version	76debf38d3fd07dcfc747ca49096457d95b1221b	2026-07-25 14:33:50.586962
17	drop-owner-foreign-key	f1cbb288f1b7a4c1eb8c38504b80ae2a0153d101	2026-07-25 14:33:50.600603
18	add_owner_id_column_deprecate_owner	e7a511b379110b08e2f214be852c35414749fe66	2026-07-25 14:33:50.622573
19	alter-default-value-objects-id	02e5e22a78626187e00d173dc45f58fa66a4f043	2026-07-25 14:33:50.643517
20	list-objects-with-delimiter	cd694ae708e51ba82bf012bba00caf4f3b6393b7	2026-07-25 14:33:50.652538
21	s3-multipart-uploads	8c804d4a566c40cd1e4cc5b3725a664a9303657f	2026-07-25 14:33:50.661401
22	s3-multipart-uploads-big-ints	9737dc258d2397953c9953d9b86920b8be0cdb73	2026-07-25 14:33:50.696613
23	optimize-search-function	9d7e604cddc4b56a5422dc68c9313f4a1b6f132c	2026-07-25 14:33:50.711051
24	operation-function	8312e37c2bf9e76bbe841aa5fda889206d2bf8aa	2026-07-25 14:33:50.717332
25	custom-metadata	d974c6057c3db1c1f847afa0e291e6165693b990	2026-07-25 14:33:50.72209
26	objects-prefixes	215cabcb7f78121892a5a2037a09fedf9a1ae322	2026-07-25 14:33:50.72667
27	search-v2	859ba38092ac96eb3964d83bf53ccc0b141663a6	2026-07-25 14:33:50.730404
28	object-bucket-name-sorting	c73a2b5b5d4041e39705814fd3a1b95502d38ce4	2026-07-25 14:33:50.734238
29	create-prefixes	ad2c1207f76703d11a9f9007f821620017a66c21	2026-07-25 14:33:50.738139
30	update-object-levels	2be814ff05c8252fdfdc7cfb4b7f5c7e17f0bed6	2026-07-25 14:33:50.742002
31	objects-level-index	b40367c14c3440ec75f19bbce2d71e914ddd3da0	2026-07-25 14:33:50.745683
32	backward-compatible-index-on-objects	e0c37182b0f7aee3efd823298fb3c76f1042c0f7	2026-07-25 14:33:50.749349
33	backward-compatible-index-on-prefixes	b480e99ed951e0900f033ec4eb34b5bdcb4e3d49	2026-07-25 14:33:50.752885
34	optimize-search-function-v1	ca80a3dc7bfef894df17108785ce29a7fc8ee456	2026-07-25 14:33:50.75631
35	add-insert-trigger-prefixes	458fe0ffd07ec53f5e3ce9df51bfdf4861929ccc	2026-07-25 14:33:50.75989
36	optimise-existing-functions	6ae5fca6af5c55abe95369cd4f93985d1814ca8f	2026-07-25 14:33:50.763571
37	add-bucket-name-length-trigger	3944135b4e3e8b22d6d4cbb568fe3b0b51df15c1	2026-07-25 14:33:50.767398
38	iceberg-catalog-flag-on-buckets	02716b81ceec9705aed84aa1501657095b32e5c5	2026-07-25 14:33:50.77311
39	add-search-v2-sort-support	6706c5f2928846abee18461279799ad12b279b78	2026-07-25 14:33:50.789594
40	fix-prefix-race-conditions-optimized	7ad69982ae2d372b21f48fc4829ae9752c518f6b	2026-07-25 14:33:50.794767
41	add-object-level-update-trigger	07fcf1a22165849b7a029deed059ffcde08d1ae0	2026-07-25 14:33:50.798565
42	rollback-prefix-triggers	771479077764adc09e2ea2043eb627503c034cd4	2026-07-25 14:33:50.80239
43	fix-object-level	84b35d6caca9d937478ad8a797491f38b8c2979f	2026-07-25 14:33:50.806072
44	vector-bucket-type	99c20c0ffd52bb1ff1f32fb992f3b351e3ef8fb3	2026-07-25 14:33:50.809711
45	vector-buckets	049e27196d77a7cb76497a85afae669d8b230953	2026-07-25 14:33:50.814516
46	buckets-objects-grants	fedeb96d60fefd8e02ab3ded9fbde05632f84aed	2026-07-25 14:33:50.832554
47	iceberg-table-metadata	649df56855c24d8b36dd4cc1aeb8251aa9ad42c2	2026-07-25 14:33:50.838169
48	iceberg-catalog-ids	e0e8b460c609b9999ccd0df9ad14294613eed939	2026-07-25 14:33:50.845044
49	buckets-objects-grants-postgres	072b1195d0d5a2f888af6b2302a1938dd94b8b3d	2026-07-25 14:33:50.879646
50	search-v2-optimised	6323ac4f850aa14e7387eb32102869578b5bd478	2026-07-25 14:33:50.884477
51	index-backward-compatible-search	2ee395d433f76e38bcd3856debaf6e0e5b674011	2026-07-25 14:33:51.977129
52	drop-not-used-indexes-and-functions	5cc44c8696749ac11dd0dc37f2a3802075f3a171	2026-07-25 14:33:51.984363
53	drop-index-lower-name	d0cb18777d9e2a98ebe0bc5cc7a42e57ebe41854	2026-07-25 14:33:52.0045
54	drop-index-object-level	6289e048b1472da17c31a7eba1ded625a6457e67	2026-07-25 14:33:52.006722
55	prevent-direct-deletes	262a4798d5e0f2e7c8970232e03ce8be695d5819	2026-07-25 14:33:52.008277
56	fix-optimized-search-function	b823ed1e418101032fa01374edc9a436e54e3ed4	2026-07-25 14:33:52.024984
57	s3-multipart-uploads-metadata	f127886e00d1b374fadbc7c6b31e09336aad5287	2026-07-25 14:33:52.033589
58	operation-ergonomics	00ca5d483b3fe0d522133d9002ccc5df98365120	2026-07-25 14:33:52.040496
59	drop-unused-functions	38456f13e39691c2bbb4b5151d0d1cdbabd4a8c4	2026-07-25 14:33:52.046347
60	optimize-existing-functions-again	db35e1c91a9201e59f4fef8d972c2f277d68b157	2026-07-25 14:33:52.050342
\.


--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: -
--

COPY storage.objects (id, bucket_id, name, owner, created_at, updated_at, last_accessed_at, metadata, version, owner_id, user_metadata) FROM stdin;
\.


--
-- Data for Name: s3_multipart_uploads; Type: TABLE DATA; Schema: storage; Owner: -
--

COPY storage.s3_multipart_uploads (id, in_progress_size, upload_signature, bucket_id, key, version, owner_id, created_at, user_metadata, metadata) FROM stdin;
\.


--
-- Data for Name: s3_multipart_uploads_parts; Type: TABLE DATA; Schema: storage; Owner: -
--

COPY storage.s3_multipart_uploads_parts (id, upload_id, size, part_number, bucket_id, key, etag, owner_id, version, created_at) FROM stdin;
\.


--
-- Data for Name: vector_indexes; Type: TABLE DATA; Schema: storage; Owner: -
--

COPY storage.vector_indexes (id, name, bucket_id, data_type, dimension, distance_metric, metadata_configuration, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: -
--

COPY vault.secrets (id, name, description, secret, key_id, nonce, created_at, updated_at) FROM stdin;
\.


--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: -
--

SELECT pg_catalog.setval('auth.refresh_tokens_id_seq', 281, true);


--
-- Name: assessments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.assessments_id_seq', 38, true);


--
-- Name: game_scores_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.game_scores_id_seq', 86, true);


--
-- Name: games_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.games_id_seq', 29, true);


--
-- Name: survey_questions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.survey_questions_id_seq', 32, true);


--
-- Name: survey_responses_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.survey_responses_id_seq', 192, true);


--
-- Name: subscription_id_seq; Type: SEQUENCE SET; Schema: realtime; Owner: -
--

SELECT pg_catalog.setval('realtime.subscription_id_seq', 1, false);


--
-- Name: mfa_amr_claims amr_id_pk; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT amr_id_pk PRIMARY KEY (id);


--
-- Name: audit_log_entries audit_log_entries_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.audit_log_entries
    ADD CONSTRAINT audit_log_entries_pkey PRIMARY KEY (id);


--
-- Name: custom_oauth_providers custom_oauth_providers_identifier_key; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.custom_oauth_providers
    ADD CONSTRAINT custom_oauth_providers_identifier_key UNIQUE (identifier);


--
-- Name: custom_oauth_providers custom_oauth_providers_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.custom_oauth_providers
    ADD CONSTRAINT custom_oauth_providers_pkey PRIMARY KEY (id);


--
-- Name: flow_state flow_state_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.flow_state
    ADD CONSTRAINT flow_state_pkey PRIMARY KEY (id);


--
-- Name: identities identities_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_pkey PRIMARY KEY (id);


--
-- Name: identities identities_provider_id_provider_unique; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_provider_id_provider_unique UNIQUE (provider_id, provider);


--
-- Name: instances instances_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.instances
    ADD CONSTRAINT instances_pkey PRIMARY KEY (id);


--
-- Name: mfa_amr_claims mfa_amr_claims_session_id_authentication_method_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT mfa_amr_claims_session_id_authentication_method_pkey UNIQUE (session_id, authentication_method);


--
-- Name: mfa_challenges mfa_challenges_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.mfa_challenges
    ADD CONSTRAINT mfa_challenges_pkey PRIMARY KEY (id);


--
-- Name: mfa_factors mfa_factors_last_challenged_at_key; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_last_challenged_at_key UNIQUE (last_challenged_at);


--
-- Name: mfa_factors mfa_factors_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_pkey PRIMARY KEY (id);


--
-- Name: oauth_authorizations oauth_authorizations_authorization_code_key; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.oauth_authorizations
    ADD CONSTRAINT oauth_authorizations_authorization_code_key UNIQUE (authorization_code);


--
-- Name: oauth_authorizations oauth_authorizations_authorization_id_key; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.oauth_authorizations
    ADD CONSTRAINT oauth_authorizations_authorization_id_key UNIQUE (authorization_id);


--
-- Name: oauth_authorizations oauth_authorizations_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.oauth_authorizations
    ADD CONSTRAINT oauth_authorizations_pkey PRIMARY KEY (id);


--
-- Name: oauth_client_states oauth_client_states_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.oauth_client_states
    ADD CONSTRAINT oauth_client_states_pkey PRIMARY KEY (id);


--
-- Name: oauth_clients oauth_clients_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.oauth_clients
    ADD CONSTRAINT oauth_clients_pkey PRIMARY KEY (id);


--
-- Name: oauth_consents oauth_consents_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.oauth_consents
    ADD CONSTRAINT oauth_consents_pkey PRIMARY KEY (id);


--
-- Name: oauth_consents oauth_consents_user_client_unique; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.oauth_consents
    ADD CONSTRAINT oauth_consents_user_client_unique UNIQUE (user_id, client_id);


--
-- Name: one_time_tokens one_time_tokens_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.one_time_tokens
    ADD CONSTRAINT one_time_tokens_pkey PRIMARY KEY (id);


--
-- Name: refresh_tokens refresh_tokens_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_pkey PRIMARY KEY (id);


--
-- Name: refresh_tokens refresh_tokens_token_unique; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_token_unique UNIQUE (token);


--
-- Name: saml_providers saml_providers_entity_id_key; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_entity_id_key UNIQUE (entity_id);


--
-- Name: saml_providers saml_providers_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_pkey PRIMARY KEY (id);


--
-- Name: saml_relay_states saml_relay_states_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_pkey PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: sso_domains sso_domains_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.sso_domains
    ADD CONSTRAINT sso_domains_pkey PRIMARY KEY (id);


--
-- Name: sso_providers sso_providers_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.sso_providers
    ADD CONSTRAINT sso_providers_pkey PRIMARY KEY (id);


--
-- Name: users users_phone_key; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.users
    ADD CONSTRAINT users_phone_key UNIQUE (phone);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: webauthn_challenges webauthn_challenges_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.webauthn_challenges
    ADD CONSTRAINT webauthn_challenges_pkey PRIMARY KEY (id);


--
-- Name: webauthn_credentials webauthn_credentials_pkey; Type: CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.webauthn_credentials
    ADD CONSTRAINT webauthn_credentials_pkey PRIMARY KEY (id);


--
-- Name: assessments assessments_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.assessments
    ADD CONSTRAINT assessments_pkey PRIMARY KEY (id);


--
-- Name: children children_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.children
    ADD CONSTRAINT children_pkey PRIMARY KEY (id);


--
-- Name: game_scores game_scores_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.game_scores
    ADD CONSTRAINT game_scores_pkey PRIMARY KEY (id);


--
-- Name: games games_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.games
    ADD CONSTRAINT games_pkey PRIMARY KEY (id);


--
-- Name: parents parents_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.parents
    ADD CONSTRAINT parents_email_key UNIQUE (email);


--
-- Name: parents parents_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.parents
    ADD CONSTRAINT parents_pkey PRIMARY KEY (id);


--
-- Name: survey_questions survey_questions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.survey_questions
    ADD CONSTRAINT survey_questions_pkey PRIMARY KEY (id);


--
-- Name: survey_responses survey_responses_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.survey_responses
    ADD CONSTRAINT survey_responses_pkey PRIMARY KEY (id);


--
-- Name: messages messages_payload_exclusive; Type: CHECK CONSTRAINT; Schema: realtime; Owner: -
--

ALTER TABLE realtime.messages
    ADD CONSTRAINT messages_payload_exclusive CHECK (((payload IS NULL) OR (binary_payload IS NULL))) NOT VALID;


--
-- Name: messages messages_pkey; Type: CONSTRAINT; Schema: realtime; Owner: -
--

ALTER TABLE ONLY realtime.messages
    ADD CONSTRAINT messages_pkey PRIMARY KEY (id, inserted_at);


--
-- Name: subscription pk_subscription; Type: CONSTRAINT; Schema: realtime; Owner: -
--

ALTER TABLE ONLY realtime.subscription
    ADD CONSTRAINT pk_subscription PRIMARY KEY (id);


--
-- Name: schema_migrations schema_migrations_pkey; Type: CONSTRAINT; Schema: realtime; Owner: -
--

ALTER TABLE ONLY realtime.schema_migrations
    ADD CONSTRAINT schema_migrations_pkey PRIMARY KEY (version);


--
-- Name: buckets_analytics buckets_analytics_pkey; Type: CONSTRAINT; Schema: storage; Owner: -
--

ALTER TABLE ONLY storage.buckets_analytics
    ADD CONSTRAINT buckets_analytics_pkey PRIMARY KEY (id);


--
-- Name: buckets buckets_pkey; Type: CONSTRAINT; Schema: storage; Owner: -
--

ALTER TABLE ONLY storage.buckets
    ADD CONSTRAINT buckets_pkey PRIMARY KEY (id);


--
-- Name: buckets_vectors buckets_vectors_pkey; Type: CONSTRAINT; Schema: storage; Owner: -
--

ALTER TABLE ONLY storage.buckets_vectors
    ADD CONSTRAINT buckets_vectors_pkey PRIMARY KEY (id);


--
-- Name: migrations migrations_name_key; Type: CONSTRAINT; Schema: storage; Owner: -
--

ALTER TABLE ONLY storage.migrations
    ADD CONSTRAINT migrations_name_key UNIQUE (name);


--
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: storage; Owner: -
--

ALTER TABLE ONLY storage.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- Name: objects objects_pkey; Type: CONSTRAINT; Schema: storage; Owner: -
--

ALTER TABLE ONLY storage.objects
    ADD CONSTRAINT objects_pkey PRIMARY KEY (id);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_pkey; Type: CONSTRAINT; Schema: storage; Owner: -
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_pkey PRIMARY KEY (id);


--
-- Name: s3_multipart_uploads s3_multipart_uploads_pkey; Type: CONSTRAINT; Schema: storage; Owner: -
--

ALTER TABLE ONLY storage.s3_multipart_uploads
    ADD CONSTRAINT s3_multipart_uploads_pkey PRIMARY KEY (id);


--
-- Name: vector_indexes vector_indexes_pkey; Type: CONSTRAINT; Schema: storage; Owner: -
--

ALTER TABLE ONLY storage.vector_indexes
    ADD CONSTRAINT vector_indexes_pkey PRIMARY KEY (id);


--
-- Name: audit_logs_instance_id_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX audit_logs_instance_id_idx ON auth.audit_log_entries USING btree (instance_id);


--
-- Name: confirmation_token_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE UNIQUE INDEX confirmation_token_idx ON auth.users USING btree (confirmation_token) WHERE ((confirmation_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: custom_oauth_providers_created_at_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX custom_oauth_providers_created_at_idx ON auth.custom_oauth_providers USING btree (created_at);


--
-- Name: custom_oauth_providers_enabled_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX custom_oauth_providers_enabled_idx ON auth.custom_oauth_providers USING btree (enabled);


--
-- Name: custom_oauth_providers_identifier_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX custom_oauth_providers_identifier_idx ON auth.custom_oauth_providers USING btree (identifier);


--
-- Name: custom_oauth_providers_provider_type_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX custom_oauth_providers_provider_type_idx ON auth.custom_oauth_providers USING btree (provider_type);


--
-- Name: email_change_token_current_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE UNIQUE INDEX email_change_token_current_idx ON auth.users USING btree (email_change_token_current) WHERE ((email_change_token_current)::text !~ '^[0-9 ]*$'::text);


--
-- Name: email_change_token_new_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE UNIQUE INDEX email_change_token_new_idx ON auth.users USING btree (email_change_token_new) WHERE ((email_change_token_new)::text !~ '^[0-9 ]*$'::text);


--
-- Name: factor_id_created_at_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX factor_id_created_at_idx ON auth.mfa_factors USING btree (user_id, created_at);


--
-- Name: flow_state_created_at_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX flow_state_created_at_idx ON auth.flow_state USING btree (created_at DESC);


--
-- Name: identities_email_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX identities_email_idx ON auth.identities USING btree (email text_pattern_ops);


--
-- Name: INDEX identities_email_idx; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON INDEX auth.identities_email_idx IS 'Auth: Ensures indexed queries on the email column';


--
-- Name: identities_user_id_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX identities_user_id_idx ON auth.identities USING btree (user_id);


--
-- Name: idx_auth_code; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX idx_auth_code ON auth.flow_state USING btree (auth_code);


--
-- Name: idx_oauth_client_states_created_at; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX idx_oauth_client_states_created_at ON auth.oauth_client_states USING btree (created_at);


--
-- Name: idx_user_id_auth_method; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX idx_user_id_auth_method ON auth.flow_state USING btree (user_id, authentication_method);


--
-- Name: idx_users_created_at_desc; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX idx_users_created_at_desc ON auth.users USING btree (created_at DESC);


--
-- Name: idx_users_email; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX idx_users_email ON auth.users USING btree (email);


--
-- Name: idx_users_last_sign_in_at_desc; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX idx_users_last_sign_in_at_desc ON auth.users USING btree (last_sign_in_at DESC);


--
-- Name: idx_users_name; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX idx_users_name ON auth.users USING btree (((raw_user_meta_data ->> 'name'::text))) WHERE ((raw_user_meta_data ->> 'name'::text) IS NOT NULL);


--
-- Name: mfa_challenge_created_at_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX mfa_challenge_created_at_idx ON auth.mfa_challenges USING btree (created_at DESC);


--
-- Name: mfa_factors_user_friendly_name_unique; Type: INDEX; Schema: auth; Owner: -
--

CREATE UNIQUE INDEX mfa_factors_user_friendly_name_unique ON auth.mfa_factors USING btree (friendly_name, user_id) WHERE (TRIM(BOTH FROM friendly_name) <> ''::text);


--
-- Name: mfa_factors_user_id_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX mfa_factors_user_id_idx ON auth.mfa_factors USING btree (user_id);


--
-- Name: oauth_auth_pending_exp_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX oauth_auth_pending_exp_idx ON auth.oauth_authorizations USING btree (expires_at) WHERE (status = 'pending'::auth.oauth_authorization_status);


--
-- Name: oauth_clients_deleted_at_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX oauth_clients_deleted_at_idx ON auth.oauth_clients USING btree (deleted_at);


--
-- Name: oauth_consents_active_client_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX oauth_consents_active_client_idx ON auth.oauth_consents USING btree (client_id) WHERE (revoked_at IS NULL);


--
-- Name: oauth_consents_active_user_client_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX oauth_consents_active_user_client_idx ON auth.oauth_consents USING btree (user_id, client_id) WHERE (revoked_at IS NULL);


--
-- Name: oauth_consents_user_order_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX oauth_consents_user_order_idx ON auth.oauth_consents USING btree (user_id, granted_at DESC);


--
-- Name: one_time_tokens_relates_to_hash_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX one_time_tokens_relates_to_hash_idx ON auth.one_time_tokens USING hash (relates_to);


--
-- Name: one_time_tokens_token_hash_hash_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX one_time_tokens_token_hash_hash_idx ON auth.one_time_tokens USING hash (token_hash);


--
-- Name: one_time_tokens_user_id_token_type_key; Type: INDEX; Schema: auth; Owner: -
--

CREATE UNIQUE INDEX one_time_tokens_user_id_token_type_key ON auth.one_time_tokens USING btree (user_id, token_type);


--
-- Name: reauthentication_token_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE UNIQUE INDEX reauthentication_token_idx ON auth.users USING btree (reauthentication_token) WHERE ((reauthentication_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: recovery_token_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE UNIQUE INDEX recovery_token_idx ON auth.users USING btree (recovery_token) WHERE ((recovery_token)::text !~ '^[0-9 ]*$'::text);


--
-- Name: refresh_tokens_instance_id_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX refresh_tokens_instance_id_idx ON auth.refresh_tokens USING btree (instance_id);


--
-- Name: refresh_tokens_instance_id_user_id_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX refresh_tokens_instance_id_user_id_idx ON auth.refresh_tokens USING btree (instance_id, user_id);


--
-- Name: refresh_tokens_parent_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX refresh_tokens_parent_idx ON auth.refresh_tokens USING btree (parent);


--
-- Name: refresh_tokens_session_id_revoked_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX refresh_tokens_session_id_revoked_idx ON auth.refresh_tokens USING btree (session_id, revoked);


--
-- Name: refresh_tokens_updated_at_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX refresh_tokens_updated_at_idx ON auth.refresh_tokens USING btree (updated_at DESC);


--
-- Name: saml_providers_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX saml_providers_sso_provider_id_idx ON auth.saml_providers USING btree (sso_provider_id);


--
-- Name: saml_relay_states_created_at_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX saml_relay_states_created_at_idx ON auth.saml_relay_states USING btree (created_at DESC);


--
-- Name: saml_relay_states_for_email_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX saml_relay_states_for_email_idx ON auth.saml_relay_states USING btree (for_email);


--
-- Name: saml_relay_states_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX saml_relay_states_sso_provider_id_idx ON auth.saml_relay_states USING btree (sso_provider_id);


--
-- Name: sessions_not_after_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX sessions_not_after_idx ON auth.sessions USING btree (not_after DESC);


--
-- Name: sessions_oauth_client_id_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX sessions_oauth_client_id_idx ON auth.sessions USING btree (oauth_client_id);


--
-- Name: sessions_user_id_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX sessions_user_id_idx ON auth.sessions USING btree (user_id);


--
-- Name: sso_domains_domain_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE UNIQUE INDEX sso_domains_domain_idx ON auth.sso_domains USING btree (lower(domain));


--
-- Name: sso_domains_sso_provider_id_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX sso_domains_sso_provider_id_idx ON auth.sso_domains USING btree (sso_provider_id);


--
-- Name: sso_providers_resource_id_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE UNIQUE INDEX sso_providers_resource_id_idx ON auth.sso_providers USING btree (lower(resource_id));


--
-- Name: sso_providers_resource_id_pattern_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX sso_providers_resource_id_pattern_idx ON auth.sso_providers USING btree (resource_id text_pattern_ops);


--
-- Name: unique_phone_factor_per_user; Type: INDEX; Schema: auth; Owner: -
--

CREATE UNIQUE INDEX unique_phone_factor_per_user ON auth.mfa_factors USING btree (user_id, phone);


--
-- Name: user_id_created_at_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX user_id_created_at_idx ON auth.sessions USING btree (user_id, created_at);


--
-- Name: users_email_partial_key; Type: INDEX; Schema: auth; Owner: -
--

CREATE UNIQUE INDEX users_email_partial_key ON auth.users USING btree (email) WHERE (is_sso_user = false);


--
-- Name: INDEX users_email_partial_key; Type: COMMENT; Schema: auth; Owner: -
--

COMMENT ON INDEX auth.users_email_partial_key IS 'Auth: A partial unique index that applies only when is_sso_user is false';


--
-- Name: users_instance_id_email_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX users_instance_id_email_idx ON auth.users USING btree (instance_id, lower((email)::text));


--
-- Name: users_instance_id_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX users_instance_id_idx ON auth.users USING btree (instance_id);


--
-- Name: users_is_anonymous_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX users_is_anonymous_idx ON auth.users USING btree (is_anonymous);


--
-- Name: webauthn_challenges_expires_at_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX webauthn_challenges_expires_at_idx ON auth.webauthn_challenges USING btree (expires_at);


--
-- Name: webauthn_challenges_user_id_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX webauthn_challenges_user_id_idx ON auth.webauthn_challenges USING btree (user_id);


--
-- Name: webauthn_credentials_credential_id_key; Type: INDEX; Schema: auth; Owner: -
--

CREATE UNIQUE INDEX webauthn_credentials_credential_id_key ON auth.webauthn_credentials USING btree (credential_id);


--
-- Name: webauthn_credentials_user_id_idx; Type: INDEX; Schema: auth; Owner: -
--

CREATE INDEX webauthn_credentials_user_id_idx ON auth.webauthn_credentials USING btree (user_id);


--
-- Name: ix_realtime_subscription_entity; Type: INDEX; Schema: realtime; Owner: -
--

CREATE INDEX ix_realtime_subscription_entity ON realtime.subscription USING btree (entity);


--
-- Name: messages_inserted_at_topic_index; Type: INDEX; Schema: realtime; Owner: -
--

CREATE INDEX messages_inserted_at_topic_index ON ONLY realtime.messages USING btree (inserted_at DESC, topic) WHERE ((extension = 'broadcast'::text) AND (private IS TRUE));


--
-- Name: subscription_subscription_id_entity_filters_action_filter_selec; Type: INDEX; Schema: realtime; Owner: -
--

CREATE UNIQUE INDEX subscription_subscription_id_entity_filters_action_filter_selec ON realtime.subscription USING btree (subscription_id, entity, filters, action_filter, COALESCE(selected_columns, '{}'::text[]));


--
-- Name: bname; Type: INDEX; Schema: storage; Owner: -
--

CREATE UNIQUE INDEX bname ON storage.buckets USING btree (name);


--
-- Name: bucketid_objname; Type: INDEX; Schema: storage; Owner: -
--

CREATE UNIQUE INDEX bucketid_objname ON storage.objects USING btree (bucket_id, name);


--
-- Name: buckets_analytics_unique_name_idx; Type: INDEX; Schema: storage; Owner: -
--

CREATE UNIQUE INDEX buckets_analytics_unique_name_idx ON storage.buckets_analytics USING btree (name) WHERE (deleted_at IS NULL);


--
-- Name: idx_multipart_uploads_list; Type: INDEX; Schema: storage; Owner: -
--

CREATE INDEX idx_multipart_uploads_list ON storage.s3_multipart_uploads USING btree (bucket_id, key, created_at);


--
-- Name: idx_objects_bucket_id_name; Type: INDEX; Schema: storage; Owner: -
--

CREATE INDEX idx_objects_bucket_id_name ON storage.objects USING btree (bucket_id, name COLLATE "C");


--
-- Name: idx_objects_bucket_id_name_lower; Type: INDEX; Schema: storage; Owner: -
--

CREATE INDEX idx_objects_bucket_id_name_lower ON storage.objects USING btree (bucket_id, lower(name) COLLATE "C");


--
-- Name: name_prefix_search; Type: INDEX; Schema: storage; Owner: -
--

CREATE INDEX name_prefix_search ON storage.objects USING btree (name text_pattern_ops);


--
-- Name: vector_indexes_name_bucket_id_idx; Type: INDEX; Schema: storage; Owner: -
--

CREATE UNIQUE INDEX vector_indexes_name_bucket_id_idx ON storage.vector_indexes USING btree (name, bucket_id);


--
-- Name: subscription tr_check_filters; Type: TRIGGER; Schema: realtime; Owner: -
--

CREATE TRIGGER tr_check_filters BEFORE INSERT OR UPDATE ON realtime.subscription FOR EACH ROW EXECUTE FUNCTION realtime.subscription_check_filters();


--
-- Name: buckets enforce_bucket_name_length_trigger; Type: TRIGGER; Schema: storage; Owner: -
--

CREATE TRIGGER enforce_bucket_name_length_trigger BEFORE INSERT OR UPDATE OF name ON storage.buckets FOR EACH ROW EXECUTE FUNCTION storage.enforce_bucket_name_length();


--
-- Name: buckets protect_buckets_delete; Type: TRIGGER; Schema: storage; Owner: -
--

CREATE TRIGGER protect_buckets_delete BEFORE DELETE ON storage.buckets FOR EACH STATEMENT EXECUTE FUNCTION storage.protect_delete();


--
-- Name: objects protect_objects_delete; Type: TRIGGER; Schema: storage; Owner: -
--

CREATE TRIGGER protect_objects_delete BEFORE DELETE ON storage.objects FOR EACH STATEMENT EXECUTE FUNCTION storage.protect_delete();


--
-- Name: objects update_objects_updated_at; Type: TRIGGER; Schema: storage; Owner: -
--

CREATE TRIGGER update_objects_updated_at BEFORE UPDATE ON storage.objects FOR EACH ROW EXECUTE FUNCTION storage.update_updated_at_column();


--
-- Name: identities identities_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.identities
    ADD CONSTRAINT identities_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: mfa_amr_claims mfa_amr_claims_session_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.mfa_amr_claims
    ADD CONSTRAINT mfa_amr_claims_session_id_fkey FOREIGN KEY (session_id) REFERENCES auth.sessions(id) ON DELETE CASCADE;


--
-- Name: mfa_challenges mfa_challenges_auth_factor_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.mfa_challenges
    ADD CONSTRAINT mfa_challenges_auth_factor_id_fkey FOREIGN KEY (factor_id) REFERENCES auth.mfa_factors(id) ON DELETE CASCADE;


--
-- Name: mfa_factors mfa_factors_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.mfa_factors
    ADD CONSTRAINT mfa_factors_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: oauth_authorizations oauth_authorizations_client_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.oauth_authorizations
    ADD CONSTRAINT oauth_authorizations_client_id_fkey FOREIGN KEY (client_id) REFERENCES auth.oauth_clients(id) ON DELETE CASCADE;


--
-- Name: oauth_authorizations oauth_authorizations_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.oauth_authorizations
    ADD CONSTRAINT oauth_authorizations_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: oauth_consents oauth_consents_client_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.oauth_consents
    ADD CONSTRAINT oauth_consents_client_id_fkey FOREIGN KEY (client_id) REFERENCES auth.oauth_clients(id) ON DELETE CASCADE;


--
-- Name: oauth_consents oauth_consents_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.oauth_consents
    ADD CONSTRAINT oauth_consents_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: one_time_tokens one_time_tokens_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.one_time_tokens
    ADD CONSTRAINT one_time_tokens_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: refresh_tokens refresh_tokens_session_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.refresh_tokens
    ADD CONSTRAINT refresh_tokens_session_id_fkey FOREIGN KEY (session_id) REFERENCES auth.sessions(id) ON DELETE CASCADE;


--
-- Name: saml_providers saml_providers_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.saml_providers
    ADD CONSTRAINT saml_providers_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: saml_relay_states saml_relay_states_flow_state_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_flow_state_id_fkey FOREIGN KEY (flow_state_id) REFERENCES auth.flow_state(id) ON DELETE CASCADE;


--
-- Name: saml_relay_states saml_relay_states_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.saml_relay_states
    ADD CONSTRAINT saml_relay_states_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: sessions sessions_oauth_client_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_oauth_client_id_fkey FOREIGN KEY (oauth_client_id) REFERENCES auth.oauth_clients(id) ON DELETE CASCADE;


--
-- Name: sessions sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.sessions
    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: sso_domains sso_domains_sso_provider_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.sso_domains
    ADD CONSTRAINT sso_domains_sso_provider_id_fkey FOREIGN KEY (sso_provider_id) REFERENCES auth.sso_providers(id) ON DELETE CASCADE;


--
-- Name: webauthn_challenges webauthn_challenges_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.webauthn_challenges
    ADD CONSTRAINT webauthn_challenges_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: webauthn_credentials webauthn_credentials_user_id_fkey; Type: FK CONSTRAINT; Schema: auth; Owner: -
--

ALTER TABLE ONLY auth.webauthn_credentials
    ADD CONSTRAINT webauthn_credentials_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: assessments assessments_child_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.assessments
    ADD CONSTRAINT assessments_child_id_fkey FOREIGN KEY (child_id) REFERENCES public.children(id);


--
-- Name: children children_parent_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.children
    ADD CONSTRAINT children_parent_id_fkey FOREIGN KEY (parent_id) REFERENCES public.parents(id);


--
-- Name: game_scores game_scores_child_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.game_scores
    ADD CONSTRAINT game_scores_child_id_fkey FOREIGN KEY (child_id) REFERENCES public.children(id);


--
-- Name: game_scores game_scores_game_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.game_scores
    ADD CONSTRAINT game_scores_game_id_fkey FOREIGN KEY (game_id) REFERENCES public.games(id);


--
-- Name: survey_responses survey_responses_assessment_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.survey_responses
    ADD CONSTRAINT survey_responses_assessment_id_fkey FOREIGN KEY (assessment_id) REFERENCES public.assessments(id) ON DELETE CASCADE;


--
-- Name: survey_responses survey_responses_child_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.survey_responses
    ADD CONSTRAINT survey_responses_child_id_fkey FOREIGN KEY (child_id) REFERENCES public.children(id);


--
-- Name: survey_responses survey_responses_question_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.survey_responses
    ADD CONSTRAINT survey_responses_question_id_fkey FOREIGN KEY (question_id) REFERENCES public.survey_questions(id);


--
-- Name: objects objects_bucketId_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: -
--

ALTER TABLE ONLY storage.objects
    ADD CONSTRAINT "objects_bucketId_fkey" FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads s3_multipart_uploads_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: -
--

ALTER TABLE ONLY storage.s3_multipart_uploads
    ADD CONSTRAINT s3_multipart_uploads_bucket_id_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: -
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_bucket_id_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets(id);


--
-- Name: s3_multipart_uploads_parts s3_multipart_uploads_parts_upload_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: -
--

ALTER TABLE ONLY storage.s3_multipart_uploads_parts
    ADD CONSTRAINT s3_multipart_uploads_parts_upload_id_fkey FOREIGN KEY (upload_id) REFERENCES storage.s3_multipart_uploads(id) ON DELETE CASCADE;


--
-- Name: vector_indexes vector_indexes_bucket_id_fkey; Type: FK CONSTRAINT; Schema: storage; Owner: -
--

ALTER TABLE ONLY storage.vector_indexes
    ADD CONSTRAINT vector_indexes_bucket_id_fkey FOREIGN KEY (bucket_id) REFERENCES storage.buckets_vectors(id);


--
-- Name: audit_log_entries; Type: ROW SECURITY; Schema: auth; Owner: -
--

ALTER TABLE auth.audit_log_entries ENABLE ROW LEVEL SECURITY;

--
-- Name: flow_state; Type: ROW SECURITY; Schema: auth; Owner: -
--

ALTER TABLE auth.flow_state ENABLE ROW LEVEL SECURITY;

--
-- Name: identities; Type: ROW SECURITY; Schema: auth; Owner: -
--

ALTER TABLE auth.identities ENABLE ROW LEVEL SECURITY;

--
-- Name: instances; Type: ROW SECURITY; Schema: auth; Owner: -
--

ALTER TABLE auth.instances ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_amr_claims; Type: ROW SECURITY; Schema: auth; Owner: -
--

ALTER TABLE auth.mfa_amr_claims ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_challenges; Type: ROW SECURITY; Schema: auth; Owner: -
--

ALTER TABLE auth.mfa_challenges ENABLE ROW LEVEL SECURITY;

--
-- Name: mfa_factors; Type: ROW SECURITY; Schema: auth; Owner: -
--

ALTER TABLE auth.mfa_factors ENABLE ROW LEVEL SECURITY;

--
-- Name: one_time_tokens; Type: ROW SECURITY; Schema: auth; Owner: -
--

ALTER TABLE auth.one_time_tokens ENABLE ROW LEVEL SECURITY;

--
-- Name: refresh_tokens; Type: ROW SECURITY; Schema: auth; Owner: -
--

ALTER TABLE auth.refresh_tokens ENABLE ROW LEVEL SECURITY;

--
-- Name: saml_providers; Type: ROW SECURITY; Schema: auth; Owner: -
--

ALTER TABLE auth.saml_providers ENABLE ROW LEVEL SECURITY;

--
-- Name: saml_relay_states; Type: ROW SECURITY; Schema: auth; Owner: -
--

ALTER TABLE auth.saml_relay_states ENABLE ROW LEVEL SECURITY;

--
-- Name: schema_migrations; Type: ROW SECURITY; Schema: auth; Owner: -
--

ALTER TABLE auth.schema_migrations ENABLE ROW LEVEL SECURITY;

--
-- Name: sessions; Type: ROW SECURITY; Schema: auth; Owner: -
--

ALTER TABLE auth.sessions ENABLE ROW LEVEL SECURITY;

--
-- Name: sso_domains; Type: ROW SECURITY; Schema: auth; Owner: -
--

ALTER TABLE auth.sso_domains ENABLE ROW LEVEL SECURITY;

--
-- Name: sso_providers; Type: ROW SECURITY; Schema: auth; Owner: -
--

ALTER TABLE auth.sso_providers ENABLE ROW LEVEL SECURITY;

--
-- Name: users; Type: ROW SECURITY; Schema: auth; Owner: -
--

ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

--
-- Name: assessments Allow all insert assessments; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Allow all insert assessments" ON public.assessments FOR INSERT WITH CHECK (true);


--
-- Name: survey_responses Allow all insert survey_responses; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Allow all insert survey_responses" ON public.survey_responses FOR INSERT WITH CHECK (true);


--
-- Name: assessments Allow all select assessments; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Allow all select assessments" ON public.assessments FOR SELECT USING (true);


--
-- Name: survey_responses Allow all select survey_responses; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Allow all select survey_responses" ON public.survey_responses FOR SELECT USING (true);


--
-- Name: assessments Allow authenticated insert; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Allow authenticated insert" ON public.assessments FOR INSERT TO authenticated WITH CHECK (true);


--
-- Name: survey_responses Allow authenticated insert; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Allow authenticated insert" ON public.survey_responses FOR INSERT TO authenticated WITH CHECK (true);


--
-- Name: survey_questions Allow insert survey_questions; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Allow insert survey_questions" ON public.survey_questions FOR INSERT WITH CHECK (true);


--
-- Name: game_scores Allow parents to insert own child game scores; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Allow parents to insert own child game scores" ON public.game_scores FOR INSERT TO authenticated WITH CHECK ((EXISTS ( SELECT 1
   FROM public.children
  WHERE ((children.id = game_scores.child_id) AND (children.parent_id = auth.uid())))));


--
-- Name: game_scores Allow parents to view own child game scores; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Allow parents to view own child game scores" ON public.game_scores FOR SELECT TO authenticated USING ((EXISTS ( SELECT 1
   FROM public.children
  WHERE ((children.id = game_scores.child_id) AND (children.parent_id = auth.uid())))));


--
-- Name: survey_questions Allow public read on survey_questions; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Allow public read on survey_questions" ON public.survey_questions FOR SELECT USING (true);


--
-- Name: game_scores Anyone can insert scores; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anyone can insert scores" ON public.game_scores FOR INSERT WITH CHECK (true);


--
-- Name: survey_questions Logged in parents can read survey questions; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Logged in parents can read survey questions" ON public.survey_questions FOR SELECT TO authenticated USING ((is_active = true));


--
-- Name: children Parents can create their own child profiles; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Parents can create their own child profiles" ON public.children FOR INSERT TO authenticated WITH CHECK ((auth.uid() = parent_id));


--
-- Name: parents Parents can create their own profile; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Parents can create their own profile" ON public.parents FOR INSERT TO authenticated WITH CHECK ((auth.uid() = id));


--
-- Name: children Parents can delete their own child profiles; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Parents can delete their own child profiles" ON public.children FOR DELETE TO authenticated USING ((auth.uid() = parent_id));


--
-- Name: assessments Parents can insert assessments; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Parents can insert assessments" ON public.assessments FOR INSERT TO authenticated WITH CHECK ((child_id IN ( SELECT children.id
   FROM public.children
  WHERE (children.parent_id = auth.uid()))));


--
-- Name: assessments Parents can insert assessments for their children; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Parents can insert assessments for their children" ON public.assessments FOR INSERT TO authenticated WITH CHECK ((child_id IN ( SELECT children.id
   FROM public.children
  WHERE (children.parent_id = auth.uid()))));


--
-- Name: survey_responses Parents can insert survey responses; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Parents can insert survey responses" ON public.survey_responses FOR INSERT TO authenticated WITH CHECK ((child_id IN ( SELECT children.id
   FROM public.children
  WHERE (children.parent_id = auth.uid()))));


--
-- Name: survey_responses Parents can insert survey responses for their children; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Parents can insert survey responses for their children" ON public.survey_responses FOR INSERT TO authenticated WITH CHECK ((child_id IN ( SELECT children.id
   FROM public.children
  WHERE (children.parent_id = auth.uid()))));


--
-- Name: survey_responses Parents can read survey responses for their children; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Parents can read survey responses for their children" ON public.survey_responses FOR SELECT TO authenticated USING ((child_id IN ( SELECT children.id
   FROM public.children
  WHERE (children.parent_id = auth.uid()))));


--
-- Name: assessments Parents can read their children assessments; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Parents can read their children assessments" ON public.assessments FOR SELECT TO authenticated USING ((child_id IN ( SELECT children.id
   FROM public.children
  WHERE (children.parent_id = auth.uid()))));


--
-- Name: assessments Parents can select assessments; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Parents can select assessments" ON public.assessments FOR SELECT TO authenticated USING ((child_id IN ( SELECT children.id
   FROM public.children
  WHERE (children.parent_id = auth.uid()))));


--
-- Name: assessments Parents can update assessments; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Parents can update assessments" ON public.assessments FOR UPDATE TO authenticated USING ((child_id IN ( SELECT children.id
   FROM public.children
  WHERE (children.parent_id = auth.uid()))));


--
-- Name: assessments Parents can update their children assessments; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Parents can update their children assessments" ON public.assessments FOR UPDATE TO authenticated USING ((child_id IN ( SELECT children.id
   FROM public.children
  WHERE (children.parent_id = auth.uid()))));


--
-- Name: children Parents can update their own child profiles; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Parents can update their own child profiles" ON public.children FOR UPDATE TO authenticated USING ((auth.uid() = parent_id)) WITH CHECK ((auth.uid() = parent_id));


--
-- Name: children Parents can view their own child profiles; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Parents can view their own child profiles" ON public.children FOR SELECT TO authenticated USING ((auth.uid() = parent_id));


--
-- Name: parents Parents can view their own profile; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Parents can view their own profile" ON public.parents FOR SELECT TO authenticated USING ((auth.uid() = id));


--
-- Name: games Public can view games; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Public can view games" ON public.games FOR SELECT USING ((is_active = true));


--
-- Name: assessments; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.assessments ENABLE ROW LEVEL SECURITY;

--
-- Name: children; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.children ENABLE ROW LEVEL SECURITY;

--
-- Name: game_scores; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.game_scores ENABLE ROW LEVEL SECURITY;

--
-- Name: games; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.games ENABLE ROW LEVEL SECURITY;

--
-- Name: parents; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.parents ENABLE ROW LEVEL SECURITY;

--
-- Name: survey_questions; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.survey_questions ENABLE ROW LEVEL SECURITY;

--
-- Name: survey_responses; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.survey_responses ENABLE ROW LEVEL SECURITY;

--
-- Name: messages; Type: ROW SECURITY; Schema: realtime; Owner: -
--

ALTER TABLE realtime.messages ENABLE ROW LEVEL SECURITY;

--
-- Name: buckets; Type: ROW SECURITY; Schema: storage; Owner: -
--

ALTER TABLE storage.buckets ENABLE ROW LEVEL SECURITY;

--
-- Name: buckets_analytics; Type: ROW SECURITY; Schema: storage; Owner: -
--

ALTER TABLE storage.buckets_analytics ENABLE ROW LEVEL SECURITY;

--
-- Name: buckets_vectors; Type: ROW SECURITY; Schema: storage; Owner: -
--

ALTER TABLE storage.buckets_vectors ENABLE ROW LEVEL SECURITY;

--
-- Name: migrations; Type: ROW SECURITY; Schema: storage; Owner: -
--

ALTER TABLE storage.migrations ENABLE ROW LEVEL SECURITY;

--
-- Name: objects; Type: ROW SECURITY; Schema: storage; Owner: -
--

ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;

--
-- Name: s3_multipart_uploads; Type: ROW SECURITY; Schema: storage; Owner: -
--

ALTER TABLE storage.s3_multipart_uploads ENABLE ROW LEVEL SECURITY;

--
-- Name: s3_multipart_uploads_parts; Type: ROW SECURITY; Schema: storage; Owner: -
--

ALTER TABLE storage.s3_multipart_uploads_parts ENABLE ROW LEVEL SECURITY;

--
-- Name: vector_indexes; Type: ROW SECURITY; Schema: storage; Owner: -
--

ALTER TABLE storage.vector_indexes ENABLE ROW LEVEL SECURITY;

--
-- Name: supabase_realtime; Type: PUBLICATION; Schema: -; Owner: -
--

CREATE PUBLICATION supabase_realtime WITH (publish = 'insert, update, delete, truncate');


--
-- Name: issue_graphql_placeholder; Type: EVENT TRIGGER; Schema: -; Owner: -
--

CREATE EVENT TRIGGER issue_graphql_placeholder ON sql_drop
         WHEN TAG IN ('DROP EXTENSION')
   EXECUTE FUNCTION extensions.set_graphql_placeholder();


--
-- Name: issue_pg_cron_access; Type: EVENT TRIGGER; Schema: -; Owner: -
--

CREATE EVENT TRIGGER issue_pg_cron_access ON ddl_command_end
         WHEN TAG IN ('CREATE EXTENSION')
   EXECUTE FUNCTION extensions.grant_pg_cron_access();


--
-- Name: issue_pg_graphql_access; Type: EVENT TRIGGER; Schema: -; Owner: -
--

CREATE EVENT TRIGGER issue_pg_graphql_access ON ddl_command_end
         WHEN TAG IN ('CREATE EXTENSION')
   EXECUTE FUNCTION extensions.grant_pg_graphql_access();


--
-- Name: issue_pg_net_access; Type: EVENT TRIGGER; Schema: -; Owner: -
--

CREATE EVENT TRIGGER issue_pg_net_access ON ddl_command_end
         WHEN TAG IN ('CREATE EXTENSION')
   EXECUTE FUNCTION extensions.grant_pg_net_access();


--
-- Name: pgrst_ddl_watch; Type: EVENT TRIGGER; Schema: -; Owner: -
--

CREATE EVENT TRIGGER pgrst_ddl_watch ON ddl_command_end
   EXECUTE FUNCTION extensions.pgrst_ddl_watch();


--
-- Name: pgrst_drop_watch; Type: EVENT TRIGGER; Schema: -; Owner: -
--

CREATE EVENT TRIGGER pgrst_drop_watch ON sql_drop
   EXECUTE FUNCTION extensions.pgrst_drop_watch();


--
-- PostgreSQL database dump complete
--

\unrestrict nS9kzPiGT0xSyv40VlA0iR8IvF1QKzn0jfkj4MCAZfe1VZUc8iX2ERHSmUnKcsc

