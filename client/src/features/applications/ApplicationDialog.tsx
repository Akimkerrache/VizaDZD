import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ArrowLeft, CheckCircle2, LoaderCircle, X } from "lucide-react";
import { api } from "../../lib/api";
import type { Country } from "../../types/country";
import { applicationSchema, type ApplicationValues } from "./applicationSchema";

interface ApplicationDialogProps {
  country: Country;
  onClose: () => void;
}

export default function ApplicationDialog({
  country,
  onClose,
}: ApplicationDialogProps) {
  const { t, i18n } = useTranslation();
  const dialogRef = useRef<HTMLElement>(null);
  const [success, setSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ApplicationValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      countryCode: country.code,
      countryName: country.name,
      language: (i18n.language as ApplicationValues["language"]) || "fr",
    },
  });
  const mutation = useMutation({
    mutationFn: (values: ApplicationValues) =>
      api.post("/applications", values),
  });

  useEffect(() => {
    const previouslyFocused =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    dialogRef.current?.focus();
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab") return;
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) {
        event.preventDefault();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (document.activeElement === dialogRef.current) {
        event.preventDefault();
        (event.shiftKey ? last : first)?.focus();
        return;
      }
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus();
    };
  }, [onClose]);

  const submit = handleSubmit(async (values) => {
    try {
      await mutation.mutateAsync(values);
      setSuccess(true);
    } catch {
      /* Keep the form visible and show a recoverable error. */
    }
  });
  const errorText = (field: keyof ApplicationValues) =>
    errors[field]
      ? field === "email"
        ? t("invalidEmail")
        : field === "phone"
          ? t("invalidPhone")
          : field === "travelDate"
            ? t("invalidDate")
            : t("requiredField")
      : null;

  return (
    <div
      className="dialog-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="application-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="application-title"
        tabIndex={-1}
        ref={dialogRef}
      >
        <button
          className="dialog-close"
          onClick={onClose}
          aria-label={t("close")}
        >
          <X size={18} />
        </button>
        {success ? (
          <div className="success-state">
            <span className="success-icon">
              <CheckCircle2 size={30} />
            </span>
            <span className="section-kicker">
              VISA<span className="accent-text">DZD</span> · {country.name}
            </span>
            <h2 id="application-title">{t("success")}</h2>
            <p>{t("acknowledgement")}</p>
            <button className="primary-cta" onClick={onClose}>
              {t("close")}
            </button>
          </div>
        ) : (
          <>
            <button className="back-link" onClick={onClose}>
              <ArrowLeft size={14} /> {t("backToMap")}
            </button>
            <span className="section-kicker">
              {t("requestLabel")}{" "}
              <span className="dialog-country">
                {country.flag} {country.name}
              </span>
            </span>
            <h2 id="application-title">{t("formTitle")}</h2>
            <p className="dialog-subtitle">{t("formSubtitle")}</p>
            <form className="application-form" onSubmit={submit} noValidate>
              <input type="hidden" {...register("countryCode")} />
              <input type="hidden" {...register("countryName")} />
              <input type="hidden" {...register("language")} />
              <label>
                {t("fullName")}
                <input
                  autoComplete="name"
                  placeholder="Samira B."
                  {...register("fullName")}
                  aria-invalid={Boolean(errors.fullName)}
                />
                {errorText("fullName") && (
                  <small className="field-error">{errorText("fullName")}</small>
                )}
              </label>
              <label>
                {t("email")}
                <input
                  type="email"
                  autoComplete="email"
                  placeholder="samira@email.com"
                  {...register("email")}
                  aria-invalid={Boolean(errors.email)}
                />
                {errorText("email") && (
                  <small className="field-error">{errorText("email")}</small>
                )}
              </label>
              <div className="form-two-col">
                <label>
                  {t("phone")}
                  <input
                    type="tel"
                    autoComplete="tel"
                    placeholder="+213 555 00 00 00"
                    {...register("phone")}
                    aria-invalid={Boolean(errors.phone)}
                  />
                  {errorText("phone") && (
                    <small className="field-error">{errorText("phone")}</small>
                  )}
                </label>
                <label>
                  {t("travelDate")}
                  <input type="date" {...register("travelDate")} />
                </label>
              </div>
              <label>
                {t("message")}
                <textarea rows={3} placeholder="…" {...register("message")} />
              </label>
              {mutation.isError && (
                <p className="submit-error" role="alert">
                  {t("error")}
                </p>
              )}
              <button
                className="primary-cta submit-button"
                type="submit"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? (
                  <>
                    <LoaderCircle className="spin" size={16} />
                    {t("sending")}
                  </>
                ) : (
                  <>
                    {t("send")}
                    <ArrowLeft size={16} className="send-arrow" />
                  </>
                )}
              </button>
              <p className="privacy-note">
                <span>◈</span>
                {t("privacy")}
              </p>
            </form>
          </>
        )}
      </section>
    </div>
  );
}
