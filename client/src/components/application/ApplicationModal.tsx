import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, CheckCircle2, LoaderCircle, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import {
  applicationSchema,
  type ApplicationFormValues,
} from "../../schemas/application.schema";
import { useApplicationSubmission } from "../../hooks/useApplicationSubmission";
import type { Country } from "../../types/country";
import type { SupportedLanguage } from "../../types/application";

interface ApplicationModalProps {
  country: Country;
  onClose: () => void;
}

export default function ApplicationModal({
  country,
  onClose,
}: ApplicationModalProps) {
  const { t, i18n } = useTranslation();
  const dialogRef = useRef<HTMLElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const submission = useApplicationSubmission();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      countryCode: country.code,
      countryName: country.name,
      language: (i18n.language in { fr: 1, en: 1, ar: 1, kab: 1 }
        ? i18n.language
        : "fr") as SupportedLanguage,
    },
  });

  useEffect(() => {
    const previousFocus =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab") return;
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
        'button:not([disabled]), input:not([disabled]):not([type="hidden"]), textarea:not([disabled]), select:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) return event.preventDefault();
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (document.activeElement === dialogRef.current) {
        event.preventDefault();
        (event.shiftKey ? last : first)?.focus();
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      if (previousFocus?.isConnected) previousFocus.focus();
    };
  }, [onClose]);

  const submit = handleSubmit(async (values) => {
    try {
      await submission.mutateAsync(values);
      setSubmitted(true);
    } catch {
      // The mutation state renders a retry-friendly error while preserving form values.
    }
  });

  const fieldError = (field: keyof ApplicationFormValues) => {
    if (!errors[field]) return null;
    if (field === "email") return t("invalidEmail");
    if (field === "phone") return t("invalidPhone");
    if (field === "travelDate") return t("invalidDate");
    return t("requiredField");
  };

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
        aria-describedby="application-description"
        tabIndex={-1}
        ref={dialogRef}
      >
        <button
          className="dialog-close"
          type="button"
          onClick={onClose}
          aria-label={t("close")}
        >
          <X size={18} />
        </button>
        {submitted ? (
          <div className="success-state" role="status">
            <span className="success-icon">
              <CheckCircle2 size={30} aria-hidden="true" />
            </span>
            <span className="section-kicker">
              VISA<span className="accent-text">DZD</span> · {country.name}
            </span>
            <h2 id="application-title">{t("success")}</h2>
            <p id="application-description">{t("acknowledgement")}</p>
            <button className="button-primary" type="button" onClick={onClose}>
              {t("close")}
            </button>
          </div>
        ) : (
          <>
            <button className="back-link" type="button" onClick={onClose}>
              <ArrowLeft size={14} aria-hidden="true" />
              {t("backToMap")}
            </button>
            <span className="section-kicker">
              {t("requestLabel")}{" "}
              <span className="dialog-country">
                <img
                  className="dialog-country-flag"
                  src={country.flag}
                  alt=""
                />
                {country.name}
              </span>
            </span>
            <h2 id="application-title">{t("formTitle")}</h2>
            <p id="application-description" className="dialog-subtitle">
              {t("formSubtitle")}
            </p>
            <form className="application-form" onSubmit={submit} noValidate>
              <input type="hidden" {...register("countryCode")} />
              <input type="hidden" {...register("countryName")} />
              <input type="hidden" {...register("language")} />
              <label>
                {t("fullName")}
                <input
                  autoComplete="name"
                  placeholder="Samira B."
                  aria-invalid={Boolean(errors.fullName)}
                  aria-describedby={
                    errors.fullName ? "fullName-error" : undefined
                  }
                  {...register("fullName")}
                />
                {fieldError("fullName") && (
                  <small id="fullName-error" className="field-error">
                    {fieldError("fullName")}
                  </small>
                )}
              </label>
              <label>
                {t("email")}
                <input
                  type="email"
                  autoComplete="email"
                  placeholder="samira@email.com"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  {...register("email")}
                />
                {fieldError("email") && (
                  <small id="email-error" className="field-error">
                    {fieldError("email")}
                  </small>
                )}
              </label>
              <div className="form-two-col">
                <label>
                  {t("phone")}
                  <input
                    type="tel"
                    autoComplete="tel"
                    placeholder="+213 555 00 00 00"
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                    {...register("phone")}
                  />
                  {fieldError("phone") && (
                    <small id="phone-error" className="field-error">
                      {fieldError("phone")}
                    </small>
                  )}
                </label>
                <label>
                  {t("travelDate")}
                  <input
                    type="date"
                    aria-invalid={Boolean(errors.travelDate)}
                    aria-describedby={
                      errors.travelDate ? "travelDate-error" : undefined
                    }
                    {...register("travelDate")}
                  />
                  {fieldError("travelDate") && (
                    <small id="travelDate-error" className="field-error">
                      {fieldError("travelDate")}
                    </small>
                  )}
                </label>
              </div>
              <label>
                {t("message")}
                <textarea
                  rows={3}
                  placeholder="…"
                  aria-invalid={Boolean(errors.message)}
                  {...register("message")}
                />
              </label>
              {submission.isError && (
                <p className="submit-error" role="alert">
                  {t("error")}
                </p>
              )}
              <button
                className="button-primary submit-button"
                type="submit"
                disabled={submission.isPending}
              >
                {submission.isPending ? (
                  <>
                    <LoaderCircle
                      className="spin"
                      size={16}
                      aria-hidden="true"
                    />
                    {t("sending")}
                  </>
                ) : (
                  <>
                    {t("send")}
                    <ArrowLeft
                      size={16}
                      className="send-arrow"
                      aria-hidden="true"
                    />
                  </>
                )}
              </button>
              <p className="privacy-note">
                <span aria-hidden="true">◈</span>
                {t("privacy")}
              </p>
            </form>
          </>
        )}
      </section>
    </div>
  );
}
