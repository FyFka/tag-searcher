"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { Turnstile } from "next-turnstile";
import { useTranslations } from "next-intl";

export const Feedback = () => {
  const t = useTranslations("feedback");
  const tApi = useTranslations("api");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const [notification, setNotification] = useState({});
  const [turnstileToken, setTurnstileToken] = useState(null);
  const [showTurnstile, setShowTurnstile] = useState(false);

  const onSubmit = async (formData) => {
    setShowTurnstile(true);

    const payload = {
      name: "Feedback",
      email: "unknown@gmail.com",
      message: formData.message,
      turnstileToken,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(payload),
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
    <div className="space-y-3 col-span-full lg:col-span-1">
      <h2 className="font-extrabold text-lg font-mono">{t("title")}</h2>
      <p className="text-sm opacity-80">{t("description")}</p>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col sm:flex-row gap-2">
        <label className="floating-label w-full">
          <input
            {...register("message", { required: t("messageRequired") })}
            type="text"
            placeholder={t("placeholder")}
            className={`input input-bordered w-full flex-1 ${errors.message ? "border-error" : ""}`}
            onFocus={() => setShowTurnstile(true)}
          />
        </label>
        <button type="submit" disabled={isSubmitting} className="btn btn-primary min-w-16.25">
          {isSubmitting && <span className="loading loading-spinner loading-sm"></span>}
          {!isSubmitting && t("submit")}
        </button>
      </form>

      {notification.type === "error" && <div className="badge badge-soft badge-error w-full h-auto">{notification.message}</div>}
      {notification.type === "success" && <div className="badge badge-soft badge-success w-full h-auto">{notification.message}</div>}

      {showTurnstile && (
        <div className="flex items-center justify-end mt-1">
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
      )}
    </div>
  );
};
