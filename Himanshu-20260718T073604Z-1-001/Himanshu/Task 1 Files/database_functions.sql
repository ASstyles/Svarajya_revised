


SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE SCHEMA IF NOT EXISTS "public";


ALTER SCHEMA "public" OWNER TO "postgres";


CREATE TYPE "public"."AdminRole" AS ENUM (
    'SUPER_ADMIN',
    'CONTENT_ADMIN',
    'QUIZ_ADMIN',
    'COMPLIANCE_ADMIN',
    'COHORT_ADMIN',
    'SUPPORT_ADMIN'
);


ALTER TYPE "public"."AdminRole" OWNER TO "postgres";


CREATE TYPE "public"."AdminStatus" AS ENUM (
    'ACTIVE',
    'INACTIVE',
    'LOCKED',
    'PENDING_INVITE',
    'INVITE_ACCEPTED'
);


ALTER TYPE "public"."AdminStatus" OWNER TO "postgres";


CREATE TYPE "public"."AssetType" AS ENUM (
    'ICON',
    'STORY_CARD',
    'MAP_ELEMENT',
    'ANIMATION',
    'SOUND'
);


ALTER TYPE "public"."AssetType" OWNER TO "postgres";


CREATE TYPE "public"."AuditAction" AS ENUM (
    'CREATE',
    'UPDATE',
    'DELETE',
    'PUBLISH',
    'ARCHIVE',
    'ROLLBACK',
    'EXPORT',
    'RESET',
    'LOGIN',
    'LOGIN_FAIL',
    'LOGOUT',
    'FORCE_LOGOUT',
    'VIEW',
    'TOGGLE'
);


ALTER TYPE "public"."AuditAction" OWNER TO "postgres";


CREATE TYPE "public"."AuthProvider" AS ENUM (
    'EMAIL',
    'GOOGLE'
);


ALTER TYPE "public"."AuthProvider" OWNER TO "postgres";


CREATE TYPE "public"."BillingCycle" AS ENUM (
    'WEEKLY',
    'MONTHLY',
    'QUARTERLY',
    'HALF_YEARLY',
    'YEARLY',
    'ONE_TIME'
);


ALTER TYPE "public"."BillingCycle" OWNER TO "postgres";


CREATE TYPE "public"."BroadcastStatus" AS ENUM (
    'DRAFT',
    'SCHEDULED',
    'SENDING',
    'SENT',
    'FAILED'
);


ALTER TYPE "public"."BroadcastStatus" OWNER TO "postgres";


CREATE TYPE "public"."ContentStatus" AS ENUM (
    'DRAFT',
    'PUBLISHED',
    'ARCHIVED',
    'HIDDEN'
);


ALTER TYPE "public"."ContentStatus" OWNER TO "postgres";


CREATE TYPE "public"."FeedbackType" AS ENUM (
    'CHAPTER_RATING',
    'MODULE_RATING',
    'GAME_RATING',
    'NPS_SURVEY',
    'GENERAL_FEEDBACK',
    'FEATURE_REQUEST'
);


ALTER TYPE "public"."FeedbackType" OWNER TO "postgres";


CREATE TYPE "public"."NotifChannel" AS ENUM (
    'IN_APP',
    'EMAIL',
    'PUSH',
    'WHATSAPP'
);


ALTER TYPE "public"."NotifChannel" OWNER TO "postgres";


CREATE TYPE "public"."NotifStatus" AS ENUM (
    'PENDING',
    'SENT',
    'DELIVERED',
    'OPENED',
    'CLICKED',
    'FAILED'
);


ALTER TYPE "public"."NotifStatus" OWNER TO "postgres";


CREATE TYPE "public"."ParamType" AS ENUM (
    'STRING',
    'INTEGER',
    'FLOAT',
    'BOOLEAN',
    'JSON'
);


ALTER TYPE "public"."ParamType" OWNER TO "postgres";


CREATE TYPE "public"."ProfileType" AS ENUM (
    'INDIVIDUAL_SALARIED',
    'INDIVIDUAL_SELF_EMPLOYED',
    'FAMILY'
);


ALTER TYPE "public"."ProfileType" OWNER TO "postgres";


CREATE TYPE "public"."QuestionType" AS ENUM (
    'MCQ',
    'NUMERIC',
    'BOOLEAN',
    'MULTI_SELECT',
    'DATE',
    'PHONE',
    'EMAIL',
    'SLIDER',
    'CONFIRM',
    'TEXT'
);


ALTER TYPE "public"."QuestionType" OWNER TO "postgres";


CREATE TYPE "public"."ReportFrequency" AS ENUM (
    'DAILY',
    'WEEKLY',
    'MONTHLY'
);


ALTER TYPE "public"."ReportFrequency" OWNER TO "postgres";


CREATE TYPE "public"."ReportType" AS ENUM (
    'DAILY_SUMMARY',
    'WEEKLY_ENGAGEMENT',
    'MONTHLY_HEALTH',
    'CUSTOM'
);


ALTER TYPE "public"."ReportType" OWNER TO "postgres";


CREATE TYPE "public"."SubscriptionStatus" AS ENUM (
    'ACTIVE',
    'PAUSED',
    'CANCELLED',
    'EXPIRED'
);


ALTER TYPE "public"."SubscriptionStatus" OWNER TO "postgres";


CREATE TYPE "public"."TicketCategory" AS ENUM (
    'BUG',
    'QUESTION',
    'SUGGESTION',
    'ACCOUNT_ISSUE',
    'DATA_CONCERN',
    'OTHER'
);


ALTER TYPE "public"."TicketCategory" OWNER TO "postgres";


CREATE TYPE "public"."TicketPriority" AS ENUM (
    'LOW',
    'MEDIUM',
    'HIGH',
    'CRITICAL'
);


ALTER TYPE "public"."TicketPriority" OWNER TO "postgres";


CREATE TYPE "public"."TicketStatus" AS ENUM (
    'OPEN',
    'IN_PROGRESS',
    'WAITING_ON_USER',
    'RESOLVED',
    'CLOSED'
);


ALTER TYPE "public"."TicketStatus" OWNER TO "postgres";


CREATE TYPE "public"."UsageFrequency" AS ENUM (
    'DAILY',
    'WEEKLY',
    'MONTHLY',
    'RARELY',
    'NEVER'
);


ALTER TYPE "public"."UsageFrequency" OWNER TO "postgres";


CREATE TYPE "public"."UserStatus" AS ENUM (
    'ACTIVE',
    'SUSPENDED',
    'DELETED',
    'PENDING_VERIFICATION'
);


ALTER TYPE "public"."UserStatus" OWNER TO "postgres";


CREATE TYPE "public"."ZoneType" AS ENUM (
    'RAKSHA',
    'KOSH',
    'VYAYA',
    'RIN',
    'DURG',
    'MITRA',
    'BHOOMI',
    'GRANTHAGAAR',
    'KAR',
    'OTHER'
);


ALTER TYPE "public"."ZoneType" OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."_prisma_migrations" (
    "id" character varying(36) NOT NULL,
    "checksum" character varying(64) NOT NULL,
    "finished_at" timestamp with time zone,
    "migration_name" character varying(255) NOT NULL,
    "logs" "text",
    "rolled_back_at" timestamp with time zone,
    "started_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "applied_steps_count" integer DEFAULT 0 NOT NULL
);


