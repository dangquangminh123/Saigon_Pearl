'use client';

import React, { useState, useEffect } from 'react';
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
import styles from '../adopt.module.css';
import type { AdoptContent, AdoptServiceItem } from '@/data/adopt-services';
import { routeFor } from '@/lib/i18n';

interface Props {
  content: AdoptContent;
  locale: string;
}

export function AdoptServicesCatalog({ content, locale }: Props) {
  const [activeTab, setActiveTab] = useState<string>('all');
  const [selectedService, setSelectedService] = useState<AdoptServiceItem | null>(null);

  // Form state
  const [fullName, setFullName] = useState('');
  const [contact, setContact] = useState('');
  const [preference, setPreference] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Filter items
  const filteredServices = activeTab === 'all'
    ? content.services
    : content.services.filter((s) => s.category === activeTab);

  // ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedService(null);
    };
    if (selectedService) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [selectedService]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact.trim()) return;
    setIsSubmitted(true);
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
                      {renderIcon(service.iconName, 26)}
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
              {isSubmitted ? (
                <div className={styles.formSuccess}>
                  <CheckCircle2 size={38} style={{ margin: '0 auto 12px', display: 'block', color: '#3A5432' }} />
                  <p>{content.subscribe.successMessage}</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit}>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      {locale === 'vi' ? 'Họ và tên' : 'Full Name'}
                    </label>
                    <input
                      type="text"
                      className={styles.formInput}
                      placeholder={content.subscribe.namePlaceholder}
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      {locale === 'vi' ? 'Số điện thoại / Zalo hoặc Email *' : 'Phone / WhatsApp or Email *'}
                    </label>
                    <input
                      type="text"
                      required
                      className={styles.formInput}
                      placeholder={content.subscribe.contactPlaceholder}
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>
                      {locale === 'vi' ? 'Nguyện vọng của bạn' : 'Your Preference'}
                    </label>
                    <select
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
      {selectedService && (
        <div
          className={styles.modalBackdrop}
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedService(null);
          }}
        >
          <div className={styles.modalContent} role="dialog" aria-modal="true">
            <div className={styles.modalHeader}>
              <div>
                <span className={styles.cardTag}>{selectedService.tag}</span>
                <h3 className={styles.headline} style={{ margin: '6px 0 0' }}>
                  {selectedService.title.replace(/\n/g, ' ')}
                </h3>
              </div>
              <button
                type="button"
                className={styles.modalCloseBtn}
                aria-label="Close"
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
          </div>
        </div>
      )}
    </>
  );
}

