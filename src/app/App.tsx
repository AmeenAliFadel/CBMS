import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return <RouterProvider router={router} />;
}

export default App;