import { getPageMetadata, StudioView } from "@/components/studio-view";

export const metadata = getPageMetadata("ka", "home");

export default function Home() {
  return <StudioView locale="ka" page="home" />;
}
