import { getPageMetadata, StudioView } from "@/components/studio-view";
import { isSection, sections } from "@/lib/site";
import { notFound } from "next/navigation";

export const dynamicParams = false;

export function generateStaticParams() {
  return sections.map((section) => ({ section }));
}

export async function generateMetadata({ params }: PageProps<"/[section]">) {
  const { section } = await params;
  if (!isSection(section)) notFound();
  return getPageMetadata("ka", section);
}

export default async function Section({ params }: PageProps<"/[section]">) {
  const { section } = await params;
  if (!isSection(section)) notFound();
  return <StudioView locale="ka" page={section} />;
}
