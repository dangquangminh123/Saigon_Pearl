'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  HeartHandshake,
  Stethoscope,
  ShieldCheck,
  Home,
  Gift,
  Sparkles,
  FileCheck,
  Users,
  ArrowRight,
  X,
  Send,
  CheckCircle2,
  Lock,
  PawPrint,
  Heart
} from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import styles from '../adopt.module.css';
import type { AdoptContent, AdoptServiceItem } from '@/data/adopt-services';
import { routeFor } from '@/lib/i18n';

interface Props {
  content: AdoptContent;
  locale: string;
}

export function AdoptServicesCatalog({ content, locale }: Props) {
  const shouldReduce = useReducedMotion();
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedService, setSelectedService] = useState<AdoptServiceItem | null>(null);

  // Form state
  const [fullName, setFullName] = useState('');
  const [contact, setContact] = useState('');
  const [preference, setPreference] = useState('');
  const [preparedMessage, setPreparedMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const configuredEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || '';

  // Filter items
  const filteredServices = activeTab === 'all'
    ? content.services
    : content.services.filter((s) => s.category === activeTab);

  // ESC key + focus trap to close modal
  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!selectedService) {
      document.body.style.overflow = '';
      return;
    }
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedService(null);
        return;
      }
      if (e.key === 'Tab' && modalRef.current) {
        const focusable = Array.from(
          modalRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled]), a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          )
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (!first || !last) return;
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      previouslyFocused?.focus();
    };
  }, [selectedService]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = fullName.trim().slice(0, 100);
    const cleanContact = contact.trim().slice(0, 160);
    if (!cleanContact) return;

    const chosenPref = preference || content.subscribe.preferences[0] || '';
    const lines = [
      `[Saigon Pearl Purrs — ${locale === 'vi' ? 'Đăng ký Nhận nuôi / Foster' : 'Adoption / Foster Inquiry'}]`,
      `${locale === 'vi' ? 'Họ và tên' : 'Full Name'}: ${cleanName || (locale === 'vi' ? 'Chưa cung cấp' : 'Not provided')}`,
      `${locale === 'vi' ? 'Liên hệ' : 'Contact'}: ${cleanContact}`,
      `${locale === 'vi' ? 'Nguyện vọng' : 'Preference'}: ${chosenPref}`,
    ];
    const body = lines.join('\n');
    setPreparedMessage(body);
    setCopied(false);

    if (configuredEmail) {
      const subject = encodeURIComponent(`[Saigon Pearl Purrs] ${chosenPref}`);
      window.location.href = `mailto:${configuredEmail}?subject=${subject}&body=${encodeURIComponent(body)}`;
    }
  };

  const handleCopyPrepared = async () => {
    if (!preparedMessage) return;
    try {
      await navigator.clipboard.writeText(preparedMessage);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  // Icon mapping
  const renderIcon = (iconName: AdoptServiceItem['iconName'], size = 26) => {
    switch (iconName) {
      case 'HeartHandshake':
        return <HeartHandshake size={size} />;
      case 'Stethoscope':
        return <Stethoscope size={size} />;
      case 'ShieldCheck':
        return <ShieldCheck size={size} />;
      case 'Home':
        return <Home size={size} />;
      case 'Gift':
        return <Gift size={size} />;
      case 'Sparkles':
        return <Sparkles size={size} />;
      case 'FileCheck':
        return <FileCheck size={size} />;
      case 'Users':
        return <Users size={size} />;
      default:
        return <PawPrint size={size} />;
    }
  };

  return (
    <>
      {/* ===================================================================
          SERVICES CATALOG (Wanzor image-box-style-2)
          =================================================================== */}
      <section className={styles.servicesSection}>
        <div className={styles.container}>
          {/* Section Header */}
          <div className={styles.sectionHeader}>
            <span className={styles.eyebrow}>
              <PawPrint size={15} />
              {locale === 'vi' ? 'Hệ thống hỗ trợ' : 'Support System'}
            </span>
            <h2 className={styles.sectionTitle}>
              {locale === 'vi' ? '8 Chương Trình Kết Nối & Bảo Trợ Nhận Nuôi' : '8 Adoption & Welfare Support Programs'}
            </h2>
            <p className={styles.sectionSubtitle}>
              {locale === 'vi'
                ? 'Được thiết kế chu đáo để mỗi gia đình nhận nuôi luôn cảm thấy an tâm và mỗi chú mèo đều được bảo vệ toàn diện.'
                : 'Thoughtfully designed so every adopting family feels confident and every rescued cat enjoys complete protection.'}
            </p>
          </div>

          {/* Filter Tabs */}
          <div className={styles.filterTabs} role="tablist">
            {content.filterTabs.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                className={`${styles.filterBtn} ${activeTab === tab.id ? styles.filterBtnActive : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* 4-Columns Grid */}
          <div className={styles.servicesGrid}>
            {filteredServices.map((service) => (
              <article key={service.id} className={styles.masterImageBox}>
                {/* Thumb on top (circle) */}
                <div className={styles.thumb}>
                  <div className={styles.thumbInner}>
                    <Image
                      src={service.image}
                      alt={service.title}
                      width={240}
                      height={240}
                      className={styles.thumbImg}
                      loading="lazy"
                    />
                  </div>
                  {/* Badge Icon on edge */}
                  <div className={styles.iconWrap}>
                    <div className={styles.masterIcon} title={service.tag}>
                      {renderIcon(service.iconName, 22)}
                    </div>
                  </div>
                </div>

                {/* Content body */}
                <div className={styles.contentWrap}>
                  <span className={styles.cardTag}>{service.tag}</span>
                  <h3 className={styles.headline}>{service.title}</h3>
                  <p className={styles.desc}>{service.shortDesc}</p>

                  {/* Button at bottom revealed on hover */}
                  <div className={styles.urlWrap}>
                    <button
                      type="button"
                      className={styles.masterButton}
                      onClick={() => setSelectedService(service)}
                    >
                      <span>{locale === 'vi' ? 'Xem chi tiết' : 'Learn More'}</span>
                      <ArrowRight size={15} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===================================================================
          SUBSCRIBE BANNER (Wanzor mona-sec-form-subscribe)
          =================================================================== */}
      <section className={styles.monaSecFormSubscribe}>
        <div className={styles.container}>
          <div className={styles.subscribeInner}>
            {/* Left Column: Big icon + Message */}
            <div className={styles.subscribeLeft}>
              <div className={styles.bigIconWrap}>
                <Send size={34} />
              </div>
              <span className={styles.subscribeBadge}>{content.subscribe.badge}</span>
              <h3 className={styles.subscribeTitle}>{content.subscribe.title}</h3>
              <p className={styles.subscribeDesc}>{content.subscribe.description}</p>
              <div className={styles.subscribeNote}>
                <Lock size={14} />
                <span>{content.subscribe.note}</span>
              </div>
            </div>

            {/* Right Column: Interactive Form */}
            <div className={styles.subscribeForm}>
              {preparedMessage ? (
                <div className={styles.formSuccess} role="status" aria-live="polite">
                  <CheckCircle2 size={32} style={{ margin: '0 auto 10px', display: 'block', color: '#3A5432' }} />
                  <p style={{ margin: '0 0 12px', fontSize: '14px' }}>{content.subscribe.successMessage}</p>
                  <textarea
                    className={styles.preparedTextarea}
                    readOnly
                    rows={5}
                    value={preparedMessage}
                    aria-label={content.subscribe.title}
                  />
                  <div className={styles.preparedActions}>
                    <button
                      type="button"
                      className={styles.formSubmitBtn}
                      onClick={handleCopyPrepared}
                    >
                      <span>{copied ? content.subscribe.copiedLabel : content.subscribe.copyButton}</span>
                    </button>
                    <button
                      type="button"
                      className={styles.formSecondaryBtn}
                      onClick={() => {
                        setPreparedMessage('');
                        setCopied(false);
                      }}
                    >
                      <span>{content.subscribe.editButton}</span>
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit}>
                  <div className={styles.formGroup}>
                    <label htmlFor="adopt-fullname" className={styles.formLabel}>
                      {locale === 'vi' ? 'Họ và tên' : 'Full Name'}
                    </label>
                    <input
                      id="adopt-fullname"
                      type="text"
                      maxLength={100}
                      autoComplete="name"
                      className={styles.formInput}
                      placeholder={content.subscribe.namePlaceholder}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="adopt-contact" className={styles.formLabel}>
                      {locale === 'vi' ? 'Số điện thoại / Zalo hoặc Email *' : 'Phone / WhatsApp or Email *'}
                    </label>
                    <input
                      id="adopt-contact"
                      type="text"
                      required
                      maxLength={160}
                      autoComplete="email"
                      className={styles.formInput}
                      placeholder={content.subscribe.contactPlaceholder}
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="adopt-preference" className={styles.formLabel}>
                      {locale === 'vi' ? 'Nguyện vọng của bạn' : 'Your Preference'}
                    </label>
                    <select
                      id="adopt-preference"
                      className={styles.formSelect}
                      value={preference}
                      onChange={(e) => setPreference(e.target.value)}
                    >
                      <option value="">{content.subscribe.preferencePlaceholder}</option>
                      {content.subscribe.preferences.map((pref, idx) => (
                        <option key={idx} value={pref}>{pref}</option>
                      ))}
                    </select>
                  </div>

                  <button type="submit" className={styles.formSubmitBtn}>
                    <Heart size={16} />
                    <span>{content.subscribe.submitButton}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          INTERACTIVE SERVICE DETAIL MODAL LIGHTBOX
          =================================================================== */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            className={styles.modalBackdrop}
            onClick={(e) => {
              if (e.target === e.currentTarget) setSelectedService(null);
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              ref={modalRef}
              className={styles.modalContent}
              role="dialog"
              aria-modal="true"
              aria-labelledby="adopt-modal-title"
              initial={shouldReduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={
                shouldReduce
                  ? { opacity: 0 }
                  : { opacity: 0, y: 10, scale: 0.97, transition: { duration: 0.16, ease: [0.4, 0, 1, 1] } }
              }
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className={styles.modalHeader}>
                <div>
                  <span className={styles.cardTag}>{selectedService.tag}</span>
                  <h3 id="adopt-modal-title" className={styles.headline} style={{ margin: '6px 0 0' }}>
                    {selectedService.title.replace(/\n/g, ' ')}
                  </h3>
                </div>
                <button
                  ref={closeBtnRef}
                  type="button"
                  className={styles.modalCloseBtn}
                  aria-label={locale === 'vi' ? 'Đóng cửa sổ' : 'Close'}
                  onClick={() => setSelectedService(null)}
                >
                  <X size={20} />
                </button>
              </div>

              <div className={styles.modalBody}>
                <Image
                  src={selectedService.image}
                  alt={selectedService.title}
                  width={600}
                  height={260}
                  className={styles.modalImageHero}
                />

                <p className={styles.modalOverview}>
                  {selectedService.fullDetails.overview}
                </p>

                <h4 className={styles.modalHighlightTitle}>
                  {locale === 'vi' ? 'Điểm nổi bật của chương trình:' : 'Key Program Highlights:'}
                </h4>
                <ul className={styles.modalHighlightList}>
                  {selectedService.fullDetails.highlights.map((point, idx) => (
                    <li key={idx}>{point}</li>
                  ))}
                </ul>

                <div className={styles.modalCommitmentBox}>
                  <strong>{locale === 'vi' ? 'Cam kết của cộng đồng: ' : 'Community Pledge: '}</strong>
                  {selectedService.fullDetails.commitment}
                </div>

                <div className={styles.modalActions}>
                  <Link
                    href={routeFor(locale as 'vi' | 'en', '/cats')}
                    className={styles.masterButton}
                    onClick={() => setSelectedService(null)}
                  >
                    <PawPrint size={15} />
                    <span>{locale === 'vi' ? 'Gặp các bé mèo sẵn sàng' : 'Meet Available Cats'}</span>
                  </Link>
                  <button
                    type="button"
                    className={styles.masterButton}
                    style={{ backgroundColor: '#DCE5D7', color: '#2F3C2C' }}
                    onClick={() => setSelectedService(null)}
                  >
                    <span>{locale === 'vi' ? 'Đóng lại' : 'Close'}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

