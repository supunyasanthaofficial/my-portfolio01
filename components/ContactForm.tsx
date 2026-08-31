"use client";
import { useState } from "react";
import { motion } from "framer-motion";

function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState({ loading: false, msg: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ loading: true, msg: "Sending message..." });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        setStatus({ loading: false, msg: "Message sent successfully! " });
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus({
          loading: false,
          msg: "Something went wrong. Please try again.",
        });
      }
    } catch {
      setStatus({ loading: false, msg: "Connection error. Please try again." });
    }
  };

  return (
    <section className="relative bg-white text-black py-24 px-8 rounded-t-[50px] z-30">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-sm font-mono uppercase tracking-[0.4em] text-blue-600 mb-4">
            Get In Touch
          </h2>
          <h3 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase italic">
            Start a <span className="text-blue-600">Conversation.</span>
          </h3>
        </motion.div>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-2"
          >
            <label className="text-xs font-mono uppercase text-gray-400">
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
              className="bg-transparent border-b border-gray-200 py-4 outline-none focus:border-blue-600 transition-colors text-xl font-medium text-black placeholder:text-gray-400"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex flex-col gap-2"
          >
            <label className="text-xs font-mono uppercase text-gray-400">
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
              className="bg-transparent border-b border-gray-200 py-4 outline-none focus:border-blue-600 transition-colors text-xl font-medium text-black placeholder:text-gray-400"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-2 md:col-span-2 mt-8"
          >
            <label className="text-xs font-mono uppercase text-gray-400">
              Tell me about your project
            </label>
            <textarea
              rows={4}
              suppressHydrationWarning
              placeholder="Ex: I need a mobile app for..."
              required
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="bg-transparent border-b border-gray-200 py-4 outline-none focus:border-blue-600 transition-colors text-xl font-medium resize-none text-black placeholder:text-gray-400"
            />
          </motion.div>

          <motion.button
            type="submit"
            suppressHydrationWarning
            disabled={status.loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="md:col-span-2 bg-blue-600 text-white py-6 rounded-full text-xl font-bold uppercase tracking-widest mt-12 hover:bg-blue-700 transition-colors shadow-xl shadow-blue-500/20 disabled:bg-gray-400 cursor-pointer"
          >
            {status.loading ? "Sending..." : "Send Message"}
          </motion.button>

          {status.msg && (
            <p className="md:col-span-2 text-center text-sm font-mono mt-4 text-gray-600">
              {status.msg}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
export default ContactForm;
