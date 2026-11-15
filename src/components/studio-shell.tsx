import Image from "next/image";
import Link from "next/link";
import { content } from "@/lib/content";
import { pagePath, sections, socialLinks, studioEmail, type Locale, type StudioPage } from "@/lib/site";
import { Arrow } from "./studio-shell-icons";
import { Stripes } from "./stripes";
import "@/app/globals.css";

export function StudioDocument({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  return <html lang={locale}><body>{children}</body></html>;
}

export function StudioHeader({ locale, page }: { locale: Locale; page: StudioPage }) {
  const copy = content[locale];
  const overlay = page === "home";

  return (
    <>
      <a className="skip-link" href="#main">{copy.skip}</a>
      <header className={overlay ? "site-header is-overlay" : "site-header"} id="top">
        <div className="site-header-inner frame">
          <Link className="brand" href={pagePath(locale)} aria-label={`${copy.studio} · ${copy.homeLabel}`}>
            <Image src={overlay ? "/studio/logo_studio_white.svg" : "/studio/logo_studio.svg"} alt="" width={118} height={58} priority />
          </Link>
          <nav className="site-nav" aria-label={copy.navigation}>
            {sections.map((section) => (
              <Link key={section} href={pagePath(locale, section)} aria-current={page === section ? "page" : undefined}>
                {copy[section].nav}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <nav className="languages" aria-label={copy.language}>
              <Link href={pagePath("ka", page)} hrefLang="ka" lang="ka" aria-label="ქართული" aria-current={locale === "ka" ? "page" : undefined}>KA</Link>
              <Link href={pagePath("en", page)} hrefLang="en" lang="en" aria-label="English" aria-current={locale === "en" ? "page" : undefined}>EN</Link>
            </nav>
            <a className="header-contact" href="#contact">{copy.contact} <Arrow diagonal /></a>
          </div>
        </div>
      </header>
    </>
  );
}

export function StudioFooter({ locale }: { locale: Locale }) {
  const copy = content[locale];

  return (
    <footer id="contact" className="site-footer">
      <div className="frame footer-frame">
        <Stripes className="footer-stripes" />
        <div className="footer-lead">
          <div>
            <h2>{copy.contactTitle}</h2>
            <p>{copy.contactDescription}</p>
          </div>
          <a className="footer-email" href={`mailto:${studioEmail}`}>{studioEmail} <Arrow diagonal /></a>
        </div>
        <div className="footer-bottom">
          <Link className="brand" href={pagePath(locale)} aria-label={`${copy.studio} · ${copy.homeLabel}`}>
            <Image src="/studio/logo_studio_white.svg" alt="" width={100} height={50} />
          </Link>
          <span>{copy.city}</span>
          <div className="social-links">
            {socialLinks.map(({ label, href }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer">{label} <Arrow diagonal /></a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
