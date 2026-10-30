'use client';

import { type FormEvent, useEffect, useState } from 'react';
import { Check, ClipboardCopy, Heart, Mail, Send } from 'lucide-react';
import type { Locale } from '@/lib/i18n';
import { getDictionary } from '@/lib/dictionaries';

const verifiedContactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || '';

export function ContactForm({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const [topic, setTopic] = useState('adopt');
  const [prepared, setPrepared] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get('topic');
    if (t.contact.topics.some((item) => item.value === requested)) setTopic(requested!);
  }, [t.contact.topics]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = String(formData.get('name') || '');
    const email = String(formData.get('email') || '');
    const message = String(formData.get('message') || '');
    const topicLabel = t.contact.topics.find((item) => item.value === topic)?.label || topic;
    const subject = `Saigon Pearl Purrs — ${topicLabel}`;
    const body = [
      `${t.contact.formName}: ${name}`,
      `${t.contact.formEmail}: ${email}`,
      `${t.contact.formTopic}: ${topicLabel}`,
      '',
      `${t.contact.formMessage}:`, message,
    ].join('\n');
    setPrepared(`${subject}\n\n${body}`);
    setCopied(false);
    if (verifiedContactEmail) {
      window.location.href = `mailto:${encodeURIComponent(verifiedContactEmail)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
  }

  async function copyMessage() {
    try { await navigator.clipboard.writeText(prepared); setCopied(true); } catch { setCopied(false); }
  }

  return <div className="contact-form-card"><div className="contact-form-title"><span className="icon-circle"><Mail size={24} aria-hidden="true" /></span><h2>{t.contact.contactTitle}</h2></div>
    <p className="form-helper">{verifiedContactEmail ? t.contact.emailAvailable : t.contact.noEmail}</p>
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="form-row"><label>{t.contact.formName}<input name="name" type="text" placeholder={t.contact.formNamePlaceholder} maxLength={100} autoComplete="name" required /></label>
        <label>{t.contact.formEmail}<input name="email" type="email" placeholder={t.contact.formEmailPlaceholder} maxLength={160} autoComplete="email" required /></label></div>
      <label>{t.contact.formTopic}<select value={topic} onChange={(event) => setTopic(event.target.value)} name="topic">{t.contact.topics.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>
      <label>{t.contact.formMessage}<textarea name="message" placeholder={t.contact.formMessagePlaceholder} rows={6} minLength={10} maxLength={3000} required /></label>
      <button type="submit" className="btn btn-primary submit-button"><span>{verifiedContactEmail ? t.contact.send : t.contact.prepare}</span>{verifiedContactEmail ? <Send size={17} /> : <ClipboardCopy size={17} />}</button>
    </form>
    {prepared && <div className="prepared-message" aria-live="polite"><h3><Check size={18} aria-hidden="true" />{t.contact.copiedTitle}</h3><p>{t.contact.copiedDesc}</p><textarea readOnly rows={8} value={prepared} aria-label={t.contact.copiedTitle} /><button type="button" className="btn btn-outline" onClick={copyMessage}><span>{copied ? t.contact.copied : t.contact.copy}</span>{copied ? <Check size={17} /> : <ClipboardCopy size={17} />}</button></div>}
    <p className="form-privacy"><Heart size={14} aria-hidden="true" />{t.contact.privacy}</p>
  </div>;
}
