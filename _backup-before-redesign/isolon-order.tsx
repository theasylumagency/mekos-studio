"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { rollColors } from "@/lib/catalog";
import { rollsEmail, type Locale } from "@/lib/site";
import { openOrder, OrderButtons } from "./order-controls";

const copy = {
  ka: {
    title: "იზოლონის რულონები",
    description: "იზოლონი მოქნილი პოლიეთილენის ქაფია. თბილი ჰაერით ფორმას ადვილად იღებს და ინარჩუნებს მოცულობას.",
    dimensions: [["სიგრძე", "10 მ"], ["სიგანე", "0,75 მ"], ["სისქე", "2 მმ"]],
    color: "ფერი",
    quantity: "რულონების რაოდენობა",
    note: "ფასი ფერსა და რაოდენობაზეა დამოკიდებული. მოგვწერე და ფასს დაგიზუსტებთ.",
    subject: "იზოლონის რულონების შეკვეთა",
    greeting: "გამარჯობა! მსურს 2 მმ სისქის იზოლონის რულონების შეკვეთა.",
  },
  en: {
    title: "Isolon rolls",
    description: "Isolon is a flexible polyethylene foam. It is easy to shape with warm air and holds its volume once formed.",
    dimensions: [["Length", "10 m"], ["Width", "0.75 m"], ["Thickness", "2 mm"]],
    color: "Colour",
    quantity: "Number of rolls",
    note: "Prices depend on colour and quantity. Send us your selection for a quote.",
    subject: "Isolon roll enquiry",
    greeting: "Hello! I’d like to enquire about 2 mm Isolon rolls.",
  },
};

export function IsolonOrder({ locale }: { locale: Locale }) {
  const text = copy[locale];
  const [selected, setSelected] = useState(0);
  const color = rollColors[selected];

  function submit(event: FormEvent<HTMLFormElement>) {
    const quantity = new FormData(event.currentTarget).get("quantity");
    openOrder(event, rollsEmail, text.subject, `${text.greeting}\n${text.color}: ${color.name[locale]}\n${text.quantity}: ${quantity}`);
  }

  return (
    <section className="section-space frame" id="isolon">
      <div className="roll-panel">
        <div className="roll-image"><Image src={color.image} alt={`${text.title} · ${color.name[locale]}`} fill sizes="(max-width: 720px) 90vw, 45vw" /></div>
        <div className="roll-copy">
          <h2>{text.title}</h2><p>{text.description}</p>
          <dl className="roll-specs">
            {text.dimensions.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
          </dl>
          <form className="roll-form" onSubmit={submit}>
            <fieldset>
              <legend>{text.color}</legend>
              <div className="swatches">
                {rollColors.map((choice, index) => (
                  <label className="swatch roll-swatch" key={choice.image} title={choice.name[locale]}>
                    <input name="roll-color" type="radio" aria-label={choice.name[locale]} checked={selected === index} onChange={() => setSelected(index)} />
                    <span style={{ backgroundColor: choice.hex }} />
                  </label>
                ))}
              </div>
              <p className="field-note" aria-live="polite">{color.name[locale]}</p>
            </fieldset>
            <label className="quantity-label">{text.quantity}<input name="quantity" type="number" min="1" step="1" defaultValue="1" required /></label>
            <OrderButtons locale={locale} />
            <p className="field-note">{text.note}</p>
          </form>
        </div>
      </div>
    </section>
  );
}
