import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export default function StudentSignup() {
  const [form, setForm] = useState({
    fullName: "", email: "", mobile: "", password: "", confirmPassword: "",
    schoolName: "", classLevel: "", section: "", rollNumber: "",
    parentName: "", parentMobile: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const classOptions = [
    { value: "1", label: "1st Std" },
    { value: "2", label: "2nd Std" },
    { value: "3", label: "3rd Std" },
    { value: "4", label: "4th Std" },
    { value: "5", label: "5th Std" },
    { value: "6", label: "6th Std" },
    { value: "7", label: "7th Std" },
    { value: "8", label: "8th Std" },
    { value: "9", label: "9th Std" },
    { value: "10", label: "10th Std" },
    { value: "11", label: "11th Std" },
    { value: "12", label: "12th Std" },
  ];

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.fullName.trim()) errs.fullName = "Required";
    if (!form.email.trim()) {
      // Email is optional.
    }
    if (!form.mobile.trim()) errs.mobile = "Required";
    else if (!/^\d{10}$/.test(form.mobile)) errs.mobile = "Must be 10 digits";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Invalid email";
    if (!form.password) errs.password = "Required";
    else if (form.password.length < 6) errs.password = "Min 6 characters";
    if (!form.confirmPassword) errs.confirmPassword = "Required";
    if (form.password !== form.confirmPassword) errs.confirmPassword = "Passwords don't match";
    if (!form.schoolName.trim()) errs.schoolName = "Required";
    if (!form.classLevel.trim()) errs.classLevel = "Required";
    if (!form.section.trim()) errs.section = "Required";
    if (!form.rollNumber.trim()) errs.rollNumber = "Required";
    if (!form.parentName.trim()) errs.parentName = "Required";
    if (!form.parentMobile.trim()) errs.parentMobile = "Required";
    else if (!/^\d{10}$/.test(form.parentMobile)) errs.parentMobile = "Must be 10 digits";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    const payload = {
      ...form,
      class: form.classLevel,
    };
    register("student", payload);

    const initialDashboardData = {
      attendanceMarkedToday: false,
      attendance: 80,
      streak: 5,
      xpPoints: 1200,
      badgesEarned: 3,
      coins: 250,
      notifications: [
        "Math homework due tomorrow",
        "Science quiz on Friday",
      ],
      tickets: [
        { id: "T-1001", title: "Need help in algebra", status: "Pending" },
        { id: "T-1002", title: "Science worksheet issue", status: "Resolved" },
      ],
      chatHistory: [],
    };

    localStorage.setItem(
      `edusync_student_dashboard_${form.rollNumber}`,
      JSON.stringify(initialDashboardData),
    );

    toast({ title: "Registration Successful! Please login." });
    navigate("/student-login");
  };

  const renderField = (label: string, field: string, type = "text", required = false, placeholder = "") => (
    <div>
      <label className="text-sm text-muted-foreground mb-1 block">{label}{required && " *"}</label>
      <input className="glass-input" type={type} placeholder={placeholder || label}
        value={(form as Record<string, string>)[field] ?? ""} onChange={set(field)} />
      {errors[field] && <p className="text-destructive text-xs mt-1">{errors[field]}</p>}
    </div>
  );

  return (
    <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-10">
      <div className="glass-card w-full max-w-lg animate-fade-in-up">
        <h2 className="text-3xl font-bold font-display gradient-text text-center mb-6">Student Registration</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <h3 className="text-primary font-semibold text-sm mb-3 uppercase tracking-wider">Basic Details</h3>
            <div className="space-y-3">
              {renderField("Full Name", "fullName", "text", true)}
              {renderField("Email ID", "email", "email", false, "Optional")}
              {renderField("Mobile Number", "mobile", "text", true)}
              {renderField("Password", "password", "password", true)}
              {renderField("Confirm Password", "confirmPassword", "password", true)}
            </div>
          </div>
          <div>
            <h3 className="text-primary font-semibold text-sm mb-3 uppercase tracking-wider">Academic Details</h3>
            <div className="space-y-3">
              {renderField("School Name", "schoolName", "text", true)}
              <div>
                <label className="text-sm text-muted-foreground mb-1 block">Class *</label>
                <select className="glass-input" value={form.classLevel} onChange={set("classLevel")}>
                  <option value="" className="bg-background">Select Class</option>
                  {classOptions.map((option) => (
                    <option key={option.value} value={option.value} className="bg-background">{option.label}</option>
                  ))}
                </select>
                {errors.classLevel && <p className="text-destructive text-xs mt-1">{errors.classLevel}</p>}
              </div>
              {renderField("Section", "section", "text", true)}
              {renderField("Roll Number", "rollNumber", "text", true)}
            </div>
          </div>
          <div>
            <h3 className="text-primary font-semibold text-sm mb-3 uppercase tracking-wider">Parent Details</h3>
            <div className="space-y-3">
              {renderField("Parent Name", "parentName", "text", true)}
              {renderField("Parent Mobile Number", "parentMobile", "text", true)}
            </div>
          </div>
          <button type="submit" className="gradient-btn w-full">Register</button>
        </form>
        <p className="text-center text-muted-foreground text-sm mt-4">
          Already have an account? <Link to="/student-login" className="text-primary hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}
