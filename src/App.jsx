import Sidebar from "./assets/components/aside/Sidebar";
import MainContent from "./assets/components/main_content/MainContent";
import { useUserInputContext } from "./context/UserInputContext";
import { useToggle } from "./context/ToggleThemeContext";
import { Toaster } from "react-hot-toast";
function App() {
  const { isLoading } = useUserInputContext();
  const { theme } = useToggle();
  return (
    <>
      {isLoading && (
        <section className="fixed top-0 left-0 z-10 right-0 w-full h-full   bg-[#00000059] flex justify-center items-center">
          <div className="loader"></div>
        </section>
      )}
      <main
        className={`w-full p-10  max-xl:flex-col max-xl:p-3 2xl:items-center  ${
          theme === "dark" ? "bg-[#3a3d44]" : "bg-[#d6d7da]"
        }     2xl:h-screen  flex max-xl:gap-5`}
      >
        <Sidebar />
        <MainContent />
      </main>
      <Toaster position="top-right" />
    </>
  );
}

export default App;
