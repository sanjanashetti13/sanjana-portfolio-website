import { profile } from "@/data/content";

export function Footer() {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--bg-soft)] py-8">
      <p className="container-main text-center text-[12.5px] text-[var(--ink-faint)] min-[900px]:pl-[90px] min-[900px]:text-left">
        Designed &amp; built by {profile.name} · {profile.email} · Hubli, Karnataka
      </p>
    </footer>
  );
}
