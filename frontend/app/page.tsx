import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { Stats } from "@/components/landing/stats";
import { CloudSoftware } from "@/components/landing/cloud-software";
import { WhatIsTOTC } from "@/components/landing/what-is-totc";
import { ClassroomExperience } from "@/components/landing/classroom-experience";
import { Features } from "@/components/landing/features";
import { ExploreCourse } from "@/components/landing/explore-course";
import { Testimonial } from "@/components/landing/testimonial";
import { News } from "@/components/landing/news";
import { Footer } from "@/components/landing/footer";

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
