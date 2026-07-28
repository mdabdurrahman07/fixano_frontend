import Navbar from "@/components/shared/Navbar";


const PublicLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="min-h-screen">
      <header>
        <Navbar />
      </header>
      
     
      <main className="pt-16 px-4 md:px-8 grow">{children}</main>
      
      <footer className="py-8">
        <div>This is footer</div>
      </footer>
    </div>
  );
};

export default PublicLayout;
