import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AiChatPage } from "@/pages/AiChatPage";
import { RootLayout } from "@/components/RootLayout";
import { ReportsPage } from "@/pages/ReportsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <AiChatPage />,
      },
      {
        path: "ai-chat",
        element: <AiChatPage />,
      },
      {
        path: "ai-chat/:chatId",
        element: <AiChatPage />,
      },
      {
        path: "reports",
        element: <ReportsPage />,
      },
    ],
  },
]);

function App() {
  return (
    <TooltipProvider>
      <RouterProvider router={router} />
      <Toaster />
    </TooltipProvider>
  );
}

export default App;