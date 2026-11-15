"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { models, references, type Model } from "@/lib/catalog";
import { studioEmail, type Locale } from "@/lib/site";
import { openOrder, OrderButtons } from "./order-controls";
import { Arrow } from "./studio-shell-icons";

const copy = {
  ka: {
    models: "ჩვენი მოდელები",
    modelsDescription: "ნახე, როგორ იცვლება ყვავილი სხვადასხვა ფერში და შეარჩიე შენი ვარიანტი.",
    references: "შთაგონება ბუნებიდან",
    referencesDescription: "შეარჩიე ყვავილი, რომლის მიხედვითაც შენთვის ფორმას შევქმნით.",
    seeAll: "ყველა მოდელის ნახვა",
    seeLess: "ნაკლები მოდელის ჩვენება",
    pick: "არჩევა",
    chosen: "არჩეულია",
    colors: "ფერები",
    title: "შექმენი შენი ყვავილი",
    description: "შეავსე დეტალები. საიტი მოამზადებს ტექსტს, რომელსაც WhatsApp-ში ან ელფოსტით გამოგვიგზავნი.",
    inspiration: "შთაგონება",
    modes: { custom: "ჩემი იდეა", model: "სტუდიის მოდელი", reference: "ყვავილი ბუნებიდან" },
    idea: "როგორ წარმოგიდგენია შენი ყვავილი?",
    ideaHint: "მაგალითად, ღია ვარდისფერი მაგნოლია ვიტრინისთვის",
    model: "მოდელი",
    reference: "ყვავილი",
    color: "ფერი",
    diameter: "დიამეტრი",
    noSize: "შევათანხმოთ",
    unit: "სმ",
    finish: "ზედაპირი",
    finishes: ["შევათანხმოთ", "მქრქალი", "სატინისებრი", "მეტალის აქცენტებით"],
    deadline: "სასურველი თარიღი",
    city: "ქალაქი ან რეგიონი",
    budget: "სავარაუდო ბიუჯეტი (₾)",
    details: "დამატებითი დეტალები",
    hint: "ფოტოს დამატებას შეძლებ WhatsApp-ის ჩატში ან წერილში.",
    subject: "ყვავილის შეკვეთა · მეკოს სტუდია",
    greeting: "გამარჯობა! მსურს ყვავილის შეკვეთა.",
  },
  en: {
    models: "Studio collection",
    modelsDescription: "See each design in different colours and choose the one you like.",
    references: "Natural inspirations",
    referencesDescription: "Choose a real flower as the starting point for your piece.",
    seeAll: "View all designs",
    seeLess: "Show fewer designs",
    pick: "Choose",
    chosen: "Selected",
    colors: "Colours",
    title: "Design your flower",
    description: "Add a few details to prepare a message you can send by WhatsApp or email.",
    inspiration: "Inspiration",
    modes: { custom: "My own idea", model: "Studio design", reference: "A real flower" },
    idea: "What do you have in mind?",
    ideaHint: "For example, a pale pink magnolia for a shop window",
    model: "Design",
    reference: "Flower",
    color: "Colour",
    diameter: "Diameter",
    noSize: "To be discussed",
    unit: "cm",
    finish: "Finish",
    finishes: ["To be discussed", "Matte", "Satin", "Metallic accents"],
    deadline: "Preferred date",
    city: "City or region",
    budget: "Estimated budget (GEL)",
    details: "Additional details",
    hint: "You can attach photos in WhatsApp or in your email draft.",
    subject: "Flower commission · Meko’s Studio",
    greeting: "Hello! I’d like to commission a flower.",
  },
};

type ArtCopy = (typeof copy)[Locale];
type Inspiration = keyof ArtCopy["modes"];
const catalogSizes = "(max-width: 460px) 44vw, (max-width: 960px) 31vw, (max-width: 1520px) 24vw, 340px";
const featuredCount = 8;