ALTER TABLE "public"."_prisma_migrations" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."activity_events" (
    "id" "text" NOT NULL,
    "userId" "text" NOT NULL,
    "eventType" "text" NOT NULL,
    "eventData" "jsonb",
    "deviceType" "text",
    "timestamp" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "public"."activity_events" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."admin_audit_logs" (
    "id" "text" NOT NULL,
    "adminUserId" "text" NOT NULL,
    "actionType" "public"."AuditAction" NOT NULL,
    "entityType" "text" NOT NULL,
    "entityId" "text",
    "oldValue" "jsonb",
    "newValue" "jsonb",
    "ipAddress" "text" NOT NULL,
    "userAgent" "text",
    "timestamp" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "public"."admin_audit_logs" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."admin_sessions" (
    "id" "text" NOT NULL,
    "adminUserId" "text" NOT NULL,
    "token" "text" NOT NULL,
    "refreshToken" "text" NOT NULL,
    "ipAddress" "text" NOT NULL,
    "userAgent" "text",
    "expiresAt" timestamp(3) without time zone NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "lastActivityAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "public"."admin_sessions" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."admin_users" (
    "id" "text" NOT NULL,
    "email" "text" NOT NULL,
    "password" "text" NOT NULL,
    "name" "text" NOT NULL,
    "role" "public"."AdminRole" NOT NULL,
    "status" "public"."AdminStatus" DEFAULT 'ACTIVE'::"public"."AdminStatus" NOT NULL,
    "twoFactorSecret" "text",
    "twoFactorEnabled" boolean DEFAULT false NOT NULL,
    "lastLoginAt" timestamp(3) without time zone,
    "lastLoginIp" "text",
    "failedLoginCount" integer DEFAULT 0 NOT NULL,
    "lockedUntil" timestamp(3) without time zone,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "createdBy" "text",
    "deletedAt" timestamp(3) without time zone,
    "inviteExpiresAt" timestamp(3) without time zone,
    "inviteToken" "text",
    "previousPassword" "text",
    "twoFactorRecoveryCodes" "text",
    "mobile" "text",
    "twoFactorOtpExpiresAt" timestamp(6) without time zone
);


ALTER TABLE "public"."admin_users" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."asset_inventory" (
    "id" "text" NOT NULL,
    "userId" "text" NOT NULL,
    "itemType" "text" NOT NULL,
    "description" "text" NOT NULL,
    "purchaseValue" double precision,
    "currentValue" double precision,
    "ownerId" "text",
    "insuredFlag" boolean DEFAULT false NOT NULL,
    "linkedPolicyId" "text",
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE "public"."asset_inventory" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."balance_history" (
    "id" "text" NOT NULL,
    "bankAccountId" "text" NOT NULL,
    "balance" double precision NOT NULL,
    "recordedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "note" "text"
);


ALTER TABLE "public"."balance_history" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."bank_accounts" (
    "id" "text" NOT NULL,
    "userId" "text" NOT NULL,
    "bankName" "text" NOT NULL,
    "accountType" "text" NOT NULL,
    "accountNumber" "text",
    "ifsc" "text",
    "holders" "jsonb",
    "openingBalance" double precision,
    "currentBalance" double precision,
    "status" "text" DEFAULT 'ACTIVE'::"text" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "accountLast4" "text" NOT NULL,
    "isPrimary" boolean DEFAULT false NOT NULL,
    "latestBalanceAsOf" timestamp(3) without time zone,
    "nickname" "text",
    "notes" "text"
);


ALTER TABLE "public"."bank_accounts" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."broadcasts" (
    "id" "text" NOT NULL,
    "createdBy" "text" NOT NULL,
    "title" "text" NOT NULL,
    "body" "text" NOT NULL,
    "ctaText" "text",
    "ctaUrl" "text",
    "targetScope" "jsonb" NOT NULL,
    "channel" "public"."NotifChannel" NOT NULL,
    "scheduledFor" timestamp(3) without time zone,
    "expiresAt" timestamp(3) without time zone,
    "sentAt" timestamp(3) without time zone,
    "status" "public"."BroadcastStatus" DEFAULT 'DRAFT'::"public"."BroadcastStatus" NOT NULL,
    "sentCount" integer DEFAULT 0 NOT NULL,
    "deliveredCount" integer DEFAULT 0 NOT NULL,
    "openedCount" integer DEFAULT 0 NOT NULL,
    "clickedCount" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "public"."broadcasts" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."budget_plans" (
    "id" "text" NOT NULL,
    "userId" "text" NOT NULL,
    "totalMonthly" double precision NOT NULL,
    "categories" "jsonb" NOT NULL,
    "overspendRules" "jsonb",
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE "public"."budget_plans" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."calculation_parameter_history" (
    "id" "text" NOT NULL,
    "parameterId" "text" NOT NULL,
    "parameterKey" "text" NOT NULL,
    "oldValue" double precision NOT NULL,
    "newValue" double precision NOT NULL,
    "changedBy" "text" NOT NULL,
    "reason" "text",
    "changedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "public"."calculation_parameter_history" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."calculation_parameters" (
    "id" "text" NOT NULL,
    "key" "text" NOT NULL,
    "value" double precision NOT NULL,
    "defaultValue" double precision NOT NULL,
    "description" "text",
    "category" "text",
    "version" integer DEFAULT 1 NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "public"."calculation_parameters" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."cash_wallets" (
    "id" "text" NOT NULL,
    "userId" "text" NOT NULL,
    "cashInHand" double precision DEFAULT 0 NOT NULL,
    "emergencyCash" double precision DEFAULT 0 NOT NULL,
    "pettyCash" double precision DEFAULT 0 NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "idleThresholdAmount" double precision DEFAULT 0 NOT NULL
);


ALTER TABLE "public"."cash_wallets" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."cohorts" (
    "id" "text" NOT NULL,
    "name" "text" NOT NULL,
    "description" "text",
    "startDate" timestamp(3) without time zone NOT NULL,
    "endDate" timestamp(3) without time zone,
    "assignedModules" "jsonb" NOT NULL,
    "weeklyTasks" "jsonb",
    "announcementText" "text",
    "visibilityFlag" boolean DEFAULT true NOT NULL,
    "maxCapacity" integer,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE "public"."cohorts" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."consent_records" (
    "id" "text" NOT NULL,
    "userId" "text" NOT NULL,
    "consentType" "text" NOT NULL,
    "consentGiven" boolean NOT NULL,
    "consentedAt" timestamp(3) without time zone,
    "revokedAt" timestamp(3) without time zone,
    "version" "text",
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE "public"."consent_records" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."contact_messages" (
    "id" "text" NOT NULL,
    "name" "text" NOT NULL,
    "email" "text" NOT NULL,
    "message" "text" NOT NULL,
    "status" "text" DEFAULT 'UNREAD'::"text" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE "public"."contact_messages" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."credential_records" (
    "id" "text" NOT NULL,
    "userId" "text" NOT NULL,
    "portalType" "text" NOT NULL,
    "portalName" "text" NOT NULL,
    "portalUrl" "text",
    "loginId" "text",
    "registeredEmail" "text",
    "registeredMobile" "text",
    "storageMode" "text" DEFAULT 'REFERENCE'::"text" NOT NULL,
    "encryptedPassword" "text",
    "linkedMemberId" "text",
    "registrationDate" "date",
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "nomineeAwareness" boolean DEFAULT true,
    "twoFAStatus" "text" DEFAULT 'unknown'::"text",
    "twoFAType" "text" DEFAULT 'none'::"text",
    "linked_id" "text"
);


ALTER TABLE "public"."credential_records" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."daily_analytics" (
    "id" "text" NOT NULL,
    "date" "date" NOT NULL,
    "newRegistrations" integer DEFAULT 0 NOT NULL,
    "activeUsers" integer DEFAULT 0 NOT NULL,
    "dau" integer DEFAULT 0 NOT NULL,
    "sessionsTotal" integer DEFAULT 0 NOT NULL,
    "avgSessionDuration" double precision,
    "modulesCompleted" integer DEFAULT 0 NOT NULL,
    "chaptersCompleted" integer DEFAULT 0 NOT NULL,
    "docsUploaded" integer DEFAULT 0 NOT NULL,
    "supportTicketsCreated" integer DEFAULT 0 NOT NULL,
    "calculatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "public"."daily_analytics" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."data_access_logs" (
    "id" "text" NOT NULL,
    "adminUserId" "text" NOT NULL,
    "userId" "text" NOT NULL,
    "actionPerformed" "text" NOT NULL,
    "dataScope" "text" NOT NULL,
    "justification" "text",
    "ipAddress" "text" NOT NULL,
    "timestamp" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "public"."data_access_logs" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."din_records" (
    "id" "text" NOT NULL,
    "userId" "text" NOT NULL,
    "dinNumber" "text" NOT NULL,
    "companyName" "text",
    "issueDate" "date",
    "expiryDate" "date",
    "dinKycStatus" "text",
    "dscExpiryDate" "date",
    "mcaFilingStatus" "text",
    "directorSince" "date",
    "status" "text" DEFAULT 'VALID'::"text" NOT NULL,
    "documentUrl" "text",
    "notes" "text",
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE "public"."din_records" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."document_meta" (
    "id" "text" NOT NULL,
    "userId" "text" NOT NULL,
    "docType" "text" NOT NULL,
    "linkedPersonId" "text",
    "linkedEntityId" "text",
    "fileName" "text" NOT NULL,
    "fileHash" "text",
    "localPathRef" "text",
    "cloudBackupConsent" boolean DEFAULT false NOT NULL,
    "cloudStorageUrl" "text",
    "expiryDate" "date",
    "versionTag" "text",
    "versionHistory" "jsonb",
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "cloudId" "text",
    "localId" "text",
    "storageType" "text" DEFAULT 'local'::"text",
    "linkedFamilyMemberId" "text"
);


ALTER TABLE "public"."document_meta" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."education" (
    "id" "text" NOT NULL,
    "userId" "text" NOT NULL,
    "degree" "text" NOT NULL,
    "institute" "text" NOT NULL,
    "yearCompleted" integer,
    "specialization" "text",
    "linkedLoanId" "text",
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "certificateUrl" "text",
    "familyMemberId" "text"
);


ALTER TABLE "public"."education" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."email_verification_codes" (
    "id" "text" NOT NULL,
    "userId" "text" NOT NULL,
    "code" "text" NOT NULL,
    "purpose" "text" NOT NULL,
    "expiresAt" timestamp(3) without time zone NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "public"."email_verification_codes" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."expense_categories" (
    "id" "text" NOT NULL,
    "userId" "text" NOT NULL,
    "name" "text" NOT NULL,
    "emoji" "text",
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "public"."expense_categories" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."expense_entries" (
    "id" "text" NOT NULL,
    "userId" "text" NOT NULL,
    "date" "date" DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "amount" double precision NOT NULL,
    "category" "text" NOT NULL,
    "mode" "text",
    "accountId" "text",
    "description" "text",
    "isRecurring" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "frequency" "text",
    "familyMemberId" "text",
    "paidFromAccountId" "text"
);


ALTER TABLE "public"."expense_entries" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."family_members" (
    "id" "text" NOT NULL,
    "userId" "text" NOT NULL,
    "name" "text" NOT NULL,
    "relation" "text" NOT NULL,
    "dob" "date",
    "isDependent" boolean DEFAULT false NOT NULL,
    "nomineeEligible" boolean DEFAULT true NOT NULL,
    "accessLevel" "text" DEFAULT 'VIEW'::"text" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "email" "text",
    "phone" "text"
);


ALTER TABLE "public"."family_members" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."faqs" (
    "id" "text" NOT NULL,
    "category" "text" NOT NULL,
    "question" "text" NOT NULL,
    "answer" "text" NOT NULL,
    "language" "text" DEFAULT 'en'::"text" NOT NULL,
    "displayOrder" integer NOT NULL,
    "linkedEntity" "text",
    "viewCount" integer DEFAULT 0 NOT NULL,
    "helpfulCount" integer DEFAULT 0 NOT NULL,
    "notHelpfulCount" integer DEFAULT 0 NOT NULL,
    "visibilityFlag" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE "public"."faqs" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."feature_flags" (
    "id" "text" NOT NULL,
    "name" "text" NOT NULL,
    "description" "text",
    "enabled" boolean DEFAULT false NOT NULL,
    "personaScope" "jsonb",
    "cohortScope" "text",
    "geoScope" "jsonb",
    "startDate" timestamp(3) without time zone,
    "endDate" timestamp(3) without time zone,
    "dependsOnFlagId" "text",
    "createdBy" "text" NOT NULL,
    "updatedBy" "text",
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE "public"."feature_flags" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."field_mappings" (
    "id" "text" NOT NULL,
    "databaseTable" "text" NOT NULL,
    "databaseField" "text" NOT NULL,
    "validationRule" "jsonb",
    "calculationDeps" "jsonb",
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE "public"."field_mappings" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."game_runs" (
    "id" "text" NOT NULL,
    "userId" "text" NOT NULL,
    "submoduleId" "text" NOT NULL,
    "gameTemplate" "text" NOT NULL,
    "attemptNumber" integer DEFAULT 1 NOT NULL,
    "startedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "completedAt" timestamp(3) without time zone,
    "pointsEarned" integer DEFAULT 0 NOT NULL,
    "status" "text" DEFAULT 'IN_PROGRESS'::"text" NOT NULL
);


ALTER TABLE "public"."game_runs" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."gamification_state" (
    "id" "text" NOT NULL,
    "userId" "text" NOT NULL,
    "totalPoints" integer DEFAULT 0 NOT NULL,
    "badgesEarned" "jsonb",
    "currentStreak" integer DEFAULT 0 NOT NULL,
    "longestStreak" integer DEFAULT 0 NOT NULL,
    "rank" "text" DEFAULT 'BEGINNER'::"text" NOT NULL,
    "lastActivityDate" "date",
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE "public"."gamification_state" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."goals" (
    "id" "text" NOT NULL,
    "userId" "text" NOT NULL,
    "name" "text" NOT NULL,
    "targetAmount" double precision NOT NULL,
    "targetDate" "date" NOT NULL,
    "currentSaved" double precision DEFAULT 0 NOT NULL,
    "requiredMonthlySavings" double precision,
    "priority" "text" DEFAULT 'MEDIUM'::"text" NOT NULL,
    "status" "text" DEFAULT 'IN_PROGRESS'::"text" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE "public"."goals" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."gst_records" (
    "id" "text" NOT NULL,
    "userId" "text" NOT NULL,
    "gstin" "text" NOT NULL,
    "businessName" "text",
    "registrationType" "text",
    "filingFrequency" "text",
    "lastFilingDate" "date",
    "nextDueDate" "date",
    "gstr1Filed" boolean,
    "gstr3bFiled" boolean,
    "annualReturnFiled" boolean,
    "status" "text" DEFAULT 'ACTIVE'::"text" NOT NULL,
    "documentUrl" "text",
    "notes" "text",
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE "public"."gst_records" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."identity_links" (
    "id" "text" NOT NULL,
    "userId" "text" NOT NULL,
    "identityId" "text" NOT NULL,
    "linkedType" "text" NOT NULL,
    "linkedValue" "text" NOT NULL,
    "serviceName" "text",
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "public"."identity_links" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."identity_records" (
    "id" "text" NOT NULL,
    "userId" "text" NOT NULL,
    "idType" "text" NOT NULL,
    "numberMasked" "text" NOT NULL,
    "numberFull" "text",
    "expiryDate" "date",
    "issuedDate" "date",
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "dobOnDoc" "date",
    "nameOnDoc" "text",
    "placeOfIssue" "text",
    "vaultFileId" "text",
    "familyMemberId" "text"
);


ALTER TABLE "public"."identity_records" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."iks_assets" (
    "id" "text" NOT NULL,
    "assetType" "public"."AssetType" NOT NULL,
    "fileUrl" "text" NOT NULL,
    "fileName" "text" NOT NULL,
    "moduleScope" "text",
    "language" "text",
    "version" integer DEFAULT 1 NOT NULL,
    "visibilityFlag" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE "public"."iks_assets" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."income_streams" (
    "id" "text" NOT NULL,
    "userId" "text" NOT NULL,
    "type" "text" NOT NULL,
    "source" "text",
    "frequency" "text" DEFAULT 'MONTHLY'::"text" NOT NULL,
    "amountGross" double precision NOT NULL,
    "deductions" double precision DEFAULT 0 NOT NULL,
    "amountNet" double precision NOT NULL,
    "creditedAccountId" "text",
    "isPrimary" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "allocationMonths" integer,
    "description" "text",
    "expectedGrowthPct" integer,
    "historicalIncome" "jsonb",
    "notes" "text",
    "riskLevel" "text",
    "tdsAmount" double precision,
    "familyMemberId" "text",
    "lastReviewedAt" timestamp(3) without time zone
);


ALTER TABLE "public"."income_streams" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."insurance_coverage" (
    "id" "text" NOT NULL,
    "policyId" "text" NOT NULL,
    "memberId" "text" NOT NULL
);


ALTER TABLE "public"."insurance_coverage" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."insurance_policies" (
    "id" "text" NOT NULL,
    "userId" "text" NOT NULL,
    "type" "text" NOT NULL,
    "policyNumber" "text" NOT NULL,
    "insurerName" "text",
    "sumAssured" double precision NOT NULL,
    "premium" double precision NOT NULL,
    "premiumFrequency" "text" DEFAULT 'ANNUAL'::"text" NOT NULL,
    "dueDate" "date" NOT NULL,
    "maturityDate" "date",
    "nomineeId" "text",
    "agentContact" "text",
    "status" "text" DEFAULT 'ACTIVE'::"text" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "documentId" "text",
    "reminderId" "text"
);


ALTER TABLE "public"."insurance_policies" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."investment_holdings" (
    "id" "text" NOT NULL,
    "userId" "text" NOT NULL,
    "type" "text" NOT NULL,
    "name" "text",
    "investedAmount" double precision NOT NULL,
    "currentValue" double precision,
    "maturityDate" "date",
    "lockInPeriod" integer,
    "riskLevel" "text",
    "linkedGoalId" "text",
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE "public"."investment_holdings" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."loan_accounts" (
    "id" "text" NOT NULL,
    "userId" "text" NOT NULL,
    "type" "text" NOT NULL,
    "lenderName" "text",
    "principal" double precision NOT NULL,
    "outstandingAmount" double precision NOT NULL,
    "emi" double precision NOT NULL,
    "interestRate" double precision NOT NULL,
    "tenure" integer NOT NULL,
    "startDate" "date" NOT NULL,
    "endDate" "date",
    "linkedPropertyId" "text",
    "status" "text" DEFAULT 'ACTIVE'::"text" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "documentId" "text",
    "coBorrowerId" "text",
    "paidFromAccountId" "text"
);


ALTER TABLE "public"."loan_accounts" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."module_access_permissions" (
    "id" "text" NOT NULL,
    "adminUserId" "text" NOT NULL,
    "moduleCode" "text" NOT NULL,
    "granted" boolean DEFAULT true NOT NULL,
    "grantedBy" "text",
    "grantedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "public"."module_access_permissions" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."modules" (
    "id" "text" NOT NULL,
    "code" "text" NOT NULL,
    "name" "text" NOT NULL,
    "nameHindi" "text",
    "zoneType" "public"."ZoneType" NOT NULL,
    "iconRef" "text",
    "description" "text",
    "displayOrder" integer NOT NULL,
    "isMvp" boolean DEFAULT false NOT NULL,
    "visibilityStatus" "public"."ContentStatus" DEFAULT 'DRAFT'::"public"."ContentStatus" NOT NULL,
    "featureFlagId" "text",
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "updatedBy" "text"
);


ALTER TABLE "public"."modules" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."monthly_analytics" (
    "id" "text" NOT NULL,
    "month" "date" NOT NULL,
    "mau" integer DEFAULT 0 NOT NULL,
    "retention30Day" double precision,
    "retention60Day" double precision,
    "retention90Day" double precision,
    "avgStabilityScore" double precision,
    "productHealthScore" double precision,
    "calculatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "public"."monthly_analytics" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."nominee_mapping" (
    "id" "text" NOT NULL,
    "userId" "text" NOT NULL,
    "assetRef" "text" NOT NULL,
    "assetType" "text" NOT NULL,
    "nomineeId" "text" NOT NULL,
    "sharePercent" double precision DEFAULT 100 NOT NULL,
    "proofDocLinked" boolean DEFAULT false NOT NULL,
    "confirmed" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE "public"."nominee_mapping" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."notification_templates" (
    "id" "text" NOT NULL,
    "name" "text" NOT NULL,
    "channel" "public"."NotifChannel" NOT NULL,
    "language" "text" DEFAULT 'en'::"text" NOT NULL,
    "subject" "text",
    "bodyTemplate" "text" NOT NULL,
    "triggerEvent" "text" NOT NULL,
    "personaScope" "jsonb",
    "visibilityStatus" "public"."ContentStatus" DEFAULT 'DRAFT'::"public"."ContentStatus" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE "public"."notification_templates" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."notifications" (
    "id" "text" NOT NULL,
    "userId" "text" NOT NULL,
    "templateId" "text",
    "channel" "public"."NotifChannel" NOT NULL,
    "subject" "text",
    "body" "text" NOT NULL,
    "sentAt" timestamp(3) without time zone,
    "deliveredAt" timestamp(3) without time zone,
    "openedAt" timestamp(3) without time zone,
    "clickedAt" timestamp(3) without time zone,
    "status" "public"."NotifStatus" DEFAULT 'PENDING'::"public"."NotifStatus" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "link" "text"
);


ALTER TABLE "public"."notifications" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."property_assets" (
    "id" "text" NOT NULL,
    "userId" "text" NOT NULL,
    "type" "text" NOT NULL,
    "address" "text",
    "purchaseDate" "date",
    "purchaseAmount" double precision,
    "currentValue" double precision,
    "ownContribution" double precision,
    "linkedLoanId" "text",
    "rentalIncome" double precision,
    "annualCosts" double precision,
    "propertyTax" double precision,
    "vacancyMonths" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "coOwners" "jsonb",
    "ownershipType" "text" NOT NULL,
    "secretFieldId" "text",
    "vaultFileIds" "jsonb"
);


ALTER TABLE "public"."property_assets" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."questions" (
    "id" "text" NOT NULL,
    "submoduleId" "text" NOT NULL,
    "questionType" "public"."QuestionType" NOT NULL,
    "questionText" "text" NOT NULL,
    "explanationText" "text",
    "language" "text" DEFAULT 'en'::"text" NOT NULL,
    "fieldMappingId" "text",
    "scoringWeight" integer DEFAULT 1 NOT NULL,
    "required" boolean DEFAULT true NOT NULL,
    "personaScope" "jsonb",
    "visibilityStatus" "public"."ContentStatus" DEFAULT 'DRAFT'::"public"."ContentStatus" NOT NULL,
    "displayOrder" integer NOT NULL,
    "version" integer DEFAULT 1 NOT NULL,
    "createdBy" "text" NOT NULL,
    "updatedBy" "text",
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE "public"."questions" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."quiz_answers" (
    "id" "text" NOT NULL,
    "userId" "text" NOT NULL,
    "questionId" "text" NOT NULL,
    "answerValue" "jsonb" NOT NULL,
    "attemptNumber" integer DEFAULT 1 NOT NULL,
    "answeredAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "public"."quiz_answers" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."rajya_scores" (
    "id" "text" NOT NULL,
    "userId" "text" NOT NULL,
    "overallScore" double precision NOT NULL,
    "rank" "text" NOT NULL,
    "rakshaScore" double precision,
    "durgScore" double precision,
    "rinScore" double precision,
    "vyayaScore" double precision,
    "mitraScore" double precision,
    "koshScore" double precision,
    "goalsScore" double precision,
    "riskFlags" "jsonb",
    "nextActions" "jsonb",
    "calculatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "previousScore" double precision,
    "trend" "text"
);


ALTER TABLE "public"."rajya_scores" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."reminders" (
    "id" "text" NOT NULL,
    "userId" "text" NOT NULL,
    "type" "text" NOT NULL,
    "targetDate" "date" NOT NULL,
    "leadTime" integer DEFAULT 7 NOT NULL,
    "channel" "text" DEFAULT 'IN_APP'::"text" NOT NULL,
    "priority" "text" DEFAULT 'MEDIUM'::"text" NOT NULL,
    "linkedEntityId" "text",
    "message" "text",
    "sentAt" timestamp(3) without time zone,
    "status" "text" DEFAULT 'PENDING'::"text" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "public"."reminders" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."scheduled_reports" (
    "id" "text" NOT NULL,
    "createdBy" "text" NOT NULL,
    "reportType" "public"."ReportType" NOT NULL,
    "frequency" "public"."ReportFrequency" NOT NULL,
    "recipients" "jsonb" NOT NULL,
    "format" "text" DEFAULT 'PDF'::"text" NOT NULL,
    "lastRunAt" timestamp(3) without time zone,
    "nextRunAt" timestamp(3) without time zone NOT NULL,
    "isActive" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "public"."scheduled_reports" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."submodules" (
    "id" "text" NOT NULL,
    "moduleId" "text" NOT NULL,
    "code" "text" NOT NULL,
    "name" "text" NOT NULL,
    "nameHindi" "text",
    "adhyayaTitle" "text",
    "tutorialCount" integer DEFAULT 0 NOT NULL,
    "gameTemplateType" "text",
    "gameCount" integer DEFAULT 0 NOT NULL,
    "fieldCount" integer DEFAULT 0 NOT NULL,
    "completionRules" "jsonb",
    "displayOrder" integer NOT NULL,
    "visibilityStatus" "public"."ContentStatus" DEFAULT 'DRAFT'::"public"."ContentStatus" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE "public"."submodules" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."subscription_analytics" (
    "id" "text" NOT NULL,
    "userId" "text" NOT NULL,
    "totalSubscriptions" integer DEFAULT 0 NOT NULL,
    "monthlySpend" double precision DEFAULT 0 NOT NULL,
    "yearlySpend" double precision DEFAULT 0 NOT NULL,
    "activeSubscriptions" integer DEFAULT 0 NOT NULL,
    "unusedSubscriptions" integer DEFAULT 0 NOT NULL,
    "cancelledThisYear" integer DEFAULT 0 NOT NULL,
    "leakageScore" double precision,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE "public"."subscription_analytics" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."subscriptions" (
    "id" "text" NOT NULL,
    "userId" "text" NOT NULL,
    "name" "text" NOT NULL,
    "category" "text" NOT NULL,
    "amount" double precision NOT NULL,
    "renewalDate" "date" NOT NULL,
    "lastUsedDate" "date",
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "autoDebit" boolean DEFAULT false NOT NULL,
    "billingCycle" "public"."BillingCycle" DEFAULT 'MONTHLY'::"public"."BillingCycle" NOT NULL,
    "cancelReminder" boolean DEFAULT true NOT NULL,
    "customCategoryId" "text",
    "endDate" "date",
    "isEssential" boolean,
    "linkedBankAccountId" "text",
    "notes" "text",
    "paymentMethod" "text",
    "provider" "text",
    "startDate" "date",
    "status" "public"."SubscriptionStatus" DEFAULT 'ACTIVE'::"public"."SubscriptionStatus" NOT NULL,
    "usageFrequency" "public"."UsageFrequency"
);


ALTER TABLE "public"."subscriptions" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."succession_emergency" (
    "id" "text" NOT NULL,
    "userId" "text" NOT NULL,
    "emergencyContactName" "text",
    "emergencyContactPhone" "text",
    "secondaryContactName" "text",
    "secondaryContactPhone" "text",
    "verificationMethod" "text",
    "activationWaitingPeriod" integer DEFAULT 24 NOT NULL,
    "assetAccessScope" "jsonb",
    "lastUpdated" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "public"."succession_emergency" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."succession_nominees" (
    "id" "text" NOT NULL,
    "userId" "text" NOT NULL,
    "assetType" "text" NOT NULL,
    "assetId" "text" NOT NULL,
    "nomineeId" "text" NOT NULL,
    "nomineeName" "text" NOT NULL,
    "relationship" "text" NOT NULL,
    "sharePercentage" double precision DEFAULT 100 NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE "public"."succession_nominees" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."succession_wills" (
    "id" "text" NOT NULL,
    "userId" "text" NOT NULL,
    "willExists" boolean DEFAULT false NOT NULL,
    "dateOfWill" "date",
    "registered" boolean DEFAULT false NOT NULL,
    "executorName" "text",
    "executorContact" "text",
    "witnessNames" "jsonb",
    "storageLocation" "text",
    "digitalCopyUrl" "text",
    "cloudConsent" boolean DEFAULT false NOT NULL,
    "secretHint" "text",
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE "public"."succession_wills" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."support_tickets" (
    "id" "text" NOT NULL,
    "userId" "text" NOT NULL,
    "category" "public"."TicketCategory" NOT NULL,
    "subject" "text" NOT NULL,
    "description" "text" NOT NULL,
    "status" "public"."TicketStatus" DEFAULT 'OPEN'::"public"."TicketStatus" NOT NULL,
    "priority" "public"."TicketPriority" DEFAULT 'MEDIUM'::"public"."TicketPriority" NOT NULL,
    "assignedTo" "text",
    "deviceInfo" "jsonb",
    "appVersion" "text",
    "screenshots" "jsonb",
    "internalNotes" "text",
    "resolvedAt" timestamp(3) without time zone,
    "userSatisfaction" integer,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE "public"."support_tickets" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."system_parameters" (
    "id" "text" NOT NULL,
    "key" "text" NOT NULL,
    "value" "text" NOT NULL,
    "valueType" "public"."ParamType" DEFAULT 'STRING'::"public"."ParamType" NOT NULL,
    "description" "text",
    "category" "text",
    "version" integer DEFAULT 1 NOT NULL,
    "updatedBy" "text",
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "public"."system_parameters" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."system_settings" (
    "id" "text" NOT NULL,
    "key" "text" NOT NULL,
    "value" "text" NOT NULL,
    "description" "text",
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE "public"."system_settings" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."tax_records" (
    "id" "text" NOT NULL,
    "userId" "text" NOT NULL,
    "assessmentYear" "text" NOT NULL,
    "financialYear" "text" NOT NULL,
    "filingType" "text" DEFAULT 'ITR'::"text",
    "status" "text" DEFAULT 'DRAFT'::"text" NOT NULL,
    "grossIncome" double precision,
    "taxableIncome" double precision,
    "taxPaid" double precision,
    "taxDue" double precision,
    "filingDate" "date",
    "acknowledgementNumber" "text",
    "documentUrl" "text",
    "notes" "text",
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE "public"."tax_records" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."ticket_responses" (
    "id" "text" NOT NULL,
    "ticketId" "text" NOT NULL,
    "responderId" "text",
    "responderType" "text" NOT NULL,
    "message" "text" NOT NULL,
    "isInternal" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "public"."ticket_responses" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."tutorial_analytics" (
    "id" "text" NOT NULL,
    "tutorialId" "text" NOT NULL,
    "date" "date" DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "startedCount" integer DEFAULT 0 NOT NULL,
    "completedCount" integer DEFAULT 0 NOT NULL,
    "avgWatchDuration" double precision,
    "dropOffPoint" integer
);


ALTER TABLE "public"."tutorial_analytics" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."tutorial_completions" (
    "id" "text" NOT NULL,
    "userId" "text" NOT NULL,
    "tutorialId" "text" NOT NULL,
    "watchedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "watchDuration" integer,
    "completed" boolean DEFAULT false NOT NULL
);


ALTER TABLE "public"."tutorial_completions" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."tutorials" (
    "id" "text" NOT NULL,
    "submoduleId" "text" NOT NULL,
    "language" "text" DEFAULT 'en'::"text" NOT NULL,
    "title" "text" NOT NULL,
    "description" "text",
    "youtubeUrl" "text",
    "youtubeId" "text",
    "durationSeconds" integer,
    "transcriptText" "text",
    "mustWatch" boolean DEFAULT false NOT NULL,
    "visibilityStatus" "public"."ContentStatus" DEFAULT 'DRAFT'::"public"."ContentStatus" NOT NULL,
    "personaScope" "jsonb",
    "cohortScope" "text",
    "publishStartDate" timestamp(3) without time zone,
    "publishEndDate" timestamp(3) without time zone,
    "displayOrder" integer NOT NULL,
    "version" integer DEFAULT 1 NOT NULL,
    "changeNotes" "text",
    "createdBy" "text" NOT NULL,
    "updatedBy" "text",
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE "public"."tutorials" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."user_chapter_progress" (
    "id" "text" NOT NULL,
    "userId" "text" NOT NULL,
    "submoduleId" "text" NOT NULL,
    "tutorialsWatched" "jsonb",
    "gameStartedAt" timestamp(3) without time zone,
    "gameCompletedAt" timestamp(3) without time zone,
    "sealConfirmedAt" timestamp(3) without time zone,
    "status" "text" DEFAULT 'LOCKED'::"text" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE "public"."user_chapter_progress" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."user_cohorts" (
    "id" "text" NOT NULL,
    "userId" "text" NOT NULL,
    "cohortId" "text" NOT NULL,
    "joinedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "leftAt" timestamp(3) without time zone
);


ALTER TABLE "public"."user_cohorts" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."user_feedback" (
    "id" "text" NOT NULL,
    "userId" "text" NOT NULL,
    "feedbackType" "public"."FeedbackType" NOT NULL,
    "entityType" "text",
    "entityId" "text",
    "rating" integer,
    "sentiment" "text",
    "comment" "text",
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "public"."user_feedback" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."user_module_progress" (
    "id" "text" NOT NULL,
    "userId" "text" NOT NULL,
    "moduleId" "text" NOT NULL,
    "startedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "completedAt" timestamp(3) without time zone,
    "status" "text" DEFAULT 'IN_PROGRESS'::"text" NOT NULL
);


ALTER TABLE "public"."user_module_progress" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."user_sessions" (
    "id" "text" NOT NULL,
    "userId" "text" NOT NULL,
    "token" "text" NOT NULL,
    "refreshToken" "text" NOT NULL,
    "deviceType" "text",
    "ipAddress" "text",
    "userAgent" "text",
    "expiresAt" timestamp(3) without time zone NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "lastActivityAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "public"."user_sessions" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."users" (
    "id" "text" NOT NULL,
    "email" "text",
    "phone" "text",
    "passwordHash" "text",
    "name" "text",
    "dob" "date",
    "gender" "text",
    "panMasked" "text",
    "aadhaarMasked" "text",
    "primaryMobile" "text",
    "primaryEmail" "text",
    "recoveryEmail" "text",
    "address" "text",
    "maritalStatus" "text",
    "occupationType" "text",
    "employerCompany" "text",
    "profileType" "public"."ProfileType" NOT NULL,
    "status" "public"."UserStatus" DEFAULT 'ACTIVE'::"public"."UserStatus" NOT NULL,
    "language" "text" DEFAULT 'en'::"text" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "lastActiveAt" timestamp(3) without time zone,
    "deviceInfo" "jsonb",
    "googleAccessToken" "text",
    "googleLinked" boolean DEFAULT false NOT NULL,
    "googleRefreshToken" "text",
    "googleTokenExpiry" timestamp(3) without time zone,
    "is_first_login" boolean DEFAULT true NOT NULL,
    "secondaryMobile" "text",
    "settings" "jsonb",
    "twoFactorRecoveryCodes" "text",
    "twoFactorSecret" "text",
    "authProvider" "text" DEFAULT 'EMAIL'::"text"
);


ALTER TABLE "public"."users" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."weekly_analytics" (
    "id" "text" NOT NULL,
    "weekStart" "date" NOT NULL,
    "weekEnd" "date" NOT NULL,
    "wau" integer DEFAULT 0 NOT NULL,
    "retention7Day" double precision,
    "retention14Day" double precision,
    "retention30Day" double precision,
    "topModule" "text",
    "topDropOffPoint" "text",
    "calculatedAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE "public"."weekly_analytics" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."will_status" (
    "id" "text" NOT NULL,
    "userId" "text" NOT NULL,
    "existsFlag" boolean DEFAULT false NOT NULL,
    "location" "text",
    "executorName" "text",
    "executorContact" "text",
    "instructions" "text",
    "lastReviewDate" "date",
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE "public"."will_status" OWNER TO "postgres";


ALTER TABLE ONLY "public"."_prisma_migrations"
    ADD CONSTRAINT "_prisma_migrations_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."activity_events"
    ADD CONSTRAINT "activity_events_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."admin_audit_logs"
    ADD CONSTRAINT "admin_audit_logs_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."admin_sessions"
    ADD CONSTRAINT "admin_sessions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."admin_users"
    ADD CONSTRAINT "admin_users_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."asset_inventory"
    ADD CONSTRAINT "asset_inventory_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."balance_history"
    ADD CONSTRAINT "balance_history_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."bank_accounts"
    ADD CONSTRAINT "bank_accounts_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."broadcasts"
    ADD CONSTRAINT "broadcasts_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."budget_plans"
    ADD CONSTRAINT "budget_plans_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."calculation_parameter_history"
    ADD CONSTRAINT "calculation_parameter_history_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."calculation_parameters"
    ADD CONSTRAINT "calculation_parameters_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."cash_wallets"
    ADD CONSTRAINT "cash_wallets_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."cohorts"
    ADD CONSTRAINT "cohorts_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."consent_records"
    ADD CONSTRAINT "consent_records_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."contact_messages"
    ADD CONSTRAINT "contact_messages_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."credential_records"
    ADD CONSTRAINT "credential_records_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."daily_analytics"
    ADD CONSTRAINT "daily_analytics_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."data_access_logs"
    ADD CONSTRAINT "data_access_logs_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."din_records"
    ADD CONSTRAINT "din_records_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."document_meta"
    ADD CONSTRAINT "document_meta_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."education"
    ADD CONSTRAINT "education_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."email_verification_codes"
    ADD CONSTRAINT "email_verification_codes_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."expense_categories"
    ADD CONSTRAINT "expense_categories_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."expense_entries"
    ADD CONSTRAINT "expense_entries_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."family_members"
    ADD CONSTRAINT "family_members_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."faqs"
    ADD CONSTRAINT "faqs_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."feature_flags"
    ADD CONSTRAINT "feature_flags_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."field_mappings"
    ADD CONSTRAINT "field_mappings_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."game_runs"
    ADD CONSTRAINT "game_runs_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."gamification_state"
    ADD CONSTRAINT "gamification_state_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."goals"
    ADD CONSTRAINT "goals_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."gst_records"
    ADD CONSTRAINT "gst_records_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."identity_links"
    ADD CONSTRAINT "identity_links_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."identity_records"
    ADD CONSTRAINT "identity_records_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."iks_assets"
    ADD CONSTRAINT "iks_assets_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."income_streams"
    ADD CONSTRAINT "income_streams_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."insurance_coverage"
    ADD CONSTRAINT "insurance_coverage_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."insurance_policies"
    ADD CONSTRAINT "insurance_policies_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."investment_holdings"
    ADD CONSTRAINT "investment_holdings_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."loan_accounts"
    ADD CONSTRAINT "loan_accounts_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."module_access_permissions"
    ADD CONSTRAINT "module_access_permissions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."modules"
    ADD CONSTRAINT "modules_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."monthly_analytics"
    ADD CONSTRAINT "monthly_analytics_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."nominee_mapping"
    ADD CONSTRAINT "nominee_mapping_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."notification_templates"
    ADD CONSTRAINT "notification_templates_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."notifications"
    ADD CONSTRAINT "notifications_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."property_assets"
    ADD CONSTRAINT "property_assets_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."questions"
    ADD CONSTRAINT "questions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."quiz_answers"
    ADD CONSTRAINT "quiz_answers_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."rajya_scores"
    ADD CONSTRAINT "rajya_scores_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."reminders"
    ADD CONSTRAINT "reminders_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."scheduled_reports"
    ADD CONSTRAINT "scheduled_reports_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."submodules"
    ADD CONSTRAINT "submodules_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."subscription_analytics"
    ADD CONSTRAINT "subscription_analytics_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."subscriptions"
    ADD CONSTRAINT "subscriptions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."succession_emergency"
    ADD CONSTRAINT "succession_emergency_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."succession_nominees"
    ADD CONSTRAINT "succession_nominees_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."succession_wills"
    ADD CONSTRAINT "succession_wills_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."support_tickets"
    ADD CONSTRAINT "support_tickets_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."system_parameters"
    ADD CONSTRAINT "system_parameters_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."system_settings"
    ADD CONSTRAINT "system_settings_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."tax_records"
    ADD CONSTRAINT "tax_records_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."ticket_responses"
    ADD CONSTRAINT "ticket_responses_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."tutorial_analytics"
    ADD CONSTRAINT "tutorial_analytics_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."tutorial_completions"
    ADD CONSTRAINT "tutorial_completions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."tutorials"
    ADD CONSTRAINT "tutorials_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."user_chapter_progress"
    ADD CONSTRAINT "user_chapter_progress_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."user_cohorts"
    ADD CONSTRAINT "user_cohorts_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."user_feedback"
    ADD CONSTRAINT "user_feedback_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."user_module_progress"
    ADD CONSTRAINT "user_module_progress_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."user_sessions"
    ADD CONSTRAINT "user_sessions_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."users"
    ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."weekly_analytics"
    ADD CONSTRAINT "weekly_analytics_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."will_status"
    ADD CONSTRAINT "will_status_pkey" PRIMARY KEY ("id");



CREATE INDEX "activity_events_eventType_idx" ON "public"."activity_events" USING "btree" ("eventType");



CREATE INDEX "activity_events_timestamp_idx" ON "public"."activity_events" USING "btree" ("timestamp");



CREATE INDEX "activity_events_userId_idx" ON "public"."activity_events" USING "btree" ("userId");



CREATE INDEX "admin_audit_logs_actionType_idx" ON "public"."admin_audit_logs" USING "btree" ("actionType");



CREATE INDEX "admin_audit_logs_adminUserId_idx" ON "public"."admin_audit_logs" USING "btree" ("adminUserId");



CREATE INDEX "admin_audit_logs_entityType_idx" ON "public"."admin_audit_logs" USING "btree" ("entityType");



CREATE INDEX "admin_audit_logs_timestamp_idx" ON "public"."admin_audit_logs" USING "btree" ("timestamp");



CREATE INDEX "admin_sessions_adminUserId_idx" ON "public"."admin_sessions" USING "btree" ("adminUserId");



CREATE INDEX "admin_sessions_expiresAt_idx" ON "public"."admin_sessions" USING "btree" ("expiresAt");



CREATE UNIQUE INDEX "admin_sessions_refreshToken_key" ON "public"."admin_sessions" USING "btree" ("refreshToken");



CREATE INDEX "admin_sessions_token_idx" ON "public"."admin_sessions" USING "btree" ("token");



CREATE UNIQUE INDEX "admin_sessions_token_key" ON "public"."admin_sessions" USING "btree" ("token");



CREATE INDEX "admin_users_email_idx" ON "public"."admin_users" USING "btree" ("email");



CREATE UNIQUE INDEX "admin_users_email_key" ON "public"."admin_users" USING "btree" ("email");



CREATE INDEX "admin_users_role_idx" ON "public"."admin_users" USING "btree" ("role");



CREATE INDEX "admin_users_status_idx" ON "public"."admin_users" USING "btree" ("status");



CREATE INDEX "asset_inventory_itemType_idx" ON "public"."asset_inventory" USING "btree" ("itemType");



CREATE INDEX "asset_inventory_userId_idx" ON "public"."asset_inventory" USING "btree" ("userId");



CREATE INDEX "balance_history_bankAccountId_idx" ON "public"."balance_history" USING "btree" ("bankAccountId");



CREATE INDEX "bank_accounts_status_idx" ON "public"."bank_accounts" USING "btree" ("status");



CREATE INDEX "bank_accounts_userId_idx" ON "public"."bank_accounts" USING "btree" ("userId");



CREATE INDEX "broadcasts_scheduledFor_idx" ON "public"."broadcasts" USING "btree" ("scheduledFor");



CREATE INDEX "broadcasts_status_idx" ON "public"."broadcasts" USING "btree" ("status");



CREATE INDEX "budget_plans_userId_idx" ON "public"."budget_plans" USING "btree" ("userId");



CREATE INDEX "calculation_parameter_history_changedAt_idx" ON "public"."calculation_parameter_history" USING "btree" ("changedAt");



CREATE INDEX "calculation_parameter_history_parameterId_idx" ON "public"."calculation_parameter_history" USING "btree" ("parameterId");



CREATE INDEX "calculation_parameter_history_parameterKey_idx" ON "public"."calculation_parameter_history" USING "btree" ("parameterKey");



CREATE INDEX "calculation_parameters_category_idx" ON "public"."calculation_parameters" USING "btree" ("category");



CREATE INDEX "calculation_parameters_key_idx" ON "public"."calculation_parameters" USING "btree" ("key");



CREATE UNIQUE INDEX "calculation_parameters_key_key" ON "public"."calculation_parameters" USING "btree" ("key");



CREATE UNIQUE INDEX "cash_wallets_userId_key" ON "public"."cash_wallets" USING "btree" ("userId");



CREATE INDEX "cohorts_name_idx" ON "public"."cohorts" USING "btree" ("name");



CREATE INDEX "consent_records_consentType_idx" ON "public"."consent_records" USING "btree" ("consentType");



CREATE UNIQUE INDEX "consent_records_userId_consentType_key" ON "public"."consent_records" USING "btree" ("userId", "consentType");



CREATE INDEX "consent_records_userId_idx" ON "public"."consent_records" USING "btree" ("userId");



CREATE INDEX "contact_messages_createdAt_idx" ON "public"."contact_messages" USING "btree" ("createdAt");



CREATE INDEX "contact_messages_email_idx" ON "public"."contact_messages" USING "btree" ("email");



CREATE INDEX "contact_messages_status_idx" ON "public"."contact_messages" USING "btree" ("status");



CREATE INDEX "credential_records_portalType_idx" ON "public"."credential_records" USING "btree" ("portalType");



CREATE INDEX "credential_records_userId_idx" ON "public"."credential_records" USING "btree" ("userId");



CREATE INDEX "daily_analytics_date_idx" ON "public"."daily_analytics" USING "btree" ("date");



CREATE UNIQUE INDEX "daily_analytics_date_key" ON "public"."daily_analytics" USING "btree" ("date");



CREATE INDEX "data_access_logs_adminUserId_idx" ON "public"."data_access_logs" USING "btree" ("adminUserId");



CREATE INDEX "data_access_logs_timestamp_idx" ON "public"."data_access_logs" USING "btree" ("timestamp");



CREATE INDEX "data_access_logs_userId_idx" ON "public"."data_access_logs" USING "btree" ("userId");



CREATE UNIQUE INDEX "din_records_dinNumber_userId_key" ON "public"."din_records" USING "btree" ("dinNumber", "userId");



CREATE INDEX "din_records_status_idx" ON "public"."din_records" USING "btree" ("status");



CREATE INDEX "din_records_userId_idx" ON "public"."din_records" USING "btree" ("userId");



CREATE INDEX "document_meta_docType_idx" ON "public"."document_meta" USING "btree" ("docType");



CREATE INDEX "document_meta_expiryDate_idx" ON "public"."document_meta" USING "btree" ("expiryDate");



CREATE INDEX "document_meta_linkedEntityId_idx" ON "public"."document_meta" USING "btree" ("linkedEntityId");



CREATE INDEX "document_meta_userId_idx" ON "public"."document_meta" USING "btree" ("userId");



CREATE INDEX "education_userId_idx" ON "public"."education" USING "btree" ("userId");



CREATE INDEX "email_verification_codes_userId_purpose_idx" ON "public"."email_verification_codes" USING "btree" ("userId", "purpose");



CREATE INDEX "expense_categories_userId_idx" ON "public"."expense_categories" USING "btree" ("userId");



CREATE INDEX "expense_entries_category_idx" ON "public"."expense_entries" USING "btree" ("category");



CREATE INDEX "expense_entries_date_idx" ON "public"."expense_entries" USING "btree" ("date");



CREATE INDEX "expense_entries_userId_idx" ON "public"."expense_entries" USING "btree" ("userId");



CREATE INDEX "family_members_userId_idx" ON "public"."family_members" USING "btree" ("userId");



CREATE INDEX "faqs_category_idx" ON "public"."faqs" USING "btree" ("category");



CREATE INDEX "faqs_language_idx" ON "public"."faqs" USING "btree" ("language");



CREATE INDEX "feature_flags_enabled_idx" ON "public"."feature_flags" USING "btree" ("enabled");



CREATE INDEX "feature_flags_name_idx" ON "public"."feature_flags" USING "btree" ("name");



CREATE UNIQUE INDEX "feature_flags_name_key" ON "public"."feature_flags" USING "btree" ("name");



CREATE UNIQUE INDEX "field_mappings_databaseTable_databaseField_key" ON "public"."field_mappings" USING "btree" ("databaseTable", "databaseField");



CREATE INDEX "field_mappings_databaseTable_idx" ON "public"."field_mappings" USING "btree" ("databaseTable");



CREATE INDEX "game_runs_submoduleId_idx" ON "public"."game_runs" USING "btree" ("submoduleId");



CREATE INDEX "game_runs_userId_idx" ON "public"."game_runs" USING "btree" ("userId");



CREATE UNIQUE INDEX "gamification_state_userId_key" ON "public"."gamification_state" USING "btree" ("userId");



CREATE INDEX "goals_status_idx" ON "public"."goals" USING "btree" ("status");



CREATE INDEX "goals_userId_idx" ON "public"."goals" USING "btree" ("userId");



CREATE UNIQUE INDEX "gst_records_gstin_userId_key" ON "public"."gst_records" USING "btree" ("gstin", "userId");



CREATE INDEX "gst_records_status_idx" ON "public"."gst_records" USING "btree" ("status");



CREATE INDEX "gst_records_userId_idx" ON "public"."gst_records" USING "btree" ("userId");



CREATE INDEX "identity_links_identityId_idx" ON "public"."identity_links" USING "btree" ("identityId");



CREATE INDEX "identity_links_userId_idx" ON "public"."identity_links" USING "btree" ("userId");



CREATE UNIQUE INDEX "identity_records_userId_idType_key" ON "public"."identity_records" USING "btree" ("userId", "idType");



CREATE INDEX "identity_records_userId_idx" ON "public"."identity_records" USING "btree" ("userId");



CREATE UNIQUE INDEX "identity_records_userid_idtype_familymemberid_key" ON "public"."identity_records" USING "btree" ("userId", "idType", "familyMemberId");



CREATE INDEX "iks_assets_assetType_idx" ON "public"."iks_assets" USING "btree" ("assetType");



CREATE INDEX "iks_assets_moduleScope_idx" ON "public"."iks_assets" USING "btree" ("moduleScope");



CREATE INDEX "income_streams_type_idx" ON "public"."income_streams" USING "btree" ("type");



CREATE INDEX "income_streams_userId_idx" ON "public"."income_streams" USING "btree" ("userId");



CREATE UNIQUE INDEX "insurance_coverage_policyId_memberId_key" ON "public"."insurance_coverage" USING "btree" ("policyId", "memberId");



CREATE INDEX "insurance_policies_dueDate_idx" ON "public"."insurance_policies" USING "btree" ("dueDate");



CREATE INDEX "insurance_policies_type_idx" ON "public"."insurance_policies" USING "btree" ("type");



CREATE INDEX "insurance_policies_userId_idx" ON "public"."insurance_policies" USING "btree" ("userId");



CREATE INDEX "investment_holdings_type_idx" ON "public"."investment_holdings" USING "btree" ("type");



CREATE INDEX "investment_holdings_userId_idx" ON "public"."investment_holdings" USING "btree" ("userId");



CREATE INDEX "loan_accounts_status_idx" ON "public"."loan_accounts" USING "btree" ("status");



CREATE INDEX "loan_accounts_type_idx" ON "public"."loan_accounts" USING "btree" ("type");



CREATE INDEX "loan_accounts_userId_idx" ON "public"."loan_accounts" USING "btree" ("userId");



CREATE INDEX "module_access_permissions_adminUserId_idx" ON "public"."module_access_permissions" USING "btree" ("adminUserId");



CREATE UNIQUE INDEX "module_access_permissions_adminUserId_moduleCode_key" ON "public"."module_access_permissions" USING "btree" ("adminUserId", "moduleCode");



CREATE INDEX "modules_code_idx" ON "public"."modules" USING "btree" ("code");



CREATE UNIQUE INDEX "modules_code_key" ON "public"."modules" USING "btree" ("code");



CREATE INDEX "modules_isMvp_idx" ON "public"."modules" USING "btree" ("isMvp");



CREATE INDEX "modules_visibilityStatus_idx" ON "public"."modules" USING "btree" ("visibilityStatus");



CREATE INDEX "monthly_analytics_month_idx" ON "public"."monthly_analytics" USING "btree" ("month");



CREATE UNIQUE INDEX "monthly_analytics_month_key" ON "public"."monthly_analytics" USING "btree" ("month");



CREATE INDEX "nominee_mapping_assetType_idx" ON "public"."nominee_mapping" USING "btree" ("assetType");



CREATE INDEX "nominee_mapping_userId_idx" ON "public"."nominee_mapping" USING "btree" ("userId");



CREATE INDEX "notification_templates_channel_idx" ON "public"."notification_templates" USING "btree" ("channel");



CREATE INDEX "notification_templates_name_idx" ON "public"."notification_templates" USING "btree" ("name");



CREATE UNIQUE INDEX "notification_templates_name_key" ON "public"."notification_templates" USING "btree" ("name");



CREATE INDEX "notification_templates_triggerEvent_idx" ON "public"."notification_templates" USING "btree" ("triggerEvent");



CREATE INDEX "notifications_createdAt_idx" ON "public"."notifications" USING "btree" ("createdAt");



CREATE INDEX "notifications_status_idx" ON "public"."notifications" USING "btree" ("status");



CREATE INDEX "notifications_userId_idx" ON "public"."notifications" USING "btree" ("userId");



CREATE INDEX "property_assets_type_idx" ON "public"."property_assets" USING "btree" ("type");



CREATE INDEX "property_assets_userId_idx" ON "public"."property_assets" USING "btree" ("userId");



CREATE INDEX "questions_questionType_idx" ON "public"."questions" USING "btree" ("questionType");



CREATE INDEX "questions_submoduleId_idx" ON "public"."questions" USING "btree" ("submoduleId");



CREATE INDEX "questions_visibilityStatus_idx" ON "public"."questions" USING "btree" ("visibilityStatus");



CREATE INDEX "quiz_answers_questionId_idx" ON "public"."quiz_answers" USING "btree" ("questionId");



CREATE INDEX "quiz_answers_userId_idx" ON "public"."quiz_answers" USING "btree" ("userId");



CREATE INDEX "rajya_scores_rank_idx" ON "public"."rajya_scores" USING "btree" ("rank");



CREATE INDEX "rajya_scores_userId_idx" ON "public"."rajya_scores" USING "btree" ("userId");



CREATE UNIQUE INDEX "rajya_scores_userId_key" ON "public"."rajya_scores" USING "btree" ("userId");



CREATE INDEX "reminders_status_idx" ON "public"."reminders" USING "btree" ("status");



CREATE INDEX "reminders_targetDate_idx" ON "public"."reminders" USING "btree" ("targetDate");



CREATE INDEX "reminders_userId_idx" ON "public"."reminders" USING "btree" ("userId");



CREATE INDEX "scheduled_reports_nextRunAt_idx" ON "public"."scheduled_reports" USING "btree" ("nextRunAt");



CREATE INDEX "submodules_code_idx" ON "public"."submodules" USING "btree" ("code");



CREATE UNIQUE INDEX "submodules_code_key" ON "public"."submodules" USING "btree" ("code");



CREATE INDEX "submodules_moduleId_idx" ON "public"."submodules" USING "btree" ("moduleId");



CREATE UNIQUE INDEX "subscription_analytics_userId_key" ON "public"."subscription_analytics" USING "btree" ("userId");



CREATE INDEX "subscriptions_category_idx" ON "public"."subscriptions" USING "btree" ("category");



CREATE INDEX "subscriptions_renewalDate_idx" ON "public"."subscriptions" USING "btree" ("renewalDate");



CREATE INDEX "subscriptions_status_idx" ON "public"."subscriptions" USING "btree" ("status");



CREATE INDEX "subscriptions_userId_idx" ON "public"."subscriptions" USING "btree" ("userId");



CREATE UNIQUE INDEX "succession_emergency_userId_key" ON "public"."succession_emergency" USING "btree" ("userId");



CREATE UNIQUE INDEX "succession_nominees_userId_assetType_assetId_nomineeId_key" ON "public"."succession_nominees" USING "btree" ("userId", "assetType", "assetId", "nomineeId");



CREATE UNIQUE INDEX "succession_wills_userId_key" ON "public"."succession_wills" USING "btree" ("userId");



CREATE INDEX "support_tickets_assignedTo_idx" ON "public"."support_tickets" USING "btree" ("assignedTo");



CREATE INDEX "support_tickets_status_idx" ON "public"."support_tickets" USING "btree" ("status");



CREATE INDEX "support_tickets_userId_idx" ON "public"."support_tickets" USING "btree" ("userId");



CREATE INDEX "system_parameters_category_idx" ON "public"."system_parameters" USING "btree" ("category");



CREATE INDEX "system_parameters_key_idx" ON "public"."system_parameters" USING "btree" ("key");



CREATE UNIQUE INDEX "system_parameters_key_key" ON "public"."system_parameters" USING "btree" ("key");



CREATE UNIQUE INDEX "system_settings_key_key" ON "public"."system_settings" USING "btree" ("key");



CREATE INDEX "tax_records_status_idx" ON "public"."tax_records" USING "btree" ("status");



CREATE INDEX "tax_records_userId_idx" ON "public"."tax_records" USING "btree" ("userId");



CREATE INDEX "ticket_responses_ticketId_idx" ON "public"."ticket_responses" USING "btree" ("ticketId");



CREATE INDEX "tutorial_analytics_date_idx" ON "public"."tutorial_analytics" USING "btree" ("date");



CREATE UNIQUE INDEX "tutorial_analytics_tutorialId_date_key" ON "public"."tutorial_analytics" USING "btree" ("tutorialId", "date");



CREATE INDEX "tutorial_analytics_tutorialId_idx" ON "public"."tutorial_analytics" USING "btree" ("tutorialId");



CREATE INDEX "tutorial_completions_tutorialId_idx" ON "public"."tutorial_completions" USING "btree" ("tutorialId");



CREATE INDEX "tutorial_completions_userId_idx" ON "public"."tutorial_completions" USING "btree" ("userId");



CREATE UNIQUE INDEX "tutorial_completions_userId_tutorialId_key" ON "public"."tutorial_completions" USING "btree" ("userId", "tutorialId");



CREATE INDEX "tutorials_language_idx" ON "public"."tutorials" USING "btree" ("language");



CREATE INDEX "tutorials_submoduleId_idx" ON "public"."tutorials" USING "btree" ("submoduleId");



CREATE INDEX "tutorials_visibilityStatus_idx" ON "public"."tutorials" USING "btree" ("visibilityStatus");



CREATE INDEX "user_chapter_progress_submoduleId_idx" ON "public"."user_chapter_progress" USING "btree" ("submoduleId");



CREATE INDEX "user_chapter_progress_userId_idx" ON "public"."user_chapter_progress" USING "btree" ("userId");



CREATE UNIQUE INDEX "user_chapter_progress_userId_submoduleId_key" ON "public"."user_chapter_progress" USING "btree" ("userId", "submoduleId");



CREATE INDEX "user_cohorts_cohortId_idx" ON "public"."user_cohorts" USING "btree" ("cohortId");



CREATE UNIQUE INDEX "user_cohorts_userId_cohortId_key" ON "public"."user_cohorts" USING "btree" ("userId", "cohortId");



CREATE INDEX "user_cohorts_userId_idx" ON "public"."user_cohorts" USING "btree" ("userId");



CREATE INDEX "user_feedback_entityType_idx" ON "public"."user_feedback" USING "btree" ("entityType");



CREATE INDEX "user_feedback_feedbackType_idx" ON "public"."user_feedback" USING "btree" ("feedbackType");



CREATE INDEX "user_feedback_userId_idx" ON "public"."user_feedback" USING "btree" ("userId");



CREATE INDEX "user_module_progress_moduleId_idx" ON "public"."user_module_progress" USING "btree" ("moduleId");



CREATE INDEX "user_module_progress_userId_idx" ON "public"."user_module_progress" USING "btree" ("userId");



CREATE UNIQUE INDEX "user_module_progress_userId_moduleId_key" ON "public"."user_module_progress" USING "btree" ("userId", "moduleId");



CREATE INDEX "user_sessions_expiresAt_idx" ON "public"."user_sessions" USING "btree" ("expiresAt");



CREATE UNIQUE INDEX "user_sessions_refreshToken_key" ON "public"."user_sessions" USING "btree" ("refreshToken");



CREATE INDEX "user_sessions_token_idx" ON "public"."user_sessions" USING "btree" ("token");



CREATE UNIQUE INDEX "user_sessions_token_key" ON "public"."user_sessions" USING "btree" ("token");



CREATE INDEX "user_sessions_userId_idx" ON "public"."user_sessions" USING "btree" ("userId");



CREATE INDEX "users_email_idx" ON "public"."users" USING "btree" ("email");



CREATE UNIQUE INDEX "users_email_key" ON "public"."users" USING "btree" ("email");



CREATE INDEX "users_phone_idx" ON "public"."users" USING "btree" ("phone");



CREATE UNIQUE INDEX "users_phone_key" ON "public"."users" USING "btree" ("phone");



CREATE INDEX "users_profileType_idx" ON "public"."users" USING "btree" ("profileType");



CREATE INDEX "users_status_idx" ON "public"."users" USING "btree" ("status");



CREATE INDEX "weekly_analytics_weekStart_idx" ON "public"."weekly_analytics" USING "btree" ("weekStart");



CREATE UNIQUE INDEX "weekly_analytics_weekStart_weekEnd_key" ON "public"."weekly_analytics" USING "btree" ("weekStart", "weekEnd");



CREATE UNIQUE INDEX "will_status_userId_key" ON "public"."will_status" USING "btree" ("userId");



ALTER TABLE ONLY "public"."activity_events"
    ADD CONSTRAINT "activity_events_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."admin_audit_logs"
    ADD CONSTRAINT "admin_audit_logs_adminUserId_fkey" FOREIGN KEY ("adminUserId") REFERENCES "public"."admin_users"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."admin_sessions"
    ADD CONSTRAINT "admin_sessions_adminUserId_fkey" FOREIGN KEY ("adminUserId") REFERENCES "public"."admin_users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."asset_inventory"
    ADD CONSTRAINT "asset_inventory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."balance_history"
    ADD CONSTRAINT "balance_history_bankAccountId_fkey" FOREIGN KEY ("bankAccountId") REFERENCES "public"."bank_accounts"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."bank_accounts"
    ADD CONSTRAINT "bank_accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."broadcasts"
    ADD CONSTRAINT "broadcasts_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "public"."admin_users"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."budget_plans"
    ADD CONSTRAINT "budget_plans_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."calculation_parameter_history"
    ADD CONSTRAINT "calculation_parameter_history_changedBy_fkey" FOREIGN KEY ("changedBy") REFERENCES "public"."admin_users"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."calculation_parameter_history"
    ADD CONSTRAINT "calculation_parameter_history_parameterId_fkey" FOREIGN KEY ("parameterId") REFERENCES "public"."calculation_parameters"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."cash_wallets"
    ADD CONSTRAINT "cash_wallets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."consent_records"
    ADD CONSTRAINT "consent_records_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."credential_records"
    ADD CONSTRAINT "credential_records_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."data_access_logs"
    ADD CONSTRAINT "data_access_logs_adminUserId_fkey" FOREIGN KEY ("adminUserId") REFERENCES "public"."admin_users"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."data_access_logs"
    ADD CONSTRAINT "data_access_logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."din_records"
    ADD CONSTRAINT "din_records_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."document_meta"
    ADD CONSTRAINT "document_meta_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."education"
    ADD CONSTRAINT "education_familyMemberId_fkey" FOREIGN KEY ("familyMemberId") REFERENCES "public"."family_members"("id") ON UPDATE CASCADE ON DELETE SET NULL;



ALTER TABLE ONLY "public"."education"
    ADD CONSTRAINT "education_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."email_verification_codes"
    ADD CONSTRAINT "email_verification_codes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."expense_categories"
    ADD CONSTRAINT "expense_categories_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."expense_entries"
    ADD CONSTRAINT "expense_entries_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."family_members"
    ADD CONSTRAINT "family_members_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."feature_flags"
    ADD CONSTRAINT "feature_flags_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "public"."admin_users"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."feature_flags"
    ADD CONSTRAINT "feature_flags_dependsOnFlagId_fkey" FOREIGN KEY ("dependsOnFlagId") REFERENCES "public"."feature_flags"("id") ON UPDATE CASCADE ON DELETE SET NULL;



ALTER TABLE ONLY "public"."game_runs"
    ADD CONSTRAINT "game_runs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."gamification_state"
    ADD CONSTRAINT "gamification_state_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."goals"
    ADD CONSTRAINT "goals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."gst_records"
    ADD CONSTRAINT "gst_records_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."identity_links"
    ADD CONSTRAINT "identity_links_identityId_fkey" FOREIGN KEY ("identityId") REFERENCES "public"."identity_records"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."identity_links"
    ADD CONSTRAINT "identity_links_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."identity_records"
    ADD CONSTRAINT "identity_records_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."income_streams"
    ADD CONSTRAINT "income_streams_creditedAccountId_fkey" FOREIGN KEY ("creditedAccountId") REFERENCES "public"."bank_accounts"("id") ON UPDATE CASCADE ON DELETE SET NULL;



ALTER TABLE ONLY "public"."income_streams"
    ADD CONSTRAINT "income_streams_familyMemberId_fkey" FOREIGN KEY ("familyMemberId") REFERENCES "public"."family_members"("id") ON UPDATE CASCADE ON DELETE SET NULL;



ALTER TABLE ONLY "public"."income_streams"
    ADD CONSTRAINT "income_streams_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."insurance_coverage"
    ADD CONSTRAINT "insurance_coverage_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "public"."family_members"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."insurance_coverage"
    ADD CONSTRAINT "insurance_coverage_policyId_fkey" FOREIGN KEY ("policyId") REFERENCES "public"."insurance_policies"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."insurance_policies"
    ADD CONSTRAINT "insurance_policies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."investment_holdings"
    ADD CONSTRAINT "investment_holdings_linkedGoalId_fkey" FOREIGN KEY ("linkedGoalId") REFERENCES "public"."goals"("id") ON UPDATE CASCADE ON DELETE SET NULL;



ALTER TABLE ONLY "public"."investment_holdings"
    ADD CONSTRAINT "investment_holdings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."loan_accounts"
    ADD CONSTRAINT "loan_accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."module_access_permissions"
    ADD CONSTRAINT "module_access_permissions_adminUserId_fkey" FOREIGN KEY ("adminUserId") REFERENCES "public"."admin_users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."modules"
    ADD CONSTRAINT "modules_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "public"."admin_users"("id") ON UPDATE CASCADE ON DELETE SET NULL;



ALTER TABLE ONLY "public"."nominee_mapping"
    ADD CONSTRAINT "nominee_mapping_nomineeId_fkey" FOREIGN KEY ("nomineeId") REFERENCES "public"."family_members"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."nominee_mapping"
    ADD CONSTRAINT "nominee_mapping_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."notifications"
    ADD CONSTRAINT "notifications_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "public"."notification_templates"("id") ON UPDATE CASCADE ON DELETE SET NULL;



ALTER TABLE ONLY "public"."notifications"
    ADD CONSTRAINT "notifications_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."property_assets"
    ADD CONSTRAINT "property_assets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."questions"
    ADD CONSTRAINT "questions_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "public"."admin_users"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."questions"
    ADD CONSTRAINT "questions_fieldMappingId_fkey" FOREIGN KEY ("fieldMappingId") REFERENCES "public"."field_mappings"("id") ON UPDATE CASCADE ON DELETE SET NULL;



ALTER TABLE ONLY "public"."questions"
    ADD CONSTRAINT "questions_submoduleId_fkey" FOREIGN KEY ("submoduleId") REFERENCES "public"."submodules"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."quiz_answers"
    ADD CONSTRAINT "quiz_answers_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "public"."questions"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."quiz_answers"
    ADD CONSTRAINT "quiz_answers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."rajya_scores"
    ADD CONSTRAINT "rajya_scores_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."reminders"
    ADD CONSTRAINT "reminders_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."scheduled_reports"
    ADD CONSTRAINT "scheduled_reports_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "public"."admin_users"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."submodules"
    ADD CONSTRAINT "submodules_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "public"."modules"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."subscription_analytics"
    ADD CONSTRAINT "subscription_analytics_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."subscriptions"
    ADD CONSTRAINT "subscriptions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."succession_emergency"
    ADD CONSTRAINT "succession_emergency_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."succession_nominees"
    ADD CONSTRAINT "succession_nominees_nomineeId_fkey" FOREIGN KEY ("nomineeId") REFERENCES "public"."family_members"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."succession_nominees"
    ADD CONSTRAINT "succession_nominees_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."succession_wills"
    ADD CONSTRAINT "succession_wills_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."support_tickets"
    ADD CONSTRAINT "support_tickets_assignedTo_fkey" FOREIGN KEY ("assignedTo") REFERENCES "public"."admin_users"("id") ON UPDATE CASCADE ON DELETE SET NULL;



ALTER TABLE ONLY "public"."support_tickets"
    ADD CONSTRAINT "support_tickets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."system_parameters"
    ADD CONSTRAINT "system_parameters_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "public"."admin_users"("id") ON UPDATE CASCADE ON DELETE SET NULL;



ALTER TABLE ONLY "public"."tax_records"
    ADD CONSTRAINT "tax_records_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."ticket_responses"
    ADD CONSTRAINT "ticket_responses_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "public"."support_tickets"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."tutorial_analytics"
    ADD CONSTRAINT "tutorial_analytics_tutorialId_fkey" FOREIGN KEY ("tutorialId") REFERENCES "public"."tutorials"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."tutorial_completions"
    ADD CONSTRAINT "tutorial_completions_tutorialId_fkey" FOREIGN KEY ("tutorialId") REFERENCES "public"."tutorials"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."tutorial_completions"
    ADD CONSTRAINT "tutorial_completions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."tutorials"
    ADD CONSTRAINT "tutorials_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "public"."admin_users"("id") ON UPDATE CASCADE ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."tutorials"
    ADD CONSTRAINT "tutorials_submoduleId_fkey" FOREIGN KEY ("submoduleId") REFERENCES "public"."submodules"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."user_chapter_progress"
    ADD CONSTRAINT "user_chapter_progress_submoduleId_fkey" FOREIGN KEY ("submoduleId") REFERENCES "public"."submodules"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."user_chapter_progress"
    ADD CONSTRAINT "user_chapter_progress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."user_cohorts"
    ADD CONSTRAINT "user_cohorts_cohortId_fkey" FOREIGN KEY ("cohortId") REFERENCES "public"."cohorts"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."user_cohorts"
    ADD CONSTRAINT "user_cohorts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."user_feedback"
    ADD CONSTRAINT "user_feedback_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."user_module_progress"
    ADD CONSTRAINT "user_module_progress_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "public"."modules"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."user_module_progress"
    ADD CONSTRAINT "user_module_progress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."user_sessions"
    ADD CONSTRAINT "user_sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



ALTER TABLE ONLY "public"."will_status"
    ADD CONSTRAINT "will_status_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON UPDATE CASCADE ON DELETE CASCADE;



REVOKE USAGE ON SCHEMA "public" FROM PUBLIC;




