import { Navbar } from "@/features/main/home/components/navbar";
import { Hero } from "@/features/main/home/components/hero";
import { Stats } from "@/features/main/home/components/stats";
import { CloudSoftware } from "@/features/main/home/components/cloud-software";
import { WhatIsTOTC } from "@/features/main/home/components/what-is-totc";
import { ClassroomExperience } from "@/features/main/home/components/classroom-experience";
import { Features } from "@/features/main/home/components/features";
import { ExploreCourse } from "@/features/main/home/components/explore-course";
import { Testimonial } from "@/features/main/home/components/testimonial";
import { News } from "@/features/main/home/components/news";
import { Footer } from "@/features/main/home/components/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* Container for Navbar and Hero to share background */}
      <div className="bg-primary">
        <Navbar />
        <Hero />
      </div>
      
      <main>
        <Stats />
        <CloudSoftware />
        <WhatIsTOTC />
        <ClassroomExperience />
        <Features />
        <ExploreCourse />
        <Testimonial />
        <News />
      </main>

      <Footer />
    </div>
  );
}