export function FlowerOrders({ locale }: { locale: Locale }) {
  const text = copy[locale];
  const [mode, setMode] = useState<Inspiration>("custom");
  const [modelId, setModelId] = useState(models[0].id);
  const [variants, setVariants] = useState<Record<string, number>>({});
  const [referenceIndex, setReferenceIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const model = models.find((item) => item.id === modelId) ?? models[0];
  const variant = model.variants[variants[model.id] ?? 0];
  const reference = references[referenceIndex];
  const preview = mode === "model" ? { name: model.name, image: variant.image } : mode === "reference" ? reference : null;

  function goToOrder() {
    const order = document.getElementById("order");
    order?.focus({ preventScroll: true });
    order?.scrollIntoView({ block: "start" });
  }

  function setVariant(id: string, index: number) {
    setVariants((current) => ({ ...current, [id]: index }));
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    const data = new FormData(event.currentTarget);
    const rows = [
      [text.inspiration, text.modes[mode]],
      [text.model, mode === "model" ? model.name[locale] : ""],
      [text.color, mode === "model" ? variant.name[locale] : ""],
      [text.reference, mode === "reference" ? reference.name[locale] : ""],
      [text.idea, data.get("idea")],
      [text.diameter, data.get("diameter")],
      [text.finish, data.get("finish")],
      [text.deadline, data.get("date")],
      [text.city, data.get("city")],
      [text.budget, data.get("budget")],
      [text.details, data.get("details")],
    ];
    const message = [text.greeting, ...rows.filter(([, value]) => String(value ?? "").trim()).map(([label, value]) => `${label}: ${String(value).trim()}`)];
    openOrder(event, studioEmail, text.subject, message.join("\n"));
  }

  function renderModel(item: Model) {
    return (
      <ModelCard key={item.id} locale={locale} model={item} index={variants[item.id] ?? 0}
        onColor={(index) => setVariant(item.id, index)} selected={mode === "model" && modelId === item.id}
        onChoose={() => { setModelId(item.id); setMode("model"); goToOrder(); }} />
    );
  }

  return (
    <>
      <section className="section-space frame" id="models">
        <div className="section-heading"><h2>{text.models}</h2><p>{text.modelsDescription}</p></div>
        <div className="model-grid">{models.slice(0, featuredCount).map(renderModel)}</div>
        <div className="model-grid more-models" id="more-models" hidden={!expanded}>{models.slice(featuredCount).map(renderModel)}</div>
        <button className="button button-outline browse-more" type="button" aria-expanded={expanded} aria-controls="more-models" onClick={() => setExpanded(!expanded)}>
          {expanded ? text.seeLess : text.seeAll} <span aria-hidden="true">{expanded ? "−" : "+"}</span>
        </button>
      </section>
      <section className="section-space frame" id="inspiration">
        <div className="section-heading"><h2>{text.references}</h2><p>{text.referencesDescription}</p></div>
        <div className="reference-grid">
          {references.map((item, index) => (
            <button className="reference-card" key={item.image} type="button" aria-pressed={mode === "reference" && index === referenceIndex}
              onClick={() => { setReferenceIndex(index); setMode("reference"); goToOrder(); }}>
              <span className="reference-image"><Image src={item.image} alt="" fill sizes="(max-width: 520px) 28vw, (max-width: 900px) 22vw, 13vw" /></span>
              <span>{item.name[locale]}</span>
            </button>
          ))}
        </div>
      </section>
      <section className="section-space frame" id="order" tabIndex={-1}>
        <div className="order-panel">
          <div className="order-intro">
            <h2>{text.title}</h2><p>{text.description}</p>
            {preview && <div className="order-preview"><Image src={preview.image} alt={preview.name[locale]} fill sizes="(max-width: 680px) 75vw, 340px" /></div>}
          </div>
          <form className="order-form" onSubmit={submit}>
            <label className="full-field">{text.inspiration}
              <select name="mode" value={mode} onChange={(event) => setMode(event.target.value as Inspiration)}>
                {Object.entries(text.modes).map(([key, label]) => <option key={key} value={key}>{label}</option>)}
              </select>
            </label>
            {mode === "custom" && <label className="full-field">{text.idea}<textarea name="idea" rows={3} placeholder={text.ideaHint} maxLength={400} required /></label>}
            {mode === "model" && <>
              <label>{text.model}<select value={modelId} onChange={(event) => setModelId(event.target.value)}>
                {models.map((item) => <option value={item.id} key={item.id}>{item.name[locale]}</option>)}
              </select></label>
              <label>{text.color}<select value={variants[model.id] ?? 0} onChange={(event) => setVariant(model.id, Number(event.target.value))}>
                {model.variants.map((item, index) => <option value={index} key={item.image}>{item.name[locale]}</option>)}
              </select></label>
            </>}
            {mode === "reference" && <label className="full-field">{text.reference}<select value={referenceIndex} onChange={(event) => setReferenceIndex(Number(event.target.value))}>
              {references.map((item, index) => <option value={index} key={item.image}>{item.name[locale]}</option>)}
            </select></label>}
            <label>{text.diameter}<select name="diameter"><option value="">{text.noSize}</option>
              {[30, 40, 50, 80, 120, 150].map((size) => <option key={size}>{size} {text.unit}</option>)}
            </select></label>
            <label>{text.finish}<select name="finish">
              {text.finishes.map((finish, index) => <option key={finish} value={index === 0 ? "" : finish}>{finish}</option>)}
            </select></label>
            <label>{text.deadline}<input name="date" type="date" /></label>
            <label>{text.city}<input name="city" maxLength={80} /></label>
            {mode === "custom" && <label className="full-field">{text.budget}<input name="budget" type="number" min="0" step="1" /></label>}
            <label className="full-field">{text.details}<textarea name="details" rows={3} maxLength={400} /></label>
            <OrderButtons locale={locale} />
            <p className="field-note full-field">{text.hint}</p>
          </form>
        </div>
      </section>
    </>
  );
}

function ModelCard({ locale, model, index, selected, onColor, onChoose }: {
  locale: Locale; model: Model; index: number; selected: boolean; onColor: (index: number) => void; onChoose: () => void;
}) {
  const text = copy[locale];
  const name = model.name[locale];
  const variant = model.variants[index];

  return (
    <article className="model-card">
      <div className="model-image"><Image src={variant.image} alt={`${name} · ${variant.name[locale]}`} fill sizes={catalogSizes} /></div>
      <div className="model-info">
        <h3>{name}</h3>
        <div className="swatches" role="group" aria-label={`${name} · ${text.colors}`}>
          {model.variants.map((color, swatchIndex) => (
            <button className="swatch" type="button" key={color.image} aria-label={color.name[locale]} aria-pressed={index === swatchIndex} title={color.name[locale]} onClick={() => onColor(swatchIndex)}>
              <span style={{ backgroundColor: color.hex }} />
            </button>
          ))}
        </div>
        <button className="text-link model-choose" type="button" onClick={onChoose} aria-label={`${selected ? text.chosen : text.pick} · ${name}`}>
          {selected ? text.chosen : text.pick} <Arrow diagonal />
        </button>
      </div>
    </article>
  );
}
