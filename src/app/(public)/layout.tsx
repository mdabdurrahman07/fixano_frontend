import { Footer } from "@/components/shared/Footer";
import NavbarServer from "@/components/shared/NavbarServer/NavbarServer";


const PublicLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="min-h-screen">
      <header>
      <NavbarServer/>
      </header>
      
     
      <main className="min-h-[calc(100dvh-4rem)]">{children}</main>
      
      <footer>
       <Footer/>
      </footer>
    </div>
  );
};

export default PublicLayout;
