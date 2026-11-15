import { getPageMetadata, StudioView } from "@/components/studio-view";
import { isSection, sections } from "@/lib/site";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export function generateStaticParams() {
  return sections.map((section) => ({ section }));
}

export async function generateMetadata({ params }: PageProps<"/en/[section]">) {
  const { section } = await params;
  if (!isSection(section)) notFound();
  return getPageMetadata("en", section);
}

export default async function Section({ params }: PageProps<"/en/[section]">) {
  const { section } = await params;
  if (!isSection(section)) notFound();
  return <StudioView locale="en" page={section} />;
}
