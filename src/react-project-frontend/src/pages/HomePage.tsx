import React from "react";
import Layout from "@/components/layout";
// import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
// import { BarChart } from "lucide-react";

// const chartData = [
//   { month: "January", desktop: 186, mobile: 80 },
//   { month: "February", desktop: 305, mobile: 200 },
//   { month: "March", desktop: 237, mobile: 120 },
//   { month: "April", desktop: 73, mobile: 190 },
//   { month: "May", desktop: 209, mobile: 130 },
//   { month: "June", desktop: 214, mobile: 140 }
// ];

// const chartConfig = {
//   desktop: {
//     label: "Desktop",
//     color: "#2563eb"
//   },
//   mobile: {
//     label: "Mobile",
//     color: "#60a5fa"
//   }
// } satisfies ChartConfig;

const HomePage: React.FC = () => {
  return (
    <Layout>
      <h1 className="text-2xl font-bold">Home Page</h1>
      {/* <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <BarChart data={chartData as any}>
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
          <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
        </BarChart>
      </ChartContainer> */}
    </Layout>
  );
};

export default HomePage;
