'use client';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'framer-motion';

const links = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '/contact' },
];

const Navbar = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const isHomepage = pathname === '/';
  const [hasScrolled, setHasScrolled] = useState(false);
  const { scrollY } = useScroll();
  const [prevScrollY, setPrevScrollY] = useState(0);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (!mobileMenuOpen) {
      const scrollingUp = latest < prevScrollY;
      const shouldShow = scrollingUp || latest < 50;
      setIsVisible(shouldShow);
    }
  });

  const menuVariants = {
    open: {
      opacity: 1,
      height: 'auto',
      transition: {
        duration: 0.5,
      },
    },
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const navbarVariants = {
    intial: isHomepage
      ? {
          y: -100,
          opacity: 0,
        }
      : {
          y: 0,
          opacity: 1,
        },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        duration: 0.5,
        delay: isHomepage && !hasScrolled ? 1.8 : 0,
      },
    },
    hidden: {
      y: -100,
      opacity: 0,
      transition: {
        ease: 'easeInOut',
        duration: 0.3,
      },
    },
  };

  return (
    <AnimatePresence>
      <motion.nav
        initial='intial'
        key='navbar'
        animate={isVisible ? 'visible' : 'hidden'}
        variants={navbarVariants}
        className='fixed top-0 left-0 right-0 z-50 px-6 py-8 border-b bg-white md:p-10 '
      >
        <div className='mx-auto flex justify-between items-center'>
          <Link href={'/'} className='flex items-center space-x-1'>
            <div className='rounded-full bg-black w-4 h-4' />
            <h1 className='text-xl font-bold'>Monaf Studio</h1>
          </Link>

          {/* destop menu */}
          <div className='hidden md:flex space-x-8'>
            {links.map((link) => (
              <Link
                href={link.href}
                key={link.href}
                className={`${
                  pathname === link.href
                    ? 'text-black font-medium'
                    : 'text-neutral-400'
                } hover:text-black `}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* mobile menu button*/}
          <button
            className='md:hidden'
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className='w-6 h-6' />
            ) : (
              <Menu className='w-6 h-6' />
            )}
          </button>
        </div>

        {/* mobile menu */}
        <motion.div
          initial='closed'
          animate={mobileMenuOpen ? 'open' : 'closed'}
          variants={menuVariants}
          className='md:hidden overflow-hidden'
        >
          <div className='flex flex-col items-center space-y-4 pt-4'>
            {links.map((link) => (
              <Link
                href={link.href}
                key={link.href}
                className={`${
                  pathname === link.href
                    ? 'text-black font-medium'
                    : 'text-neutral-400'
                } hover:text-black transition-colors duration-200`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </motion.div>
      </motion.nav>
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className='fixed inset-0 bg-black/90 z-40 md:hidden'
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </AnimatePresence>
  );
};

export default Navbar;
