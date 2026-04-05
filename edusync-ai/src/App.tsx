import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import Background3D from "@/components/Background3D";
import LandingPage from "@/pages/LandingPage";
import RoleSelection from "@/pages/RoleSelection";
import StudentLogin from "@/pages/StudentLogin";
import StudentSignup from "@/pages/StudentSignup";
import Index from "@/pages/Index";
import TeacherLogin from "@/pages/TeacherLogin";
import TeacherSignup from "@/pages/TeacherSignup";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Background3D />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/role-selection" element={<RoleSelection />} />
            <Route path="/student-login" element={<StudentLogin />} />
            <Route path="/student-signup" element={<StudentSignup />} />
            <Route path="/student-dashboard" element={<Index />} />
            <Route path="/teacher-login" element={<TeacherLogin />} />
            <Route path="/teacher-signup" element={<TeacherSignup />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;