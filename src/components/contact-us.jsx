"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { Turnstile } from "next-turnstile";

export const ContactUs = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const [notification, setNotification] = useState({});
  const [turnstileToken, setTurnstileToken] = useState(null);

  const onSubmit = async (formData) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify({ ...formData, turnstileToken }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (data.type === "error") {
        setNotification({ message: data.message, type: "error" });
      } else if (data.type === "success") {
        setNotification({ message: data.message, type: "success" });
      } else {
        setNotification({ message: data.message || "Unexpected error", type: "error" });
      }

      reset();
    } catch (error) {
      setNotification({ message: data.message || "Unexpected error", type: "error" });
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-2">
      <h1 className="text-3xl md:text-4xl font-extrabold font-mono text-center mb-4">Contact Us</h1>
      <p className="text-base text-center mb-4">
        We're here to help! Whether you have questions, need assistance, or want to provide feedback, please don't
        hesitate to reach out. Our team is ready to support you and ensure you have the best experience possible.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="floating-label">
            <span>Name</span>
            <input
              {...register("name", { required: "Name is required" })}
              className={`input input-bordered w-full ${errors.name ? "border-error" : ""}`}
              placeholder="Your name"
            />
          </label>
          {errors.name && <p className="text-error text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <label className="floating-label">
            <span>Email</span>
            <input
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: "Invalid email address",
                },
              })}
              className={`input input-bordered w-full ${errors.email ? "border-error" : ""}`}
              placeholder="you@example.com"
            />
          </label>
          {errors.email && <p className="text-error text-sm">{errors.email.message}</p>}
        </div>

        <div>
          <label className="floating-label">
            <span>Message</span>
            <textarea
              {...register("message", { required: "Message is required" })}
              rows={4}
              className={`textarea textarea-bordered w-full min-h-48 max-h-80 ${errors.message ? "border-error" : ""}`}
              placeholder="Your message"
            />
          </label>
          {errors.message && <p className="text-error text-sm">{errors.message.message}</p>}
        </div>

        {notification.type === "error" && (
          <div className="badge badge-soft badge-error w-full">{notification.message}</div>
        )}
        {notification.type === "success" && (
          <div className="badge badge-soft badge-success w-full">{notification.message}</div>
        )}

        <button type="submit" disabled={isSubmitting} className="btn btn-primary w-full">
          {isSubmitting && <span className="loading loading-spinner loading-sm"></span>}
          {!isSubmitting && "Send Message"}
        </button>
        <div className="flex items-center justify-end">
          <Turnstile
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
            retry="auto"
            refreshExpired="auto"
            theme="dark"
            sandbox={process.env.NODE_ENV === "development"}
            onVerify={(token) => {
              setTurnstileToken(token);
              setNotification({});
            }}
          />
        </div>
      </form>
    </div>
  );
};
