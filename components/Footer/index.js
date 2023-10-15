import Link from 'next/link'
import React from 'react'

function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900">
    <div className="container px-6 py-12 mx-auto">
      <hr className="my-6 border-gray-200 md:my-10 dark:border-gray-700" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <div>
          <p className="font-semibold text-gray-800 dark:text-white">Quick Link</p>
          <div className="flex flex-col items-start mt-5 space-y-2">
            <Link href="/" className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">Home</Link>
            <Link href="/shop" className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">Shopping</Link>
            <Link href="/searches" className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">Search</Link>
          </div>
        </div>
        <div>
          <p className="font-semibold text-gray-800 dark:text-white">Industries</p>
          <div className="flex flex-col items-start mt-5 space-y-2">
            <Link href="#" className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">Retail &amp; E-Commerce</Link>
            <Link href="#" className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">Information Technology</Link>          </div>
        </div>
        <div>
          <p className="font-semibold text-gray-800 dark:text-white">Services</p>
          <div className="flex flex-col items-start mt-5 space-y-2">
            <Link href="/category/laptop/1" className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">Laptops Selling</Link>
            <Link href="/category/other/1" className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">Electronic Gadgets</Link>
          </div>
        </div>
        <div>
          <p className="font-semibold text-gray-800 dark:text-white">Contact Us</p>
          <div className="flex flex-col items-start mt-5 space-y-2">
            <a href="tel:+254713441634" className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">+254 713 441634</a>
            <a href="mailto:info@electrikacomputers.co.ke" className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">info@electrikacomputers.co.ke</a>
            <br />
            <span className="text-gray-600 transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:text-blue-500">Kimathi Street , opposite Total petrol station , equity bank building . KIMATHI CHAMBERS 2ND FLOOR RM 9</span>
          </div>
        </div>
      </div>
      <hr className="my-6 border-gray-200 md:my-10 dark:border-gray-700" />
      <div className="flex flex-col items-center justify-between sm:flex-row">
        <Link href="/">
          <img className="w-auto h-7" src="/media/images/logo2.jpg" style={{height:80}} alt="" /> 
        </Link>
        <p className="mt-4 text-sm text-gray-500 sm:mt-0 dark:text-gray-300">© Copyright {new Date().getFullYear()}. All Rights Reserved.</p>
      </div>
    </div>
  </footer>
  )
}

export default Footer