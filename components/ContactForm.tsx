"use client";
import { useState } from "react";
import { motion } from "framer-motion";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<{
    loading: boolean;
    msg: string;
    isError: boolean;
  }>({ loading: false, msg: "", isError: false });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ loading: true, msg: "Sending message...", isError: false });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus({
          loading: false,
          msg: "Message sent successfully! I'll get back to you soon.",
          isError: false,
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus({
          loading: false,
          msg: data.error || "Something went wrong. Please try again.",
          isError: true,
        });
      }
    } catch {
      setStatus({
        loading: false,
        msg: "Connection error. Please check your network and try again.",
        isError: true,
      });
    }
  };

  return (
    <section className="relative bg-white text-black py-16 md:py-20 px-6 md:px-8 rounded-t-[40px] md:rounded-t-[50px] z-30">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <h2 className="text-xs md:text-sm font-mono uppercase tracking-[0.3em] text-blue-600 mb-2">
            Get In Touch
          </h2>
          <h3 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase italic">
            Start a <span className="text-blue-600">Conversation.</span>
          </h3>
        </motion.div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-1.5"
          >
            <label className="text-xs font-mono uppercase tracking-wider text-gray-500">
              Your Name
            </label>
            <input
              type="text"
              suppressHydrationWarning
              placeholder="Ex: David"
              required
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="bg-transparent border-b border-gray-200 py-3 outline-none focus:border-blue-600 transition-colors text-lg md:text-xl font-medium text-black placeholder:text-gray-400"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-1.5"
          >
            <label className="text-xs font-mono uppercase tracking-wider text-gray-500">
              Email Address
            </label>
            <input
              type="email"
              suppressHydrationWarning
              placeholder="hello@work.com"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="bg-transparent border-b border-gray-200 py-3 outline-none focus:border-blue-600 transition-colors text-lg md:text-xl font-medium text-black placeholder:text-gray-400"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-1.5 md:col-span-2 mt-2"
          >
            <label className="text-xs font-mono uppercase tracking-wider text-gray-500">
              Tell me about your project
            </label>
            <textarea
              rows={3}
              suppressHydrationWarning
              placeholder="Ex: I need a mobile app for..."
              required
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="bg-transparent border-b border-gray-200 py-3 outline-none focus:border-blue-600 transition-colors text-lg md:text-xl font-medium resize-none text-black placeholder:text-gray-400"
            />
          </motion.div>

          <motion.button
            type="submit"
            suppressHydrationWarning
            disabled={status.loading}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            className="md:col-span-2 bg-blue-600 text-white py-4 md:py-5 rounded-full text-base md:text-lg font-bold uppercase tracking-widest mt-6 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20 disabled:bg-gray-400 cursor-pointer"
          >
            {status.loading ? "Sending..." : "Send Message"}
          </motion.button>

          {status.msg && (
            <p
              className={`md:col-span-2 text-center text-sm font-mono mt-2 ${
                status.isError
                  ? "text-red-500 font-semibold"
                  : status.loading
                  ? "text-gray-500"
                  : "text-green-600 font-semibold"
              }`}
            >
              {status.msg}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
export default ContactForm;
