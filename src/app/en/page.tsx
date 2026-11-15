import { getPageMetadata, StudioView } from "@/components/studio-view";

export const metadata = getPageMetadata("en", "home");

export default function Home() {
  return <StudioView locale="en" page="home" />;
}
