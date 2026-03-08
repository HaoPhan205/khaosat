"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function KhaoSatPage() {
  const router = useRouter();
  const [research, setResearch] = useState<"yes" | "no" | "">("");
  const [pressure, setPressure] = useState<"yes" | "no" | "">("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (research === "" || pressure === "") {
      setError("Vui lòng chọn đáp án cho cả hai câu hỏi.");
      return;
    }
    setError("");
    router.push("/chuc-mung");
  };

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
        <p className="text-sm text-gray-600 text-center mb-6">
          Phần tiếp theo – Vui lòng trả lời các câu hỏi dưới đây.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <p className="text-sm font-medium text-gray-800 mb-3">
              1. Bạn có đang làm Nghiên cứu khoa học không? <span className="text-red-500">*</span>
            </p>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="research"
                  value="yes"
                  checked={research === "yes"}
                  onChange={() => setResearch("yes")}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-gray-700">Có</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="research"
                  value="no"
                  checked={research === "no"}
                  onChange={() => setResearch("no")}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-gray-700">Không</span>
              </label>
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-gray-800 mb-3">
              2. Bạn có thấy áp lực không? <span className="text-red-500">*</span>
            </p>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="pressure"
                  value="yes"
                  checked={pressure === "yes"}
                  onChange={() => setPressure("yes")}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-gray-700">Có</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="pressure"
                  value="no"
                  checked={pressure === "no"}
                  onChange={() => setPressure("no")}
                  className="w-4 h-4 text-blue-600"
                />
                <span className="text-gray-700">Không</span>
              </label>
            </div>
          </div>

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

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
