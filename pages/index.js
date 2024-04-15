import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function Index() {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const onSendCode = async (e) => {
    e.preventDefault();
    if (!phone.trim()) return;
    setIsLoading(true);
    const res = await axios.post("/api/sms/send", {
      phone,
    });

    console.log(res);

    if (res.status === 201) {
      setIsCodeSent(true);
      setIsLoading(false);
      toast.success(res.data.message);
    }
  };

  const onCheckCode = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await axios.post("/api/sms/verify", { phone, code });
      if (res.status === 200) {
        toast.success(res.data.message);
        setTimeout(() => {
          router.replace("/dashboard");
        }, 500);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <Toaster />
      <div className="box">
        <h1 align="center">Login Form</h1>
        <form>
          {isCodeSent ? (
            <>
              <div className="inputBox">
                <input
                  autoFocus={true}
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  type="tel"
                  autoComplete="off"
                  required
                />
                <label>Code</label>
              </div>
              <input
                onClick={onCheckCode}
                type="submit"
                className="register-btn"
                value={isLoading ? "Loading..." : "Verify Code"}
              />
            </>
          ) : (
            <>
              <div className="inputBox">
                <input
                  autoFocus={true}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="text"
                  autoComplete="off"
                  required
                />
                <label>Phone Number</label>
              </div>
              <input
                disabled={isLoading}
                onClick={onSendCode}
                type="submit"
                className="register-btn"
                value={isLoading ? "Loading..." : "Send Code"}
              />
            </>
          )}
        </form>
      </div>
    </>
  );
}

export default Index;
