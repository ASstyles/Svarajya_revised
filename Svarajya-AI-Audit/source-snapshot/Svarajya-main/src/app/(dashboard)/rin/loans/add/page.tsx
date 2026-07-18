"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Landmark, CreditCard, Calendar, Info } from "lucide-react";
import { useToast } from "@/components/providers/ToastProvider";
import { Users, Loader2 } from "lucide-react";
import { Vault, VaultFile } from "@/lib/vault";
import { FileUploader } from "@/components/vault/FileUploader";

const LOAN_TYPES = [
    { value: "HOME", label: "Home Loan" },
    { value: "PERSONAL", label: "Personal Loan" },
    { value: "VEHICLE", label: "Vehicle Loan" },
    { value: "EDUCATION", label: "Education Loan" },
    { value: "BUSINESS", label: "Business Loan" },
    { value: "CREDIT_CARD", label: "Credit Card Debt" },
    { value: "OTHER", label: "Other" },
];

export default function AddLoanPage() {
    const router = useRouter();
    const toast = useToast();
    const [loading, setLoading] = useState(false);

    const [existingVaultFiles, setExistingVaultFiles] = useState<VaultFile[]>([]);
    const [showDocumentModal, setShowDocumentModal] = useState(false);
    const [documentModalMode, setDocumentModalMode] = useState<"select" | "upload">("select");
    const [selectedVaultFileId, setSelectedVaultFileId] = useState<string | null>(null);
    const [documentFamilyMemberId, setDocumentFamilyMemberId] = useState("");
    const [familyMembers, setFamilyMembers] = useState<any[]>([]);

    const today = new Date().toISOString().split("T")[0];

    const [formData, setFormData] = useState<{
        type: string;
        lenderName: string;
        principal: string;
        outstandingAmount: string;
        emi: string;
        interestRate: string;
        tenure: string;
        startDate: string;
        endDate: string;
        status: string;
        linkedPropertyId: string;
        documentId?: string | null;
        documentFile?: File | null;
    }>({
        type: "PERSONAL",
        lenderName: "",
        principal: "",
        outstandingAmount: "",
        emi: "",
        interestRate: "",
        tenure: "",
        startDate: today,
        endDate: "",
        status: "ACTIVE",
        linkedPropertyId: "",
        documentId: null,
        documentFile: null,
    });

    useEffect(() => {
        const loadData = async () => {
            try {
                const files = await Vault.getFiles("loans");
                setExistingVaultFiles(files);

                const famRes = await fetch("/api/family");
                if (famRes.ok) {
                    const famJson = await famRes.json();
                    setFamilyMembers(famJson.data || []);
                }
            } catch (err) {
                console.error(err);
            }
        };

        loadData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const selectedDate = new Date(formData.startDate);
        const currentDate = new Date();

        selectedDate.setHours(0, 0, 0, 0);
        currentDate.setHours(0, 0, 0, 0);

        if (selectedDate > currentDate) {
            toast("Start date cannot be in the future.", "error");
            return;
        }
        if (formData.endDate) {
        const endDate = new Date(formData.endDate);
        endDate.setHours(0, 0, 0, 0);

        if (endDate < currentDate) {
            toast("End date cannot be in the past.", "error");
            return;
        }
    }

        setLoading(true);

        try {
            const res = await fetch("/api/loans", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const json = await res.json();

            if (json.success) {
                toast("Loan account created successfully!", "success");
                router.push("/rin/loans");
            } else {
                toast(json.error?.message || "Failed to create loan", "error");
            }
        } catch (err) {
            toast("An unexpected error occurred.", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="flex flex-col min-h-screen p-6 pb-24 relative bg-gradient-to-b from-slate-950 via-[#0a1628] to-slate-950 selection:bg-amber-500/30">
            <header className="pt-12 pb-6 sticky top-0 z-20 backdrop-blur-md">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => router.back()}
                        className="w-9 h-9 rounded-xl bg-white/6 border border-white/10 flex items-center justify-center"
                    >
                        <ArrowLeft className="w-4 h-4 text-white/60" />
                    </button>

                    <h1 className="text-xl font-bold text-white">Add New Loan</h1>
                </div>
            </header>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                    <label className="text-xs text-white/40 uppercase tracking-widest font-semibold ml-1">
                        Loan Type
                    </label>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {LOAN_TYPES.map((t) => (
                            <button
                                key={t.value}
                                type="button"
                                onClick={() => setFormData({ ...formData, type: t.value })}
                                className={`px-4 py-3 rounded-xl border text-xs font-medium transition-all ${
                                    formData.type === t.value
                                        ? "bg-amber-500 border-amber-500 text-black shadow-lg shadow-amber-500/20"
                                        : "bg-white/5 border-white/10 text-white/60 hover:border-white/20"
                                }`}
                            >
                                {t.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs text-white/40 uppercase tracking-widest font-semibold ml-1">
                        Lender / Bank Name
                    </label>

                    <div className="relative">
                        <Landmark className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                        <input
                            type="text"
                            required
                            placeholder="e.g. HDFC Bank, SBI, ICICI"
                            value={formData.lenderName}
                            onChange={(e) => setFormData({ ...formData, lenderName: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm text-white focus:outline-none focus:border-amber-500/50 transition-colors"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs text-white/40 uppercase tracking-widest font-semibold ml-1">
                            Principal Amount
                        </label>

                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-white/20 font-bold">
                                ₹
                            </span>
                            <input
                                type="number"
                                required
                                placeholder="0"
                                value={formData.principal}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        principal: e.target.value,
                                        outstandingAmount: formData.outstandingAmount || e.target.value,
                                    })
                                }
                                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-10 pr-4 py-4 text-sm text-white focus:outline-none focus:border-amber-500/50 transition-colors"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs text-white/40 uppercase tracking-widest font-semibold ml-1">
                            Outstanding
                        </label>

                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-white/20 font-bold">
                                ₹
                            </span>
                            <input
                                type="number"
                                required
                                placeholder="0"
                                value={formData.outstandingAmount}
                                onChange={(e) => setFormData({ ...formData, outstandingAmount: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-10 pr-4 py-4 text-sm text-white focus:outline-none focus:border-amber-500/50 transition-colors"
                            />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs text-white/40 uppercase tracking-widest font-semibold ml-1">
                            Monthly EMI
                        </label>

                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-white/20 font-bold">
                                ₹
                            </span>
                            <input
                                type="number"
                                required
                                placeholder="0"
                                value={formData.emi}
                                onChange={(e) => setFormData({ ...formData, emi: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-10 pr-4 py-4 text-sm text-white focus:outline-none focus:border-amber-500/50 transition-colors"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs text-white/40 uppercase tracking-widest font-semibold ml-1">
                            Interest Rate (%)
                        </label>

                        <input
                            type="number"
                            step="0.01"
                            required
                            placeholder="8.5"
                            value={formData.interestRate}
                            onChange={(e) => setFormData({ ...formData, interestRate: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-4 text-sm text-white focus:outline-none focus:border-amber-500/50 transition-colors"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-xs text-white/40 uppercase tracking-widest font-semibold ml-1">
                            Tenure (Months)
                        </label>

                        <input
                            type="number"
                            required
                            placeholder="e.g. 120"
                            value={formData.tenure}
                            onChange={(e) => setFormData({ ...formData, tenure: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-4 text-sm text-white focus:outline-none focus:border-amber-500/50 transition-colors"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs text-white/40 uppercase tracking-widest font-semibold ml-1">
                            Start Date
                        </label>

                        <div className="relative">
                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                            <input
                                type="date"
                                required
                                max={today}
                                value={formData.startDate}
                                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm text-white focus:outline-none focus:border-amber-500/50 transition-colors appearance-none"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs text-white/40 uppercase tracking-widest font-semibold ml-1">
                            End Date
                        </label>

                        <div className="relative">
                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                            <input
                                type="date"
                                min={today}
                                value={formData.endDate}
                                onChange={(e) =>
                                    setFormData({
                                    ...formData,
                                    endDate: e.target.value,
                                })
                            }
                            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm text-white focus:outline-none focus:border-amber-500/50 transition-colors appearance-none"
                        />
                        </div>
                    </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-3xl p-5">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-xs uppercase tracking-[0.24em] text-white/40 font-bold">
                                Loan Document
                            </p>
                            <p className="text-[11px] text-white/50">
                                Attach a loan document from the Loans vault.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() => setShowDocumentModal(true)}
                            className="px-3 py-2 text-[10px] uppercase tracking-[0.2em] font-semibold rounded-2xl bg-amber-500 text-slate-950 hover:bg-amber-400 transition-all"
                        >
                            Add Document
                        </button>
                    </div>

                    {formData.documentId ? (
                        <div className="rounded-3xl border border-white/10 bg-slate-950/60 p-4">
                            <p className="text-sm text-white font-medium">
                                Linked document selected
                            </p>
                            <p className="text-xs text-white/40 mt-1">
                                File ID: {formData.documentId}
                            </p>
                        </div>
                    ) : (
                        <p className="text-sm text-white/50">
                            No loan document attached yet.
                        </p>
                    )}

                    <div className="space-y-2 mt-4">
                        <label className="text-xs text-white/40 uppercase tracking-widest font-semibold ml-1 flex items-center gap-1.5">
                            <Users className="w-3.5 h-3.5" />
                            Loan Document Belongs To
                        </label>

                        <select
                            value={documentFamilyMemberId}
                            onChange={(e) => setDocumentFamilyMemberId(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-3 text-sm text-white"
                        >
                            <option value="">Myself</option>

                            {familyMembers.map((m) => (
                                <option key={m.id} value={m.id}>
                                    {m.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {formData.type === "HOME" && (
                    <div className="space-y-2 animate-in fade-in slide-in-from-top-4">
                        <label className="text-xs text-white/40 uppercase tracking-widest font-semibold ml-1">
                            Linked Property ID (Optional)
                        </label>
                        <input
                            type="text"
                            placeholder="e.g. PROP-123"
                            value={formData.linkedPropertyId}
                            onChange={(e) => setFormData({ ...formData, linkedPropertyId: e.target.value })}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 py-4 text-sm text-white focus:outline-none focus:border-amber-500/50 transition-colors"
                        />
                    </div>
                )}

                <div className="pt-6">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-amber-500 text-black font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 disabled:opacity-50 active:scale-95 transition-all"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        ) : (
                            <Save className="w-5 h-5" />
                        )}
                        Create Loan Account
                    </button>
                </div>
            </form>

            {showDocumentModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
                    <div
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        onClick={() => setShowDocumentModal(false)}
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative bg-slate-900 border border-white/10 rounded-3xl p-6 max-w-2xl w-full"
                    >
                        <div className="flex items-start justify-between gap-4 mb-4">
                            <div>
                                <h3 className="text-lg font-semibold text-white">
                                    Loan Document Vault
                                </h3>
                                <p className="text-sm text-white/50">
                                    Select an existing file or upload a new document into your Loans vault.
                                </p>
                            </div>

                            <button
                                onClick={() => setShowDocumentModal(false)}
                                className="text-white/50 hover:text-white"
                            >
                                Close
                            </button>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                            <button
                                onClick={() => setDocumentModalMode("select")}
                                className={`px-4 py-2 rounded-2xl text-sm font-semibold transition ${
                                    documentModalMode === "select"
                                        ? "bg-amber-500 text-slate-950"
                                        : "bg-white/5 text-white/70 hover:bg-white/10"
                                }`}
                            >
                                Select Existing
                            </button>

                            <button
                                onClick={() => setDocumentModalMode("upload")}
                                className={`px-4 py-2 rounded-2xl text-sm font-semibold transition ${
                                    documentModalMode === "upload"
                                        ? "bg-amber-500 text-slate-950"
                                        : "bg-white/5 text-white/70 hover:bg-white/10"
                                }`}
                            >
                                Upload New
                            </button>
                        </div>

                        {documentModalMode === "select" ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[55vh] overflow-y-auto pr-2">
                                {existingVaultFiles.length > 0 ? (
                                    existingVaultFiles.map((file) => (
                                        <button
                                            key={file.id}
                                            type="button"
                                            onClick={() => setSelectedVaultFileId(file.id)}
                                            className={`p-4 rounded-3xl border text-left transition-all ${
                                                selectedVaultFileId === file.id
                                                    ? "bg-amber-500/10 border-amber-500/40"
                                                    : "bg-white/5 border-white/10 hover:border-white/20"
                                            }`}
                                        >
                                            <p className="text-sm font-medium text-white truncate">
                                                {file.name}
                                            </p>
                                            <p className="text-[10px] text-white/40 mt-1">
                                                {new Date(file.createdAt).toLocaleDateString("en-IN")}
                                            </p>
                                        </button>
                                    ))
                                ) : (
                                    <div className="col-span-full p-4 rounded-3xl border border-dashed border-white/10 bg-white/5 text-sm text-white/50">
                                        No files found in the Loans vault. Upload a document to Loans and it will be linked automatically.
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-4 max-h-[55vh] overflow-y-auto pr-2">
                                <FileUploader
                                    folder="loans"
                                    onUploaded={async (fileId) => {
                                        setSelectedVaultFileId(fileId);
                                        const newFile = await Vault.getFile(fileId);

                                        if (newFile) {
                                            const files = await Vault.getFiles("loans");
                                            setExistingVaultFiles(files);
                                            setSelectedVaultFileId(newFile.id);
                                            setFormData(prev => ({
                                                ...prev,
                                                documentId: newFile.id,
                                            }));

                                            setShowDocumentModal(false);
                                        }
                                    }}
                                    accept=".pdf,.png,.jpg,.jpeg"
                                    maxSizeMB={2}
                                    showFamilyMemberSelector={false}
                                />
                            </div>
                        )}

                        <div className="mt-6 flex flex-wrap gap-3 justify-end">
                            <button
                                type="button"
                                onClick={() => setShowDocumentModal(false)}
                                className="px-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white/80 text-sm font-semibold"
                            >
                                Cancel
                            </button>

                            {documentModalMode === "select" && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (!selectedVaultFileId) return;

                                        setFormData(prev => ({
                                            ...prev,
                                            documentId: selectedVaultFileId,
                                        }));

                                        setShowDocumentModal(false);
                                    }}
                                    disabled={!selectedVaultFileId}
                                    className="px-4 py-3 rounded-2xl bg-amber-500 text-slate-950 text-sm font-semibold disabled:opacity-50"
                                >
                                    Link Document
                                </button>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}

            <div className="mt-8 pb-12">
                <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 flex gap-3">
                    <Info className="w-5 h-5 text-amber-400 shrink-0" />
                    <p className="text-[10px] text-amber-200/60 leading-relaxed">
                        Data is used to calculate your EMI burden ratio and financial health score. All data is encrypted and private.
                    </p>
                </div>
            </div>
        </main>
    );
}