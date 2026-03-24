import { Footer } from "@/features/main/home/components/footer";
import { Navbar } from "@/features/main/home/components/navbar";

export default function MainLayout({ children }: { children: React.ReactNode }) { return <><Navbar />{children} <Footer /></>; }
