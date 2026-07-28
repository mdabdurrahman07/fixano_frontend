import { Footer } from "@/components/shared/Footer";
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
      
     
      <main className="min-h-[calc(100dvh-4rem)]">{children}</main>
      
      <footer>
       <Footer/>
      </footer>
    </div>
  );
};

export default PublicLayout;
