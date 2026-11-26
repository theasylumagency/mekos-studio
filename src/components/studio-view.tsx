import Image from "next/image";
import Link from "next/link";
import { content, pageImages, projectImages } from "@/lib/content";
import { pagePath, studioMetadata, whatsAppLink, type Locale, type Section, type StudioPage } from "@/lib/site";
import { StudioFooter, StudioHeader } from "./studio-shell";
import { Arrow } from "./studio-shell-icons";
import { HeroLoop } from "./hero-loop";
import { Stripes } from "./stripes";
import { CompositionIcon } from "./composition-icon";
import { ProjectGallery } from "./project-gallery";
import { FlowerOrders } from "./flower-orders";
import { IsolonOrder } from "./isolon-order";

const photo = (file: string) => `/studio/${file}`;
const heroSizes = "(max-width: 760px) 100vw, (max-width: 1480px) 56vw, 760px";

export function getPageMetadata(locale: Locale, page: StudioPage) {
  const { title, description } = content[locale][page];
  return studioMetadata(locale, page, title, description, photo(pageImages[page]));
}

export function StudioView({ locale, page }: { locale: Locale; page: StudioPage }) {
  return (
    <>
      <StudioHeader locale={locale} page={page} />
      <main id="main" tabIndex={-1}>
        {page === "home" ? <Home locale={locale} /> : <SectionView locale={locale} section={page} />}
      </main>
      <StudioFooter locale={locale} />
    </>
  );
}

