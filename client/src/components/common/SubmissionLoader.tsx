import { createPortal } from "react-dom";

export default function SubmissionLoader({ label }: { label: string }) {
  return createPortal(
    <div className="submission-loader" role="status" aria-live="polite">
      <img src="/logo.png" alt="VisaDZD" className="submission-loader-logo" />
      <span className="submission-loader-dots" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <span className="sr-only">{label}</span>
    </div>,
    document.body,
  );
}
