'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

// Images
const heroImage = '/api/upload/kbi-club.jpg'
const captainMural = '/api/upload/captain-mural.png'
const captainTraining1 = '/api/upload/captain-training1.png'
const captainTraining2 = '/api/upload/captain-training2.png'
const captainPortrait = '/api/upload/captain-portrait.png'

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
}

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } }
}

const scaleIn = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { scale: 1, opacity: 1, transition: { duration: 0.6 } }
}

const slideInLeft = {
  hidden: { x: -100, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.8 } }
}

const slideInRight = {
  hidden: { x: 100, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { duration: 0.8 } }
}

export default function Home() {
  const [activeSection, setActiveSection] = useState('home')
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      const sections = ['home', 'about', 'champions', 'schedule', 'pricing', 'location']
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setMobileMenuOpen(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden" dir="rtl">
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled ? 'bg-black/95 backdrop-blur-md shadow-lg shadow-orange-500/10' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => scrollToSection('home')}
            >
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center font-bold text-xl shadow-lg shadow-orange-500/30">
                KBI
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold bg-gradient-to-l from-orange-400 to-red-500 bg-clip-text text-transparent">
                  نادي KBI
                </h1>
                <p className="text-xs text-gray-400">Kickboxing Iraq</p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {[
                { id: 'home', label: 'الرئيسية' },
                { id: 'about', label: 'عن النادي' },
                { id: 'champions', label: 'الأبطال' },
                { id: 'schedule', label: 'المواعيد' },
                { id: 'pricing', label: 'الاشتراكات' },
                { id: 'location', label: 'الموقع' },
              ].map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  whileHover={{ y: -2 }}
                  className={`relative text-sm font-medium transition-colors duration-300 ${
                    activeSection === item.id ? 'text-orange-400' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-l from-orange-500 to-red-500"
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Contact Button */}
            <motion.a
              href="https://wa.me/9647742615358"
              target="_blank"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="hidden md:flex items-center gap-2 bg-gradient-to-l from-orange-500 to-red-600 text-white px-6 py-2.5 rounded-full font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transition-shadow"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              تواصل الآن
            </motion.a>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden bg-black/95 backdrop-blur-md border-t border-gray-800"
            >
              <div className="px-4 py-4 space-y-3">
                {['home', 'about', 'champions', 'schedule', 'pricing', 'location'].map((id) => (
                  <button
                    key={id}
                    onClick={() => scrollToSection(id)}
                    className={`block w-full text-right py-2 px-4 rounded-lg transition-colors ${
                      activeSection === id ? 'text-orange-400 bg-orange-500/10' : 'text-gray-300 hover:bg-gray-800'
                    }`}
                  >
                    {{home: 'الرئيسية', about: 'عن النادي', champions: 'الأبطال', schedule: 'المواعيد', pricing: 'الاشتراكات', location: 'الموقع'}[id]}
                  </button>
                ))}
                <a
                  href="https://wa.me/9647742615358"
                  target="_blank"
                  className="block w-full text-center py-3 bg-gradient-to-l from-orange-500 to-red-600 rounded-lg font-semibold"
                >
                  تواصل عبر واتساب
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImage}
            alt="نادي KBI للكيك بوكسينغ"
            fill
            className="object-cover object-center"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black" />
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/20 to-red-900/20" />
        </div>

        {/* Animated Particles */}
        <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-orange-500 rounded-full"
              initial={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                opacity: 0,
              }}
              animate={{
                y: [null, -100],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: "easeOut",
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
          >
            {/* Badge */}
            <motion.div
              variants={scaleIn}
              className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/30 rounded-full px-5 py-2 mb-8 backdrop-blur-sm"
            >
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-orange-300">الانتساب مفتوح الآن</span>
            </motion.div>

            {/* Main Title */}
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl sm:text-6xl lg:text-8xl font-black mb-6 leading-tight"
            >
              <span className="block text-white">نادي</span>
              <span className="block bg-gradient-to-l from-orange-400 via-red-500 to-orange-600 bg-clip-text text-transparent drop-shadow-2xl">
                KBI
              </span>
              <span className="block text-2xl sm:text-3xl lg:text-4xl mt-4 text-gray-200 font-bold">
                للكيك بوكسينغ والملاكمة
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p 
              variants={fadeInUp}
              className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              نحن لسست مجرد نادي، نحن عائلة رياضية تبني الأبطال وتصنع القصص
              <br />
              <span className="text-orange-400 font-semibold">نينوى، الموصل - حي نور</span>
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(249, 115, 22, 0.4)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('schedule')}
                className="group relative px-10 py-4 bg-gradient-to-l from-orange-500 to-red-600 rounded-full text-lg font-bold text-white shadow-2xl shadow-orange-500/30 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  ابدأ رحلتك الآن
                  <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection('about')}
                className="px-10 py-4 border-2 border-white/30 hover:border-orange-500/50 rounded-full text-lg font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/5"
              >
                تعرف علينا أكثر
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="cursor-pointer"
              onClick={() => scrollToSection('about')}
            >
              <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center pt-2">
                <motion.div
                  animate={{ opacity: [1, 0], y: [0, 10] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="w-1.5 h-1.5 bg-orange-400 rounded-full"
                />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Quick Contact Bar - Always Visible */}
      <section className="sticky top-20 z-40 bg-gradient-to-l from-orange-600 via-red-600 to-orange-700 py-4 shadow-2xl shadow-orange-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {/* WhatsApp */}
            <motion.a
              href="https://wa.me/9647742615358"
              target="_blank"
              whileHover={{ scale: 1.02, y: -2 }}
              className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-3 hover:bg-white/20 transition-all group"
            >
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </div>
              <div className="text-right">
                <p className="text-xs text-white/70">واتساب</p>
                <p className="text-sm font-bold text-white" dir="ltr">774 261 5358</p>
              </div>
            </motion.a>

            {/* Instagram */}
            <motion.a
              href="https://instagram.com/kbi_iraq2"
              target="_blank"
              whileHover={{ scale: 1.02, y: -2 }}
              className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-3 hover:bg-white/20 transition-all group"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </div>
              <div className="text-right">
                <p className="text-xs text-white/70">إنستغرام</p>
                <p className="text-sm font-bold text-white">@kbi_iraq2</p>
              </div>
            </motion.a>

            {/* TikTok */}
            <motion.a
              href="https://tiktok.com/@b_kkrrf"
              target="_blank"
              whileHover={{ scale: 1.02, y: -2 }}
              className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-3 hover:bg-white/20 transition-all group"
            >
              <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center group-hover:scale-110 transition-transform border border-white/20">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
              </div>
              <div className="text-right">
                <p className="text-xs text-white/70">تيك توك</p>
                <p className="text-sm font-bold text-white">@b_kkrrf</p>
              </div>
            </motion.a>

            {/* Location */}
            <motion.button
              whileHover={{ scale: 1.02, y: -2 }}
              onClick={() => scrollToSection('location')}
              className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-3 hover:bg-white/20 transition-all group"
            >
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              </div>
              <div className="text-right">
                <p className="text-xs text-white/70">الموقع</p>
                <p className="text-sm font-bold text-white">حي نور، الموصل</p>
              </div>
            </motion.button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-500 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <span className="inline-block text-orange-500 font-semibold mb-4 text-lg">من نحن</span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6">
              <span className="bg-gradient-to-l from-orange-400 to-red-500 bg-clip-text text-transparent">
                عن نادي KBI
              </span>
            </h2>
            <div className="w-24 h-1 bg-gradient-to-l from-orange-500 to-red-500 mx-auto rounded-full" />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideInRight}
              className="space-y-6"
            >
              <p className="text-xl text-gray-300 leading-relaxed">
                نادي <span className="text-orange-400 font-bold">KBI Kickboxing</span> هو أحد أبرز النوادي الرياضية المتخصصة في فنون 
                <span className="text-red-400 font-bold"> الملاكمة والكيك بوكسينغ</span> في الموصل، العراق.
              </p>
              
              <p className="text-gray-400 leading-relaxed">
                يقع نادينا في قلب <span className="text-white font-semibold">حي نور</span> في مدينة الموصل، ونفتخر بتقديم أفضل برامج التدريب 
                التي تناسب جميع المستويات من المبتدئين إلى المحترفين. تحت إشراف المدرب المحترف 
                <span className="text-orange-400 font-semibold"> الكابتن بكر</span>.
              </p>

              {/* Features Grid */}
              <div className="grid grid-cols-2 gap-4 pt-6">
                {[
                  { icon: '🥊', title: 'ملاكمة احترافية', desc: 'تدريب على أعلى مستوى' },
                  { icon: '🦵', title: 'كيك بوكسينغ', desc: 'فنون قتالية متكاملة' },
                  { icon: '🏆', title: 'بناء الأبطال', desc: 'من الصفر للاحتراف' },
                  { icon: '👥', title: 'بيئة عائلية', desc: 'فريق واحد وهدف واحد' },
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-2xl p-5 backdrop-blur-sm hover:border-orange-500/30 transition-all"
                  >
                    <span className="text-3xl mb-2 block">{feature.icon}</span>
                    <h4 className="font-bold text-white mb-1">{feature.title}</h4>
                    <p className="text-sm text-gray-400">{feature.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Image Gallery */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideInLeft}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="col-span-2 row-span-2 relative rounded-3xl overflow-hidden shadow-2xl shadow-orange-500/10 group"
                >
                  <Image
                    src={captainMural}
                    alt="الكابتن بكر مع الجدارية الفنية"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-6 right-6">
                    <p className="text-orange-400 font-bold text-lg">الكابتن بكر</p>
                    <p className="text-gray-300 text-sm">المدرب الرئيسي</p>
                  </div>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative rounded-2xl overflow-hidden aspect-square shadow-xl"
                >
                  <Image
                    src={captainTraining1}
                    alt="التدريب على الكيس"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-500"
                  />
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative rounded-2xl overflow-hidden aspect-square shadow-xl"
                >
                  <Image
                    src={captainTraining2}
                    alt="جلسة تدريبية مكثفة"
                    fill
                    className="object-cover hover:scale-110 transition-transform duration-500"
                  />
                </motion.div>
              </div>
              
              {/* Floating Badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute -top-6 -left-6 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-4 shadow-2xl shadow-orange-500/30"
              >
                <p className="text-3xl font-black text-white">+5</p>
                <p className="text-xs text-white/80">سنوات خبرة</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Champions Section */}
      <section id="champions" className="py-24 bg-black relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ff6b00' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <span className="inline-block text-orange-500 font-semibold mb-4 text-lg">نجومنا اللامعة</span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6">
              <span className="bg-gradient-to-l from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                أفضل الملاكمين
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              نفتخر بأبطالنا الذين صنعوا مجدهم داخل صالاتنا
            </p>
            <div className="w-24 h-1 bg-gradient-to-l from-yellow-500 via-orange-500 to-red-500 mx-auto rounded-full mt-6" />
          </motion.div>

          {/* Champions Grid - Reorganized with correct names and images */}
          <div className="space-y-8">
            
            {/* Featured Champion - Captain Bakr (Large Card with Dual Images) */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={scaleIn}
              whileHover={{ y: -5 }}
              className="group relative bg-gradient-to-br from-orange-900/30 to-black rounded-3xl overflow-hidden border-2 border-orange-500/50 hover:border-orange-500 transition-all duration-500"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 rounded-3xl opacity-20 group-hover:opacity-30 blur-xl transition-opacity duration-500" />
              
              {/* Main Badge */}
              <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full px-4 py-2 shadow-xl shadow-orange-500/50 flex items-center gap-2">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z"/></svg>
                <span className="text-white font-bold text-sm">المدرب الرئيسي</span>
              </div>
              
              <div className="relative z-10 p-6 lg:p-8">
                <div className="grid lg:grid-cols-2 gap-6 items-center">
                  {/* Images Grid for Captain Bakr */}
                  <div className="grid grid-cols-2 gap-4 order-2 lg:order-1">
                    <motion.div 
                      whileHover={{ scale: 1.03 }}
                      className="relative h-56 lg:h-64 rounded-2xl overflow-hidden col-span-2 row-span-1"
                    >
                      <Image
                        src={captainTraining1}
                        alt="الكابتن بكر أمام كيس الملاكمة - استعداد للضربة"
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-3 right-3 bg-orange-500/90 backdrop-blur-sm px-3 py-1 rounded-lg">
                        <p className="text-white text-xs font-bold">🥊 جاهز للقتال</p>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className="relative h-40 rounded-xl overflow-hidden"
                    >
                      <Image
                        src={captainTraining2}
                        alt="الكابتن بكر في وضعية الضرب القوية"
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </motion.div>
                    
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className="relative h-40 rounded-xl overflow-hidden bg-gradient-to-br from-orange-600 to-red-600 flex items-center justify-center"
                    >
                      <div className="text-center p-4">
                        <p className="text-5xl mb-2">💪</p>
                        <p className="text-white font-bold text-sm">+5 سنوات</p>
                        <p className="text-white/70 text-xs">خبرة تدريب</p>
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Info Section */}
                  <div className="order-1 lg:order-2 space-y-4">
                    <div>
                      <h3 className="text-3xl lg:text-4xl font-black text-white mb-2">الكابتن بكر</h3>
                      <p className="text-xl text-orange-400 font-semibold">المؤسس والمدرب الرئيسي لنادي KBI</p>
                    </div>
                    
                    <p className="text-gray-300 leading-relaxed">
                      المدرب المحترف الذي يقف دائماً أمام كيس الملاكمة، يضع قلب وروح في تدريب كل طالب. 
                      أكثر من 5 سنوات من الخبرة في بناء الأبطال وتحقيق البطولات.
                    </p>
                    
                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-3 pt-4">
                      <div className="bg-black/40 rounded-xl p-3 text-center border border-gray-700">
                        <p className="text-2xl font-black text-orange-400">5+</p>
                        <p className="text-xs text-gray-400">سنوات خبرة</p>
                      </div>
                      <div className="bg-black/40 rounded-xl p-3 text-center border border-gray-700">
                        <p className="text-2xl font-black text-red-400">100+</p>
                        <p className="text-xs text-gray-400">طالب مدرب</p>
                      </div>
                      <div className="bg-black/40 rounded-xl p-3 text-center border border-gray-700">
                        <p className="text-2xl font-black text-yellow-400">∞</p>
                        <p className="text-xs text-gray-400">شغف وعزيمة</p>
                      </div>
                    </div>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-full text-xs font-semibold">مدرب محترف</span>
                      <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-xs font-semibold">ملاكمة & كيك بوكسينغ</span>
                      <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs font-semibold">بناء الأبطال</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Two Champions in Row - Ziko & Scorpen */}
            <div className="grid md:grid-cols-2 gap-8">
              
              {/* Ziko - Champion of the Governorate */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={scaleIn}
                transition={{ delay: 0.2 }}
                whileHover={{ y: -10 }}
                className="group relative bg-gradient-to-br from-purple-900/20 to-black rounded-3xl overflow-hidden border border-purple-500/30 hover:border-purple-500/60 transition-all duration-500"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
                
                <div className="relative p-1">
                  <div className="relative h-96 overflow-hidden rounded-2xl">
                    <Image
                      src={captainMural}
                      alt="زيكو - بطل المحافظة جالس أمام الجدارية الفنية للملاكم"
                      fill
                      className="object-cover object-top group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    
                    {/* Champion Badge */}
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-3 shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                    </div>
                    
                    {/* Trophy Badge */}
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-500 to-amber-500 rounded-full px-3 py-2 shadow-lg">
                      <span className="text-white font-bold text-xs flex items-center gap-1">
                        🏆 بطل المحافظة
                      </span>
                    </div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="text-2xl font-black text-white mb-1">زيكو</h3>
                      <p className="text-purple-400 font-semibold mb-3">بطل المحافظة 🏆</p>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 space-y-2">
                        <p className="text-gray-300 text-sm">البطل الذي يجلس بفخر أمام جدارية الملاكم الفنية. رمز الإصرار والتميز في النادي.</p>
                        <div className="flex gap-2">
                          <span className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs">بطل</span>
                          <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-xs">محافظة نينوى</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 flex justify-around border-t border-gray-800">
                    <div className="text-center">
                      <p className="text-2xl font-black text-yellow-400">🏆</p>
                      <p className="text-xs text-gray-500">بطل محافظة</p>
                    </div>
                    <div className="text-center border-x border-gray-800 px-6">
                      <p className="text-2xl font-black text-purple-400">⭐</p>
                      <p className="text-xs text-gray-500">نجم صاعد</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-black text-pink-400">💎</p>
                      <p className="text-xs text-gray-500">مواهب فريدة</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Scorpen - Standing Tall */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={scaleIn}
                transition={{ delay: 0.4 }}
                whileHover={{ y: -10 }}
                className="group relative bg-gradient-to-br from-cyan-900/20 to-black rounded-3xl overflow-hidden border border-cyan-500/30 hover:border-cyan-500/60 transition-all duration-500"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500" />
                
                <div className="relative p-1">
                  <div className="relative h-96 overflow-hidden rounded-2xl">
                    <Image
                      src={captainPortrait}
                      alt="سكوربن - يقف بشموخ وقوة"
                      fill
                      className="object-cover object-center group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                    
                    {/* Standing Badge */}
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full p-3 shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                      </svg>
                    </div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="text-2xl font-black text-white mb-1">سكوربن</h3>
                      <p className="text-cyan-400 font-semibold mb-3">الوقفة القوية 🌟</p>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 space-y-2">
                        <p className="text-gray-300 text-sm">يقف دائماً بشموخ وإصرار. يمثل قوة العزيمة والإرادة الحديدية في النادي.</p>
                        <div className="flex gap-2">
                          <span className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-xs">قوي</span>
                          <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs">مصمم</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 flex justify-around border-t border-gray-800">
                    <div className="text-center">
                      <p className="text-2xl font-black text-cyan-400">💪</p>
                      <p className="text-xs text-gray-500">قوة جسدية</p>
                    </div>
                    <div className="text-center border-x border-gray-800 px-6">
                      <p className="text-2xl font-black text-blue-400">🧠</p>
                      <p className="text-xs text-gray-500">عزيمة حديدية</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-black text-teal-400">⚡</p>
                      <p className="text-xs text-gray-500">طاقة عالية</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
            </div>
          </div>

          {/* CTA for Joining */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mt-16 text-center"
          >
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 bg-gradient-to-r from-gray-900 to-black border border-gray-800 rounded-3xl p-8">
              <div className="text-right">
                <h3 className="text-2xl font-bold text-white mb-2">تريد أن تكون من أبطالنا؟</h3>
                <p className="text-gray-400">انضم إلى النادي وابدأ رحلتك نحو الاحتراف</p>
              </div>
              <motion.a
                href="https://wa.me/9647742615358?text=مرحباً، أريد الانضمام لنادي KBI"
                target="_blank"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-l from-orange-500 to-red-600 rounded-full font-bold text-white shadow-lg shadow-orange-500/30 whitespace-nowrap"
              >
                سجل الآن عبر الواتساب
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Schedule Section */}
      <section id="schedule" className="py-24 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/5 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <span className="inline-block text-orange-500 font-semibold mb-4 text-lg">جدول التدريبات</span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6">
              <span className="bg-gradient-to-l from-orange-400 to-red-500 bg-clip-text text-transparent">
                أوقات العمل
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              اختر الوقت المناسب لك وانضم إلينا
            </p>
            <div className="w-24 h-1 bg-gradient-to-l from-orange-500 to-red-500 mx-auto rounded-full mt-6" />
          </motion.div>

          {/* Days Banner */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mb-12"
          >
            <div className="flex flex-wrap justify-center gap-3">
              {['السبت', 'الأحد', 'الثلاثاء', 'الخميس'].map((day, index) => (
                <motion.div
                  key={day}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className={`px-6 py-3 rounded-2xl font-bold text-lg ${
                    index % 2 === 0 
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30' 
                      : 'bg-gray-800 text-gray-300 border border-gray-700'
                  }`}
                >
                  {day}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Schedule Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Beginners */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={scaleIn}
              whileHover={{ y: -10 }}
              className="group relative bg-gradient-to-br from-green-900/20 to-black border border-green-500/30 rounded-3xl p-8 hover:border-green-500/60 transition-all"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl opacity-0 group-hover:opacity-10 blur-xl transition-opacity" />
              
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-green-500/30">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                
                <h3 className="text-2xl font-black text-white mb-2">للمبتدئين</h3>
                <p className="text-green-400 font-semibold mb-6">أساسيات الملاكمة واللياقة</p>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4 bg-black/30 rounded-xl p-4">
                    <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-2xl font-black text-white">4:30 PM</p>
                      <p className="text-sm text-gray-400">البداية</p>
                    </div>
                    <svg className="w-6 h-6 text-gray-600 mr-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                    <div className="text-left">
                      <p className="text-2xl font-black text-white">6:00 PM</p>
                      <p className="text-sm text-gray-400">الانتهاء</p>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-800">
                    <p className="text-gray-400 text-sm">المدة:</p>
                    <p className="text-xl font-bold text-green-400">ساعة ونصف</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Advanced */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={scaleIn}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -10 }}
              className="group relative bg-gradient-to-br from-orange-900/20 to-black border border-orange-500/30 rounded-3xl p-8 hover:border-orange-500/60 transition-all transform md:scale-105"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl opacity-20 blur-xl" />
              
              {/* Popular Badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-sm font-bold text-white shadow-lg">
                ⭐ الأكثر طلباً
              </div>
              
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-orange-500/30">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                
                <h3 className="text-2xl font-black text-white mb-2">للمتقدمين</h3>
                <p className="text-orange-400 font-semibold mb-6">تدريب مكثف وتقني متقدم</p>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4 bg-black/30 rounded-xl p-4">
                    <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-2xl font-black text-white">6:30 PM</p>
                      <p className="text-sm text-gray-400">البداية</p>
                    </div>
                    <svg className="w-6 h-6 text-gray-600 mr-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                    <div className="text-left">
                      <p className="text-2xl font-black text-white">8:00 PM</p>
                      <p className="text-sm text-gray-400">الانتهاء</p>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-800">
                    <p className="text-gray-400 text-sm">المدة:</p>
                    <p className="text-xl font-bold text-orange-400">ساعة ونصف</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Private */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={scaleIn}
              transition={{ delay: 0.4 }}
              whileHover={{ y: -10 }}
              className="group relative bg-gradient-to-br from-purple-900/20 to-black border border-purple-500/30 rounded-3xl p-8 hover:border-purple-500/60 transition-all"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl opacity-0 group-hover:opacity-10 blur-xl transition-opacity" />
              
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-purple-500/30">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                
                <h3 className="text-2xl font-black text-white mb-2">خاص (Private)</h3>
                <p className="text-purple-400 font-semibold mb-6">تدريب فردي مخصص</p>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-4 bg-black/30 rounded-xl p-4">
                    <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                      <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-2xl font-black text-white">8:10 PM</p>
                      <p className="text-sm text-gray-400">البداية</p>
                    </div>
                    <svg className="w-6 h-6 text-gray-600 mr-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                    <div className="text-left">
                      <p className="text-2xl font-black text-white">9:45 PM</p>
                      <p className="text-sm text-gray-400">الانتهاء</p>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-800">
                    <p className="text-gray-400 text-sm">المدة:</p>
                    <p className="text-xl font-bold text-purple-400">ساعة و35 دقيقة</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-black relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <span className="inline-block text-orange-500 font-semibold mb-4 text-lg">خطط الاشتراك</span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6">
              <span className="bg-gradient-to-l from-orange-400 to-red-500 bg-clip-text text-transparent">
                أسعار الاشتراكات
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              اختار الخطة المناسبة لك وابدأ رحلتك الرياضية
            </p>
            <div className="w-24 h-1 bg-gradient-to-l from-orange-500 to-red-500 mx-auto rounded-full mt-6" />
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* General Subscription */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideInRight}
              whileHover={{ y: -10 }}
              className="group relative bg-gradient-to-br from-gray-900 to-black border-2 border-gray-700 hover:border-blue-500/50 rounded-3xl p-8 transition-all duration-500"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl opacity-0 group-hover:opacity-10 blur-xl transition-opacity" />
              
              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <span className="px-4 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-semibold">اشتراك عام</span>
                </div>

                <h3 className="text-2xl font-black text-white mb-2">الاشتراك العام</h3>
                <p className="text-gray-400 mb-6">للجلسات الجماعية العادية</p>

                {/* Price Before Discount */}
                <div className="mb-4">
                  <p className="text-sm text-gray-500 line-through">قبل الخصم</p>
                  <p className="text-2xl text-gray-500 line-through">25,000 IQD / شهرياً</p>
                </div>

                {/* Price After Discount */}
                <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl p-6 mb-6 border border-blue-500/30">
                  <p className="text-sm text-blue-400 font-semibold mb-1">بعد الخصم 🎉</p>
                  <div className="flex items-end gap-2">
                    <span className="text-5xl font-black text-white">20,000</span>
                    <span className="text-xl text-gray-400 mb-2">IQD</span>
                  </div>
                  <p className="text-gray-400 text-sm mt-1">شهرياً</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {['جلسات المبتدئين والمتقدمين', 'تدريب جماعي', 'استخدام معدات النادي', 'إشراف مدرب محترف'].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-300">
                      <svg className="w-5 h-5 text-blue-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <motion.a
                  href="https://wa.me/9647742615358?text=مرحباً، أريد الاشتراك في الباقة العامة"
                  target="_blank"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="block w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl font-bold text-center text-white shadow-lg shadow-blue-500/30"
                >
                  اشترك الآن
                </motion.a>
              </div>
            </motion.div>

            {/* Private Subscription */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideInLeft}
              whileHover={{ y: -10 }}
              className="group relative bg-gradient-to-br from-orange-900/20 to-black border-2 border-orange-500 rounded-3xl p-8 transition-all duration-500 transform md:scale-105"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl opacity-20 blur-xl" />
              
              {/* Premium Badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-sm font-bold text-white shadow-lg shadow-orange-500/50 flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M5 16L3 5l5.5 5L12 4l3.5 6L21 5l-2 11H5zm14 3c0 .6-.4 1-1 1H6c-.6 0-1-.4-1-1v-1h14v1z"/></svg>
                مميز
              </div>

              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/30">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <span className="px-4 py-1 bg-orange-500/20 text-orange-400 rounded-full text-sm font-semibold">اشتراك خاص</span>
                </div>

                <h3 className="text-2xl font-black text-white mb-2">الاشتراك الخاص</h3>
                <p className="text-gray-400 mb-6">للجلسات الخاصة والـ Private</p>

                {/* Price Before Discount */}
                <div className="mb-4">
                  <p className="text-sm text-gray-500 line-through">قبل الخصم</p>
                  <p className="text-2xl text-gray-500 line-through">50,000 IQD / شهرياً</p>
                </div>

                {/* Price After Discount */}
                <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl p-6 mb-6 border border-orange-500/30">
                  <p className="text-sm text-orange-400 font-semibold mb-1">بعد الخصم 🎉</p>
                  <div className="flex items-end gap-2">
                    <span className="text-5xl font-black text-white">40,000</span>
                    <span className="text-xl text-gray-400 mb-2">IQD</span>
                  </div>
                  <p className="text-gray-400 text-sm mt-1">شهرياً</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {['كل مميزات الباقة العامة', 'جلسات خاصة (Private)', 'تدريب شخصي مع الكابتن', 'جدول مرن', 'اهتمام خاص ومتابعة'].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-300">
                      <svg className="w-5 h-5 text-orange-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <motion.a
                  href="https://wa.me/9647742615358?text=مرحباً، أريد الاشتراك في الباقة الخاصة"
                  target="_blank"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="block w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl font-bold text-center text-white shadow-lg shadow-orange-500/30"
                >
                  اشترك الآن
                </motion.a>
              </div>
            </motion.div>
          </div>

          {/* Important Note */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-start gap-3 bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-6 max-w-2xl">
              <svg className="w-6 h-6 text-yellow-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-right">
                <p className="text-yellow-400 font-semibold mb-1">مهم جداً!</p>
                <p className="text-gray-300 text-sm">
                  للاشتراك يرجى <span className="text-white font-semibold">القدوم شخصياً إلى النادي</span> بإحدى أيام الافتتاح (السبت - الأحد - الثلاثاء - الخميس)
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="py-24 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <span className="inline-block text-orange-500 font-semibold mb-4 text-lg">زورونا</span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-6">
              <span className="bg-gradient-to-l from-orange-400 to-red-500 bg-clip-text text-transparent">
                موقع النادي
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              نحن في قلب حي نور، الموصل - نينوى، العراق
            </p>
            <div className="w-24 h-1 bg-gradient-to-l from-orange-500 to-red-500 mx-auto rounded-full mt-6" />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Map */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideInRight}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl shadow-orange-500/10 border-2 border-gray-800 hover:border-orange-500/30 transition-all">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3304.7!2d43.186533!3d36.3587129!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x400795006a523835:0xf8184eda74a2679d!2z2KfZhNiq2K3Ysdin2YUgS0JJINij2LPZgdmG2KfYtiDYp9iz2LHYp9mFINin2LTZitin!5e0!3m2!1sar!2siq!4v1723400000"
                  width="100%"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale hover:grayscale-0 transition-all duration-500"
                  title="موقع نادي KBI"
                />
                
                {/* Map Overlay Info */}
                <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md rounded-2xl p-4 border border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-white flex items-center gap-2">
                        <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                        نادي KBI للكيك بوكسينغ
                      </p>
                      <p className="text-sm text-gray-400">حي نور، الموصل، نينوى، العراق</p>
                    </div>
                    <motion.a
                      href="https://www.google.com/maps/place/%D9%82%D8%A7%D8%B9%D8%A9+KBI+%D9%84%D9%84%D9%85%D9%84%D8%A7%D9%83%D9%85%D8%A9+%D9%88%D8%A7%D9%84%D9%83%D9%8A%D9%83+%D8%A8%D9%88%D9%83%D8%B3%D9%86%D8%AC%E2%80%AD/@36.3586785,43.1903876,16z/data=!4m7!3m6!1s0x400795006a523835:0xf8184eda74a2679d!8m2!3d36.3587129!4d43.186533"
                      target="_blank"
                      whileHover={{ scale: 1.05 }}
                      className="px-4 py-2 bg-orange-500 rounded-xl text-sm font-semibold text-white whitespace-nowrap"
                    >
                      افتح في خرائط
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Location Details */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={slideInLeft}
              className="space-y-6"
            >
              {/* Coordinates Card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-3xl p-6 hover:border-orange-500/30 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-white mb-3">الإحداثيات الدقيقة</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-black/50 rounded-xl p-3 border border-gray-700">
                        <p className="text-xs text-gray-500 mb-1">خط العرض (Latitude)</p>
                        <p className="text-lg font-mono font-bold text-cyan-400" dir="ltr">36.3587129° N</p>
                      </div>
                      <div className="bg-black/50 rounded-xl p-3 border border-gray-700">
                        <p className="text-xs text-gray-500 mb-1">خط الطول (Longitude)</p>
                        <p className="text-lg font-mono font-bold text-cyan-400" dir="ltr">43.186533° E</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Address Card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-3xl p-6 hover:border-orange-500/30 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2">العنوان الكامل</h4>
                    <p className="text-gray-300 text-lg leading-relaxed">
                      العراق 🇮🇶<br />
                      نينوى<br />
                      الموصل<br />
                      <span className="text-orange-400 font-semibold">حي نور</span>
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Directions Card */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-orange-900/20 to-black border border-orange-500/30 rounded-3xl p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shrink-0">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-2">كيف تصل إلينا؟</h4>
                    <ol className="text-gray-300 space-y-2 list-decimal list-inside">
                      <li>اتجه إلى حي نور في الموصل</li>
                      <li>ابحث عن شعار KBI أو تواصل معنا</li>
                      <li>نحن قريبون من المنطقة السكنية الرئيسية</li>
                    </ol>
                    <motion.a
                      href="https://wa.me/9647742615358?text=مرحباً، أحتاج مساعدة في الوصول إلى النادي"
                      target="_blank"
                      whileHover={{ scale: 1.02 }}
                      className="mt-4 inline-flex items-center gap-2 text-green-400 font-semibold hover:text-green-300"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                      اطلب المساعدة عبر الواتساب
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center font-bold text-xl">
                  KBI
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">نادي KBI</h3>
                  <p className="text-sm text-gray-400">Kickboxing Iraq</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                نادي متخصص في فنون الملاكمة والكيك بوكسينغ في الموصل، العراق.
                <br />نبني الأبطال ونصنع المستقبل.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-bold mb-4">روابط سريعة</h4>
              <ul className="space-y-2">
                {[
                  { id: 'home', label: 'الرئيسية' },
                  { id: 'about', label: 'عن النادي' },
                  { id: 'champions', label: 'الأبطال' },
                  { id: 'schedule', label: 'المواعيد' },
                  { id: 'pricing', label: 'الاشتراكات' },
                ].map((link) => (
                  <li key={link.id}>
                    <button
                      onClick={() => scrollToSection(link.id)}
                      className="text-gray-400 hover:text-orange-400 transition-colors text-sm"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social & Contact */}
            <div>
              <h4 className="text-white font-bold mb-4">تواصل معنا</h4>
              <div className="space-y-3">
                <a href="https://wa.me/9647742615358" target="_blank" className="flex items-center gap-3 text-gray-400 hover:text-green-400 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  <span dir="ltr">+964 774 261 5358</span>
                </a>
                <a href="https://instagram.com/kbi_iraq2" target="_blank" className="flex items-center gap-3 text-gray-400 hover:text-pink-400 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  @kbi_iraq2
                </a>
                <a href="https://tiktok.com/@b_kkrrf" target="_blank" className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
                  @b_kkrrf
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-500 text-sm">
              © 2024 نادي KBI للكيك بوكسينغ. جميع الحقوق محفوظة.
            </p>
            <p className="text-gray-600 text-xs mt-2">
              صُنع بـ ❤️ في الموصل، العراق 🇮🇶
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