function Home({ locale }: { locale: Locale }) {
  const copy = content[locale];
  const { home } = copy;
  const features = [
    { section: "art", image: "prtfolio/prtfoli1.webp", alt: copy.workshop.gallery[0] },
    { section: "formation", image: pageImages.formation, alt: copy.formation.photo },
    { section: "isolon", image: pageImages.isolon, alt: copy.isolon.photo },
  ] as const;

  return (
    <>
      <section className="home-hero" aria-labelledby="home-title">
        <HeroLoop wide={{ src: photo("hero-loop.mp4"), poster: photo("hero-poster.webp") }} tall={{ src: photo("hero-loop-mobile.mp4"), poster: photo("hero-poster-mobile.webp") }} />
        <div className="glass-panel">
          <Stripes className="hero-stripes" />
          <p className="eyebrow">{home.eyebrow}</p>
          <h1 id="home-title">{home.lines[0]}<br />{home.lines[1]}</h1>
          <p className="hero-description">{home.description}</p>
          <div className="actions">
            <Link className="button button-on-dark" href={pagePath(locale, "art")}>{home.primary} <Arrow /></Link>
            <Link className="text-link" href={pagePath(locale, "formation")}>{home.secondary} <Arrow diagonal /></Link>
          </div>
        </div>
      </section>
      <section className="section-space frame" aria-labelledby="explore-title">
        <div className="section-heading section-heading-rule">
          <h2 id="explore-title">{home.explore}</h2>
          <Link className="text-link" href={pagePath(locale, "about")}>{copy.about.nav} <Arrow diagonal /></Link>
        </div>
        <div className="feature-grid hang-grid">
          {features.map(({ section, image, alt }) => (
            <Link className="feature" href={pagePath(locale, section)} key={section}>
              <div className="feature-image"><Image src={photo(image)} alt={alt} fill sizes="(max-width: 620px) 100vw, 33vw" /></div>
              <div className="feature-title"><h3>{copy[section].title}</h3><Arrow diagonal /></div>
              <p>{copy[section].teaser}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}

function SectionView({ locale, section }: { locale: Locale; section: Section }) {
  const copy = content[locale][section];
  const links = {
    art: ["#models", "#order"],
    formation: ["#consult", "#process"],
    isolon: ["#colors"],
    about: ["#portfolio", `${pagePath(locale, "art")}#order`],
  }[section];

  return (
    <>
      {section === "art" || section === "isolon" ? <WideHero locale={locale} section={section} links={links} /> : <section className={`page-hero page-hero-${section} frame`} aria-labelledby="page-title">
        <div className="page-hero-copy">
          <Stripes className="copy-stripes" />
          <p className="eyebrow">{copy.title}</p>
          <h1 id="page-title">{copy.heading}</h1>
          <p className="hero-description">{copy.description}</p>
          <div className="actions">
            <a className="button" href={links[0]}>{copy.cta} <Arrow /></a>
            {"secondary" in copy && <Link className="text-link" href={links[1]}>{copy.secondary} <Arrow diagonal /></Link>}
          </div>
        </div>
        <div className="page-hero-image">
          <Image src={photo(pageImages[section])} alt={copy.photo} fill sizes={heroSizes} preload />
        </div>
      </section>}
      {section === "art" && <FlowerOrders locale={locale} />}
      {section === "isolon" && <IsolonOrder locale={locale} />}
      {section === "formation" && <Installations locale={locale} />}
      {section === "about" && <About locale={locale} />}
    </>
  );
}

function WideHero({ locale, section, links }: { locale: Locale; section: "art" | "isolon"; links: string[] }) {
  const copy = content[locale][section];

  return (
    <section className={`wide-hero wide-hero-${section}`} aria-labelledby="page-title">
      <div className="wide-hero-media">
        <Image src={photo(pageImages[section])} alt={copy.photo} fill sizes="100vw" preload />
      </div>
      <div className="wide-hero-inner frame">
        <div className="glass-panel">
          <Stripes className="hero-stripes" />
          <p className="eyebrow">{copy.title}</p>
          <h1 id="page-title">{copy.heading}</h1>
          <p className="hero-description">{copy.description}</p>
          <div className="actions">
            <a className="button button-on-dark" href={links[0]}>{copy.cta} <Arrow /></a>
            {"secondary" in copy && <a className="text-link" href={links[1]}>{copy.secondary} <Arrow diagonal /></a>}
          </div>
        </div>
      </div>
    </section>
  );
}

function Gallery({ images, captions, className = "", children }: { images: string[]; captions: string[]; className?: string; children?: (index: number) => React.ReactNode }) {
  return (
    <div className={`photo-grid ${className}`}>
      {images.map((image, index) => (
        <figure key={image}>
          <div className="gallery-image">
            <Image src={photo(image)} alt={captions[index]} fill sizes="(max-width: 600px) 86vw, (max-width: 900px) 50vw, 34vw" />
            {children?.(index)}
          </div>
          <figcaption>{captions[index]}</figcaption>
        </figure>
      ))}
    </div>
  );
}

function Installations({ locale }: { locale: Locale }) {
  const { installations: copy, openWhatsApp } = content[locale];

  return (
    <>
      <section className="section-space frame" aria-labelledby="designs-title">
        <h2 className="section-heading" id="designs-title">{copy.types}</h2>
        <div className="design-grid">
          {copy.designs.map(([title, description], index) => (
            <article key={title}>
              <div className="design-figure"><CompositionIcon kind={index as 0 | 1 | 2 | 3} /></div>
              <h3>{title}</h3><p>{description}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section-space frame" id="projects">
        <div className="section-heading"><h2>{copy.projects}</h2><p>{copy.projectsText}</p></div>
        <ProjectGallery
          projects={projectImages.map((item, index) => ({ ...item, src: photo(item.src), caption: copy.projectCaptions[index] }))}
          labels={{ open: copy.open, close: copy.close, previous: copy.previous, next: copy.next }} />
      </section>
      <section className="section-space frame" id="gallery">
        <h2 className="section-heading">{copy.gallery}</h2>
        <Gallery images={["space-formation-2.webp", "space-formation-hero.webp"]} captions={copy.photos} className="photo-grid-pair">
          {(index) => index === 1 && (
            <span className="dimension" aria-hidden="true"><span className="dimension-label">{copy.scale}</span></span>
          )}
        </Gallery>
      </section>
      <StudioProcess locale={locale} />
      <section className="section-space frame split-notes">
        <h2>{copy.specs}</h2>
        <dl className="detail-list">
          {copy.details.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
        </dl>
      </section>
      <section className="section-space frame" id="consult">
        <div className="callout">
          <Stripes className="panel-stripes" />
          <div><h2>{copy.contactTitle}</h2><p>{copy.contactDescription}</p></div>
          <a className="button" href={whatsAppLink(copy.message)} target="_blank" rel="noopener noreferrer">{openWhatsApp} <Arrow diagonal /></a>
        </div>
      </section>
    </>
  );
}

function StudioProcess({ locale }: { locale: Locale }) {
  const { process, steps } = content[locale].installations;

  return (
    <section className="section-space frame" id="process" aria-labelledby="process-title">
      <div className="section-heading section-heading-rule"><h2 id="process-title">{process}</h2></div>
      <ol className="feature-grid hang-grid step-cards">
        {steps.map(([title, description], index) => (
          <li key={title}>
            <span className="step-number">{String(index + 1).padStart(2, "0")}</span>
            <h3>{title}</h3><p>{description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

function About({ locale }: { locale: Locale }) {
  const { workshop: copy } = content[locale];
  const notes = [[copy.material, copy.materialText, "why"], [copy.placements, copy.placementsText, "placements"], [copy.care, copy.careText, "care"]];

  return (
    <>
      <section className="section-space frame" id="portfolio">
        <h2 className="section-heading">{copy.portfolio}</h2>
        <Gallery images={copy.gallery.map((_, index) => `prtfolio/prtfoli${index + 1}.webp`)} captions={copy.gallery} className="photo-grid-portfolio" />
      </section>
      <section className="section-space frame" id="craft">
        <div className="section-heading"><h2>{copy.craft}</h2><p>{copy.craftText}</p></div>
        <Gallery images={["prtfolio/birth1.webp", "prtfolio/birth2.webp", "prtfolio/birth3.webp"]} captions={copy.craftPhotos} className="photo-grid-sequence">
          {(index) => <span className="sequence-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>}
        </Gallery>
      </section>
      <StudioProcess locale={locale} />
      <section className="section-space frame note-columns">
        {notes.map(([title, text, id]) => <div key={id} id={id}><h2>{title}</h2><p>{text}</p></div>)}
      </section>
      <section className="section-space frame split-notes" id="faq">
        <h2>{copy.faq}</h2>
        <div className="faq-list">
          {copy.questions.map(([question, answer]) => (
            <details key={question}><summary>{question}</summary><p>{answer}</p></details>
          ))}
        </div>
      </section>
    </>
  );
}
