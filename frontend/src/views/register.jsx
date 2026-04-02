import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Mail, Lock, User, Shield, Loader2, ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";
import AuthService from "@/service/authService";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "faculty",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.username.trim()) nextErrors.username = "Name is required";
    if (!form.email.trim()) {
      nextErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      nextErrors.email = "Please enter a valid email";
    }
    if (!form.password) {
      nextErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters";
    }
    if (!form.confirmPassword) {
      nextErrors.confirmPassword = "Confirm your password";
    } else if (form.confirmPassword !== form.password) {
      nextErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    try {
      const payload = {
        username: form.username.trim(),
        email: form.email.trim(),
        password: form.password,
        role: form.role,
      };
      const response = await AuthService.Register(payload);
      if (response?.status === 201) {
        toast.success("Account created! Please log in.");
        navigate("/login");
      }
    } catch (error) {
      const message =
        error?.data?.message || error?.message || "Registration failed. Please try again.";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-lg">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-white border border-gray-200 shadow-sm mb-4">
            <Shield className="w-8 h-8 text-gray-700" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
          <p className="text-gray-600">Set up your credentials to get started</p>
        </div>

        <Card className="bg-white shadow-sm border border-gray-200 rounded-3xl">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-900">Sign Up</CardTitle>
            <CardDescription className="text-gray-600">
              Enter your details to create an account
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Label htmlFor="username" className="flex items-center gap-2 text-gray-700">
                  <User className="w-4 h-4 text-gray-500" />
                  Name
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Jane Doe"
                  value={form.username}
                  onChange={(e) => handleChange("username", e.target.value)}
                  className={
                    errors.username
                      ? "border-red-500 focus-visible:ring-red-500/50 rounded-3xl bg-white"
                      : "rounded-3xl bg-white border-gray-200 focus:border-gray-300 focus-visible:ring-gray-200"
                  }
                  aria-invalid={!!errors.username}
                  disabled={isLoading}
                />
                {errors.username && (
                  <p className="text-sm text-red-500 flex items-center gap-1">{errors.username}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2 text-gray-700">
                  <Mail className="w-4 h-4 text-gray-500" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className={
                    errors.email
                      ? "border-red-500 focus-visible:ring-red-500/50 rounded-3xl bg-white"
                      : "rounded-3xl bg-white border-gray-200 focus:border-gray-300 focus-visible:ring-gray-200"
                  }
                  aria-invalid={!!errors.email}
                  disabled={isLoading}
                />
                {errors.email && (
                  <p className="text-sm text-red-500 flex items-center gap-1">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="flex items-center gap-2 text-gray-700">
                  <Lock className="w-4 h-4 text-gray-500" />
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter a strong password"
                  value={form.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  className={
                    errors.password
                      ? "border-red-500 focus-visible:ring-red-500/50 rounded-3xl bg-white"
                      : "rounded-3xl bg-white border-gray-200 focus:border-gray-300 focus-visible:ring-gray-200"
                  }
                  aria-invalid={!!errors.password}
                  disabled={isLoading}
                />
                {errors.password && (
                  <p className="text-sm text-red-500 flex items-center gap-1">{errors.password}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="flex items-center gap-2 text-gray-700">
                  <Lock className="w-4 h-4 text-gray-500" />
                  Confirm Password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Re-enter your password"
                  value={form.confirmPassword}
                  onChange={(e) => handleChange("confirmPassword", e.target.value)}
                  className={
                    errors.confirmPassword
                      ? "border-red-500 focus-visible:ring-red-500/50 rounded-3xl bg-white"
                      : "rounded-3xl bg-white border-gray-200 focus:border-gray-300 focus-visible:ring-gray-200"
                  }
                  aria-invalid={!!errors.confirmPassword}
                  disabled={isLoading}
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500 flex items-center gap-1">{errors.confirmPassword}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="role" className="flex items-center gap-2 text-gray-700">
                  <Shield className="w-4 h-4 text-gray-500" />
                  Role
                </Label>
                <select
                  id="role"
                  value={form.role}
                  onChange={(e) => handleChange("role", e.target.value)}
                  className="w-full rounded-3xl border border-gray-200 bg-white px-3 py-2 text-sm focus:border-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-200"
                  disabled={isLoading}
                >
                  <option value="faculty">Faculty</option>
                </select>
              </div>

              <Button
                type="submit"
                className="w-full h-11 text-base font-semibold bg-gray-900 hover:bg-gray-800 text-white border-0 rounded-3xl"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Already registered?</span>
              </div>
            </div>
            <Link
              to="/login"
              className="inline-flex items-center justify-center gap-2 text-gray-900 font-semibold hover:underline"
            >
              <ArrowLeft className="w-4 h-4" /> Back to login
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Register;
