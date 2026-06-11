import { useState } from "react";
import type { FormEvent } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { fadeUp } from "@/lib/animations";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      toast("Enter a valid email address.");
      return;
    }
    setEmail("");
    toast("You're on the list. First drop notification coming.");
  }

  return (
    <motion.section className="section-pad bg-surface" initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={fadeUp}>
      <div className="container-gallery text-center">
        <h2 className="font-display text-5xl leading-none text-text-primary">Be first to the drop.</h2>
        <p className="mt-3 text-text-secondary">New series, limited editions, studio notes. No noise.</p>
        <form onSubmit={submit} className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row">
          <label className="sr-only" htmlFor="newsletter-email">Email address</label>
          <input
            id="newsletter-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Your email"
            className="min-h-12 flex-1 rounded-sm border border-[var(--border-mid)] bg-surface-mid px-4 text-text-primary placeholder:text-text-muted"
            autoComplete="email"
          />
          <button type="submit" className="min-h-12 rounded-sm bg-gold px-6 text-sm font-semibold uppercase tracking-wider text-void">
            Join
          </button>
        </form>
      </div>
    </motion.section>
  );
}
