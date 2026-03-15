import AnnouncementStrip from "@/components/AnnouncementStrip/AnnouncementStrip";
import FeaturesBar from "@/components/FeaturesBar/FeaturesBar";

export default function InfoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AnnouncementStrip />
      {children}
      <FeaturesBar />
    </>
  );
}
