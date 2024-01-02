import Navbar from "@/components/Navbar";

const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="h-full">
      <Navbar />
      {children}
    </main>
  );
};

export default MarketingLayout;
