"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { calculateSubscriptionMetrics } from "@/lib/subscriptionMetrics";
import {
  ArrowLeft,
  Plus,
  Sparkles,
  Droplets,
  CalendarRange,
  AlertTriangle,
  ShieldCheck,
  Target,
  Scissors,
  BellRing,
  Waves,
  CheckCircle2,
  CircleDollarSign,
  Pencil,
  Trash2,
} from "lucide-react";

type BillingFrequency = "monthly" | "quarterly" | "yearly";
type AwarenessState = "not-started" | "in-progress" | "complete";

type SubscriptionDraft = {
  id: string;
  name: string;
  category: string;
  provider: string;
  amount: number;
  frequency: BillingFrequency;
  startDate: string;
  renewalDate: string;
  autoDebit: boolean;
  paidFrom: string;
  lastUsedDate: string;
  essential: boolean;
  cancellationMethod: string;
  portalLinked: string;
  notes: string;
  lastUsedDays: number;
  billingCycle?: string;
};

const formatRupee = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

const categoryOptions = [
  { value: "utilities", label: "Utilities", icon: "💡" },
  { value: "entertainment", label: "Entertainment", icon: "🎬" },
  { value: "saas", label: "SaaS", icon: "💻" },
  { value: "telecom", label: "Telecom", icon: "📱" },
  { value: "wellness", label: "Gym/Wellness", icon: "💪" },
  { value: "other", label: "Other", icon: "🧿" },
];

const frequencyOptions: { value: BillingFrequency; label: string }[] = [
  { value: "monthly", label: "Monthly" },
  { value: "quarterly", label: "Quarterly" },
  { value: "yearly", label: "Yearly" },
];

