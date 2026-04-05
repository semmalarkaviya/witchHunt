import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export default function StudentLogin() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!identifier || !password) { setError("All fields are required"); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters"); return; }
    if (login("student", { identifier, password })) {
      toast({ title: "Welcome back!", description: "Login successful." });
      navigate("/student-dashboard");
    } else {
      setError("Invalid roll number/mobile or password");
    }
  };

  const handleForgotPassword = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    alert("Forgot password is a demo feature in this portal.");
  };

  return (
    <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
      <div className="glass-card w-full max-w-md animate-fade-in-up">
        <h2 className="text-3xl font-bold font-display gradient-text text-center mb-2">Student Login</h2>
        <p className="text-muted-foreground text-center text-sm mb-6">Welcome back, learner!</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input className="glass-input" placeholder="Roll Number / Mobile Number" value={identifier} onChange={e => setIdentifier(e.target.value)} />
          </div>
          <div>
            <input className="glass-input" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          {error && <p className="text-destructive text-sm">{error}</p>}
          <div className="text-right">
            <a href="#" onClick={handleForgotPassword} className="text-primary text-sm hover:underline">Forgot Password?</a>
          </div>
          <button type="submit" className="gradient-btn w-full">Login</button>
        </form>
        <p className="text-center text-muted-foreground text-sm mt-4">
          Don't have an account? <Link to="/student-signup" className="text-primary hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
}
