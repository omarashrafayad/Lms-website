"use client";

import Image from "next/image";
import { Users, Layout, Tooltip as ToolIcon, FileCheck, MessageCircle } from "lucide-react";

export function Features() {
  const featureList = [
    {
      title: "Teachers don't get lost in the grid view and have a dedicated Podium space.",
      icon: <Layout className="text-blue-600" size={24} />,
    },
    {
      title: "TA's and presenters can be moved to the front of the class.",
      icon: <Users className="text-orange-500" size={24} />,
    },
    {
      title: "Teachers can easily see all students and class data at one time.",
      icon: <Users className="text-purple-600" size={24} />,
    },
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 lg:px-24">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-3xl font-bold text-gray-900 md:text-4xl">
            Our <span className="text-primary">Features</span>
          </h2>
          <p className="mt-4 text-gray-500">
            This very extraordinary feature, can make learning activities more efficient
          </p>
        </div>

        {/* Feature 1: UI for Classroom */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-32">
          <div className="relative w-full lg:w-3/5">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2670&auto=format&fit=crop" 
                alt="UI for Classroom" 
                fill 
                className="object-cover"
              />
            </div>
            {/* Decorative circles */}
            <div className="absolute -top-10 -left-10 h-32 w-32 bg-green-400 rounded-full -z-10 opacity-60"></div>
            <div className="absolute -bottom-5 -right-5 h-20 w-20 bg-blue-500 rounded-full -z-10 opacity-30"></div>
          </div>
          <div className="w-full lg:w-2/5 space-y-6">
            <h3 className="text-3xl font-bold text-gray-900 leading-tight">
              A <span className="text-primary tracking-tight">user interface</span> designed for the classroom
            </h3>
            <div className="space-y-6 mt-8">
              {featureList.map((item, idx) => (
                <div key={idx} className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white shadow-lg">
                    {item.icon}
                  </div>
                  <p className="text-gray-600 leading-relaxed font-medium">{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Feature 2: Tools for Teachers */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16 mb-32">
          <div className="relative w-full lg:w-1/2">
            <div className="relative aspect-square rounded-full border-[1.5rem] border-pink-100 p-8 overflow-hidden">
                <Image 
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=2574&auto=format&fit=crop" 
                  alt="Teacher Tools" 
                  fill 
                  className="object-cover scale-110"
                />
            </div>
            {/* Shapes */}
            <div className="absolute top-1/2 -left-12 -translate-y-1/2 h-24 w-24 bg-blue-100 rounded-2xl rotate-45 -z-10"></div>
            <div className="absolute bottom-4 right-12 h-6 w-6 bg-orange-400 rounded-full"></div>
          </div>
          <div className="w-full lg:w-1/2 space-y-6 text-left">
            <h3 className="text-3xl font-bold text-gray-900 leading-tight">
              <span className="text-primary tracking-tight">Tools</span> For Teachers And Learners
            </h3>
            <p className="text-lg text-gray-500 leading-relaxed">
              Class has a dynamic set of teaching tools built to be deployed and used during class. 
              Teachers can handout assignments in real-time for students to complete and submit.
            </p>
          </div>
        </div>

        {/* Feature 3: Assessments & Quizzes */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-32">
          <div className="relative w-full lg:w-1/2">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl bg-white p-4 border border-teal-50">
               <Image 
                  src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=2670&auto=format&fit=crop" 
                  alt="Assessments" 
                  fill 
                  className="object-cover"
                />
            </div>
             {/* Floating elements */}
            <div className="absolute -top-6 -right-6 h-12 w-12 bg-pink-400 rounded-full flex items-center justify-center text-white font-bold">Q1</div>
          </div>
          <div className="w-full lg:w-1/2 space-y-6">
            <h3 className="text-3xl font-bold text-gray-900 leading-tight">
              Assessments, <br />
              <span className="text-primary tracking-tight">Quizzes</span>, Tests
            </h3>
            <p className="text-lg text-gray-500 leading-relaxed">
              Easily launch live assignments, quizzes, and tests. Student results are automatically 
              entered in the online gradebook.
            </p>
          </div>
        </div>

        {/* Feature 4: Class Management */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16 mb-32">
          <div className="relative w-full lg:w-1/2">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
               <Image 
                  src="https://images.unsplash.com/photo-1543269664-56d93c1b41a6?q=80&w=2670&auto=format&fit=crop" 
                  alt="Class Management" 
                  fill 
                  className="object-cover"
                />
            </div>
            <div className="absolute -left-10 bottom-1/4 h-32 w-32 bg-blue-400/20 rounded-full blur-2xl"></div>
          </div>
          <div className="w-full lg:w-1/2 space-y-6">
            <h3 className="text-3xl font-bold text-gray-900 leading-tight">
              <span className="text-primary tracking-tight">Class Management</span> <br />
              Tools for Educators
            </h3>
            <p className="text-lg text-gray-500 leading-relaxed">
              Class provides tools to help run and manage the class such as Class Roster, Attendance, 
              and more. With the Gradebook, teachers can review and grade tests and quizzes in real-time.
            </p>
          </div>
        </div>

        {/* Feature 5: One-on-One */}
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="relative w-full lg:w-1/2">
             <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
               <Image 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2670&auto=format&fit=crop" 
                  alt="Discussions" 
                  fill 
                  className="object-cover"
                />
            </div>
          </div>
          <div className="w-full lg:w-1/2 space-y-6">
            <h3 className="text-3xl font-bold text-gray-900 leading-tight">
              One-on-One <br />
              <span className="text-primary tracking-tight">Discussions</span>
            </h3>
            <p className="text-lg text-gray-500 leading-relaxed">
              Teachers and teacher assistants can talk with students privately without leaving 
              the Zoom environment.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