export default function SubscriptionsModulePage() {
  const router = useRouter();
  const [subscriptions, setSubscriptions] = useState<SubscriptionDraft[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [awarenessState, setAwarenessState] =
    useState<AwarenessState>("not-started");
  const [awareness, setAwareness] = useState({
    awarenessFlag: false,
    hasAutodebit: false,
    perceivedWaste: "unknown" as "unknown" | "low" | "high",
  });
  const [form, setForm] = useState({
    name: "",
    category: "utilities",
    provider: "",
    amount: "",
    frequency: "monthly" as BillingFrequency,
    startDate: "",
    renewalDate: "",
    autoDebit: false,
    paidFrom: "",
    lastUsedDate: "",
    essential: false,
    cancellationMethod: "",
    portalLinked: "",
    notes: "",
  });

  useEffect(() => {
    const loadSubscriptions = async () => {
      try {
        const response = await fetch("/api/subscriptions");
        if (!response.ok) throw new Error("Failed to load subscriptions");
        const payload = await response.json();
        const nextSubscriptions = (payload?.data ?? []).map((item: any) => ({
          id: item.id,
          name: item.name,
          category: item.category || "other",
          provider: item.provider || item.name,
          amount: Number(item.amount || 0),
          frequency:
            (item.billingCycle || "MONTHLY").toLowerCase() === "yearly" ?
              "yearly"
            : (item.billingCycle || "MONTHLY").toLowerCase() === "quarterly" ?
              "quarterly"
            : "monthly",
          startDate:
            item.startDate ?
              new Date(item.startDate).toISOString().slice(0, 10)
            : "",
          renewalDate:
            item.renewalDate ?
              new Date(item.renewalDate).toISOString().slice(0, 10)
            : "",
          autoDebit: Boolean(item.autoDebit),
          paidFrom: item.paymentMethod || "",
          lastUsedDate:
            item.lastUsedDate ?
              new Date(item.lastUsedDate).toISOString().slice(0, 10)
            : "",
          essential: Boolean(item.isEssential),
          cancellationMethod: "",
          portalLinked: "",
          notes: item.notes || "",
          lastUsedDays:
            item.lastUsedDate ?
              Math.max(
                0,
                Math.floor(
                  (Date.now() - new Date(item.lastUsedDate).getTime()) /
                    (1000 * 60 * 60 * 24),
                ),
              )
            : 45,
          billingCycle: item.billingCycle,
        }));
        setSubscriptions(nextSubscriptions);
      } catch (error) {
        console.error(
          "[SubscriptionsPage] Failed to load subscriptions:",
          error,
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadSubscriptions();
  }, []);

  const monthlyEquivalent = useMemo(() => {
    const amount = Number(form.amount || 0);
    switch (form.frequency) {
      case "quarterly":
        return amount / 3;
      case "yearly":
        return amount / 12;
      default:
        return amount;
    }
  }, [form.amount, form.frequency]);

  const annualCost = monthlyEquivalent * 12;

  const metrics = useMemo(
    () =>
      calculateSubscriptionMetrics(
        subscriptions.map((item) => ({
          amount: item.amount,
          billingCycle:
            item.billingCycle ||
            (item.frequency === "quarterly" ? "QUARTERLY"
            : item.frequency === "yearly" ? "YEARLY"
            : "MONTHLY"),
          lastUsedDate: item.lastUsedDate || null,
        })),
        new Date(),
      ),
    [subscriptions],
  );

  const {
    recurringMonthly,
    annualCost: annualSubscriptionCost,
    dormantCount,
    potentialSavings,
    leakageRatio,
  } = metrics;
  const dormantSubscriptions = subscriptions.filter(
    (item) => item.lastUsedDays > 90,
  );

  const handleToggleEssential = async (subscription: SubscriptionDraft) => {
    try {
      const response = await fetch(`/api/subscriptions/${subscription.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          isEssential: !subscription.essential,
          status: subscription.essential ? "PAUSED" : "ACTIVE",
        }),
      });

      if (!response.ok) throw new Error("Failed to update subscription");

      setSubscriptions((prev) =>
        prev.map((item) =>
          item.id === subscription.id ?
            { ...item, essential: !item.essential }
          : item,
        ),
      );
    } catch (error) {
      console.error("[SubscriptionsPage] Failed to toggle essential:", error);
    }
  };

  const handleDeleteSubscription = async (subscriptionId: string) => {
    try {
      const response = await fetch(`/api/subscriptions/${subscriptionId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete subscription");

      setSubscriptions((prev) =>
        prev.filter((item) => item.id !== subscriptionId),
      );
    } catch (error) {
      console.error(
        "[SubscriptionsPage] Failed to delete subscription:",
        error,
      );
    }
  };

  const handleSaveScroll = async () => {
    if (!form.name.trim()) return;

    setIsSaving(true);

    try {
      const response = await fetch("/api/subscriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          provider: form.provider.trim() || form.name.trim(),
          category: form.category,
          amount: Number(form.amount || 0),
          billingCycle:
            form.frequency === "quarterly" ? "QUARTERLY"
            : form.frequency === "yearly" ? "YEARLY"
            : "MONTHLY",
          renewalDate:
            form.renewalDate || new Date().toISOString().slice(0, 10),
          startDate: form.startDate || undefined,
          paymentMethod: form.paidFrom,
          autoDebit: form.autoDebit,
          status: "ACTIVE",
          lastUsedDate: form.lastUsedDate || undefined,
          isEssential: form.essential,
          cancelReminder: true,
          notes: form.notes,
        }),
      });

      if (!response.ok) throw new Error("Failed to save subscription");
      const payload = await response.json();
      const created = payload?.data;
      if (created) {
        setSubscriptions((prev) => [
          {
            id: created.id,
            name: created.name,
            category: created.category || form.category,
            provider:
              created.provider || form.provider.trim() || form.name.trim(),
            amount: Number(created.amount || 0),
            frequency: form.frequency,
            startDate:
              created.startDate ?
                new Date(created.startDate).toISOString().slice(0, 10)
              : "",
            renewalDate:
              created.renewalDate ?
                new Date(created.renewalDate).toISOString().slice(0, 10)
              : "",
            autoDebit: Boolean(created.autoDebit),
            paidFrom: created.paymentMethod || "",
            lastUsedDate:
              created.lastUsedDate ?
                new Date(created.lastUsedDate).toISOString().slice(0, 10)
              : "",
            essential: Boolean(created.isEssential),
            cancellationMethod: "",
            portalLinked: "",
            notes: created.notes || "",
            lastUsedDays: 45,
            billingCycle: created.billingCycle,
          },
          ...prev,
        ]);
      }
      setForm({
        name: "",
        category: "utilities",
        provider: "",
        amount: "",
        frequency: "monthly",
        startDate: "",
        renewalDate: "",
        autoDebit: false,
        paidFrom: "",
        lastUsedDate: "",
        essential: false,
        cancellationMethod: "",
        portalLinked: "",
        notes: "",
      });
      setAwarenessState("complete");
    } catch (error) {
      console.error("[SubscriptionsPage] Failed to save subscription:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const duplicateDetected = Boolean(
    form.name.trim() &&
    subscriptions.some((item) =>
      item.name.toLowerCase().includes(form.name.trim().toLowerCase()),
    ),
  );

  return (
    <main className="min-h-screen bg-rajya-bg text-white">
      <div className="mx-auto flex max-w-6xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-6 flex items-center justify-between rounded-4xl border border-white/10 bg-white/5 px-4 py-4 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/rajya")}
              className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/6 transition-colors hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4 text-white/70" />
            </button>
            <div>
              <p className="text-[10px] uppercase tracking-[0.3em] text-amber-400/70">
                Module 13
              </p>
              <h1 className="text-xl font-semibold text-white">
                Subscription & Leakage Intelligence
              </h1>
              <p className="text-sm text-white/45">
                Ras Nadi — The Silent Drain Detector
              </p>
            </div>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <button
              onClick={() => router.push("/leakage")}
              className="flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-2 text-sm text-amber-300 transition-colors hover:bg-amber-500/20"
            >
              <Droplets className="h-4 w-4" />
              View overview
            </button>
          </div>
        </header>

        <section className="mb-6 grid gap-4 lg:grid-cols-[1.25fr_0.75fr]">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-4xl border border-white/10 bg-linear-to-br from-slate-950 via-[#0b1b30] to-slate-900 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.35)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.35em] text-white/35">
                  13A · Awareness
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-white">
                  Small drops, big erosion
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-6 text-white/55">
                  This module helps you notice recurring commitments, track
                  unused subscriptions, and redirect leakage into goals before
                  it silently drains the Rajya.
                </p>
              </div>
              <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-3 text-amber-300">
                <Sparkles className="h-6 w-6" />
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/35">
                  Monthly recurring
                </p>
                <p className="mt-2 text-xl font-semibold text-white">
                  {formatRupee(recurringMonthly)}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/35">
                  Dormant leakage
                </p>
                <p className="mt-2 text-xl font-semibold text-amber-300">
                  {dormantCount}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/35">
                  Potential savings
                </p>
                <p className="mt-2 text-xl font-semibold text-emerald-300">
                  {formatRupee(potentialSavings)}
                </p>
              </div>
            </div>
          </motion.div>

          <div className="rounded-4xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.35em] text-white/35">
                  13A · Quiz
                </p>
                <h3 className="mt-2 text-lg font-semibold text-white">
                  Matka Drain Simulation
                </h3>
              </div>
              <div className="rounded-full border border-white/10 bg-slate-900/70 px-3 py-1 text-[11px] text-white/50">
                {awarenessState === "complete" ?
                  "Completed"
                : awarenessState === "in-progress" ?
                  "In progress"
                : "Ready"}
              </div>
            </div>

            <div className="mt-5 space-y-4">
              <label className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-white/70">
                <span>Do you know how many subscriptions you pay monthly?</span>
                <input
                  type="checkbox"
                  checked={awareness.awarenessFlag}
                  onChange={() => {
                    setAwareness((prev) => ({
                      ...prev,
                      awarenessFlag: !prev.awarenessFlag,
                    }));
                    setAwarenessState("in-progress");
                  }}
                  className="h-4 w-4 rounded border-white/20 bg-transparent accent-amber-400"
                />
              </label>

              <label className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/60 px-4 py-3 text-sm text-white/70">
                <span>Any auto-debits active?</span>
                <input
                  type="checkbox"
                  checked={awareness.hasAutodebit}
                  onChange={() => {
                    setAwareness((prev) => ({
                      ...prev,
                      hasAutodebit: !prev.hasAutodebit,
                    }));
                    setAwarenessState("in-progress");
                  }}
                  className="h-4 w-4 rounded border-white/20 bg-transparent accent-amber-400"
                />
              </label>

              <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4">
                <p className="mb-3 text-sm text-white/70">
                  Any unused OTT or app subscriptions?
                </p>
                <div className="flex gap-2">
                  {(["unknown", "low", "high"] as const).map((value) => (
                    <button
                      key={value}
                      onClick={() => {
                        setAwareness((prev) => ({
                          ...prev,
                          perceivedWaste: value,
                        }));
                        setAwarenessState("in-progress");
                      }}
                      className={`rounded-full px-3 py-2 text-xs uppercase tracking-[0.25em] transition-colors ${awareness.perceivedWaste === value ? "bg-amber-400 text-slate-950" : "bg-white/5 text-white/55 hover:bg-white/10"}`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-6 rounded-4xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <div className="mb-6 flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] uppercase tracking-[0.35em] text-white/35">
                13B · Entry
              </p>
              <h3 className="mt-2 text-xl font-semibold text-white">
                Recurring Scroll Entry
              </h3>
            </div>
            <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[11px] text-emerald-300">
              Field-complete flow
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm text-white/70">
                  <span>Subscription Name</span>
                  <input
                    value={form.name}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, name: e.target.value }))
                    }
                    placeholder="Netflix / Spotify / Gym"
                    className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none ring-0 placeholder:text-white/25"
                  />
                </label>
                <label className="space-y-2 text-sm text-white/70">
                  <span>Provider</span>
                  <input
                    value={form.provider}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, provider: e.target.value }))
                    }
                    placeholder="Provider name"
                    className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none ring-0 placeholder:text-white/25"
                  />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm text-white/70">
                  <span>Monthly Cost</span>
                  <input
                    type="number"
                    value={form.amount}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, amount: e.target.value }))
                    }
                    placeholder="499"
                    className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none ring-0 placeholder:text-white/25"
                  />
                </label>
                <label className="space-y-2 text-sm text-white/70">
                  <span>Billing Frequency</span>
                  <select
                    value={form.frequency}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        frequency: e.target.value as BillingFrequency,
                      }))
                    }
                    className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none"
                  >
                    {frequencyOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm text-white/70">
                  <span>Start Date</span>
                  <input
                    type="date"
                    value={form.startDate}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        startDate: e.target.value,
                      }))
                    }
                    className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none"
                  />
                </label>
                <label className="space-y-2 text-sm text-white/70">
                  <span>Renewal Date</span>
                  <input
                    type="date"
                    value={form.renewalDate}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        renewalDate: e.target.value,
                      }))
                    }
                    className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none"
                  />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm text-white/70">
                  <span>Paid From Account</span>
                  <input
                    value={form.paidFrom}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, paidFrom: e.target.value }))
                    }
                    placeholder="HDFC Debit / UPI"
                    className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none ring-0 placeholder:text-white/25"
                  />
                </label>
                <label className="space-y-2 text-sm text-white/70">
                  <span>Last Used Date</span>
                  <input
                    type="date"
                    value={form.lastUsedDate}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        lastUsedDate: e.target.value,
                      }))
                    }
                    className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none"
                  />
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm text-white/70">
                  <span>Category</span>
                  <select
                    value={form.category}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, category: e.target.value }))
                    }
                    className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none"
                  >
                    {categoryOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="space-y-2 text-sm text-white/70">
                  <span>Portal Linked</span>
                  <input
                    value={form.portalLinked}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        portalLinked: e.target.value,
                      }))
                    }
                    placeholder="Module 3 portal"
                    className="w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none ring-0 placeholder:text-white/25"
                  />
                </label>
              </div>

              <label className="space-y-2 text-sm text-white/70">
                <span>Notes</span>
                <textarea
                  value={form.notes}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, notes: e.target.value }))
                  }
                  placeholder="Reason, usage pattern, family note"
                  className="min-h-24 w-full rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white outline-none ring-0 placeholder:text-white/25"
                />
              </label>

              <div className="flex flex-wrap gap-3">
                <label className="flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/70 px-3 py-2 text-sm text-white/70">
                  <input
                    type="checkbox"
                    checked={form.autoDebit}
                    onChange={() =>
                      setForm((prev) => ({
                        ...prev,
                        autoDebit: !prev.autoDebit,
                      }))
                    }
                    className="h-4 w-4 rounded border-white/20 bg-transparent accent-amber-400"
                  />
                  Auto-debit
                </label>
                <button
                  type="button"
                  onClick={() =>
                    setForm((prev) => ({ ...prev, essential: !prev.essential }))
                  }
                  className={`rounded-full px-3 py-2 text-sm transition-colors ${form.essential ? "bg-emerald-500/15 text-emerald-300" : "bg-white/5 text-white/60 hover:bg-white/10"}`}
                >
                  {form.essential ? "Marked essential" : "Mark as essential"}
                </button>
              </div>

              <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4 text-sm text-amber-200">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                  <div>
                    <p className="font-medium">Micro UX notes</p>
                    <p className="mt-1 text-xs leading-5 text-amber-100/80">
                      Yearly costs are converted to monthly equivalent
                      instantly, duplicate names are flagged, and services
                      unused for 60+ days are marked as dormant.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.35em] text-white/35">
                      Preview
                    </p>
                    <h4 className="mt-2 text-lg font-semibold text-white">
                      Monthly equivalent
                    </h4>
                  </div>
                  <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/70">
                    {form.frequency}
                  </div>
                </div>
                <div className="mt-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-emerald-300">
                    Monthly equivalent
                  </p>
                  <p className="mt-2 text-3xl font-semibold text-white">
                    {formatRupee(monthlyEquivalent)}
                  </p>
                  <p className="mt-2 text-sm text-emerald-100/70">
                    Annual outlook: {formatRupee(annualCost)}
                  </p>
                </div>
              </div>

              {duplicateDetected && (
                <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-4 text-sm text-amber-100">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4" />
                    Possible duplicate subscription detected.
                  </div>
                </div>
              )}

              <button
                onClick={handleSaveScroll}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-amber-400 px-4 py-4 text-sm font-semibold text-slate-950 transition-colors hover:bg-amber-300"
              >
                <Plus className="h-4 w-4" />
                {isSaving ? "Saving…" : "Save Scroll"}
              </button>
            </div>
          </div>
        </section>

        <section className="mb-6 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-4xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.35em] text-white/35">
                  13C · Intelligence
                </p>
                <h3 className="mt-2 text-xl font-semibold text-white">
                  Leakage engine
                </h3>
              </div>
              <div className="rounded-full border border-white/10 bg-slate-900/70 px-3 py-1 text-[11px] text-white/50">
                Derived calculations
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/35">
                  Total recurring monthly
                </p>
                <p className="mt-2 text-2xl font-semibold text-white">
                  {formatRupee(recurringMonthly)}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/35">
                  Annual subscription cost
                </p>
                <p className="mt-2 text-2xl font-semibold text-white">
                  {formatRupee(annualSubscriptionCost)}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/35">
                  Dormant subscriptions
                </p>
                <p className="mt-2 text-2xl font-semibold text-amber-300">
                  {dormantCount}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/35">
                  Leakage ratio
                </p>
                <p className="mt-2 text-2xl font-semibold text-rose-300">
                  {leakageRatio}%
                </p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {[
                {
                  label: "Renewal due",
                  icon: <CalendarRange className="h-3.5 w-3.5" />,
                },
                {
                  label: "Auto-debit high-risk",
                  icon: <BellRing className="h-3.5 w-3.5" />,
                },
                {
                  label: "Dormant > 90 days",
                  icon: <AlertTriangle className="h-3.5 w-3.5" />,
                },
                {
                  label: "Annual review reminder",
                  icon: <Waves className="h-3.5 w-3.5" />,
                },
              ].map((alert) => (
                <div
                  key={alert.label}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/60"
                >
                  {alert.icon}
                  {alert.label}
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-4xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-2 text-emerald-300">
                <CircleDollarSign className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.35em] text-white/35">
                  13C · Reservoir
                </p>
                <h3 className="text-xl font-semibold text-white">
                  Water reservoir
                </h3>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-slate-950/70 p-5">
              <div className="mb-4 flex items-center justify-between text-sm text-white/60">
                <span>Controlled</span>
                <span>Overflow</span>
              </div>
              <div className="h-40 overflow-hidden rounded-3xl border border-white/10 bg-linear-to-b from-slate-900 to-slate-800 p-3">
                <div className="relative h-full rounded-[20px] border border-white/10 bg-[radial-gradient(circle_at_50%_0%,rgba(74,222,128,0.2),transparent_50%)]">
                  <div
                    className="absolute bottom-0 left-0 right-0 rounded-[18px] bg-linear-to-t from-emerald-500/90 via-emerald-400/70 to-emerald-300/60"
                    style={{ height: `${Math.max(28, 100 - leakageRatio)}%` }}
                  />
                  <div
                    className="absolute bottom-0 left-0 right-0 rounded-[18px] border-t border-amber-300/30"
                    style={{ height: `${Math.max(12, leakageRatio)}%` }}
                  />
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-white/50">
                <span>Green = controlled</span>
                <span>Amber = leakage</span>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-4xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] uppercase tracking-[0.35em] text-white/35">
                13D · Surplus reallocation
              </p>
              <h3 className="mt-2 text-xl font-semibold text-white">
                Freeing surplus for goals
              </h3>
            </div>
            <button className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/60 transition-colors hover:bg-white/10">
              Link to goals
            </button>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1fr_0.8fr]">
            <div className="space-y-3">
              {subscriptions.slice(0, 3).map((item, index) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/70 p-4"
                >
                  <div>
                    <p className="text-sm font-medium text-white">
                      {item.name}
                    </p>
                    <p className="mt-1 text-xs text-white/45">
                      {item.provider}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-right">
                    <div>
                      <p className="text-sm font-semibold text-emerald-300">
                        Save {formatRupee(item.amount * 12)}
                      </p>
                      <p className="mt-1 text-[10px] uppercase tracking-[0.3em] text-white/35">
                        Option {index + 1}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleToggleEssential(item)}
                        className="rounded-full border border-white/10 bg-white/5 p-2 text-white/70 transition-colors hover:bg-white/10"
                        aria-label={`Mark ${item.name} as essential`}
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteSubscription(item.id)}
                        className="rounded-full border border-rose-500/20 bg-rose-500/10 p-2 text-rose-300 transition-colors hover:bg-rose-500/20"
                        aria-label={`Delete ${item.name}`}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-3xl border border-amber-500/20 bg-amber-500/10 p-4">
              <div className="flex items-center gap-2 text-amber-200">
                <Target className="h-4 w-4" />
                <p className="text-sm font-medium">
                  If you cancel these 3, you free{" "}
                  {formatRupee(potentialSavings)} a year.
                </p>
              </div>
              <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/70 p-4">
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/35">
                  Suggested goal
                </p>
                <p className="mt-2 text-lg font-semibold text-white">
                  Emergency fund / travel / education
                </p>
                <button className="mt-4 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/65 transition-colors hover:bg-white/10">
                  <CheckCircle2 className="h-4 w-4" />
                  Link freed surplus to goal
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
