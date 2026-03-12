"use client";

import { FileText, Calendar, Users } from "lucide-react";

export function CloudSoftware() {
  const cards = [
    {
      title: "Online Billing, Invoicing, & Contracts",
      desc: "Simple and secure control of your organization's financial and legal transactions. Send customized invoices and contracts",
      icon: <FileText className="text-white" size={32} />,
      color: "bg-blue-500",
    },
    {
      title: "Easy Scheduling & Attendance Tracking",
      desc: "Schedule and reserve classrooms at one campus or multiple campuses. Keep detailed records of student attendance",
      icon: <Calendar className="text-white" size={32} />,
      color: "bg-primary",
    },
    {
      title: "Customer Tracking",
      desc: "Automate and track emails to individuals or groups. Skilline's built-in system helps organize your organization",
      icon: <Users className="text-white" size={32} />,
      color: "bg-cyan-500",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6 text-center lg:px-24">
        <h2 className="text-3xl font-bold md:text-4xl text-gray-900">
          All-In-One <span className="text-primary">Cloud Software.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-gray-500">
          TOTC is one powerful online software suite that combines all the tools needed to run a successful school or office.
        </p>

        <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-3">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="group relative rounded-3xl bg-white p-8 pt-16 shadow-xl transition-all hover:-translate-y-2 hover:shadow-2xl"
            >
              <div
                className={`absolute -top-10 left-1/2 -translate-x-1/2 rounded-full p-6 shadow-lg ${card.color}`}
              >
                {card.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 md:text-2xl">{card.title}</h3>
              <p className="mt-4 text-gray-500 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
