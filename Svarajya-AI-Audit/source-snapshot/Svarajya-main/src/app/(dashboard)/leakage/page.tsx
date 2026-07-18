"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { calculateSubscriptionMetrics } from "@/lib/subscriptionMetrics";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowUpRight,
  BadgeCheck,
  BellRing,
  Droplets,
  ShieldCheck,
  Sparkles,
  Target,
  Wallet2,
} from "lucide-react";

const formatRupee = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

const reallocationIdeas = [
  { title: "Emergency fund buffer", amount: 18000 },
  { title: "Travel reserve", amount: 12000 },
  { title: "Education goal", amount: 18000 },
];

export default function LeakageModulePage() {
  const router = useRouter();
  const [awareness, setAwareness] = useState({
    knowsCount: true,
    hasAutoDebit: true,
    suspectsDormant: true,
  });
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSubscriptions = async () => {
      try {
        const response = await fetch("/api/subscriptions");
        if (!response.ok) throw new Error("Failed to load subscriptions");
        const payload = await response.json();
        setSubscriptions(payload?.data ?? []);
      } catch (error) {
        console.error("[LeakagePage] Failed to load subscriptions:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSubscriptions();
  }, []);

  const metrics = useMemo(
    () =>
      calculateSubscriptionMetrics(
        subscriptions.map((item) => ({
          amount: Number(item.amount || 0),
          billingCycle: item.billingCycle,
          lastUsedDate: item.lastUsedDate,
        })),
        new Date(),
      ),
    [subscriptions],
  );

  const { recurringMonthly, dormantCount, potentialSavings, leakageRatio } =
    metrics;
  const riskSignals = [
    {
      label: "Auto-debit active",
      detail:
        subscriptions.filter((item) => item.autoDebit).length > 0 ?
          `${subscriptions.filter((item) => item.autoDebit).length} services renew without friction`
        : "No auto-debit subscriptions currently detected",
    },
    {
      label: "Dormant >90 days",
      detail:
        dormantCount > 0 ?
          `${dormantCount} unused subscription${dormantCount > 1 ? "s are" : " is"} still billed`
        : "No dormant subscriptions currently detected",
    },
    {
      label: "Annual review",
      detail:
        recurringMonthly > 0 ?
          "Suggested before the next fiscal quarter"
        : "Add a subscription to start tracking leakage",
    },
  ];

  const dynamicReallocationIdeas = [
    {
      title: "Emergency fund buffer",
      amount: Math.max(0, Math.round(potentialSavings * 0.4)),
    },
    {
      title: "Travel reserve",
      amount: Math.max(0, Math.round(potentialSavings * 0.3)),
    },
    {
      title: "Education goal",
      amount: Math.max(0, Math.round(potentialSavings * 0.3)),
    },
  ];

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.18),transparent_32%),linear-gradient(135deg,#030711_0%,#07111f_50%,#0a1427_100%)] text-white">
      <div className="mx-auto flex max-w-6xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <header className="mb-6 flex items-center justify-between rounded-4xl border border-white/10 bg-white/10 px-4 py-4 shadow-[0_20px_70px_rgba(0,0,0,0.25)] backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/rajya")}
              className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-slate-900/70 transition-colors hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4 text-white/70" />
            </button>
            <div>
              <p className="text-[10px] uppercase tracking-[0.35em] text-amber-400/70">
                Module 13
              </p>
              <h1 className="text-xl font-semibold text-white">
                Leakage & Subscription Control
              </h1>
              <p className="text-sm text-white/45">
                Stop silent drains before they hollow your Rajya
              </p>
            </div>
          </div>
          <div className="hidden items-center gap-2 sm:flex">
            <button
              onClick={() => router.push("/subscriptions")}
              className="flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-2 text-sm text-amber-200 transition-colors hover:bg-amber-500/20"
            >
              Open ledger
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </header>

        <section className="mb-6 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-4xl border border-white/10 bg-linear-to-br from-slate-950 via-[#0b1730] to-slate-900 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.32)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-[0.35em] text-white/35">
                  13A · Awareness
                </p>
                <h2 className="mt-2 text-2xl font-semibold text-white">
                  The smallest holes drain the fastest
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-6 text-white/55">
                  Recurring charges, forgotten renewals, and dormant plans
                  quietly erode spare cash. This module brings them into view so
                  you can redirect money to real priorities.
                </p>
              </div>
              <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 p-3 text-amber-300">
                <Droplets className="h-6 w-6" />
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/35">
                  Monthly leak
                </p>
                <p className="mt-2 text-xl font-semibold text-white">
                  {formatRupee(recurringMonthly)}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/35">
                  Dormant plans
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

          <div className="rounded-4xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.35em] text-white/35">
                  13B · Pulse check
                </p>
                <h3 className="mt-2 text-lg font-semibold text-white">
                  Your leak watchlist
                </h3>
              </div>
              <div className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-[11px] text-emerald-300">
                Active
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <label className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white/70">
                <span>Know your recurring count</span>
                <input
                  type="checkbox"
                  checked={awareness.knowsCount}
                  onChange={() =>
                    setAwareness((prev) => ({
                      ...prev,
                      knowsCount: !prev.knowsCount,
                    }))
                  }
                  className="h-4 w-4 rounded border-white/20 bg-transparent accent-amber-400"
                />
              </label>
              <label className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white/70">
                <span>Auto-debits are still running</span>
                <input
                  type="checkbox"
                  checked={awareness.hasAutoDebit}
                  onChange={() =>
                    setAwareness((prev) => ({
                      ...prev,
                      hasAutoDebit: !prev.hasAutoDebit,
                    }))
                  }
                  className="h-4 w-4 rounded border-white/20 bg-transparent accent-amber-400"
                />
              </label>
              <label className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/70 px-4 py-3 text-sm text-white/70">
                <span>Unused services are suspected</span>
                <input
                  type="checkbox"
                  checked={awareness.suspectsDormant}
                  onChange={() =>
                    setAwareness((prev) => ({
                      ...prev,
                      suspectsDormant: !prev.suspectsDormant,
                    }))
                  }
                  className="h-4 w-4 rounded border-white/20 bg-transparent accent-amber-400"
                />
              </label>
            </div>
          </div>
        </section>

        <section className="mb-6 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="rounded-4xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-[0.35em] text-white/35">
                  13C · Review signals
                </p>
                <h3 className="mt-2 text-xl font-semibold text-white">
                  What needs attention first
                </h3>
              </div>
              <div className="rounded-full border border-white/10 bg-slate-900/70 px-3 py-1 text-[11px] text-white/50">
                Live insight
              </div>
            </div>

            <div className="space-y-3">
              {riskSignals.map((signal) => (
                <div
                  key={signal.label}
                  className="flex items-start gap-3 rounded-2xl border border-white/10 bg-slate-950/70 p-4"
                >
                  <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-2 text-amber-300">
                    <BellRing className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">
                      {signal.label}
                    </p>
                    <p className="mt-1 text-sm text-white/50">
                      {signal.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => router.push("/subscriptions")}
              className="mt-5 flex items-center justify-center gap-2 rounded-2xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm font-medium text-amber-200 transition-colors hover:bg-amber-500/20"
            >
              Review subscription ledger
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>

          <div className="rounded-4xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
            <div className="mb-4 flex items-center gap-3">
              <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-2 text-emerald-300">
                <Wallet2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.35em] text-white/35">
                  13D · Surplus reallocation
                </p>
                <h3 className="text-xl font-semibold text-white">
                  Move saved cash to stronger goals
                </h3>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-slate-950/70 p-4">
              <div className="flex items-center gap-2 text-amber-200">
                <Target className="h-4 w-4" />
                <p className="text-sm font-medium">
                  Cutting just the dormant plans could release{" "}
                  {formatRupee(potentialSavings)} in a year.
                </p>
              </div>

              <div className="mt-4 space-y-3">
                {dynamicReallocationIdeas.map((idea) => (
                  <div
                    key={idea.title}
                    className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3"
                  >
                    <div>
                      <p className="text-sm font-medium text-white">
                        {idea.title}
                      </p>
                      <p className="mt-1 text-xs text-white/45">
                        Redirect saved surplus here
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-300">
                      <BadgeCheck className="h-4 w-4" />
                      <span className="text-sm font-semibold">
                        {formatRupee(idea.amount)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-4xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] uppercase tracking-[0.35em] text-white/35">
                13E · Control loop
              </p>
              <h3 className="mt-2 text-xl font-semibold text-white">
                Close the leak with one calm review
              </h3>
            </div>
            <div className="rounded-full border border-white/10 bg-slate-900/70 px-3 py-1 text-[11px] text-white/50">
              {leakageRatio}% leakage ratio
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-3xl border border-amber-500/20 bg-amber-500/10 p-4">
              <div className="flex items-center gap-2 text-amber-200">
                <ShieldCheck className="h-4 w-4" />
                <p className="text-sm font-medium">
                  Review every renewal with intention
                </p>
              </div>
              <p className="mt-3 text-sm leading-6 text-amber-100/80">
                Use the ledger to mark essential services, pause the rest, and
                keep your cash moving toward goals instead of disappearances.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-4">
              <div className="mb-4 flex items-center gap-2 text-white/70">
                <Sparkles className="h-4 w-4 text-amber-300" />
                <span className="text-sm">A better monthly rhythm</span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-linear-to-r from-emerald-400 via-emerald-300 to-amber-300"
                  style={{ width: `${100 - leakageRatio}%` }}
                />
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-white/45">
                <span>Controlled flow</span>
                <span>Leakage reduced</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
