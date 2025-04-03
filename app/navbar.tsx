'use client';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';

const links = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'Contact', href: '/contact' },
];

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

const Navbar = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div>
      <div className='container mx-auto p-4 flex justify-between items-center m-4'>
        <Link href={'/'} className='flex items-center-safe space-x-1'>
          <div className='rounded-full bg-black w-4 h-4' />
          <h1 className='text-xl font-bold'>Monaf Studio</h1>
        </Link>

        {/* destop menu */}
        <div className='hidden md:flex space-x-6'>
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
        className='md:hidden overflow-hidden bg-neutral-50'
      >
        <div className='flex flex-col items-start p-4 space-y-6 pt-2'>
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
      </motion.div>
    </div>
  );
};

export default Navbar;
