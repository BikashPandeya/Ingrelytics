'use client'

import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useRouter, usePathname } from 'next/navigation'

export default function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const isAboutPage = pathname === '/about'

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const goHome = () => {
    if (isAboutPage) {
      router.push('/#hero-section')
    } else {
      scrollToSection('hero-section')
    }
  }

  const goTeach = () => {
    if (isAboutPage) {
      router.push('/#teach-section')
    } else {
      scrollToSection('teach-section')
    }
  }

  const goAbout = () => router.push('/about')

  return (
    <Disclosure as="nav" className="fixed top-0 w-full z-50 bg-white backdrop-blur-md border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">

          <div className="flex items-center sm:hidden">
            <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 hover:bg-gray-100 hover:text-black focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white">
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block size-7 group-data-open:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden size-7 group-data-open:block" />
            </DisclosureButton>
          </div>

          <div className="flex items-center">
            <button onClick={goHome} className="flex shrink-0 items-center cursor-pointer hover:scale-105 transition-transform duration-200">
              <img alt="Ingrelytics Logo" src="/Logo.png" className="h-14 w-auto sm:h-16 md:h-18 lg:h-20" />
            </button>
          </div>

          <div className="hidden sm:flex flex-1 justify-center">
            <div className="flex items-center space-x-1">
              <button onClick={goHome} className="text-gray-800 hover:bg-gray-100 hover:text-black rounded-full px-6 py-2.5 text-base font-medium transition-all duration-200">
                Home
              </button>
              <button onClick={goTeach} className="text-gray-800 hover:bg-gray-100 hover:text-black rounded-full px-6 py-2.5 text-base font-medium transition-all duration-200">
                Guide
              </button>
              <button onClick={goAbout} className="text-gray-800 hover:bg-gray-100 hover:text-black rounded-full px-6 py-2.5 text-base font-medium transition-all duration-200">
                About Us
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Menu as="div" className="relative">
              <MenuButton className="relative flex rounded-full focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 focus:ring-offset-white">
              </MenuButton>

              <MenuItems transition className="absolute right-0 z-20 mt-3 w-56 origin-top-right rounded-xl bg-white/95 backdrop-blur-md py-2 shadow-xl ring-1 ring-gray-200 transition data-closed:scale-95 data-closed:opacity-0 data-enter:duration-150 data-enter:ease-out data-leave:duration-100 data-leave:ease-in">
                <MenuItem>
                  <a href="#" className="block px-5 py-3 text-sm font-medium text-gray-800 hover:bg-gray-100 transition-colors">Your Profile</a>
                </MenuItem>
                <MenuItem>
                  <a href="#" className="block px-5 py-3 text-sm font-medium text-gray-800 hover:bg-gray-100 transition-colors">Settings</a>
                </MenuItem>
                <MenuItem>
                  <a href="#" className="block px-5 py-3 text-sm font-medium text-gray-800 hover:bg-gray-100 transition-colors">Sign Out</a>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden bg-white/95 backdrop-blur-md border-t border-gray-200">
        <div className="space-y-1 px-4 pt-3 pb-5">
          <button onClick={goHome} className="w-full text-left text-gray-800 hover:bg-gray-100 block rounded-lg px-4 py-3 text-base font-medium transition-all">
            Home
          </button>
          <button onClick={goTeach} className="w-full text-left text-gray-800 hover:bg-gray-100 block rounded-lg px-4 py-3 text-base font-medium transition-all">
            Teach Section
          </button>
          <button onClick={goAbout} className="w-full text-left text-gray-800 hover:bg-gray-100 block rounded-lg px-4 py-3 text-base font-medium transition-all">
            About Us
          </button>
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}
