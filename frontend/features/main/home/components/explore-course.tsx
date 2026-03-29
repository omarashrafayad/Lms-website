"use client";

import { useTranslations } from "next-intl";
import { Globe, Layout } from "lucide-react";
import { useHome } from "../hooks/useHome";
import CourseRow from "./courseRow";
import LoadingSpinner from "@/components/shared/LoadingSpinner";
import GlobalError from "@/components/shared/globalerror";
import { motion } from "framer-motion";

export function ExploreCourse() {
  const t = useTranslations("hero");
  const { data: homeData, isLoading,error } = useHome();

  if (error) {
    return <GlobalError error={error} />
  }
  if (isLoading) {
    return <LoadingSpinner />
  }


  const newCourses = homeData?.data?.newCourses || [];
  const trendingCourses = homeData?.data?.trendingCourses || [];

  return (
    <section className="py-24 bg-background dark:bg-[#0a0b0c] transition-colors duration-300 max-md:py-12 overflow-hidden">
      <div className="container mx-auto px-6 lg:px-24 text-left rtl:text-right">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, ease: "easeOut" }}
          className="mb-16"
        >
          <h2 className="text-4xl font-bold text-foreground transition-colors">{t("exploreCourse")}</h2>
          <p className="mt-4 text-muted-foreground dark:text-slate-500 font-medium transition-colors">{t("exploreSubtitle")}</p>
        </motion.div>
        <CourseRow title={t("newCourses")} icon={<Layout className="text-muted-foreground" size={24} />} courses={newCourses} />
        <CourseRow title={t("trendingCourses")} icon={<Globe className="text-muted-foreground" size={24} />} courses={trendingCourses} />
      </div>
    </section>
  );
}
