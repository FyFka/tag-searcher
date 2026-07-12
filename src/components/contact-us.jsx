"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { Turnstile } from "next-turnstile";
import { useTranslations } from "next-intl";

export const ContactUs = () => {
  const t = useTranslations("contact");
  const tApi = useTranslations("api");

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
      const displayMessage = data.message ? tApi(data.message) : tApi("unexpectedError");

      if (data.type === "error") {
        setNotification({ message: displayMessage, type: "error" });
      } else if (data.type === "success") {
        setNotification({ message: displayMessage, type: "success" });
      } else {
        setNotification({ message: displayMessage, type: "error" });
      }

      reset();
    } catch (error) {
      setNotification({ message: tApi("unexpectedError"), type: "error" });
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-2">
      <h1 className="text-3xl md:text-4xl font-extrabold font-mono text-center mb-4">{t("title")}</h1>
      <p className="text-base text-center mb-4">{t("description")}</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="floating-label">
            <span>{t("nameLabel")}</span>
            <input
              {...register("name", { required: t("nameRequired") })}
              className={`input input-bordered w-full ${errors.name ? "border-error" : ""}`}
              placeholder={t("namePlaceholder")}
              autoComplete="name"
            />
          </label>
        </div>
        <div>
          <label className="floating-label">
            <span>{t("emailLabel")}</span>
            <input
              {...register("email", {
                required: t("emailRequired"),
                pattern: {
                  value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                  message: t("emailInvalid"),
                },
              })}
              className={`input input-bordered w-full ${errors.email ? "border-error" : ""}`}
              autoComplete="email"
              placeholder={t("emailPlaceholder")}
            />
          </label>
        </div>
        <div>
          <label className="floating-label">
            <span>{t("messageLabel")}</span>
            <textarea
              {...register("message", { required: t("messageRequired") })}
              rows={4}
              className={`textarea textarea-bordered w-full min-h-48 max-h-80 ${errors.message ? "border-error" : ""}`}
              placeholder={t("messagePlaceholder")}
            />
          </label>
        </div>

        {notification.type === "error" && <div className="badge badge-soft badge-error w-full h-auto">{notification.message}</div>}
        {notification.type === "success" && <div className="badge badge-soft badge-success w-full h-auto">{notification.message}</div>}
        <div className="flex items-center justify-end">
          <button type="submit" disabled={isSubmitting} className="btn btn-primary min-w-32">
            {isSubmitting && <span className="loading loading-spinner loading-sm"></span>}
            {!isSubmitting && t("submit")}
          </button>
        </div>
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
