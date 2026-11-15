"use client";

import type { FormEvent } from "react";
import { Arrow } from "./studio-shell-icons";
import { emailLink, whatsAppLink, type Locale } from "@/lib/site";

export function openOrder(event: FormEvent<HTMLFormElement>, address: string, subject: string, text: string) {
  event.preventDefault();
  const { submitter } = event.nativeEvent as SubmitEvent;
  if (submitter instanceof HTMLButtonElement && submitter.value === "email") {
    window.location.href = emailLink(address, subject, text);
  } else {
    window.open(whatsAppLink(text), "_blank", "noopener,noreferrer");
  }
}

export function OrderButtons({ locale }: { locale: Locale }) {
  return (
    <div className="actions order-actions">
      <button className="button" type="submit" value="whatsapp">
        {locale === "ka" ? "მოგვწერე WhatsApp-ში" : "Continue on WhatsApp"} <Arrow diagonal />
      </button>
      <button className="button button-outline" type="submit" value="email">
        {locale === "ka" ? "მოგვწერე ელფოსტით" : "Continue by email"} <Arrow diagonal />
      </button>
    </div>
  );
}
