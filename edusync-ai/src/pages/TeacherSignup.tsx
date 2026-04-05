import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const allClasses = Array.from({ length: 12 }, (_, i) => `${i + 1}`);

export default function TeacherSignup() {
  const [form, setForm] = useState({
    fullName: "", email: "", mobile: "", password: "", confirmPassword: "",
    schoolName: "", subjectHandling: "", classesHandling: [] as string[],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const toggleClass = (c: string) => {
    setForm(f => ({
      ...f,
      classesHandling: f.classesHandling.includes(c)
        ? f.classesHandling.filter(x => x !== c)
        : [...f.classesHandling, c],
    }));
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.fullName.trim()) errs.fullName = "Required";
    if (!form.email.trim()) errs.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Invalid email";
    if (!form.mobile.trim()) errs.mobile = "Required";
    else if (!/^\d{10}$/.test(form.mobile)) errs.mobile = "Must be 10 digits";
    if (!form.password) errs.password = "Required";
    else if (form.password.length < 6) errs.password = "Min 6 characters";
    if (form.password !== form.confirmPassword) errs.confirmPassword = "Passwords don't match";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    register("teacher", form);
    toast({ title: "Registration successful!", description: "You can now log in." });
    navigate("/teacher-login");
  };

  const renderField = (label: string, field: string, type = "text", required = false) => (
    <div>
      <label className="text-sm text-muted-foreground mb-1 block">{label}{required && " *"}</label>
      <input className="glass-input" type={type} placeholder={label}
        value={(form as any)[field]} onChange={set(field)} />
      {errors[field] && <p className="text-destructive text-xs mt-1">{errors[field]}</p>}
    </div>
  );

  return (
    <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-10">
      <div className="glass-card w-full max-w-lg animate-fade-in-up">
        <h2 className="text-3xl font-bold font-display gradient-text text-center mb-6">Teacher Registration</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <h3 className="text-primary font-semibold text-sm mb-3 uppercase tracking-wider">Basic Details</h3>
            <div className="space-y-3">
              {renderField("Full Name", "fullName", "text", true)}
              {renderField("Email ID", "email", "email", true)}
              {renderField("Mobile Number", "mobile", "text", true)}
              {renderField("Password", "password", "password", true)}
              {renderField("Confirm Password", "confirmPassword", "password", true)}
            </div>
          </div>
          <div>
            <h3 className="text-primary font-semibold text-sm mb-3 uppercase tracking-wider">Professional Details</h3>
            <div className="space-y-3">
              {renderField("School Name", "schoolName")}
              {renderField("Subject Handling", "subjectHandling")}
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Classes Handling</label>
                <div className="flex flex-wrap gap-2">
                  {allClasses.map(c => (
                    <button key={c} type="button" onClick={() => toggleClass(c)}
                      className={`px-3 py-1 rounded-lg text-sm border transition-all ${
                        form.classesHandling.includes(c)
                          ? "border-primary bg-primary/20 text-primary"
                          : "border-border text-muted-foreground hover:border-primary/50"
                      }`}>
                      {c}th
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <button type="submit" className="gradient-btn w-full">Register</button>
        </form>
        <p className="text-center text-muted-foreground text-sm mt-4">
          Already have an account? <Link to="/teacher-login" className="text-primary hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}
