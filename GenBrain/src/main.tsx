import { createRoot } from "react-dom/client"; // Use createRoot from react-dom/client
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import SignUpPage from "./pages/RegisterPage/SignUpPage.tsx";
import Notification from "./components/Notification/Notification.tsx";
import ImageGenerator from "./components/ImageGeneratorPage/ImageGenerator.tsx";
import AnswerGenerator from "./components/AnswerGenerator/AnswerGenerator.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/signUp",
    element: (
      <>
        <SignUpPage />
        <Notification />
      </>
    ),
  },
  {
    path: "/image_generator_page",
    element: <ImageGenerator />,
  },
  {
    path: "/answer_generator_page",
    element: <AnswerGenerator />,
  },
]);

const rootElement = document.getElementById("root")!;
if (rootElement) {
  const root = createRoot(rootElement); // Use createRoot correctly
  root.render(<RouterProvider router={router} />);
}
