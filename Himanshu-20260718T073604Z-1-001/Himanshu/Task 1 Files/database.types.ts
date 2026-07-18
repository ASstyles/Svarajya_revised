export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      _prisma_migrations: {
        Row: {
          applied_steps_count: number;
          checksum: string;
          finished_at: string | null;
          id: string;
          logs: string | null;
          migration_name: string;
          rolled_back_at: string | null;
          started_at: string;
        };
        Insert: {
          applied_steps_count?: number;
          checksum: string;
          finished_at?: string | null;
          id: string;
          logs?: string | null;
          migration_name: string;
          rolled_back_at?: string | null;
          started_at?: string;
        };
        Update: {
          applied_steps_count?: number;
          checksum?: string;
          finished_at?: string | null;
          id?: string;
          logs?: string | null;
          migration_name?: string;
          rolled_back_at?: string | null;
          started_at?: string;
        };
        Relationships: [];
      };
      activity_events: {
        Row: {
          deviceType: string | null;
          eventData: Json | null;
          eventType: string;
          id: string;
          timestamp: string;
          userId: string;
        };
        Insert: {
          deviceType?: string | null;
          eventData?: Json | null;
          eventType: string;
          id: string;
          timestamp?: string;
          userId: string;
        };
        Update: {
          deviceType?: string | null;
          eventData?: Json | null;
          eventType?: string;
          id?: string;
          timestamp?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "activity_events_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      admin_audit_logs: {
        Row: {
          actionType: Database["public"]["Enums"]["AuditAction"];
          adminUserId: string;
          entityId: string | null;
          entityType: string;
          id: string;
          ipAddress: string;
          newValue: Json | null;
          oldValue: Json | null;
          timestamp: string;
          userAgent: string | null;
        };
        Insert: {
          actionType: Database["public"]["Enums"]["AuditAction"];
          adminUserId: string;
          entityId?: string | null;
          entityType: string;
          id: string;
          ipAddress: string;
          newValue?: Json | null;
          oldValue?: Json | null;
          timestamp?: string;
          userAgent?: string | null;
        };
        Update: {
          actionType?: Database["public"]["Enums"]["AuditAction"];
          adminUserId?: string;
          entityId?: string | null;
          entityType?: string;
          id?: string;
          ipAddress?: string;
          newValue?: Json | null;
          oldValue?: Json | null;
          timestamp?: string;
          userAgent?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "admin_audit_logs_adminUserId_fkey";
            columns: ["adminUserId"];
            isOneToOne: false;
            referencedRelation: "admin_users";
            referencedColumns: ["id"];
          },
        ];
      };
      admin_sessions: {
        Row: {
          adminUserId: string;
          createdAt: string;
          expiresAt: string;
          id: string;
          ipAddress: string;
          lastActivityAt: string;
          refreshToken: string;
          token: string;
          userAgent: string | null;
        };
        Insert: {
          adminUserId: string;
          createdAt?: string;
          expiresAt: string;
          id: string;
          ipAddress: string;
          lastActivityAt?: string;
          refreshToken: string;
          token: string;
          userAgent?: string | null;
        };
        Update: {
          adminUserId?: string;
          createdAt?: string;
          expiresAt?: string;
          id?: string;
          ipAddress?: string;
          lastActivityAt?: string;
          refreshToken?: string;
          token?: string;
          userAgent?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "admin_sessions_adminUserId_fkey";
            columns: ["adminUserId"];
            isOneToOne: false;
            referencedRelation: "admin_users";
            referencedColumns: ["id"];
          },
        ];
      };
      admin_users: {
        Row: {
          createdAt: string;
          createdBy: string | null;
          deletedAt: string | null;
          email: string;
          failedLoginCount: number;
          id: string;
          inviteExpiresAt: string | null;
          inviteToken: string | null;
          lastLoginAt: string | null;
          lastLoginIp: string | null;
          lockedUntil: string | null;
          mobile: string | null;
          name: string;
          password: string;
          previousPassword: string | null;
          role: Database["public"]["Enums"]["AdminRole"];
          status: Database["public"]["Enums"]["AdminStatus"];
          twoFactorEnabled: boolean;
          twoFactorOtpExpiresAt: string | null;
          twoFactorRecoveryCodes: string | null;
          twoFactorSecret: string | null;
          updatedAt: string;
        };
        Insert: {
          createdAt?: string;
          createdBy?: string | null;
          deletedAt?: string | null;
          email: string;
          failedLoginCount?: number;
          id: string;
          inviteExpiresAt?: string | null;
          inviteToken?: string | null;
          lastLoginAt?: string | null;
          lastLoginIp?: string | null;
          lockedUntil?: string | null;
          mobile?: string | null;
          name: string;
          password: string;
          previousPassword?: string | null;
          role: Database["public"]["Enums"]["AdminRole"];
          status?: Database["public"]["Enums"]["AdminStatus"];
          twoFactorEnabled?: boolean;
          twoFactorOtpExpiresAt?: string | null;
          twoFactorRecoveryCodes?: string | null;
          twoFactorSecret?: string | null;
          updatedAt: string;
        };
        Update: {
          createdAt?: string;
          createdBy?: string | null;
          deletedAt?: string | null;
          email?: string;
          failedLoginCount?: number;
          id?: string;
          inviteExpiresAt?: string | null;
          inviteToken?: string | null;
          lastLoginAt?: string | null;
          lastLoginIp?: string | null;
          lockedUntil?: string | null;
          mobile?: string | null;
          name?: string;
          password?: string;
          previousPassword?: string | null;
          role?: Database["public"]["Enums"]["AdminRole"];
          status?: Database["public"]["Enums"]["AdminStatus"];
          twoFactorEnabled?: boolean;
          twoFactorOtpExpiresAt?: string | null;
          twoFactorRecoveryCodes?: string | null;
          twoFactorSecret?: string | null;
          updatedAt?: string;
        };
        Relationships: [];
      };
      asset_inventory: {
        Row: {
          createdAt: string;
          currentValue: number | null;
          description: string;
          id: string;
          insuredFlag: boolean;
          itemType: string;
          linkedPolicyId: string | null;
          ownerId: string | null;
          purchaseValue: number | null;
          updatedAt: string;
          userId: string;
        };
        Insert: {
          createdAt?: string;
          currentValue?: number | null;
          description: string;
          id: string;
          insuredFlag?: boolean;
          itemType: string;
          linkedPolicyId?: string | null;
          ownerId?: string | null;
          purchaseValue?: number | null;
          updatedAt: string;
          userId: string;
        };
        Update: {
          createdAt?: string;
          currentValue?: number | null;
          description?: string;
          id?: string;
          insuredFlag?: boolean;
          itemType?: string;
          linkedPolicyId?: string | null;
          ownerId?: string | null;
          purchaseValue?: number | null;
          updatedAt?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "asset_inventory_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      balance_history: {
        Row: {
          balance: number;
          bankAccountId: string;
          id: string;
          note: string | null;
          recordedAt: string;
        };
        Insert: {
          balance: number;
          bankAccountId: string;
          id: string;
          note?: string | null;
          recordedAt?: string;
        };
        Update: {
          balance?: number;
          bankAccountId?: string;
          id?: string;
          note?: string | null;
          recordedAt?: string;
        };
        Relationships: [
          {
            foreignKeyName: "balance_history_bankAccountId_fkey";
            columns: ["bankAccountId"];
            isOneToOne: false;
            referencedRelation: "bank_accounts";
            referencedColumns: ["id"];
          },
        ];
      };
      bank_accounts: {
        Row: {
          accountLast4: string;
          accountNumber: string | null;
          accountType: string;
          bankName: string;
          createdAt: string;
          currentBalance: number | null;
          holders: Json | null;
          id: string;
          ifsc: string | null;
          isPrimary: boolean;
          latestBalanceAsOf: string | null;
          nickname: string | null;
          notes: string | null;
          openingBalance: number | null;
          status: string;
          updatedAt: string;
          userId: string;
        };
        Insert: {
          accountLast4: string;
          accountNumber?: string | null;
          accountType: string;
          bankName: string;
          createdAt?: string;
          currentBalance?: number | null;
          holders?: Json | null;
          id: string;
          ifsc?: string | null;
          isPrimary?: boolean;
          latestBalanceAsOf?: string | null;
          nickname?: string | null;
          notes?: string | null;
          openingBalance?: number | null;
          status?: string;
          updatedAt: string;
          userId: string;
        };
        Update: {
          accountLast4?: string;
          accountNumber?: string | null;
          accountType?: string;
          bankName?: string;
          createdAt?: string;
          currentBalance?: number | null;
          holders?: Json | null;
          id?: string;
          ifsc?: string | null;
          isPrimary?: boolean;
          latestBalanceAsOf?: string | null;
          nickname?: string | null;
          notes?: string | null;
          openingBalance?: number | null;
          status?: string;
          updatedAt?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "bank_accounts_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      broadcasts: {
        Row: {
          body: string;
          channel: Database["public"]["Enums"]["NotifChannel"];
          clickedCount: number;
          createdAt: string;
          createdBy: string;
          ctaText: string | null;
          ctaUrl: string | null;
          deliveredCount: number;
          expiresAt: string | null;
          id: string;
          openedCount: number;
          scheduledFor: string | null;
          sentAt: string | null;
          sentCount: number;
          status: Database["public"]["Enums"]["BroadcastStatus"];
          targetScope: Json;
          title: string;
        };
        Insert: {
          body: string;
          channel: Database["public"]["Enums"]["NotifChannel"];
          clickedCount?: number;
          createdAt?: string;
          createdBy: string;
          ctaText?: string | null;
          ctaUrl?: string | null;
          deliveredCount?: number;
          expiresAt?: string | null;
          id: string;
          openedCount?: number;
          scheduledFor?: string | null;
          sentAt?: string | null;
          sentCount?: number;
          status?: Database["public"]["Enums"]["BroadcastStatus"];
          targetScope: Json;
          title: string;
        };
        Update: {
          body?: string;
          channel?: Database["public"]["Enums"]["NotifChannel"];
          clickedCount?: number;
          createdAt?: string;
          createdBy?: string;
          ctaText?: string | null;
          ctaUrl?: string | null;
          deliveredCount?: number;
          expiresAt?: string | null;
          id?: string;
          openedCount?: number;
          scheduledFor?: string | null;
          sentAt?: string | null;
          sentCount?: number;
          status?: Database["public"]["Enums"]["BroadcastStatus"];
          targetScope?: Json;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: "broadcasts_createdBy_fkey";
            columns: ["createdBy"];
            isOneToOne: false;
            referencedRelation: "admin_users";
            referencedColumns: ["id"];
          },
        ];
      };
      budget_plans: {
        Row: {
          categories: Json;
          createdAt: string;
          id: string;
          isActive: boolean;
          overspendRules: Json | null;
          totalMonthly: number;
          updatedAt: string;
          userId: string;
        };
        Insert: {
          categories: Json;
          createdAt?: string;
          id: string;
          isActive?: boolean;
          overspendRules?: Json | null;
          totalMonthly: number;
          updatedAt: string;
          userId: string;
        };
        Update: {
          categories?: Json;
          createdAt?: string;
          id?: string;
          isActive?: boolean;
          overspendRules?: Json | null;
          totalMonthly?: number;
          updatedAt?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "budget_plans_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      calculation_parameter_history: {
        Row: {
          changedAt: string;
          changedBy: string;
          id: string;
          newValue: number;
          oldValue: number;
          parameterId: string;
          parameterKey: string;
          reason: string | null;
        };
        Insert: {
          changedAt?: string;
          changedBy: string;
          id: string;
          newValue: number;
          oldValue: number;
          parameterId: string;
          parameterKey: string;
          reason?: string | null;
        };
        Update: {
          changedAt?: string;
          changedBy?: string;
          id?: string;
          newValue?: number;
          oldValue?: number;
          parameterId?: string;
          parameterKey?: string;
          reason?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "calculation_parameter_history_changedBy_fkey";
            columns: ["changedBy"];
            isOneToOne: false;
            referencedRelation: "admin_users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "calculation_parameter_history_parameterId_fkey";
            columns: ["parameterId"];
            isOneToOne: false;
            referencedRelation: "calculation_parameters";
            referencedColumns: ["id"];
          },
        ];
      };
      calculation_parameters: {
        Row: {
          category: string | null;
          createdAt: string;
          defaultValue: number;
          description: string | null;
          id: string;
          key: string;
          updatedAt: string;
          value: number;
          version: number;
        };
        Insert: {
          category?: string | null;
          createdAt?: string;
          defaultValue: number;
          description?: string | null;
          id: string;
          key: string;
          updatedAt: string;
          value: number;
          version?: number;
        };
        Update: {
          category?: string | null;
          createdAt?: string;
          defaultValue?: number;
          description?: string | null;
          id?: string;
          key?: string;
          updatedAt?: string;
          value?: number;
          version?: number;
        };
        Relationships: [];
      };
      cash_wallets: {
        Row: {
          cashInHand: number;
          emergencyCash: number;
          id: string;
          idleThresholdAmount: number;
          pettyCash: number;
          updatedAt: string;
          userId: string;
        };
        Insert: {
          cashInHand?: number;
          emergencyCash?: number;
          id: string;
          idleThresholdAmount?: number;
          pettyCash?: number;
          updatedAt: string;
          userId: string;
        };
        Update: {
          cashInHand?: number;
          emergencyCash?: number;
          id?: string;
          idleThresholdAmount?: number;
          pettyCash?: number;
          updatedAt?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "cash_wallets_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      cohorts: {
        Row: {
          announcementText: string | null;
          assignedModules: Json;
          createdAt: string;
          description: string | null;
          endDate: string | null;
          id: string;
          maxCapacity: number | null;
          name: string;
          startDate: string;
          updatedAt: string;
          visibilityFlag: boolean;
          weeklyTasks: Json | null;
        };
        Insert: {
          announcementText?: string | null;
          assignedModules: Json;
          createdAt?: string;
          description?: string | null;
          endDate?: string | null;
          id: string;
          maxCapacity?: number | null;
          name: string;
          startDate: string;
          updatedAt: string;
          visibilityFlag?: boolean;
          weeklyTasks?: Json | null;
        };
        Update: {
          announcementText?: string | null;
          assignedModules?: Json;
          createdAt?: string;
          description?: string | null;
          endDate?: string | null;
          id?: string;
          maxCapacity?: number | null;
          name?: string;
          startDate?: string;
          updatedAt?: string;
          visibilityFlag?: boolean;
          weeklyTasks?: Json | null;
        };
        Relationships: [];
      };
      consent_records: {
        Row: {
          consentedAt: string | null;
          consentGiven: boolean;
          consentType: string;
          createdAt: string;
          id: string;
          revokedAt: string | null;
          updatedAt: string;
          userId: string;
          version: string | null;
        };
        Insert: {
          consentedAt?: string | null;
          consentGiven: boolean;
          consentType: string;
          createdAt?: string;
          id: string;
          revokedAt?: string | null;
          updatedAt: string;
          userId: string;
          version?: string | null;
        };
        Update: {
          consentedAt?: string | null;
          consentGiven?: boolean;
          consentType?: string;
          createdAt?: string;
          id?: string;
          revokedAt?: string | null;
          updatedAt?: string;
          userId?: string;
          version?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "consent_records_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      contact_messages: {
        Row: {
          createdAt: string;
          email: string;
          id: string;
          message: string;
          name: string;
          status: string;
          updatedAt: string;
        };
        Insert: {
          createdAt?: string;
          email: string;
          id: string;
          message: string;
          name: string;
          status?: string;
          updatedAt: string;
        };
        Update: {
          createdAt?: string;
          email?: string;
          id?: string;
          message?: string;
          name?: string;
          status?: string;
          updatedAt?: string;
        };
        Relationships: [];
      };
      credential_records: {
        Row: {
          createdAt: string;
          encryptedPassword: string | null;
          id: string;
          linked_id: string | null;
          linkedMemberId: string | null;
          loginId: string | null;
          nomineeAwareness: boolean | null;
          portalName: string;
          portalType: string;
          portalUrl: string | null;
          registeredEmail: string | null;
          registeredMobile: string | null;
          registrationDate: string | null;
          storageMode: string;
          twoFAStatus: string | null;
          twoFAType: string | null;
          updatedAt: string;
          userId: string;
        };
        Insert: {
          createdAt?: string;
          encryptedPassword?: string | null;
          id: string;
          linked_id?: string | null;
          linkedMemberId?: string | null;
          loginId?: string | null;
          nomineeAwareness?: boolean | null;
          portalName: string;
          portalType: string;
          portalUrl?: string | null;
          registeredEmail?: string | null;
          registeredMobile?: string | null;
          registrationDate?: string | null;
          storageMode?: string;
          twoFAStatus?: string | null;
          twoFAType?: string | null;
          updatedAt: string;
          userId: string;
        };
        Update: {
          createdAt?: string;
          encryptedPassword?: string | null;
          id?: string;
          linked_id?: string | null;
          linkedMemberId?: string | null;
          loginId?: string | null;
          nomineeAwareness?: boolean | null;
          portalName?: string;
          portalType?: string;
          portalUrl?: string | null;
          registeredEmail?: string | null;
          registeredMobile?: string | null;
          registrationDate?: string | null;
          storageMode?: string;
          twoFAStatus?: string | null;
          twoFAType?: string | null;
          updatedAt?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "credential_records_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      daily_analytics: {
        Row: {
          activeUsers: number;
          avgSessionDuration: number | null;
          calculatedAt: string;
          chaptersCompleted: number;
          date: string;
          dau: number;
          docsUploaded: number;
          id: string;
          modulesCompleted: number;
          newRegistrations: number;
          sessionsTotal: number;
          supportTicketsCreated: number;
        };
        Insert: {
          activeUsers?: number;
          avgSessionDuration?: number | null;
          calculatedAt?: string;
          chaptersCompleted?: number;
          date: string;
          dau?: number;
          docsUploaded?: number;
          id: string;
          modulesCompleted?: number;
          newRegistrations?: number;
          sessionsTotal?: number;
          supportTicketsCreated?: number;
        };
        Update: {
          activeUsers?: number;
          avgSessionDuration?: number | null;
          calculatedAt?: string;
          chaptersCompleted?: number;
          date?: string;
          dau?: number;
          docsUploaded?: number;
          id?: string;
          modulesCompleted?: number;
          newRegistrations?: number;
          sessionsTotal?: number;
          supportTicketsCreated?: number;
        };
        Relationships: [];
      };
      data_access_logs: {
        Row: {
          actionPerformed: string;
          adminUserId: string;
          dataScope: string;
          id: string;
          ipAddress: string;
          justification: string | null;
          timestamp: string;
          userId: string;
        };
        Insert: {
          actionPerformed: string;
          adminUserId: string;
          dataScope: string;
          id: string;
          ipAddress: string;
          justification?: string | null;
          timestamp?: string;
          userId: string;
        };
        Update: {
          actionPerformed?: string;
          adminUserId?: string;
          dataScope?: string;
          id?: string;
          ipAddress?: string;
          justification?: string | null;
          timestamp?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "data_access_logs_adminUserId_fkey";
            columns: ["adminUserId"];
            isOneToOne: false;
            referencedRelation: "admin_users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "data_access_logs_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      din_records: {
        Row: {
          companyName: string | null;
          createdAt: string;
          dinKycStatus: string | null;
          dinNumber: string;
          directorSince: string | null;
          documentUrl: string | null;
          dscExpiryDate: string | null;
          expiryDate: string | null;
          id: string;
          issueDate: string | null;
          mcaFilingStatus: string | null;
          notes: string | null;
          status: string;
          updatedAt: string;
          userId: string;
        };
        Insert: {
          companyName?: string | null;
          createdAt?: string;
          dinKycStatus?: string | null;
          dinNumber: string;
          directorSince?: string | null;
          documentUrl?: string | null;
          dscExpiryDate?: string | null;
          expiryDate?: string | null;
          id: string;
          issueDate?: string | null;
          mcaFilingStatus?: string | null;
          notes?: string | null;
          status?: string;
          updatedAt: string;
          userId: string;
        };
        Update: {
          companyName?: string | null;
          createdAt?: string;
          dinKycStatus?: string | null;
          dinNumber?: string;
          directorSince?: string | null;
          documentUrl?: string | null;
          dscExpiryDate?: string | null;
          expiryDate?: string | null;
          id?: string;
          issueDate?: string | null;
          mcaFilingStatus?: string | null;
          notes?: string | null;
          status?: string;
          updatedAt?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "din_records_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      document_meta: {
        Row: {
          cloudBackupConsent: boolean;
          cloudId: string | null;
          cloudStorageUrl: string | null;
          createdAt: string;
          docType: string;
          expiryDate: string | null;
          fileHash: string | null;
          fileName: string;
          id: string;
          linkedEntityId: string | null;
          linkedFamilyMemberId: string | null;
          linkedPersonId: string | null;
          localId: string | null;
          localPathRef: string | null;
          storageType: string | null;
          updatedAt: string;
          userId: string;
          versionHistory: Json | null;
          versionTag: string | null;
        };
        Insert: {
          cloudBackupConsent?: boolean;
          cloudId?: string | null;
          cloudStorageUrl?: string | null;
          createdAt?: string;
          docType: string;
          expiryDate?: string | null;
          fileHash?: string | null;
          fileName: string;
          id: string;
          linkedEntityId?: string | null;
          linkedFamilyMemberId?: string | null;
          linkedPersonId?: string | null;
          localId?: string | null;
          localPathRef?: string | null;
          storageType?: string | null;
          updatedAt: string;
          userId: string;
          versionHistory?: Json | null;
          versionTag?: string | null;
        };
        Update: {
          cloudBackupConsent?: boolean;
          cloudId?: string | null;
          cloudStorageUrl?: string | null;
          createdAt?: string;
          docType?: string;
          expiryDate?: string | null;
          fileHash?: string | null;
          fileName?: string;
          id?: string;
          linkedEntityId?: string | null;
          linkedFamilyMemberId?: string | null;
          linkedPersonId?: string | null;
          localId?: string | null;
          localPathRef?: string | null;
          storageType?: string | null;
          updatedAt?: string;
          userId?: string;
          versionHistory?: Json | null;
          versionTag?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "document_meta_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      education: {
        Row: {
          certificateUrl: string | null;
          createdAt: string;
          degree: string;
          familyMemberId: string | null;
          id: string;
          institute: string;
          linkedLoanId: string | null;
          specialization: string | null;
          userId: string;
          yearCompleted: number | null;
        };
        Insert: {
          certificateUrl?: string | null;
          createdAt?: string;
          degree: string;
          familyMemberId?: string | null;
          id: string;
          institute: string;
          linkedLoanId?: string | null;
          specialization?: string | null;
          userId: string;
          yearCompleted?: number | null;
        };
        Update: {
          certificateUrl?: string | null;
          createdAt?: string;
          degree?: string;
          familyMemberId?: string | null;
          id?: string;
          institute?: string;
          linkedLoanId?: string | null;
          specialization?: string | null;
          userId?: string;
          yearCompleted?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "education_familyMemberId_fkey";
            columns: ["familyMemberId"];
            isOneToOne: false;
            referencedRelation: "family_members";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "education_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      email_verification_codes: {
        Row: {
          code: string;
          createdAt: string;
          expiresAt: string;
          id: string;
          purpose: string;
          userId: string;
        };
        Insert: {
          code: string;
          createdAt?: string;
          expiresAt: string;
          id: string;
          purpose: string;
          userId: string;
        };
        Update: {
          code?: string;
          createdAt?: string;
          expiresAt?: string;
          id?: string;
          purpose?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "email_verification_codes_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      expense_categories: {
        Row: {
          createdAt: string;
          emoji: string | null;
          id: string;
          isActive: boolean;
          name: string;
          userId: string;
        };
        Insert: {
          createdAt?: string;
          emoji?: string | null;
          id: string;
          isActive?: boolean;
          name: string;
          userId: string;
        };
        Update: {
          createdAt?: string;
          emoji?: string | null;
          id?: string;
          isActive?: boolean;
          name?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "expense_categories_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      expense_entries: {
        Row: {
          accountId: string | null;
          amount: number;
          category: string;
          createdAt: string;
          date: string;
          description: string | null;
          familyMemberId: string | null;
          frequency: string | null;
          id: string;
          isRecurring: boolean;
          mode: string | null;
          paidFromAccountId: string | null;
          userId: string;
        };
        Insert: {
          accountId?: string | null;
          amount: number;
          category: string;
          createdAt?: string;
          date?: string;
          description?: string | null;
          familyMemberId?: string | null;
          frequency?: string | null;
          id: string;
          isRecurring?: boolean;
          mode?: string | null;
          paidFromAccountId?: string | null;
          userId: string;
        };
        Update: {
          accountId?: string | null;
          amount?: number;
          category?: string;
          createdAt?: string;
          date?: string;
          description?: string | null;
          familyMemberId?: string | null;
          frequency?: string | null;
          id?: string;
          isRecurring?: boolean;
          mode?: string | null;
          paidFromAccountId?: string | null;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "expense_entries_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      family_members: {
        Row: {
          accessLevel: string;
          createdAt: string;
          dob: string | null;
          email: string | null;
          id: string;
          isDependent: boolean;
          name: string;
          nomineeEligible: boolean;
          phone: string | null;
          relation: string;
          updatedAt: string;
          userId: string;
        };
        Insert: {
          accessLevel?: string;
          createdAt?: string;
          dob?: string | null;
          email?: string | null;
          id: string;
          isDependent?: boolean;
          name: string;
          nomineeEligible?: boolean;
          phone?: string | null;
          relation: string;
          updatedAt: string;
          userId: string;
        };
        Update: {
          accessLevel?: string;
          createdAt?: string;
          dob?: string | null;
          email?: string | null;
          id?: string;
          isDependent?: boolean;
          name?: string;
          nomineeEligible?: boolean;
          phone?: string | null;
          relation?: string;
          updatedAt?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "family_members_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      faqs: {
        Row: {
          answer: string;
          category: string;
          createdAt: string;
          displayOrder: number;
          helpfulCount: number;
          id: string;
          language: string;
          linkedEntity: string | null;
          notHelpfulCount: number;
          question: string;
          updatedAt: string;
          viewCount: number;
          visibilityFlag: boolean;
        };
        Insert: {
          answer: string;
          category: string;
          createdAt?: string;
          displayOrder: number;
          helpfulCount?: number;
          id: string;
          language?: string;
          linkedEntity?: string | null;
          notHelpfulCount?: number;
          question: string;
          updatedAt: string;
          viewCount?: number;
          visibilityFlag?: boolean;
        };
        Update: {
          answer?: string;
          category?: string;
          createdAt?: string;
          displayOrder?: number;
          helpfulCount?: number;
          id?: string;
          language?: string;
          linkedEntity?: string | null;
          notHelpfulCount?: number;
          question?: string;
          updatedAt?: string;
          viewCount?: number;
          visibilityFlag?: boolean;
        };
        Relationships: [];
      };
      feature_flags: {
        Row: {
          cohortScope: string | null;
          createdAt: string;
          createdBy: string;
          dependsOnFlagId: string | null;
          description: string | null;
          enabled: boolean;
          endDate: string | null;
          geoScope: Json | null;
          id: string;
          name: string;
          personaScope: Json | null;
          startDate: string | null;
          updatedAt: string;
          updatedBy: string | null;
        };
        Insert: {
          cohortScope?: string | null;
          createdAt?: string;
          createdBy: string;
          dependsOnFlagId?: string | null;
          description?: string | null;
          enabled?: boolean;
          endDate?: string | null;
          geoScope?: Json | null;
          id: string;
          name: string;
          personaScope?: Json | null;
          startDate?: string | null;
          updatedAt: string;
          updatedBy?: string | null;
        };
        Update: {
          cohortScope?: string | null;
          createdAt?: string;
          createdBy?: string;
          dependsOnFlagId?: string | null;
          description?: string | null;
          enabled?: boolean;
          endDate?: string | null;
          geoScope?: Json | null;
          id?: string;
          name?: string;
          personaScope?: Json | null;
          startDate?: string | null;
          updatedAt?: string;
          updatedBy?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "feature_flags_createdBy_fkey";
            columns: ["createdBy"];
            isOneToOne: false;
            referencedRelation: "admin_users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "feature_flags_dependsOnFlagId_fkey";
            columns: ["dependsOnFlagId"];
            isOneToOne: false;
            referencedRelation: "feature_flags";
            referencedColumns: ["id"];
          },
        ];
      };
      field_mappings: {
        Row: {
          calculationDeps: Json | null;
          createdAt: string;
          databaseField: string;
          databaseTable: string;
          id: string;
          updatedAt: string;
          validationRule: Json | null;
        };
        Insert: {
          calculationDeps?: Json | null;
          createdAt?: string;
          databaseField: string;
          databaseTable: string;
          id: string;
          updatedAt: string;
          validationRule?: Json | null;
        };
        Update: {
          calculationDeps?: Json | null;
          createdAt?: string;
          databaseField?: string;
          databaseTable?: string;
          id?: string;
          updatedAt?: string;
          validationRule?: Json | null;
        };
        Relationships: [];
      };
      game_runs: {
        Row: {
          attemptNumber: number;
          completedAt: string | null;
          gameTemplate: string;
          id: string;
          pointsEarned: number;
          startedAt: string;
          status: string;
          submoduleId: string;
          userId: string;
        };
        Insert: {
          attemptNumber?: number;
          completedAt?: string | null;
          gameTemplate: string;
          id: string;
          pointsEarned?: number;
          startedAt?: string;
          status?: string;
          submoduleId: string;
          userId: string;
        };
        Update: {
          attemptNumber?: number;
          completedAt?: string | null;
          gameTemplate?: string;
          id?: string;
          pointsEarned?: number;
          startedAt?: string;
          status?: string;
          submoduleId?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "game_runs_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      gamification_state: {
        Row: {
          badgesEarned: Json | null;
          createdAt: string;
          currentStreak: number;
          id: string;
          lastActivityDate: string | null;
          longestStreak: number;
          rank: string;
          totalPoints: number;
          updatedAt: string;
          userId: string;
        };
        Insert: {
          badgesEarned?: Json | null;
          createdAt?: string;
          currentStreak?: number;
          id: string;
          lastActivityDate?: string | null;
          longestStreak?: number;
          rank?: string;
          totalPoints?: number;
          updatedAt: string;
          userId: string;
        };
        Update: {
          badgesEarned?: Json | null;
          createdAt?: string;
          currentStreak?: number;
          id?: string;
          lastActivityDate?: string | null;
          longestStreak?: number;
          rank?: string;
          totalPoints?: number;
          updatedAt?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "gamification_state_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      goals: {
        Row: {
          createdAt: string;
          currentSaved: number;
          id: string;
          name: string;
          priority: string;
          requiredMonthlySavings: number | null;
          status: string;
          targetAmount: number;
          targetDate: string;
          updatedAt: string;
          userId: string;
        };
        Insert: {
          createdAt?: string;
          currentSaved?: number;
          id: string;
          name: string;
          priority?: string;
          requiredMonthlySavings?: number | null;
          status?: string;
          targetAmount: number;
          targetDate: string;
          updatedAt: string;
          userId: string;
        };
        Update: {
          createdAt?: string;
          currentSaved?: number;
          id?: string;
          name?: string;
          priority?: string;
          requiredMonthlySavings?: number | null;
          status?: string;
          targetAmount?: number;
          targetDate?: string;
          updatedAt?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "goals_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      gst_records: {
        Row: {
          annualReturnFiled: boolean | null;
          businessName: string | null;
          createdAt: string;
          documentUrl: string | null;
          filingFrequency: string | null;
          gstin: string;
          gstr1Filed: boolean | null;
          gstr3bFiled: boolean | null;
          id: string;
          lastFilingDate: string | null;
          nextDueDate: string | null;
          notes: string | null;
          registrationType: string | null;
          status: string;
          updatedAt: string;
          userId: string;
        };
        Insert: {
          annualReturnFiled?: boolean | null;
          businessName?: string | null;
          createdAt?: string;
          documentUrl?: string | null;
          filingFrequency?: string | null;
          gstin: string;
          gstr1Filed?: boolean | null;
          gstr3bFiled?: boolean | null;
          id: string;
          lastFilingDate?: string | null;
          nextDueDate?: string | null;
          notes?: string | null;
          registrationType?: string | null;
          status?: string;
          updatedAt: string;
          userId: string;
        };
        Update: {
          annualReturnFiled?: boolean | null;
          businessName?: string | null;
          createdAt?: string;
          documentUrl?: string | null;
          filingFrequency?: string | null;
          gstin?: string;
          gstr1Filed?: boolean | null;
          gstr3bFiled?: boolean | null;
          id?: string;
          lastFilingDate?: string | null;
          nextDueDate?: string | null;
          notes?: string | null;
          registrationType?: string | null;
          status?: string;
          updatedAt?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "gst_records_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      identity_links: {
        Row: {
          createdAt: string;
          id: string;
          identityId: string;
          linkedType: string;
          linkedValue: string;
          serviceName: string | null;
          userId: string;
        };
        Insert: {
          createdAt?: string;
          id: string;
          identityId: string;
          linkedType: string;
          linkedValue: string;
          serviceName?: string | null;
          userId: string;
        };
        Update: {
          createdAt?: string;
          id?: string;
          identityId?: string;
          linkedType?: string;
          linkedValue?: string;
          serviceName?: string | null;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "identity_links_identityId_fkey";
            columns: ["identityId"];
            isOneToOne: false;
            referencedRelation: "identity_records";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "identity_links_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      identity_records: {
        Row: {
          createdAt: string;
          dobOnDoc: string | null;
          expiryDate: string | null;
          familyMemberId: string | null;
          id: string;
          idType: string;
          issuedDate: string | null;
          nameOnDoc: string | null;
          numberFull: string | null;
          numberMasked: string;
          placeOfIssue: string | null;
          updatedAt: string;
          userId: string;
          vaultFileId: string | null;
        };
        Insert: {
          createdAt?: string;
          dobOnDoc?: string | null;
          expiryDate?: string | null;
          familyMemberId?: string | null;
          id: string;
          idType: string;
          issuedDate?: string | null;
          nameOnDoc?: string | null;
          numberFull?: string | null;
          numberMasked: string;
          placeOfIssue?: string | null;
          updatedAt: string;
          userId: string;
          vaultFileId?: string | null;
        };
        Update: {
          createdAt?: string;
          dobOnDoc?: string | null;
          expiryDate?: string | null;
          familyMemberId?: string | null;
          id?: string;
          idType?: string;
          issuedDate?: string | null;
          nameOnDoc?: string | null;
          numberFull?: string | null;
          numberMasked?: string;
          placeOfIssue?: string | null;
          updatedAt?: string;
          userId?: string;
          vaultFileId?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "identity_records_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      iks_assets: {
        Row: {
          assetType: Database["public"]["Enums"]["AssetType"];
          createdAt: string;
          fileName: string;
          fileUrl: string;
          id: string;
          language: string | null;
          moduleScope: string | null;
          updatedAt: string;
          version: number;
          visibilityFlag: boolean;
        };
        Insert: {
          assetType: Database["public"]["Enums"]["AssetType"];
          createdAt?: string;
          fileName: string;
          fileUrl: string;
          id: string;
          language?: string | null;
          moduleScope?: string | null;
          updatedAt: string;
          version?: number;
          visibilityFlag?: boolean;
        };
        Update: {
          assetType?: Database["public"]["Enums"]["AssetType"];
          createdAt?: string;
          fileName?: string;
          fileUrl?: string;
          id?: string;
          language?: string | null;
          moduleScope?: string | null;
          updatedAt?: string;
          version?: number;
          visibilityFlag?: boolean;
        };
        Relationships: [];
      };
      income_streams: {
        Row: {
          allocationMonths: number | null;
          amountGross: number;
          amountNet: number;
          createdAt: string;
          creditedAccountId: string | null;
          deductions: number;
          description: string | null;
          expectedGrowthPct: number | null;
          familyMemberId: string | null;
          frequency: string;
          historicalIncome: Json | null;
          id: string;
          isPrimary: boolean;
          lastReviewedAt: string | null;
          notes: string | null;
          riskLevel: string | null;
          source: string | null;
          tdsAmount: number | null;
          type: string;
          updatedAt: string;
          userId: string;
        };
        Insert: {
          allocationMonths?: number | null;
          amountGross: number;
          amountNet: number;
          createdAt?: string;
          creditedAccountId?: string | null;
          deductions?: number;
          description?: string | null;
          expectedGrowthPct?: number | null;
          familyMemberId?: string | null;
          frequency?: string;
          historicalIncome?: Json | null;
          id: string;
          isPrimary?: boolean;
          lastReviewedAt?: string | null;
          notes?: string | null;
          riskLevel?: string | null;
          source?: string | null;
          tdsAmount?: number | null;
          type: string;
          updatedAt: string;
          userId: string;
        };
        Update: {
          allocationMonths?: number | null;
          amountGross?: number;
          amountNet?: number;
          createdAt?: string;
          creditedAccountId?: string | null;
          deductions?: number;
          description?: string | null;
          expectedGrowthPct?: number | null;
          familyMemberId?: string | null;
          frequency?: string;
          historicalIncome?: Json | null;
          id?: string;
          isPrimary?: boolean;
          lastReviewedAt?: string | null;
          notes?: string | null;
          riskLevel?: string | null;
          source?: string | null;
          tdsAmount?: number | null;
          type?: string;
          updatedAt?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "income_streams_creditedAccountId_fkey";
            columns: ["creditedAccountId"];
            isOneToOne: false;
            referencedRelation: "bank_accounts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "income_streams_familyMemberId_fkey";
            columns: ["familyMemberId"];
            isOneToOne: false;
            referencedRelation: "family_members";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "income_streams_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      insurance_coverage: {
        Row: {
          id: string;
          memberId: string;
          policyId: string;
        };
        Insert: {
          id: string;
          memberId: string;
          policyId: string;
        };
        Update: {
          id?: string;
          memberId?: string;
          policyId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "insurance_coverage_memberId_fkey";
            columns: ["memberId"];
            isOneToOne: false;
            referencedRelation: "family_members";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "insurance_coverage_policyId_fkey";
            columns: ["policyId"];
            isOneToOne: false;
            referencedRelation: "insurance_policies";
            referencedColumns: ["id"];
          },
        ];
      };
      insurance_policies: {
        Row: {
          agentContact: string | null;
          createdAt: string;
          documentId: string | null;
          dueDate: string;
          id: string;
          insurerName: string | null;
          maturityDate: string | null;
          nomineeId: string | null;
          policyNumber: string;
          premium: number;
          premiumFrequency: string;
          reminderId: string | null;
          status: string;
          sumAssured: number;
          type: string;
          updatedAt: string;
          userId: string;
        };
        Insert: {
          agentContact?: string | null;
          createdAt?: string;
          documentId?: string | null;
          dueDate: string;
          id: string;
          insurerName?: string | null;
          maturityDate?: string | null;
          nomineeId?: string | null;
          policyNumber: string;
          premium: number;
          premiumFrequency?: string;
          reminderId?: string | null;
          status?: string;
          sumAssured: number;
          type: string;
          updatedAt: string;
          userId: string;
        };
        Update: {
          agentContact?: string | null;
          createdAt?: string;
          documentId?: string | null;
          dueDate?: string;
          id?: string;
          insurerName?: string | null;
          maturityDate?: string | null;
          nomineeId?: string | null;
          policyNumber?: string;
          premium?: number;
          premiumFrequency?: string;
          reminderId?: string | null;
          status?: string;
          sumAssured?: number;
          type?: string;
          updatedAt?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "insurance_policies_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      investment_holdings: {
        Row: {
          createdAt: string;
          currentValue: number | null;
          id: string;
          investedAmount: number;
          linkedGoalId: string | null;
          lockInPeriod: number | null;
          maturityDate: string | null;
          name: string | null;
          riskLevel: string | null;
          type: string;
          updatedAt: string;
          userId: string;
        };
        Insert: {
          createdAt?: string;
          currentValue?: number | null;
          id: string;
          investedAmount: number;
          linkedGoalId?: string | null;
          lockInPeriod?: number | null;
          maturityDate?: string | null;
          name?: string | null;
          riskLevel?: string | null;
          type: string;
          updatedAt: string;
          userId: string;
        };
        Update: {
          createdAt?: string;
          currentValue?: number | null;
          id?: string;
          investedAmount?: number;
          linkedGoalId?: string | null;
          lockInPeriod?: number | null;
          maturityDate?: string | null;
          name?: string | null;
          riskLevel?: string | null;
          type?: string;
          updatedAt?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "investment_holdings_linkedGoalId_fkey";
            columns: ["linkedGoalId"];
            isOneToOne: false;
            referencedRelation: "goals";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "investment_holdings_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      loan_accounts: {
        Row: {
          coBorrowerId: string | null;
          createdAt: string;
          documentId: string | null;
          emi: number;
          endDate: string | null;
          id: string;
          interestRate: number;
          lenderName: string | null;
          linkedPropertyId: string | null;
          outstandingAmount: number;
          paidFromAccountId: string | null;
          principal: number;
          startDate: string;
          status: string;
          tenure: number;
          type: string;
          updatedAt: string;
          userId: string;
        };
        Insert: {
          coBorrowerId?: string | null;
          createdAt?: string;
          documentId?: string | null;
          emi: number;
          endDate?: string | null;
          id: string;
          interestRate: number;
          lenderName?: string | null;
          linkedPropertyId?: string | null;
          outstandingAmount: number;
          paidFromAccountId?: string | null;
          principal: number;
          startDate: string;
          status?: string;
          tenure: number;
          type: string;
          updatedAt: string;
          userId: string;
        };
        Update: {
          coBorrowerId?: string | null;
          createdAt?: string;
          documentId?: string | null;
          emi?: number;
          endDate?: string | null;
          id?: string;
          interestRate?: number;
          lenderName?: string | null;
          linkedPropertyId?: string | null;
          outstandingAmount?: number;
          paidFromAccountId?: string | null;
          principal?: number;
          startDate?: string;
          status?: string;
          tenure?: number;
          type?: string;
          updatedAt?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "loan_accounts_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      module_access_permissions: {
        Row: {
          adminUserId: string;
          granted: boolean;
          grantedAt: string;
          grantedBy: string | null;
          id: string;
          moduleCode: string;
        };
        Insert: {
          adminUserId: string;
          granted?: boolean;
          grantedAt?: string;
          grantedBy?: string | null;
          id: string;
          moduleCode: string;
        };
        Update: {
          adminUserId?: string;
          granted?: boolean;
          grantedAt?: string;
          grantedBy?: string | null;
          id?: string;
          moduleCode?: string;
        };
        Relationships: [
          {
            foreignKeyName: "module_access_permissions_adminUserId_fkey";
            columns: ["adminUserId"];
            isOneToOne: false;
            referencedRelation: "admin_users";
            referencedColumns: ["id"];
          },
        ];
      };
      modules: {
        Row: {
          code: string;
          createdAt: string;
          description: string | null;
          displayOrder: number;
          featureFlagId: string | null;
          iconRef: string | null;
          id: string;
          isMvp: boolean;
          name: string;
          nameHindi: string | null;
          updatedAt: string;
          updatedBy: string | null;
          visibilityStatus: Database["public"]["Enums"]["ContentStatus"];
          zoneType: Database["public"]["Enums"]["ZoneType"];
        };
        Insert: {
          code: string;
          createdAt?: string;
          description?: string | null;
          displayOrder: number;
          featureFlagId?: string | null;
          iconRef?: string | null;
          id: string;
          isMvp?: boolean;
          name: string;
          nameHindi?: string | null;
          updatedAt: string;
          updatedBy?: string | null;
          visibilityStatus?: Database["public"]["Enums"]["ContentStatus"];
          zoneType: Database["public"]["Enums"]["ZoneType"];
        };
        Update: {
          code?: string;
          createdAt?: string;
          description?: string | null;
          displayOrder?: number;
          featureFlagId?: string | null;
          iconRef?: string | null;
          id?: string;
          isMvp?: boolean;
          name?: string;
          nameHindi?: string | null;
          updatedAt?: string;
          updatedBy?: string | null;
          visibilityStatus?: Database["public"]["Enums"]["ContentStatus"];
          zoneType?: Database["public"]["Enums"]["ZoneType"];
        };
        Relationships: [
          {
            foreignKeyName: "modules_updatedBy_fkey";
            columns: ["updatedBy"];
            isOneToOne: false;
            referencedRelation: "admin_users";
            referencedColumns: ["id"];
          },
        ];
      };
      monthly_analytics: {
        Row: {
          avgStabilityScore: number | null;
          calculatedAt: string;
          id: string;
          mau: number;
          month: string;
          productHealthScore: number | null;
          retention30Day: number | null;
          retention60Day: number | null;
          retention90Day: number | null;
        };
        Insert: {
          avgStabilityScore?: number | null;
          calculatedAt?: string;
          id: string;
          mau?: number;
          month: string;
          productHealthScore?: number | null;
          retention30Day?: number | null;
          retention60Day?: number | null;
          retention90Day?: number | null;
        };
        Update: {
          avgStabilityScore?: number | null;
          calculatedAt?: string;
          id?: string;
          mau?: number;
          month?: string;
          productHealthScore?: number | null;
          retention30Day?: number | null;
          retention60Day?: number | null;
          retention90Day?: number | null;
        };
        Relationships: [];
      };
      nominee_mapping: {
        Row: {
          assetRef: string;
          assetType: string;
          confirmed: boolean;
          createdAt: string;
          id: string;
          nomineeId: string;
          proofDocLinked: boolean;
          sharePercent: number;
          updatedAt: string;
          userId: string;
        };
        Insert: {
          assetRef: string;
          assetType: string;
          confirmed?: boolean;
          createdAt?: string;
          id: string;
          nomineeId: string;
          proofDocLinked?: boolean;
          sharePercent?: number;
          updatedAt: string;
          userId: string;
        };
        Update: {
          assetRef?: string;
          assetType?: string;
          confirmed?: boolean;
          createdAt?: string;
          id?: string;
          nomineeId?: string;
          proofDocLinked?: boolean;
          sharePercent?: number;
          updatedAt?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "nominee_mapping_nomineeId_fkey";
            columns: ["nomineeId"];
            isOneToOne: false;
            referencedRelation: "family_members";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "nominee_mapping_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      notification_templates: {
        Row: {
          bodyTemplate: string;
          channel: Database["public"]["Enums"]["NotifChannel"];
          createdAt: string;
          id: string;
          language: string;
          name: string;
          personaScope: Json | null;
          subject: string | null;
          triggerEvent: string;
          updatedAt: string;
          visibilityStatus: Database["public"]["Enums"]["ContentStatus"];
        };
        Insert: {
          bodyTemplate: string;
          channel: Database["public"]["Enums"]["NotifChannel"];
          createdAt?: string;
          id: string;
          language?: string;
          name: string;
          personaScope?: Json | null;
          subject?: string | null;
          triggerEvent: string;
          updatedAt: string;
          visibilityStatus?: Database["public"]["Enums"]["ContentStatus"];
        };
        Update: {
          bodyTemplate?: string;
          channel?: Database["public"]["Enums"]["NotifChannel"];
          createdAt?: string;
          id?: string;
          language?: string;
          name?: string;
          personaScope?: Json | null;
          subject?: string | null;
          triggerEvent?: string;
          updatedAt?: string;
          visibilityStatus?: Database["public"]["Enums"]["ContentStatus"];
        };
        Relationships: [];
      };
      notifications: {
        Row: {
          body: string;
          channel: Database["public"]["Enums"]["NotifChannel"];
          clickedAt: string | null;
          createdAt: string;
          deliveredAt: string | null;
          id: string;
          link: string | null;
          openedAt: string | null;
          sentAt: string | null;
          status: Database["public"]["Enums"]["NotifStatus"];
          subject: string | null;
          templateId: string | null;
          userId: string;
        };
        Insert: {
          body: string;
          channel: Database["public"]["Enums"]["NotifChannel"];
          clickedAt?: string | null;
          createdAt?: string;
          deliveredAt?: string | null;
          id: string;
          link?: string | null;
          openedAt?: string | null;
          sentAt?: string | null;
          status?: Database["public"]["Enums"]["NotifStatus"];
          subject?: string | null;
          templateId?: string | null;
          userId: string;
        };
        Update: {
          body?: string;
          channel?: Database["public"]["Enums"]["NotifChannel"];
          clickedAt?: string | null;
          createdAt?: string;
          deliveredAt?: string | null;
          id?: string;
          link?: string | null;
          openedAt?: string | null;
          sentAt?: string | null;
          status?: Database["public"]["Enums"]["NotifStatus"];
          subject?: string | null;
          templateId?: string | null;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "notifications_templateId_fkey";
            columns: ["templateId"];
            isOneToOne: false;
            referencedRelation: "notification_templates";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "notifications_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      property_assets: {
        Row: {
          address: string | null;
          annualCosts: number | null;
          coOwners: Json | null;
          createdAt: string;
          currentValue: number | null;
          id: string;
          linkedLoanId: string | null;
          ownContribution: number | null;
          ownershipType: string;
          propertyTax: number | null;
          purchaseAmount: number | null;
          purchaseDate: string | null;
          rentalIncome: number | null;
          secretFieldId: string | null;
          type: string;
          updatedAt: string;
          userId: string;
          vacancyMonths: number;
          vaultFileIds: Json | null;
        };
        Insert: {
          address?: string | null;
          annualCosts?: number | null;
          coOwners?: Json | null;
          createdAt?: string;
          currentValue?: number | null;
          id: string;
          linkedLoanId?: string | null;
          ownContribution?: number | null;
          ownershipType: string;
          propertyTax?: number | null;
          purchaseAmount?: number | null;
          purchaseDate?: string | null;
          rentalIncome?: number | null;
          secretFieldId?: string | null;
          type: string;
          updatedAt: string;
          userId: string;
          vacancyMonths?: number;
          vaultFileIds?: Json | null;
        };
        Update: {
          address?: string | null;
          annualCosts?: number | null;
          coOwners?: Json | null;
          createdAt?: string;
          currentValue?: number | null;
          id?: string;
          linkedLoanId?: string | null;
          ownContribution?: number | null;
          ownershipType?: string;
          propertyTax?: number | null;
          purchaseAmount?: number | null;
          purchaseDate?: string | null;
          rentalIncome?: number | null;
          secretFieldId?: string | null;
          type?: string;
          updatedAt?: string;
          userId?: string;
          vacancyMonths?: number;
          vaultFileIds?: Json | null;
        };
        Relationships: [
          {
            foreignKeyName: "property_assets_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      questions: {
        Row: {
          createdAt: string;
          createdBy: string;
          displayOrder: number;
          explanationText: string | null;
          fieldMappingId: string | null;
          id: string;
          language: string;
          personaScope: Json | null;
          questionText: string;
          questionType: Database["public"]["Enums"]["QuestionType"];
          required: boolean;
          scoringWeight: number;
          submoduleId: string;
          updatedAt: string;
          updatedBy: string | null;
          version: number;
          visibilityStatus: Database["public"]["Enums"]["ContentStatus"];
        };
        Insert: {
          createdAt?: string;
          createdBy: string;
          displayOrder: number;
          explanationText?: string | null;
          fieldMappingId?: string | null;
          id: string;
          language?: string;
          personaScope?: Json | null;
          questionText: string;
          questionType: Database["public"]["Enums"]["QuestionType"];
          required?: boolean;
          scoringWeight?: number;
          submoduleId: string;
          updatedAt: string;
          updatedBy?: string | null;
          version?: number;
          visibilityStatus?: Database["public"]["Enums"]["ContentStatus"];
        };
        Update: {
          createdAt?: string;
          createdBy?: string;
          displayOrder?: number;
          explanationText?: string | null;
          fieldMappingId?: string | null;
          id?: string;
          language?: string;
          personaScope?: Json | null;
          questionText?: string;
          questionType?: Database["public"]["Enums"]["QuestionType"];
          required?: boolean;
          scoringWeight?: number;
          submoduleId?: string;
          updatedAt?: string;
          updatedBy?: string | null;
          version?: number;
          visibilityStatus?: Database["public"]["Enums"]["ContentStatus"];
        };
        Relationships: [
          {
            foreignKeyName: "questions_createdBy_fkey";
            columns: ["createdBy"];
            isOneToOne: false;
            referencedRelation: "admin_users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "questions_fieldMappingId_fkey";
            columns: ["fieldMappingId"];
            isOneToOne: false;
            referencedRelation: "field_mappings";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "questions_submoduleId_fkey";
            columns: ["submoduleId"];
            isOneToOne: false;
            referencedRelation: "submodules";
            referencedColumns: ["id"];
          },
        ];
      };
      quiz_answers: {
        Row: {
          answeredAt: string;
          answerValue: Json;
          attemptNumber: number;
          id: string;
          questionId: string;
          userId: string;
        };
        Insert: {
          answeredAt?: string;
          answerValue: Json;
          attemptNumber?: number;
          id: string;
          questionId: string;
          userId: string;
        };
        Update: {
          answeredAt?: string;
          answerValue?: Json;
          attemptNumber?: number;
          id?: string;
          questionId?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "quiz_answers_questionId_fkey";
            columns: ["questionId"];
            isOneToOne: false;
            referencedRelation: "questions";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "quiz_answers_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      rajya_scores: {
        Row: {
          calculatedAt: string;
          durgScore: number | null;
          goalsScore: number | null;
          id: string;
          koshScore: number | null;
          mitraScore: number | null;
          nextActions: Json | null;
          overallScore: number;
          previousScore: number | null;
          rakshaScore: number | null;
          rank: string;
          rinScore: number | null;
          riskFlags: Json | null;
          trend: string | null;
          userId: string;
          vyayaScore: number | null;
        };
        Insert: {
          calculatedAt?: string;
          durgScore?: number | null;
          goalsScore?: number | null;
          id: string;
          koshScore?: number | null;
          mitraScore?: number | null;
          nextActions?: Json | null;
          overallScore: number;
          previousScore?: number | null;
          rakshaScore?: number | null;
          rank: string;
          rinScore?: number | null;
          riskFlags?: Json | null;
          trend?: string | null;
          userId: string;
          vyayaScore?: number | null;
        };
        Update: {
          calculatedAt?: string;
          durgScore?: number | null;
          goalsScore?: number | null;
          id?: string;
          koshScore?: number | null;
          mitraScore?: number | null;
          nextActions?: Json | null;
          overallScore?: number;
          previousScore?: number | null;
          rakshaScore?: number | null;
          rank?: string;
          rinScore?: number | null;
          riskFlags?: Json | null;
          trend?: string | null;
          userId?: string;
          vyayaScore?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "rajya_scores_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      reminders: {
        Row: {
          channel: string;
          createdAt: string;
          id: string;
          leadTime: number;
          linkedEntityId: string | null;
          message: string | null;
          priority: string;
          sentAt: string | null;
          status: string;
          targetDate: string;
          type: string;
          userId: string;
        };
        Insert: {
          channel?: string;
          createdAt?: string;
          id: string;
          leadTime?: number;
          linkedEntityId?: string | null;
          message?: string | null;
          priority?: string;
          sentAt?: string | null;
          status?: string;
          targetDate: string;
          type: string;
          userId: string;
        };
        Update: {
          channel?: string;
          createdAt?: string;
          id?: string;
          leadTime?: number;
          linkedEntityId?: string | null;
          message?: string | null;
          priority?: string;
          sentAt?: string | null;
          status?: string;
          targetDate?: string;
          type?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "reminders_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      scheduled_reports: {
        Row: {
          createdAt: string;
          createdBy: string;
          format: string;
          frequency: Database["public"]["Enums"]["ReportFrequency"];
          id: string;
          isActive: boolean;
          lastRunAt: string | null;
          nextRunAt: string;
          recipients: Json;
          reportType: Database["public"]["Enums"]["ReportType"];
        };
        Insert: {
          createdAt?: string;
          createdBy: string;
          format?: string;
          frequency: Database["public"]["Enums"]["ReportFrequency"];
          id: string;
          isActive?: boolean;
          lastRunAt?: string | null;
          nextRunAt: string;
          recipients: Json;
          reportType: Database["public"]["Enums"]["ReportType"];
        };
        Update: {
          createdAt?: string;
          createdBy?: string;
          format?: string;
          frequency?: Database["public"]["Enums"]["ReportFrequency"];
          id?: string;
          isActive?: boolean;
          lastRunAt?: string | null;
          nextRunAt?: string;
          recipients?: Json;
          reportType?: Database["public"]["Enums"]["ReportType"];
        };
        Relationships: [
          {
            foreignKeyName: "scheduled_reports_createdBy_fkey";
            columns: ["createdBy"];
            isOneToOne: false;
            referencedRelation: "admin_users";
            referencedColumns: ["id"];
          },
        ];
      };
      submodules: {
        Row: {
          adhyayaTitle: string | null;
          code: string;
          completionRules: Json | null;
          createdAt: string;
          displayOrder: number;
          fieldCount: number;
          gameCount: number;
          gameTemplateType: string | null;
          id: string;
          moduleId: string;
          name: string;
          nameHindi: string | null;
          tutorialCount: number;
          updatedAt: string;
          visibilityStatus: Database["public"]["Enums"]["ContentStatus"];
        };
        Insert: {
          adhyayaTitle?: string | null;
          code: string;
          completionRules?: Json | null;
          createdAt?: string;
          displayOrder: number;
          fieldCount?: number;
          gameCount?: number;
          gameTemplateType?: string | null;
          id: string;
          moduleId: string;
          name: string;
          nameHindi?: string | null;
          tutorialCount?: number;
          updatedAt: string;
          visibilityStatus?: Database["public"]["Enums"]["ContentStatus"];
        };
        Update: {
          adhyayaTitle?: string | null;
          code?: string;
          completionRules?: Json | null;
          createdAt?: string;
          displayOrder?: number;
          fieldCount?: number;
          gameCount?: number;
          gameTemplateType?: string | null;
          id?: string;
          moduleId?: string;
          name?: string;
          nameHindi?: string | null;
          tutorialCount?: number;
          updatedAt?: string;
          visibilityStatus?: Database["public"]["Enums"]["ContentStatus"];
        };
        Relationships: [
          {
            foreignKeyName: "submodules_moduleId_fkey";
            columns: ["moduleId"];
            isOneToOne: false;
            referencedRelation: "modules";
            referencedColumns: ["id"];
          },
        ];
      };
      subscription_analytics: {
        Row: {
          activeSubscriptions: number;
          cancelledThisYear: number;
          id: string;
          leakageScore: number | null;
          monthlySpend: number;
          totalSubscriptions: number;
          unusedSubscriptions: number;
          updatedAt: string;
          userId: string;
          yearlySpend: number;
        };
        Insert: {
          activeSubscriptions?: number;
          cancelledThisYear?: number;
          id: string;
          leakageScore?: number | null;
          monthlySpend?: number;
          totalSubscriptions?: number;
          unusedSubscriptions?: number;
          updatedAt: string;
          userId: string;
          yearlySpend?: number;
        };
        Update: {
          activeSubscriptions?: number;
          cancelledThisYear?: number;
          id?: string;
          leakageScore?: number | null;
          monthlySpend?: number;
          totalSubscriptions?: number;
          unusedSubscriptions?: number;
          updatedAt?: string;
          userId?: string;
          yearlySpend?: number;
        };
        Relationships: [
          {
            foreignKeyName: "subscription_analytics_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      subscriptions: {
        Row: {
          amount: number;
          autoDebit: boolean;
          billingCycle: Database["public"]["Enums"]["BillingCycle"];
          cancelReminder: boolean;
          category: string;
          createdAt: string;
          customCategoryId: string | null;
          endDate: string | null;
          id: string;
          isEssential: boolean | null;
          lastUsedDate: string | null;
          linkedBankAccountId: string | null;
          name: string;
          notes: string | null;
          paymentMethod: string | null;
          provider: string | null;
          renewalDate: string;
          startDate: string | null;
          status: Database["public"]["Enums"]["SubscriptionStatus"];
          updatedAt: string;
          usageFrequency: Database["public"]["Enums"]["UsageFrequency"] | null;
          userId: string;
        };
        Insert: {
          amount: number;
          autoDebit?: boolean;
          billingCycle?: Database["public"]["Enums"]["BillingCycle"];
          cancelReminder?: boolean;
          category: string;
          createdAt?: string;
          customCategoryId?: string | null;
          endDate?: string | null;
          id: string;
          isEssential?: boolean | null;
          lastUsedDate?: string | null;
          linkedBankAccountId?: string | null;
          name: string;
          notes?: string | null;
          paymentMethod?: string | null;
          provider?: string | null;
          renewalDate: string;
          startDate?: string | null;
          status?: Database["public"]["Enums"]["SubscriptionStatus"];
          updatedAt: string;
          usageFrequency?: Database["public"]["Enums"]["UsageFrequency"] | null;
          userId: string;
        };
        Update: {
          amount?: number;
          autoDebit?: boolean;
          billingCycle?: Database["public"]["Enums"]["BillingCycle"];
          cancelReminder?: boolean;
          category?: string;
          createdAt?: string;
          customCategoryId?: string | null;
          endDate?: string | null;
          id?: string;
          isEssential?: boolean | null;
          lastUsedDate?: string | null;
          linkedBankAccountId?: string | null;
          name?: string;
          notes?: string | null;
          paymentMethod?: string | null;
          provider?: string | null;
          renewalDate?: string;
          startDate?: string | null;
          status?: Database["public"]["Enums"]["SubscriptionStatus"];
          updatedAt?: string;
          usageFrequency?: Database["public"]["Enums"]["UsageFrequency"] | null;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "subscriptions_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      succession_emergency: {
        Row: {
          activationWaitingPeriod: number;
          assetAccessScope: Json | null;
          emergencyContactName: string | null;
          emergencyContactPhone: string | null;
          id: string;
          lastUpdated: string;
          secondaryContactName: string | null;
          secondaryContactPhone: string | null;
          userId: string;
          verificationMethod: string | null;
        };
        Insert: {
          activationWaitingPeriod?: number;
          assetAccessScope?: Json | null;
          emergencyContactName?: string | null;
          emergencyContactPhone?: string | null;
          id: string;
          lastUpdated?: string;
          secondaryContactName?: string | null;
          secondaryContactPhone?: string | null;
          userId: string;
          verificationMethod?: string | null;
        };
        Update: {
          activationWaitingPeriod?: number;
          assetAccessScope?: Json | null;
          emergencyContactName?: string | null;
          emergencyContactPhone?: string | null;
          id?: string;
          lastUpdated?: string;
          secondaryContactName?: string | null;
          secondaryContactPhone?: string | null;
          userId?: string;
          verificationMethod?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "succession_emergency_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      succession_nominees: {
        Row: {
          assetId: string;
          assetType: string;
          createdAt: string;
          id: string;
          nomineeId: string;
          nomineeName: string;
          relationship: string;
          sharePercentage: number;
          updatedAt: string;
          userId: string;
        };
        Insert: {
          assetId: string;
          assetType: string;
          createdAt?: string;
          id: string;
          nomineeId: string;
          nomineeName: string;
          relationship: string;
          sharePercentage?: number;
          updatedAt: string;
          userId: string;
        };
        Update: {
          assetId?: string;
          assetType?: string;
          createdAt?: string;
          id?: string;
          nomineeId?: string;
          nomineeName?: string;
          relationship?: string;
          sharePercentage?: number;
          updatedAt?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "succession_nominees_nomineeId_fkey";
            columns: ["nomineeId"];
            isOneToOne: false;
            referencedRelation: "family_members";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "succession_nominees_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      succession_wills: {
        Row: {
          cloudConsent: boolean;
          createdAt: string;
          dateOfWill: string | null;
          digitalCopyUrl: string | null;
          executorContact: string | null;
          executorName: string | null;
          id: string;
          registered: boolean;
          secretHint: string | null;
          storageLocation: string | null;
          updatedAt: string;
          userId: string;
          willExists: boolean;
          witnessNames: Json | null;
        };
        Insert: {
          cloudConsent?: boolean;
          createdAt?: string;
          dateOfWill?: string | null;
          digitalCopyUrl?: string | null;
          executorContact?: string | null;
          executorName?: string | null;
          id: string;
          registered?: boolean;
          secretHint?: string | null;
          storageLocation?: string | null;
          updatedAt: string;
          userId: string;
          willExists?: boolean;
          witnessNames?: Json | null;
        };
        Update: {
          cloudConsent?: boolean;
          createdAt?: string;
          dateOfWill?: string | null;
          digitalCopyUrl?: string | null;
          executorContact?: string | null;
          executorName?: string | null;
          id?: string;
          registered?: boolean;
          secretHint?: string | null;
          storageLocation?: string | null;
          updatedAt?: string;
          userId?: string;
          willExists?: boolean;
          witnessNames?: Json | null;
        };
        Relationships: [
          {
            foreignKeyName: "succession_wills_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      support_tickets: {
        Row: {
          appVersion: string | null;
          assignedTo: string | null;
          category: Database["public"]["Enums"]["TicketCategory"];
          createdAt: string;
          description: string;
          deviceInfo: Json | null;
          id: string;
          internalNotes: string | null;
          priority: Database["public"]["Enums"]["TicketPriority"];
          resolvedAt: string | null;
          screenshots: Json | null;
          status: Database["public"]["Enums"]["TicketStatus"];
          subject: string;
          updatedAt: string;
          userId: string;
          userSatisfaction: number | null;
        };
        Insert: {
          appVersion?: string | null;
          assignedTo?: string | null;
          category: Database["public"]["Enums"]["TicketCategory"];
          createdAt?: string;
          description: string;
          deviceInfo?: Json | null;
          id: string;
          internalNotes?: string | null;
          priority?: Database["public"]["Enums"]["TicketPriority"];
          resolvedAt?: string | null;
          screenshots?: Json | null;
          status?: Database["public"]["Enums"]["TicketStatus"];
          subject: string;
          updatedAt: string;
          userId: string;
          userSatisfaction?: number | null;
        };
        Update: {
          appVersion?: string | null;
          assignedTo?: string | null;
          category?: Database["public"]["Enums"]["TicketCategory"];
          createdAt?: string;
          description?: string;
          deviceInfo?: Json | null;
          id?: string;
          internalNotes?: string | null;
          priority?: Database["public"]["Enums"]["TicketPriority"];
          resolvedAt?: string | null;
          screenshots?: Json | null;
          status?: Database["public"]["Enums"]["TicketStatus"];
          subject?: string;
          updatedAt?: string;
          userId?: string;
          userSatisfaction?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "support_tickets_assignedTo_fkey";
            columns: ["assignedTo"];
            isOneToOne: false;
            referencedRelation: "admin_users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "support_tickets_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      system_parameters: {
        Row: {
          category: string | null;
          createdAt: string;
          description: string | null;
          id: string;
          key: string;
          updatedAt: string;
          updatedBy: string | null;
          value: string;
          valueType: Database["public"]["Enums"]["ParamType"];
          version: number;
        };
        Insert: {
          category?: string | null;
          createdAt?: string;
          description?: string | null;
          id: string;
          key: string;
          updatedAt: string;
          updatedBy?: string | null;
          value: string;
          valueType?: Database["public"]["Enums"]["ParamType"];
          version?: number;
        };
        Update: {
          category?: string | null;
          createdAt?: string;
          description?: string | null;
          id?: string;
          key?: string;
          updatedAt?: string;
          updatedBy?: string | null;
          value?: string;
          valueType?: Database["public"]["Enums"]["ParamType"];
          version?: number;
        };
        Relationships: [
          {
            foreignKeyName: "system_parameters_updatedBy_fkey";
            columns: ["updatedBy"];
            isOneToOne: false;
            referencedRelation: "admin_users";
            referencedColumns: ["id"];
          },
        ];
      };
      system_settings: {
        Row: {
          description: string | null;
          id: string;
          key: string;
          updatedAt: string;
          value: string;
        };
        Insert: {
          description?: string | null;
          id: string;
          key: string;
          updatedAt: string;
          value: string;
        };
        Update: {
          description?: string | null;
          id?: string;
          key?: string;
          updatedAt?: string;
          value?: string;
        };
        Relationships: [];
      };
      tax_records: {
        Row: {
          acknowledgementNumber: string | null;
          assessmentYear: string;
          createdAt: string;
          documentUrl: string | null;
          filingDate: string | null;
          filingType: string | null;
          financialYear: string;
          grossIncome: number | null;
          id: string;
          notes: string | null;
          status: string;
          taxableIncome: number | null;
          taxDue: number | null;
          taxPaid: number | null;
          updatedAt: string;
          userId: string;
        };
        Insert: {
          acknowledgementNumber?: string | null;
          assessmentYear: string;
          createdAt?: string;
          documentUrl?: string | null;
          filingDate?: string | null;
          filingType?: string | null;
          financialYear: string;
          grossIncome?: number | null;
          id: string;
          notes?: string | null;
          status?: string;
          taxableIncome?: number | null;
          taxDue?: number | null;
          taxPaid?: number | null;
          updatedAt: string;
          userId: string;
        };
        Update: {
          acknowledgementNumber?: string | null;
          assessmentYear?: string;
          createdAt?: string;
          documentUrl?: string | null;
          filingDate?: string | null;
          filingType?: string | null;
          financialYear?: string;
          grossIncome?: number | null;
          id?: string;
          notes?: string | null;
          status?: string;
          taxableIncome?: number | null;
          taxDue?: number | null;
          taxPaid?: number | null;
          updatedAt?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "tax_records_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      ticket_responses: {
        Row: {
          createdAt: string;
          id: string;
          isInternal: boolean;
          message: string;
          responderId: string | null;
          responderType: string;
          ticketId: string;
        };
        Insert: {
          createdAt?: string;
          id: string;
          isInternal?: boolean;
          message: string;
          responderId?: string | null;
          responderType: string;
          ticketId: string;
        };
        Update: {
          createdAt?: string;
          id?: string;
          isInternal?: boolean;
          message?: string;
          responderId?: string | null;
          responderType?: string;
          ticketId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "ticket_responses_ticketId_fkey";
            columns: ["ticketId"];
            isOneToOne: false;
            referencedRelation: "support_tickets";
            referencedColumns: ["id"];
          },
        ];
      };
      tutorial_analytics: {
        Row: {
          avgWatchDuration: number | null;
          completedCount: number;
          date: string;
          dropOffPoint: number | null;
          id: string;
          startedCount: number;
          tutorialId: string;
        };
        Insert: {
          avgWatchDuration?: number | null;
          completedCount?: number;
          date?: string;
          dropOffPoint?: number | null;
          id: string;
          startedCount?: number;
          tutorialId: string;
        };
        Update: {
          avgWatchDuration?: number | null;
          completedCount?: number;
          date?: string;
          dropOffPoint?: number | null;
          id?: string;
          startedCount?: number;
          tutorialId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "tutorial_analytics_tutorialId_fkey";
            columns: ["tutorialId"];
            isOneToOne: false;
            referencedRelation: "tutorials";
            referencedColumns: ["id"];
          },
        ];
      };
      tutorial_completions: {
        Row: {
          completed: boolean;
          id: string;
          tutorialId: string;
          userId: string;
          watchDuration: number | null;
          watchedAt: string;
        };
        Insert: {
          completed?: boolean;
          id: string;
          tutorialId: string;
          userId: string;
          watchDuration?: number | null;
          watchedAt?: string;
        };
        Update: {
          completed?: boolean;
          id?: string;
          tutorialId?: string;
          userId?: string;
          watchDuration?: number | null;
          watchedAt?: string;
        };
        Relationships: [
          {
            foreignKeyName: "tutorial_completions_tutorialId_fkey";
            columns: ["tutorialId"];
            isOneToOne: false;
            referencedRelation: "tutorials";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "tutorial_completions_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      tutorials: {
        Row: {
          changeNotes: string | null;
          cohortScope: string | null;
          createdAt: string;
          createdBy: string;
          description: string | null;
          displayOrder: number;
          durationSeconds: number | null;
          id: string;
          language: string;
          mustWatch: boolean;
          personaScope: Json | null;
          publishEndDate: string | null;
          publishStartDate: string | null;
          submoduleId: string;
          title: string;
          transcriptText: string | null;
          updatedAt: string;
          updatedBy: string | null;
          version: number;
          visibilityStatus: Database["public"]["Enums"]["ContentStatus"];
          youtubeId: string | null;
          youtubeUrl: string | null;
        };
        Insert: {
          changeNotes?: string | null;
          cohortScope?: string | null;
          createdAt?: string;
          createdBy: string;
          description?: string | null;
          displayOrder: number;
          durationSeconds?: number | null;
          id: string;
          language?: string;
          mustWatch?: boolean;
          personaScope?: Json | null;
          publishEndDate?: string | null;
          publishStartDate?: string | null;
          submoduleId: string;
          title: string;
          transcriptText?: string | null;
          updatedAt: string;
          updatedBy?: string | null;
          version?: number;
          visibilityStatus?: Database["public"]["Enums"]["ContentStatus"];
          youtubeId?: string | null;
          youtubeUrl?: string | null;
        };
        Update: {
          changeNotes?: string | null;
          cohortScope?: string | null;
          createdAt?: string;
          createdBy?: string;
          description?: string | null;
          displayOrder?: number;
          durationSeconds?: number | null;
          id?: string;
          language?: string;
          mustWatch?: boolean;
          personaScope?: Json | null;
          publishEndDate?: string | null;
          publishStartDate?: string | null;
          submoduleId?: string;
          title?: string;
          transcriptText?: string | null;
          updatedAt?: string;
          updatedBy?: string | null;
          version?: number;
          visibilityStatus?: Database["public"]["Enums"]["ContentStatus"];
          youtubeId?: string | null;
          youtubeUrl?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "tutorials_createdBy_fkey";
            columns: ["createdBy"];
            isOneToOne: false;
            referencedRelation: "admin_users";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "tutorials_submoduleId_fkey";
            columns: ["submoduleId"];
            isOneToOne: false;
            referencedRelation: "submodules";
            referencedColumns: ["id"];
          },
        ];
      };
      user_chapter_progress: {
        Row: {
          createdAt: string;
          gameCompletedAt: string | null;
          gameStartedAt: string | null;
          id: string;
          sealConfirmedAt: string | null;
          status: string;
          submoduleId: string;
          tutorialsWatched: Json | null;
          updatedAt: string;
          userId: string;
        };
        Insert: {
          createdAt?: string;
          gameCompletedAt?: string | null;
          gameStartedAt?: string | null;
          id: string;
          sealConfirmedAt?: string | null;
          status?: string;
          submoduleId: string;
          tutorialsWatched?: Json | null;
          updatedAt: string;
          userId: string;
        };
        Update: {
          createdAt?: string;
          gameCompletedAt?: string | null;
          gameStartedAt?: string | null;
          id?: string;
          sealConfirmedAt?: string | null;
          status?: string;
          submoduleId?: string;
          tutorialsWatched?: Json | null;
          updatedAt?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_chapter_progress_submoduleId_fkey";
            columns: ["submoduleId"];
            isOneToOne: false;
            referencedRelation: "submodules";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_chapter_progress_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      user_cohorts: {
        Row: {
          cohortId: string;
          id: string;
          joinedAt: string;
          leftAt: string | null;
          userId: string;
        };
        Insert: {
          cohortId: string;
          id: string;
          joinedAt?: string;
          leftAt?: string | null;
          userId: string;
        };
        Update: {
          cohortId?: string;
          id?: string;
          joinedAt?: string;
          leftAt?: string | null;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_cohorts_cohortId_fkey";
            columns: ["cohortId"];
            isOneToOne: false;
            referencedRelation: "cohorts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_cohorts_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      user_feedback: {
        Row: {
          comment: string | null;
          createdAt: string;
          entityId: string | null;
          entityType: string | null;
          feedbackType: Database["public"]["Enums"]["FeedbackType"];
          id: string;
          rating: number | null;
          sentiment: string | null;
          userId: string;
        };
        Insert: {
          comment?: string | null;
          createdAt?: string;
          entityId?: string | null;
          entityType?: string | null;
          feedbackType: Database["public"]["Enums"]["FeedbackType"];
          id: string;
          rating?: number | null;
          sentiment?: string | null;
          userId: string;
        };
        Update: {
          comment?: string | null;
          createdAt?: string;
          entityId?: string | null;
          entityType?: string | null;
          feedbackType?: Database["public"]["Enums"]["FeedbackType"];
          id?: string;
          rating?: number | null;
          sentiment?: string | null;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_feedback_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      user_module_progress: {
        Row: {
          completedAt: string | null;
          id: string;
          moduleId: string;
          startedAt: string;
          status: string;
          userId: string;
        };
        Insert: {
          completedAt?: string | null;
          id: string;
          moduleId: string;
          startedAt?: string;
          status?: string;
          userId: string;
        };
        Update: {
          completedAt?: string | null;
          id?: string;
          moduleId?: string;
          startedAt?: string;
          status?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_module_progress_moduleId_fkey";
            columns: ["moduleId"];
            isOneToOne: false;
            referencedRelation: "modules";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "user_module_progress_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      user_sessions: {
        Row: {
          createdAt: string;
          deviceType: string | null;
          expiresAt: string;
          id: string;
          ipAddress: string | null;
          lastActivityAt: string;
          refreshToken: string;
          token: string;
          userAgent: string | null;
          userId: string;
        };
        Insert: {
          createdAt?: string;
          deviceType?: string | null;
          expiresAt: string;
          id: string;
          ipAddress?: string | null;
          lastActivityAt?: string;
          refreshToken: string;
          token: string;
          userAgent?: string | null;
          userId: string;
        };
        Update: {
          createdAt?: string;
          deviceType?: string | null;
          expiresAt?: string;
          id?: string;
          ipAddress?: string | null;
          lastActivityAt?: string;
          refreshToken?: string;
          token?: string;
          userAgent?: string | null;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "user_sessions_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
      users: {
        Row: {
          aadhaarMasked: string | null;
          address: string | null;
          authProvider: string | null;
          createdAt: string;
          deviceInfo: Json | null;
          dob: string | null;
          email: string | null;
          employerCompany: string | null;
          gender: string | null;
          googleAccessToken: string | null;
          googleLinked: boolean;
          googleRefreshToken: string | null;
          googleTokenExpiry: string | null;
          id: string;
          is_first_login: boolean;
          language: string;
          lastActiveAt: string | null;
          maritalStatus: string | null;
          name: string | null;
          occupationType: string | null;
          panMasked: string | null;
          passwordHash: string | null;
          phone: string | null;
          primaryEmail: string | null;
          primaryMobile: string | null;
          profileType: Database["public"]["Enums"]["ProfileType"];
          recoveryEmail: string | null;
          secondaryMobile: string | null;
          settings: Json | null;
          status: Database["public"]["Enums"]["UserStatus"];
          twoFactorRecoveryCodes: string | null;
          twoFactorSecret: string | null;
          updatedAt: string;
        };
        Insert: {
          aadhaarMasked?: string | null;
          address?: string | null;
          authProvider?: string | null;
          createdAt?: string;
          deviceInfo?: Json | null;
          dob?: string | null;
          email?: string | null;
          employerCompany?: string | null;
          gender?: string | null;
          googleAccessToken?: string | null;
          googleLinked?: boolean;
          googleRefreshToken?: string | null;
          googleTokenExpiry?: string | null;
          id: string;
          is_first_login?: boolean;
          language?: string;
          lastActiveAt?: string | null;
          maritalStatus?: string | null;
          name?: string | null;
          occupationType?: string | null;
          panMasked?: string | null;
          passwordHash?: string | null;
          phone?: string | null;
          primaryEmail?: string | null;
          primaryMobile?: string | null;
          profileType: Database["public"]["Enums"]["ProfileType"];
          recoveryEmail?: string | null;
          secondaryMobile?: string | null;
          settings?: Json | null;
          status?: Database["public"]["Enums"]["UserStatus"];
          twoFactorRecoveryCodes?: string | null;
          twoFactorSecret?: string | null;
          updatedAt: string;
        };
        Update: {
          aadhaarMasked?: string | null;
          address?: string | null;
          authProvider?: string | null;
          createdAt?: string;
          deviceInfo?: Json | null;
          dob?: string | null;
          email?: string | null;
          employerCompany?: string | null;
          gender?: string | null;
          googleAccessToken?: string | null;
          googleLinked?: boolean;
          googleRefreshToken?: string | null;
          googleTokenExpiry?: string | null;
          id?: string;
          is_first_login?: boolean;
          language?: string;
          lastActiveAt?: string | null;
          maritalStatus?: string | null;
          name?: string | null;
          occupationType?: string | null;
          panMasked?: string | null;
          passwordHash?: string | null;
          phone?: string | null;
          primaryEmail?: string | null;
          primaryMobile?: string | null;
          profileType?: Database["public"]["Enums"]["ProfileType"];
          recoveryEmail?: string | null;
          secondaryMobile?: string | null;
          settings?: Json | null;
          status?: Database["public"]["Enums"]["UserStatus"];
          twoFactorRecoveryCodes?: string | null;
          twoFactorSecret?: string | null;
          updatedAt?: string;
        };
        Relationships: [];
      };
      weekly_analytics: {
        Row: {
          calculatedAt: string;
          id: string;
          retention14Day: number | null;
          retention30Day: number | null;
          retention7Day: number | null;
          topDropOffPoint: string | null;
          topModule: string | null;
          wau: number;
          weekEnd: string;
          weekStart: string;
        };
        Insert: {
          calculatedAt?: string;
          id: string;
          retention14Day?: number | null;
          retention30Day?: number | null;
          retention7Day?: number | null;
          topDropOffPoint?: string | null;
          topModule?: string | null;
          wau?: number;
          weekEnd: string;
          weekStart: string;
        };
        Update: {
          calculatedAt?: string;
          id?: string;
          retention14Day?: number | null;
          retention30Day?: number | null;
          retention7Day?: number | null;
          topDropOffPoint?: string | null;
          topModule?: string | null;
          wau?: number;
          weekEnd?: string;
          weekStart?: string;
        };
        Relationships: [];
      };
      will_status: {
        Row: {
          createdAt: string;
          executorContact: string | null;
          executorName: string | null;
          existsFlag: boolean;
          id: string;
          instructions: string | null;
          lastReviewDate: string | null;
          location: string | null;
          updatedAt: string;
          userId: string;
        };
        Insert: {
          createdAt?: string;
          executorContact?: string | null;
          executorName?: string | null;
          existsFlag?: boolean;
          id: string;
          instructions?: string | null;
          lastReviewDate?: string | null;
          location?: string | null;
          updatedAt: string;
          userId: string;
        };
        Update: {
          createdAt?: string;
          executorContact?: string | null;
          executorName?: string | null;
          existsFlag?: boolean;
          id?: string;
          instructions?: string | null;
          lastReviewDate?: string | null;
          location?: string | null;
          updatedAt?: string;
          userId?: string;
        };
        Relationships: [
          {
            foreignKeyName: "will_status_userId_fkey";
            columns: ["userId"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      AdminRole:
        | "SUPER_ADMIN"
        | "CONTENT_ADMIN"
        | "QUIZ_ADMIN"
        | "COMPLIANCE_ADMIN"
        | "COHORT_ADMIN"
        | "SUPPORT_ADMIN";
      AdminStatus:
        | "ACTIVE"
        | "INACTIVE"
        | "LOCKED"
        | "PENDING_INVITE"
        | "INVITE_ACCEPTED";
      AssetType: "ICON" | "STORY_CARD" | "MAP_ELEMENT" | "ANIMATION" | "SOUND";
      AuditAction:
        | "CREATE"
        | "UPDATE"
        | "DELETE"
        | "PUBLISH"
        | "ARCHIVE"
        | "ROLLBACK"
        | "EXPORT"
        | "RESET"
        | "LOGIN"
        | "LOGIN_FAIL"
        | "LOGOUT"
        | "FORCE_LOGOUT"
        | "VIEW"
        | "TOGGLE";
      AuthProvider: "EMAIL" | "GOOGLE";
      BillingCycle:
        | "WEEKLY"
        | "MONTHLY"
        | "QUARTERLY"
        | "HALF_YEARLY"
        | "YEARLY"
        | "ONE_TIME";
      BroadcastStatus: "DRAFT" | "SCHEDULED" | "SENDING" | "SENT" | "FAILED";
      ContentStatus: "DRAFT" | "PUBLISHED" | "ARCHIVED" | "HIDDEN";
      FeedbackType:
        | "CHAPTER_RATING"
        | "MODULE_RATING"
        | "GAME_RATING"
        | "NPS_SURVEY"
        | "GENERAL_FEEDBACK"
        | "FEATURE_REQUEST";
      NotifChannel: "IN_APP" | "EMAIL" | "PUSH" | "WHATSAPP";
      NotifStatus:
        | "PENDING"
        | "SENT"
        | "DELIVERED"
        | "OPENED"
        | "CLICKED"
        | "FAILED";
      ParamType: "STRING" | "INTEGER" | "FLOAT" | "BOOLEAN" | "JSON";
      ProfileType:
        | "INDIVIDUAL_SALARIED"
        | "INDIVIDUAL_SELF_EMPLOYED"
        | "FAMILY";
      QuestionType:
        | "MCQ"
        | "NUMERIC"
        | "BOOLEAN"
        | "MULTI_SELECT"
        | "DATE"
        | "PHONE"
        | "EMAIL"
        | "SLIDER"
        | "CONFIRM"
        | "TEXT";
      ReportFrequency: "DAILY" | "WEEKLY" | "MONTHLY";
      ReportType:
        | "DAILY_SUMMARY"
        | "WEEKLY_ENGAGEMENT"
        | "MONTHLY_HEALTH"
        | "CUSTOM";
      SubscriptionStatus: "ACTIVE" | "PAUSED" | "CANCELLED" | "EXPIRED";
      TicketCategory:
        | "BUG"
        | "QUESTION"
        | "SUGGESTION"
        | "ACCOUNT_ISSUE"
        | "DATA_CONCERN"
        | "OTHER";
      TicketPriority: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
      TicketStatus:
        | "OPEN"
        | "IN_PROGRESS"
        | "WAITING_ON_USER"
        | "RESOLVED"
        | "CLOSED";
      UsageFrequency: "DAILY" | "WEEKLY" | "MONTHLY" | "RARELY" | "NEVER";
      UserStatus: "ACTIVE" | "SUSPENDED" | "DELETED" | "PENDING_VERIFICATION";
      ZoneType:
        | "RAKSHA"
        | "KOSH"
        | "VYAYA"
        | "RIN"
        | "DURG"
        | "MITRA"
        | "BHOOMI"
        | "GRANTHAGAAR"
        | "KAR"
        | "OTHER";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends (
    {
      schema: keyof DatabaseWithoutInternals;
    }
  ) ?
    keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
  : never = never,
> =
  DefaultSchemaTableNameOrOptions extends (
    {
      schema: keyof DatabaseWithoutInternals;
    }
  ) ?
    (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends (
      {
        Row: infer R;
      }
    ) ?
      R
    : never
  : DefaultSchemaTableNameOrOptions extends (
    keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
  ) ?
    (DefaultSchema["Tables"] &
      DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends (
      {
        Row: infer R;
      }
    ) ?
      R
    : never
  : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends (
    {
      schema: keyof DatabaseWithoutInternals;
    }
  ) ?
    keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
  : never = never,
> =
  DefaultSchemaTableNameOrOptions extends (
    {
      schema: keyof DatabaseWithoutInternals;
    }
  ) ?
    DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends (
      {
        Insert: infer I;
      }
    ) ?
      I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"] ?
    DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends (
      {
        Insert: infer I;
      }
    ) ?
      I
    : never
  : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends (
    {
      schema: keyof DatabaseWithoutInternals;
    }
  ) ?
    keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
  : never = never,
> =
  DefaultSchemaTableNameOrOptions extends (
    {
      schema: keyof DatabaseWithoutInternals;
    }
  ) ?
    DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends (
      {
        Update: infer U;
      }
    ) ?
      U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"] ?
    DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends (
      {
        Update: infer U;
      }
    ) ?
      U
    : never
  : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends (
    {
      schema: keyof DatabaseWithoutInternals;
    }
  ) ?
    keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
  : never = never,
> =
  DefaultSchemaEnumNameOrOptions extends (
    {
      schema: keyof DatabaseWithoutInternals;
    }
  ) ?
    DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"] ?
    DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
  : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends (
    {
      schema: keyof DatabaseWithoutInternals;
    }
  ) ?
    keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
  : never = never,
> =
  PublicCompositeTypeNameOrOptions extends (
    {
      schema: keyof DatabaseWithoutInternals;
    }
  ) ?
    DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends (
    keyof DefaultSchema["CompositeTypes"]
  ) ?
    DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
  : never;

export const Constants = {
  public: {
    Enums: {
      AdminRole: [
        "SUPER_ADMIN",
        "CONTENT_ADMIN",
        "QUIZ_ADMIN",
        "COMPLIANCE_ADMIN",
        "COHORT_ADMIN",
        "SUPPORT_ADMIN",
      ],
      AdminStatus: [
        "ACTIVE",
        "INACTIVE",
        "LOCKED",
        "PENDING_INVITE",
        "INVITE_ACCEPTED",
      ],
      AssetType: ["ICON", "STORY_CARD", "MAP_ELEMENT", "ANIMATION", "SOUND"],
      AuditAction: [
        "CREATE",
        "UPDATE",
        "DELETE",
        "PUBLISH",
        "ARCHIVE",
        "ROLLBACK",
        "EXPORT",
        "RESET",
        "LOGIN",
        "LOGIN_FAIL",
        "LOGOUT",
        "FORCE_LOGOUT",
        "VIEW",
        "TOGGLE",
      ],
      AuthProvider: ["EMAIL", "GOOGLE"],
      BillingCycle: [
        "WEEKLY",
        "MONTHLY",
        "QUARTERLY",
        "HALF_YEARLY",
        "YEARLY",
        "ONE_TIME",
      ],
      BroadcastStatus: ["DRAFT", "SCHEDULED", "SENDING", "SENT", "FAILED"],
      ContentStatus: ["DRAFT", "PUBLISHED", "ARCHIVED", "HIDDEN"],
      FeedbackType: [
        "CHAPTER_RATING",
        "MODULE_RATING",
        "GAME_RATING",
        "NPS_SURVEY",
        "GENERAL_FEEDBACK",
        "FEATURE_REQUEST",
      ],
      NotifChannel: ["IN_APP", "EMAIL", "PUSH", "WHATSAPP"],
      NotifStatus: [
        "PENDING",
        "SENT",
        "DELIVERED",
        "OPENED",
        "CLICKED",
        "FAILED",
      ],
      ParamType: ["STRING", "INTEGER", "FLOAT", "BOOLEAN", "JSON"],
      ProfileType: [
        "INDIVIDUAL_SALARIED",
        "INDIVIDUAL_SELF_EMPLOYED",
        "FAMILY",
      ],
      QuestionType: [
        "MCQ",
        "NUMERIC",
        "BOOLEAN",
        "MULTI_SELECT",
        "DATE",
        "PHONE",
        "EMAIL",
        "SLIDER",
        "CONFIRM",
        "TEXT",
      ],
      ReportFrequency: ["DAILY", "WEEKLY", "MONTHLY"],
      ReportType: [
        "DAILY_SUMMARY",
        "WEEKLY_ENGAGEMENT",
        "MONTHLY_HEALTH",
        "CUSTOM",
      ],
      SubscriptionStatus: ["ACTIVE", "PAUSED", "CANCELLED", "EXPIRED"],
      TicketCategory: [
        "BUG",
        "QUESTION",
        "SUGGESTION",
        "ACCOUNT_ISSUE",
        "DATA_CONCERN",
        "OTHER",
      ],
      TicketPriority: ["LOW", "MEDIUM", "HIGH", "CRITICAL"],
      TicketStatus: [
        "OPEN",
        "IN_PROGRESS",
        "WAITING_ON_USER",
        "RESOLVED",
        "CLOSED",
      ],
      UsageFrequency: ["DAILY", "WEEKLY", "MONTHLY", "RARELY", "NEVER"],
      UserStatus: ["ACTIVE", "SUSPENDED", "DELETED", "PENDING_VERIFICATION"],
      ZoneType: [
        "RAKSHA",
        "KOSH",
        "VYAYA",
        "RIN",
        "DURG",
        "MITRA",
        "BHOOMI",
        "GRANTHAGAAR",
        "KAR",
        "OTHER",
      ],
    },
  },
} as const;
