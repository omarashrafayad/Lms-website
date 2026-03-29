import { Hero } from "@/features/main/home/components/hero";
import { Stats } from "@/features/main/home/components/stats";
import { CloudSoftware } from "@/features/main/home/components/cloud-software";
import { WhatIsTOTC } from "@/features/main/home/components/what-is-totc";
import { Features } from "@/features/main/home/components/features";
import { ExploreCourse } from "@/features/main/home/components/explore-course";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <main>
        <Hero />
        <Stats />
        <CloudSoftware />
        <WhatIsTOTC />
        <Features />
        <ExploreCourse />
      </main>
    </div>
  );
}
