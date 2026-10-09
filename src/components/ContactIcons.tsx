type ContactIconName = "mail" | "message" | "lock";

export function ContactIcon({ name }: { name: ContactIconName }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      {name === "mail" ? (
        <>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m4 7 8 6 8-6" />
        </>
      ) : name === "message" ? (
        <path d="M20 11.5a7.5 7.5 0 0 1-7.5 7.5 8 8 0 0 1-3.4-.8L4 20l1.8-4.4a8 8 0 0 1-.8-3.6A7.5 7.5 0 0 1 12.5 4h.1a7.4 7.4 0 0 1 7.4 7.4v.1Z" />
      ) : (
        <>
          <rect x="4" y="10" width="16" height="11" rx="2" />
          <path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" />
        </>
      )}
    </svg>
  );
}

export function ChevronIcon() {
  return (
    <svg className="link-chevron" aria-hidden="true" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="m7.5 4.5 5.5 5.5-5.5 5.5" />
    </svg>
  );
}
