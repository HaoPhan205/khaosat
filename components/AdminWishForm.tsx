"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const STORAGE_KEY = "messageForBaoThu_8_3";

interface AdminWishFormProps {
  onBack?: () => void;
  onSuccess?: () => void;
}

export default function AdminWishForm({ onBack, onSuccess }: AdminWishFormProps) {
  const [message, setMessage] = useState("");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const existing = localStorage.getItem(STORAGE_KEY);
    if (existing) {
      setMessage(existing);
      setSaved(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = message.trim();

    if (!trimmed) return;

    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, trimmed);
    }

    setSaved(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen bg-gray-50 flex items-center justify-center p-4"
    >
      <div className="w-full max-w-xl bg-white rounded-lg shadow-md border border-gray-200 p-8">
        <h2 className="text-lg font-medium text-gray-800 mb-2">
          Nhập lời chúc cho Thư
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Lời chúc này sẽ hiển thị trên trang chúc mừng 8/3 dành cho Bảo Thư.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="wish"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Lời chúc
            </label>
            <textarea
              id="wish"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                setSaved(false);
              }}
              placeholder="Viết lời chúc của bạn..."
              rows={5}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <button
              type="submit"
              className="flex-1 py-2.5 bg-pink-500 hover:bg-pink-600 text-white font-medium rounded-md transition-colors"
            >
              Gửi lời chúc cho Thư 💌
            </button>
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="py-2.5 px-4 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Quay lại
              </button>
            )}
          </div>

          {saved && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-green-600 font-medium"
            >
              Đã lưu lời chúc 💖
            </motion.p>
          )}

          {saved && onSuccess && (
            <button
              type="button"
              onClick={onSuccess}
              className="w-full py-2.5 bg-pink-400 hover:bg-pink-500 text-white font-medium rounded-md transition-colors"
            >
              Xem trang chúc mừng →
            </button>
          )}
        </form>
      </div>
    </motion.div>
  );
}
