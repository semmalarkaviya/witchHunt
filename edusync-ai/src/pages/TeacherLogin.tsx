import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export default function TeacherLogin() {
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
    if (login("teacher", { identifier, password })) {
      toast({ title: "Welcome back!", description: "Login successful." });
      navigate("/");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
      <div className="glass-card w-full max-w-md animate-fade-in-up">
        <h2 className="text-3xl font-bold font-display gradient-text text-center mb-2">Teacher Login</h2>
        <p className="text-muted-foreground text-center text-sm mb-6">Welcome back, educator!</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input className="glass-input" placeholder="Email / Mobile Number" value={identifier} onChange={e => setIdentifier(e.target.value)} />
          <input className="glass-input" type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
          {error && <p className="text-destructive text-sm">{error}</p>}
          <div className="text-right">
            <a href="#" className="text-primary text-sm hover:underline">Forgot Password?</a>
          </div>
          <button type="submit" className="gradient-btn w-full">Login</button>
        </form>
        <p className="text-center text-muted-foreground text-sm mt-4">
          Don't have an account? <Link to="/teacher-signup" className="text-primary hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
}
