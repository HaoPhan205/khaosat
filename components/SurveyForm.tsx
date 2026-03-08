"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import AdminWishForm from "./AdminWishForm";

const ERROR_MSG =
  "❌ Hình như bạn nhập sai rồi đó.\nNhập đúng tên giúp mình nha~";

function normalizeVietnamese(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

export default function SurveyForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [showAdminForm, setShowAdminForm] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = name.trim();

    if (!trimmed) {
      setError(ERROR_MSG);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }

    const normalized = normalizeVietnamese(trimmed);

    // Chứa "Thư" hoặc "Bảo Thư" (bỏ dấu, không phân biệt hoa/thường) → trang khảo sát
    if (normalized.includes("thu") || normalized.includes("bao thu")) {
      setError("");
      router.push("/khao-sat");
      return;
    }

    // Chính xác "hào" → hiển thị admin form
    if (normalized === "hào" || normalized === "hao") {
      setError("");
      setShowAdminForm(true);
      return;
    }

    setError(ERROR_MSG);
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  if (showAdminForm) {
    return (
      <AdminWishForm
        onBack={() => setShowAdminForm(false)}
        onSuccess={() => router.push("/chuc-mung")}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 flex items-center justify-center p-4"
    >
      <div className="w-full max-w-xl bg-white rounded-lg shadow-md border border-gray-200 p-8">
        <h1 className="text-xl font-medium text-gray-800 text-center mb-2">
          📋 KHẢO SÁT THÁNG 3 – SINH VIÊN TP. HCM
        </h1>
        <p className="text-sm text-gray-600 text-center mb-4">
          Vui lòng nhập đúng họ tên để tiếp tục khảo sát.
        </p>
        <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded px-3 py-2 mb-6">
          ⚠️ Lưu ý: Phải nhập đúng tên đó nha!
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Họ và tên
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setError("");
              }}
              placeholder="Nhập họ và tên của bạn"
              className={`w-full px-4 py-2.5 border rounded-md text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                error ? "border-red-400 bg-red-50" : "border-gray-300"
              } ${shake ? "animate-shake" : ""}`}
              autoComplete="name"
            />
            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-2 text-sm text-red-600 whitespace-pre-line"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
          >
            Tiếp tục
          </button>
        </form>
      </div>
    </motion.div>
  );
}
