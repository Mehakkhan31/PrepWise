"use client";
import { db } from "@/utils/db";
import { Newsletter } from "@/utils/schema";
import { LoaderCircle } from "lucide-react";
import moment from "moment";
import React, { useState } from "react";
import { toast } from "sonner";

const Contect = () => {
  const handleInputChange = (setState) => (e) => {
    setState(e.target.value);
  };
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    console.log(name, email, message);

    if (name && email && message) {
      setLoading(true);
      try {
        const resp = await db.insert(Newsletter).values({
          newName: name,
          newEmail: email,
          newMessage: message,
          createdAt: moment().format("YYYY-MM-DD"),
        });

        if (resp) {
          toast("User Response recorded successfully");
          setName("");
          setEmail("");
          setMessage("");
        } else {
          toast("Error recording response");
        }
      } catch (error) {
        console.error(error);
        toast("Error recording response");
      } finally {
        setLoading(false);
      }
    } else {
      toast("No data entered");
    }
  };
  return (
    <div className="container mx-auto text-center">
      <h2 className="text-4xl font-semibold tracking-tight text-foreground">Get In Touch</h2>
      <p className="mt-4 text-lg text-muted-foreground">
        Have any questions? Reach out to us and we'll get back to you as soon as
        possible.
      </p>
      <div className="mt-8">
        <form onSubmit={onSubmit} className="max-w-xl mx-auto">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={handleInputChange(setName)}
            className="mb-4 w-full rounded-xl border border-border bg-background px-4 py-3 text-lg text-foreground outline-none transition focus:border-primary"
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={handleInputChange(setEmail)}
            className="mb-4 w-full rounded-xl border border-border bg-background px-4 py-3 text-lg text-foreground outline-none transition focus:border-primary"
          />
          <textarea
            placeholder="Your Message"
            value={message}
            onChange={handleInputChange(setMessage)}
            className="mb-4 w-full rounded-xl border border-border bg-background px-4 py-3 text-lg text-foreground outline-none transition focus:border-primary"
            rows="4"
          />
          <button
            type="submit"
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-primary px-6 py-3 text-lg font-medium text-primary-foreground shadow-[0_10px_24px_-12px_rgba(79,70,229,0.55)] transition hover:bg-primary/95"
          >
            {loading ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Send Message"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contect;
