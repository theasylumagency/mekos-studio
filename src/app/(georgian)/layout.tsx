import { StudioDocument } from "@/components/studio-shell";

export default function GeorgianLayout({ children }: { children: React.ReactNode }) {
  return <StudioDocument locale="ka">{children}</StudioDocument>;
}
