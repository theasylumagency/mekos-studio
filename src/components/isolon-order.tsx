"use client";

import Image from "next/image";
import { useState, type CSSProperties, type FormEvent } from "react";
import { rollColors } from "@/lib/catalog";
import { inboxEmail, type Locale } from "@/lib/site";
import { openOrder, OrderButtons } from "./order-controls";
import { Stripes } from "./stripes";

const copy = {
  ka: {
    wall: "ფერების კედელი",
    wallDescription: "12 ფერი, ერთი მასალა. დააჭირე ზოლს და ნახე რულონი.",
    title: "იზოლონის რულონები",
    description: "იზოლონი მოქნილი პოლიეთილენის ქაფია. თბილი ჰაერით ფორმას ადვილად იღებს და ინარჩუნებს მოცულობას.",
    dimensions: [["სიგრძე", "10 მ"], ["სიგანე", "0,75 მ"], ["სისქე", "2 მმ"]],
    color: "ფერი",
    quantity: "რულონების რაოდენობა",
    fewer: "ერთით ნაკლები",
    more: "ერთით მეტი",
    note: "ფასი ფერსა და რაოდენობაზეა დამოკიდებული. მოგვწერე და ფასს დაგიზუსტებთ.",
    subject: "იზოლონის რულონების შეკვეთა",
    greeting: "გამარჯობა! მსურს 2 მმ სისქის იზოლონის რულონების შეკვეთა.",
  },
  en: {
    wall: "The colour wall",
    wallDescription: "Twelve colours, one material. Tap a ribbon to see the roll.",
    title: "Isolon rolls",
    description: "Isolon is a flexible polyethylene foam. It is easy to shape with warm air and holds its volume once formed.",
    dimensions: [["Length", "10 m"], ["Width", "0.75 m"], ["Thickness", "2 mm"]],
    color: "Colour",
    quantity: "Number of rolls",
    fewer: "One fewer",
    more: "One more",
    note: "Prices depend on colour and quantity. Send us your selection for a quote.",
    subject: "Isolon roll enquiry",
    greeting: "Hello! I’d like to enquire about 2 mm Isolon rolls.",
  },
};

/** Resting length of each ribbon on the wall, in px — irregular on purpose, like cut strips. */
const ribbonLengths = [210, 150, 250, 180, 230, 140, 220, 165, 245, 155, 200, 175];

/** Wall order: light to dark around the colour wheel, echoing the fan in the hero. Indexes into rollColors. */
const spectrum = [3, 1, 0, 2, 7, 5, 11, 9, 4, 8, 10, 6];

export function IsolonOrder({ locale }: { locale: Locale }) {
  const text = copy[locale];
  const [selected, setSelected] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const color = rollColors[selected];

  function choose(index: number) {
    setSelected(index);
    document.getElementById("isolon")?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    openOrder(event, inboxEmail, text.subject, `${text.greeting}\n${text.color}: ${color.name[locale]}\n${text.quantity}: ${quantity}`);
  }

  return (
    <>
      <section className="section-space frame" id="colors">
        <div className="section-heading"><h2>{text.wall}</h2><p>{text.wallDescription}</p></div>
        <div className="color-wall" role="group" aria-label={text.color}>
          {spectrum.map((index, position) => {
            const choice = rollColors[index];
            return (
              <button className="ribbon" type="button" key={choice.image} aria-pressed={index === selected} onClick={() => choose(index)}
                style={{ "--c": choice.hex, "--i": position, "--len": `${ribbonLengths[position % ribbonLengths.length]}px` } as CSSProperties}>
                <span className="ribbon-strip" aria-hidden="true" />
                <span className="ribbon-name">{choice.name[locale]}</span>
              </button>
            );
          })}
        </div>
      </section>
      <section className="section-space frame" id="isolon">
        <div className="stage roll-stage" style={{ "--tint": color.hex } as CSSProperties}>
          <div className="stage-image">
            <Image key={color.image} src={color.image} alt={`${text.title} · ${color.name[locale]}`} fill sizes="(max-width: 760px) 100vw, 56vw" />
          </div>
          <div className="stage-info">
            <Stripes className="stage-stripes" />
            <h2 className="stage-name">{text.title}</h2>
            <p className="stage-color" aria-live="polite">{color.name[locale]}</p>
            <p className="roll-description">{text.description}</p>
            <dl className="roll-specs">
              {text.dimensions.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
            </dl>
            <form className="roll-form" onSubmit={submit}>
              <fieldset>
                <legend>{text.color}</legend>
                <div className="swatches">
                  {spectrum.map((index) => {
                    const choice = rollColors[index];
                    return (
                      <label className="swatch roll-swatch" key={choice.image} title={choice.name[locale]}>
                        <input name="roll-color" type="radio" aria-label={choice.name[locale]} checked={selected === index} onChange={() => setSelected(index)} />
                        <span style={{ backgroundColor: choice.hex }} />
                      </label>
                    );
                  })}
                </div>
              </fieldset>
              <div className="quantity-field">
                <label htmlFor="roll-quantity">{text.quantity}</label>
                <div className="stepper">
                  <button type="button" aria-label={text.fewer} onClick={() => setQuantity((current) => Math.max(1, current - 1))} disabled={quantity <= 1}>−</button>
                  <input id="roll-quantity" name="quantity" type="number" min="1" step="1" required value={quantity}
                    onChange={(event) => setQuantity(Math.max(1, Math.floor(Number(event.target.value)) || 1))} />
                  <button type="button" aria-label={text.more} onClick={() => setQuantity((current) => current + 1)}>+</button>
                </div>
              </div>
              <OrderButtons locale={locale} />
              <p className="field-note">{text.note}</p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
