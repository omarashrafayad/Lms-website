"use client";

export function Stats() {
  const stats = [
    { value: "15K+", label: "Students" },
    { value: "75%", label: "Total success" },
    { value: "35", label: "Main questions" },
    { value: "26", label: "Chief experts" },
    { value: "16", label: "Years of experience" },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-6 text-center lg:px-24">
        <h2 className="text-4xl font-bold text-gray-900">Our Success</h2>
        <p className="mx-auto mt-4 max-w-3xl text-gray-500">
          Ornare id fames interdum porttitor nulla turpis etiam. Diam vitae sollicitudin at nec
          nam et pharetra gravida. Adipiscing a quis ultrices eu ornare tristique vel nisl orci.
        </p>
        
        <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5">
          {stats.map((stat, idx) => (
            <div key={idx} className="space-y-2">
              <p className="text-5xl font-bold bg-gradient-to-br from-primary to-primary/60 bg-clip-text text-transparent">
                {stat.value}
              </p>
              <p className="text-lg font-medium text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
