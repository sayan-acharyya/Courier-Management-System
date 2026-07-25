import { useState } from "react";
import { motion } from "framer-motion";
import { UserPlus } from "lucide-react";
import { useDispatch } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { addUserThunk } from "../features/auth/authSlice";
// import { addUserThunk } from "@/features/auth/authSlice";

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default function AddAdmin() {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [pageError, setPageError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const update = (key, value) => {
    setForm(f => ({ ...f, [key]: value }));
    setErrors((e) => {
      if (!e?.[key]) return e;
      const next = { ...e };
      delete next[key];
      return next;
    });
    setPageError("");
    setSuccessMessage("");
  };

  const validate = () => {
    const next = {};
    if (!form.name.trim()) next.name = "Name is required";
    if (!form.email.trim()) next.email = "Email is required";
    else if (!isValidEmail(form.email)) next.email = "Email is invalid";
    if (!form.password) next.password = "Password is required";
    else if (form.password.length < 6) next.password = "Password must be at least 6 character long.";

    return next;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPageError("");
    setSuccessMessage("");

    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password,
    }

    try {
      setSubmitting(true);
      await dispatch(addUserThunk(payload)).unwrap();
      setForm({ name: "", email: "", password: "" });
      setErrors({});
      setSuccessMessage("Admin added successfully");
    } catch (error) {
      setPageError(typeof error === "string" ? error : "Failed to add admin");
    } finally {
      setSubmitting(false);
    }


  }

   return (
  <div className="min-h-[calc(100vh-80px)] bg-muted/30 py-10 px-4">
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="max-w-3xl mx-auto"
    >
      <Card className="overflow-hidden rounded-2xl border shadow-xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-primary/80 px-8 py-8 text-primary-foreground">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
              <UserPlus className="h-7 w-7" />
            </div>

            <div>
              <h1 className="text-3xl font-bold">Add New Admin</h1>
              <p className="mt-1 text-sm text-primary-foreground/80">
                Create a secure administrator account for your platform.
              </p>
            </div>
          </div>
        </div>

        <CardContent className="p-8">
          {successMessage && (
            <div className="mb-6 rounded-xl border border-green-300 bg-green-50 p-4 text-green-700">
              {successMessage}
            </div>
          )}

          {pageError && (
            <div className="mb-6 rounded-xl border border-red-300 bg-red-50 p-4 text-red-700">
              {pageError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label className="mb-2 block font-medium">
                Full Name <span className="text-red-500">*</span>
              </Label>

              <Input
                className="h-12 rounded-xl"
                placeholder="Enter full name"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
              />

              {errors.name && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <Label className="mb-2 block font-medium">
                Email Address <span className="text-red-500">*</span>
              </Label>

              <Input
                type="email"
                className="h-12 rounded-xl"
                placeholder="admin@example.com"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
              />

              {errors.email && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <Label className="mb-2 block font-medium">
                Password <span className="text-red-500">*</span>
              </Label>

              <Input
                type="password"
                className="h-12 rounded-xl"
                placeholder="Minimum 6 characters"
                value={form.password}
                onChange={(e) => update("password", e.target.value)}
              />

              {errors.password && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.password}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={submitting}
              className="h-12 w-full rounded-xl text-base font-semibold"
            >
              <UserPlus className="mr-2 h-5 w-5" />
              {submitting ? "Adding Admin..." : "Add Admin"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  </div>
);
}
