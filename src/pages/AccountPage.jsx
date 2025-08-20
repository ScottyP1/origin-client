import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";

import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";

import Step1Email from "../components/register/Step1";
import Step2Code from "../components/register/Step2";

export default function AccountPage() {
  const { user, loading, logout, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [editingEmail, setEditingEmail] = useState(false);
  const [step, setStep] = useState(1);
  const [data, setData] = useState({ email: user?.email, code: "" });
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  if (loading) return <h1>Loading</h1>;

  const handleChange = (e) => {
    setError(null);
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const sendCode = async () => {
    if (!data.email) {
      setError({ detail: "Email is required." });
      return;
    }
    try {
      setSubmitting(true);
      await api.post("auth/send-code/", { email: data.email });
      setStep(2);
    } catch (err) {
      const msg = err?.response?.data?.error;
      setError({ detail: msg });
    } finally {
      setSubmitting(false);
    }
  };
  const verifyCode = async () => {
    if (!data.code) {
      setError({ detail: "Verification code is required." });
      return;
    }
    try {
      setSubmitting(true);
      const res = await api.post("auth/verify-code/", {
        email: data.email,
        code: data.code,
      });

      if (res.status === 200) {
        const putRes = await api.put("auth/user/", { email: data.email });

        const updatedEmail = putRes?.data?.email || data.email;
        setUser((prev) => ({ ...prev, email: updatedEmail }));
      }

      setEditingEmail(false);
      setStep(1);
      setData({ email: data.email, code: "" });
      setError(null);
    } catch (err) {
      const msg = err?.response?.data?.error;
      setError({ detail: msg });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await api.delete("auth/user/");
      logout();
      navigate("/");
    } catch (e) {
      setError({ detail: "Failed to delete account. Try again." });
      console.error(e);
    }
  };

  const handleRemoveGithub = async () => {
    try {
      await api.delete("auth/unlink/");
      const response = await api.get("auth/user/");
      setUser(response.data);
    } catch (e) {
      setError({ detail: "Failed to unlink GitHub." });
    }
  };

  return (
    <div className="text-white font-[Mokoto] bg-black/60 backdrop-blur-md md:border md:border-white/20 p-6 md:p-8 rounded-2xl w-full md:w-2/3 lg:w-1/2 mx-auto opacity-0 animate-fade-in">
      <AccountItem
        label="Email"
        value={user.email}
        onEdit={() => {
          setEditingEmail((v) => !v);
          setStep(1);
          setData({ email: user?.email, code: "" });
          setError(null);
        }}
      >
        {editingEmail && (
          <div className="mt-3">
            {step === 1 && (
              <Step1Email
                email={data.email}
                onChange={handleChange}
                onNext={sendCode}
                submitting={submitting}
                error={error}
                className="bg-none"
              />
            )}
            {step === 2 && (
              <Step2Code
                email={data.email}
                code={data.code}
                onChange={handleChange}
                onNext={verifyCode}
                submitting={submitting}
                error={error}
                className="bg-none text-center"
              />
            )}
          </div>
        )}
      </AccountItem>

      {/* GitHub + Name */}
      <AccountItem label="GitHub Username" value={user.username || "—"} />
      <AccountItem label="Full Name" value={user.full_name || "—"} />

      {!confirmDelete ? (
        <div className="flex flex-col md:flex-row gap-4 mt-10">
          <button
            onClick={() => setConfirmDelete(true)}
            className="cursor-target bg-red-500 hover:bg-red-600 px-4 py-3 rounded-xl w-full"
          >
            Delete Account
          </button>
          {user.github_connected && (
            <button
              onClick={handleRemoveGithub}
              className="cursor-target border border-red-500 px-4 py-3 rounded-xl w-full hover:bg-red-600 disabled:opacity-50"
            >
              Remove GitHub
            </button>
          )}
        </div>
      ) : (
        <div className="mt-10">
          <h1 className="text-center">
            Are you sure you want to delete your account?
          </h1>
          <div className="flex flex-col md:flex-row gap-4 mt-6">
            <button
              onClick={handleDeleteAccount}
              className="cursor-target border border-red-500 hover:bg-red-600 px-4 py-3 rounded-xl w-full disabled:opacity-50"
            >
              Delete Account
            </button>
            <button
              onClick={() => setConfirmDelete(false)}
              className="cursor-target px-4 py-3 rounded-xl w-full bg-red-500 hover:bg-red-600"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {error?.detail && (
        <p className="mt-4 text-red-400 text-sm">{error.detail}</p>
      )}
    </div>
  );
}

function AccountItem({ label, value, onEdit, children }) {
  return (
    <div className="py-3 border-b border-white/10">
      <div className="grid grid-cols-[160px_1fr_auto] items-center gap-3">
        <h2 className="text-gray-400">{label}:</h2>
        <span className="truncate">{value}</span>
        {onEdit && (
          <button
            onClick={onEdit}
            className="cursor-target inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-white/20 hover:bg-white/10"
          >
            <FaRegEdit size={18} />
            <span className="hidden sm:inline">Edit</span>
          </button>
        )}
      </div>
      {children}
    </div>
  );
}
