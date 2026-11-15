"use client";

import Image from "next/image";
import { useState, type CSSProperties, type FormEvent } from "react";
import { models, references } from "@/lib/catalog";
import { studioEmail, type Locale } from "@/lib/site";
import { openOrder, OrderButtons } from "./order-controls";
import { Arrow } from "./studio-shell-icons";
import { Stripes } from "./stripes";

const copy = {
  ka: {
    models: "ჩვენი მოდელები",
    modelsDescription: "ნახე, როგორ იცვლება ყვავილი სხვადასხვა ფერში და შეარჩიე შენი ვარიანტი.",
    references: "შთაგონება ბუნებიდან",
    referencesDescription: "შეარჩიე ყვავილი, რომლის მიხედვითაც შენთვის ფორმას შევქმნით.",
    allModels: "ყველა მოდელი",
    orderThis: "შეუკვეთე ეს მოდელი",
    previous: "წინა მოდელი",
    next: "შემდეგი მოდელი",
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
    allModels: "All designs",
    orderThis: "Order this design",
    previous: "Previous design",
    next: "Next design",
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

export function FlowerOrders({ locale }: { locale: Locale }) {
  const text = copy[locale];
  const [mode, setMode] = useState<Inspiration>("custom");
  const [modelId, setModelId] = useState(models[0].id);
  const [variants, setVariants] = useState<Record<string, number>>({});
  const [referenceIndex, setReferenceIndex] = useState(0);
  const modelIndex = Math.max(0, models.findIndex((item) => item.id === modelId));
  const model = models[modelIndex];
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

  function showModel(id: string) {
    setModelId(id);
    document.getElementById("stage")?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }

  function step(direction: number) {
    setModelId(models[(modelIndex + direction + models.length) % models.length].id);
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

  return (
    <>
      <section className="section-space frame" id="models">
        <div className="section-heading"><h2>{text.models}</h2><p>{text.modelsDescription}</p></div>
        <div className="stage" id="stage" style={{ "--tint": variant.hex } as CSSProperties}>
          <div className="stage-image">
            <Image key={variant.image} src={variant.image} alt={`${model.name[locale]} · ${variant.name[locale]}`} fill sizes="(max-width: 760px) 100vw, 56vw" />
          </div>
          <div className="stage-info">
            <Stripes className="stage-stripes" />
            <p className="stage-count">{String(modelIndex + 1).padStart(2, "0")} / {String(models.length).padStart(2, "0")}</p>
            <h3 className="stage-name" aria-live="polite">{model.name[locale]}</h3>
            <p className="stage-color">{variant.name[locale]}</p>
            <div className="swatches stage-swatches" role="group" aria-label={`${model.name[locale]} · ${text.colors}`}>
              {model.variants.map((color, index) => (
                <button className="swatch" type="button" key={color.image} aria-label={color.name[locale]} aria-pressed={(variants[model.id] ?? 0) === index} title={color.name[locale]} onClick={() => setVariant(model.id, index)}>
                  <span style={{ backgroundColor: color.hex }} />
                </button>
              ))}
            </div>
            <div className="stage-actions">
              <button className="button" type="button" onClick={() => { setMode("model"); goToOrder(); }}>{text.orderThis} <Arrow /></button>
              <div className="stage-nav">
                <button className="stage-arrow" type="button" onClick={() => step(-1)} aria-label={text.previous}>←</button>
                <button className="stage-arrow" type="button" onClick={() => step(1)} aria-label={text.next}>→</button>
              </div>
            </div>
          </div>
        </div>
        <div className="model-rail" role="group" aria-label={text.allModels}>
          {models.map((item) => {
            const shown = item.variants[variants[item.id] ?? 0];
            return (
              <button className="rail-item" type="button" key={item.id} aria-pressed={item.id === model.id} onClick={() => showModel(item.id)}>
                <span className="rail-image"><Image src={shown.image} alt="" fill sizes="(max-width: 620px) 30vw, (max-width: 1040px) 15vw, 150px" /></span>
                <span className="rail-name">{item.name[locale]}</span>
              </button>
            );
          })}
        </div>
      </section>
      <section className="section-space frame" id="inspiration">
        <div className="section-heading"><h2>{text.references}</h2><p>{text.referencesDescription}</p></div>
        {[0, 7].map((offset) => (
          <div className={offset ? "garland garland-alt" : "garland"} key={offset}>
            {references.slice(offset, offset + 7).map((item, position) => {
              const index = offset + position;
              return (
                <button className="reference-card" key={item.image} type="button" aria-pressed={mode === "reference" && index === referenceIndex}
                  onClick={() => { setReferenceIndex(index); setMode("reference"); goToOrder(); }}>
                  <span className="reference-image"><Image src={item.image} alt="" fill sizes="(max-width: 760px) 34vw, (max-width: 1040px) 14vw, 180px" /></span>
                  <span>{item.name[locale]}</span>
                </button>
              );
            })}
          </div>
        ))}
      </section>
      <section className="section-space frame" id="order" tabIndex={-1}>
        <div className="order-panel">
          <Stripes className="panel-stripes" />
          <div className="order-intro">
            <h2>{text.title}</h2><p>{text.description}</p>
            {preview && <div className="order-preview"><Image src={preview.image} alt={preview.name[locale]} fill sizes="(max-width: 680px) 75vw, 340px" /></div>}
          </div>
          <form className="order-form" onSubmit={submit}>
            <fieldset className="full-field mode-picker">
              <legend>{text.inspiration}</legend>
              {Object.entries(text.modes).map(([key, label]) => (
                <label className="mode-option" key={key}>
                  <input type="radio" name="mode" value={key} checked={mode === key} onChange={() => setMode(key as Inspiration)} />
                  <span>{label}</span>
                </label>
              ))}
            </fieldset>
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
