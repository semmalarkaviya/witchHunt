import { useNavigate } from "react-router-dom";

export default function RoleSelection() {
  const navigate = useNavigate();
  const handleTeacherClick = () => {
    alert("Teacher portal coming soon!");
  };

  return (
    <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-lg mx-auto animate-fade-in-up">
        <h1 className="text-4xl sm:text-5xl font-bold font-display gradient-text mb-3">
          Welcome to EduSync AI
        </h1>
        <p className="text-muted-foreground mb-10">Select your role to continue</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <button onClick={() => navigate("/student-login")}
            className="glass-card text-center cursor-pointer group">
            <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">👨‍🎓</div>
            <h3 className="text-xl font-semibold text-foreground">I'm a Student</h3>
            <p className="text-muted-foreground text-sm mt-1">Access lessons & track progress</p>
          </button>
          <button onClick={handleTeacherClick}
            className="glass-card text-center cursor-pointer group">
            <div className="text-5xl mb-3 group-hover:scale-110 transition-transform">👨‍🏫</div>
            <h3 className="text-xl font-semibold text-foreground">I'm a Teacher</h3>
            <p className="text-muted-foreground text-sm mt-1">Manage classes & monitor students</p>
          </button>
        </div>
      </div>
    </div>
  );
}
