import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getImageUrl } from "@/lib/image.utils";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ChevronRight, Star } from "lucide-react";

export default function CourseRow({ title, icon, courses }: { title: string; icon: any; courses: any[] }) {
    return (
    <div className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 flex items-center justify-center bg-gray-100 rounded-lg">
            {icon}
          </div>
          <h3 className="text-2xl font-bold text-gray-900">{title}</h3>
        </div>
        <Link href="/courses" className="flex items-center gap-1 text-primary font-bold hover:underline">
          SEE ALL <ChevronRight size={20} />
        </Link>
      </div>
      <div className="flex flex-col lg:flex-row gap-8 items-stretch"> 
        <div className=" w-full">
          { 
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {courses.map((course: any) => (
                <div key={course._id} className="bg-white rounded-3xl overflow-hidden shadow-xl p-6 border border-gray-50 flex flex-col">
                  <div className="relative h-40 w-full rounded-2xl overflow-hidden mb-4">
                    <Image 
                      src={getImageUrl(course.imageCover, 'courses')} 
                      alt={course.title} 
                      fill
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{course.title}</h4>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                    {course.description}
                  </p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-1">
                       {[...Array(5)].map((_, i) => <Star key={i} size={14} className={cn("fill-amber-400 text-amber-400", i >= (course.ratingsAverage || 5) && "fill-gray-200 text-gray-200")} />)}
                    </div>
                    <span className="text-lg font-bold text-gray-900">${course.price}</span>
                  </div>
                  <Link href={`/courses/${course._id}`} className="mt-4">
                    <Button className="w-full rounded-full bg-white border-primary border text-primary hover:bg-primary hover:text-white transition-colors h-10 uppercase font-bold tracking-wider text-xs cursor-pointer">
                      Explore
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          }
        </div>
      </div>
    </div>
  )
}