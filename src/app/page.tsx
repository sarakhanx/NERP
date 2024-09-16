import LoginComponent from "@/components/client_component/authen_components/loginComponent";
import Maxwidth from "@/components/client_component/layout_components/Maxwidth";

export default function Home() {
  return (
      <div className="bg-background dark:bg-background flex justify-center items-center gap-4 w-full">
        <LoginComponent />
      </div>
  );
}
