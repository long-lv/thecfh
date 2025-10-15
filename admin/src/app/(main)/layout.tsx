import { NavigationEvents } from "@/src/components/NavigationEvent";
import NavMenu from "../../components/NavMenu";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
       <NavigationEvents /> 
      <aside className="w-[250px] h-screen">
        <NavMenu />
      </aside>
      <div className="flex-2 bg-[var(--base-background-color-1)] w-full h-screen px-[30px] py-8">
        {children}
      </div>
    </div>
  );
}
