import { StudioDocument } from "@/components/studio-shell";

export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <StudioDocument locale="en">{children}</StudioDocument>;
}
