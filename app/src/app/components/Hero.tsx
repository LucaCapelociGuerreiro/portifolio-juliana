'use client';

import { motion, useMotionValue, useTransform, useSpring, MotionValue } from 'framer-motion';
import { Cloud, Server, Database, Shield } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';

// ... (mantive TechBackgroundLogos igual)

const BlobEffect = ({ mouseX, mouseY }: { mouseX: MotionValue<number>; mouseY: MotionValue<number> }) => {
  const xBlob1 = useTransform(mouseX, [-500, 500], [-30, 30]);
  const yBlob1 = useTransform(mouseY, [-500, 500], [-30, 30]);
  const xBlob2 = useTransform(mouseX, [-500, 500], [20, -20]);
  const yBlob2 = useTransform(mouseY, [-500, 500], [20, -20]);
  const xBlob3 = useTransform(mouseX, [-500, 500], [-10, 10]);
  const yBlob3 = useTransform(mouseY, [-500, 500], [10, -10]);

  const springX1 = useSpring(xBlob1, { damping: 30, stiffness: 90 });
  const springY1 = useSpring(yBlob1, { damping: 30, stiffness: 90 });
  const springX2 = useSpring(xBlob2, { damping: 25, stiffness: 100 });
  const springY2 = useSpring(yBlob2, { damping: 25, stiffness: 100 });
  const springX3 = useSpring(xBlob3, { damping: 35, stiffness: 80 });
  const springY3 = useSpring(yBlob3, { damping: 35, stiffness: 80 });

  return (
    <div className="parallax-bg">
      <motion.div
        className="blob-effect"
        style={{
          x: springX1,
          y: springY1,
          background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, rgba(139,92,246,0) 70%)',
          width: '80%',
          height: '80%',
          top: '-20%',
          left: '-10%',
        }}
      />
      <motion.div
        className="blob-effect"
        style={{
          x: springX2,
          y: springY2,
          background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, rgba(124,58,237,0) 70%)',
          width: '70%',
          height: '70%',
          bottom: '-10%',
          right: '-10%',
        }}
      />
      <motion.div
        className="blob-effect"
        style={{
          x: springX3,
          y: springY3,
          background: 'radial-gradient(circle, rgba(167,139,250,0.10) 0%, rgba(167,139,250,0) 70%)',
          width: '50%',
          height: '50%',
          top: '30%',
          left: '20%',
        }}
      />
      <div className="distortion-layer" />
    </div>
  );
};

const ProfileImage = ({ springImgX, springImgY }: { springImgX: MotionValue<number>; springImgY: MotionValue<number> }) => {
  const imgRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (imgRef.current) {
      const rect = imgRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      springImgX.set(x * 20 - 10);
      springImgY.set(y * 20 - 10);
    }
  }, [springImgX, springImgY]);

  useEffect(() => {
    const img = imgRef.current;
    if (img) {
      img.addEventListener('mousemove', handleMouseMove as unknown as EventListener);
      return () => {
        img.removeEventListener('mousemove', handleMouseMove as unknown as EventListener);
      };
    }
  }, [handleMouseMove]);

  return (
    <motion.div
      className="relative w-72 h-72 mx-auto profile-parallax"
      style={{ x: springImgX, y: springImgY }}
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="absolute w-full h-full rounded-full bg-purple-500/20 dark:bg-purple-600/30 blur-xl -z-10 transform scale-95 translate-y-4"></div>
      <div
        ref={imgRef}
        className="w-full h-full rounded-full overflow-hidden shadow-[0_20px_50px_rgba(139,92,246,0.7)] dark:shadow-[0_20px_50px_rgba(124,58,237,0.5)] relative"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full z-10 pointer-events-none" />
        <Image
          src="/images/profile.svg"
          alt="Juliana Kaiza Rodrigues do Nascimento - Analista de SEO"
          fill
          className="rounded-full object-cover"
          priority
        />
      </div>
    </motion.div>
  );
};

const Hero = () => {
  const { t } = useLanguage();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const imgX = useTransform(mouseX, [-500, 500], [-5, 5]);
  const imgY = useTransform(mouseY, [-500, 500], [-5, 5]);
  const springImgX = useSpring(imgX, { damping: 25, stiffness: 100 });
  const springImgY = useSpring(imgY, { damping: 25, stiffness: 100 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    },
    [mouseX, mouseY]
  );

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      handleMouseMove(e as unknown as React.MouseEvent);
    };
    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleGlobalMouseMove);
    };
  }, [handleMouseMove]);

  const containerVariants = prefersReducedMotion 
    ? { hidden: {}, visible: {} }
    : { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } };
  const itemVariants = prefersReducedMotion 
    ? { hidden: {}, visible: {} }
    : { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center py-20 relative overflow-hidden bg-section-primary">
      {!prefersReducedMotion && <BlobEffect mouseX={mouseX} mouseY={mouseY} />}

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center relative z-10"
      >
        <div className="flex-1 text-center md:text-left">
          <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            {t('hero.greeting')} <span className="text-gray-900 dark:text-white">{t('hero.name')}</span>
          </motion.h1>
          <motion.h2 variants={itemVariants} className="text-xl sm:text-2xl md:text-3xl text-gray-600 dark:text-gray-300 mb-8">
            {t('hero.title')}
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
            {t('hero.description')}
          </motion.p>
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 justify-center md:justify-start mb-8">
            <a href="#contact" className="px-8 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-all hover:scale-105">
              {t('hero.contact')}
            </a>
            <a
              href="#projects"
              className="px-8 py-3 border-2 border-purple-600 text-purple-600 dark:text-purple-400 rounded-full hover:bg-purple-600 hover:text-white transition-all hover:scale-105"
            >
              {t('hero.projects')}
            </a>
          </motion.div>
          <motion.div variants={itemVariants} className="flex flex-wrap gap-6 justify-center md:justify-start">
            <motion.div whileHover={prefersReducedMotion ? {} : { scale: 1.05 }} className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 p-2 rounded-lg">
              <Cloud className="w-6 h-6 text-purple-600" />
              <span>{t('skills.cloudArchitecture')}</span>
            </motion.div>
            <motion.div whileHover={prefersReducedMotion ? {} : { scale: 1.05 }} className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 p-2 rounded-lg">
              <Server className="w-6 h-6 text-purple-600" />
              <span>{t('skills.devops')}</span>
            </motion.div>
            <motion.div whileHover={prefersReducedMotion ? {} : { scale: 1.05 }} className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 p-2 rounded-lg">
              <Database className="w-6 h-6 text-purple-600" />
              <span>{t('skills.infrastructure')}</span>
            </motion.div>
            <motion.div whileHover={prefersReducedMotion ? {} : { scale: 1.05 }} className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 p-2 rounded-lg">
              <Shield className="w-6 h-6 text-purple-600" />
              <span>{t('skills.security')}</span>
            </motion.div>
            <motion.div whileHover={prefersReducedMotion ? {} : { scale: 1.05 }} className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 p-2 rounded-lg">
              <Shield className="w-6 h-6 text-purple-600" />
              <span>{t('skills.content')}</span>
            </motion.div>
            
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="flex-1 mt-12 md:mt-0">
          <ProfileImage springImgX={springImgX} springImgY={springImgY} />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
