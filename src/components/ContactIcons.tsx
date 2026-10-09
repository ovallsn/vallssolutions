type ContactIconName = "mail" | "message" | "lock";

export type FormationServiceIconName =
  | "formation"
  | "ein"
  | "agent"
  | "address"
  | "website"
  | "banking";

export function FormationServiceIcon({
  name,
}: {
  name: FormationServiceIconName;
}) {
  return (
    <svg
      className="service-icon"
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.55"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {name === "formation" ? (
        <>
          <path d="M6 3.75h7l5 5v11.5H6z" />
          <path d="M13 3.75v5h5M9 13h6M9 16.5h6" />
        </>
      ) : name === "ein" ? (
        <>
          <rect x="3.5" y="5.5" width="17" height="13" rx="1.5" />
          <circle cx="8.3" cy="11" r="1.65" />
          <path d="M6 15c.65-1.1 1.45-1.6 2.3-1.6s1.65.5 2.3 1.6M13 10h4M13 13h4" />
        </>
      ) : name === "agent" ? (
        <>
          <circle cx="12" cy="7.5" r="3.25" />
          <path d="M5.5 20c.55-3.7 2.7-5.75 6.5-5.75s5.95 2.05 6.5 5.75" />
        </>
      ) : name === "address" ? (
        <>
          <path d="M19 10.25c0 5-7 10.5-7 10.5s-7-5.5-7-10.5a7 7 0 1 1 14 0Z" />
          <circle cx="12" cy="10" r="2.25" />
        </>
      ) : name === "website" ? (
        <>
          <rect x="3.5" y="4.5" width="17" height="15" rx="1.5" />
          <path d="M3.75 8.25h16.5M7 6.35h.01M9.5 6.35h.01M7 12h4.5M7 15.25h8" />
        </>
      ) : (
        <>
          <path d="M3.5 9h17L12 4zM4.5 19.5h15M3.5 21h17M6.5 9v10.5M11 9v10.5M15.5 9v10.5M20 9v10.5" />
        </>
      )}
    </svg>
  );
}

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
