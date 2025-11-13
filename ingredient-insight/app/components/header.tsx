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
    <Disclosure as="nav" className="fixed top-0 w-full z-50 bg-linear-to-b from-emerald-900/95 to-emerald-800/95 backdrop-blur-md border-b border-emerald-700/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">

          <div className="flex items-center sm:hidden">
            <DisclosureButton className="inline-flex items-center justify-center rounded-md p-2.5 text-emerald-200 hover:bg-emerald-700/50 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-emerald-800">
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
              <button onClick={goHome} className="text-emerald-100 hover:bg-emerald-700 hover:text-white rounded-full px-6 py-2.5 text-base font-medium transition-all duration-200">
                Home
              </button>
              <button onClick={goTeach} className="text-emerald-100 hover:bg-emerald-700 hover:text-white rounded-full px-6 py-2.5 text-base font-medium transition-all duration-200">
                Teach Section
              </button>
              <button onClick={goAbout} className="text-emerald-100 hover:bg-emerald-700 hover:text-white rounded-full px-6 py-2.5 text-base font-medium transition-all duration-200">
                About Us
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* <button type="button" className="relative rounded-full p-2 text-emerald-200 hover:bg-emerald-700/60 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-emerald-800 transition-all">
              <span className="sr-only">View notifications</span>
              <BellIcon aria-hidden="true" className="size-6" />
            </button> */}

            <Menu as="div" className="relative">
              <MenuButton className="relative flex rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-emerald-800">
                {/* <span className="sr-only">Open user menu</span>
                <img alt="User profile" src="" className="size-9 rounded-full ring-2 ring-emerald-400/50" /> */}
              </MenuButton>

              <MenuItems transition className="absolute right-0 z-20 mt-3 w-56 origin-top-right rounded-xl bg-emerald-800/95 backdrop-blur-md py-2 shadow-xl ring-1 ring-emerald-700/50 transition data-closed:scale-95 data-closed:opacity-0 data-enter:duration-150 data-enter:ease-out data-leave:duration-100 data-leave:ease-in">
                <MenuItem>
                  <a href="#" className="block px-5 py-3 text-sm font-medium text-emerald-100 hover:bg-emerald-700/60 transition-colors">Your Profile</a>
                </MenuItem>
                <MenuItem>
                  <a href="#" className="block px-5 py-3 text-sm font-medium text-emerald-100 hover:bg-emerald-700/60 transition-colors">Settings</a>
                </MenuItem>
                <MenuItem>
                  <a href="#" className="block px-5 py-3 text-sm font-medium text-emerald-100 hover:bg-emerald-700/60 transition-colors">Sign Out</a>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden bg-emerald-800/95 backdrop-blur-md border-t border-emerald-700/50">
        <div className="space-y-1 px-4 pt-3 pb-5">
          <button onClick={goHome} className="w-full text-left text-emerald-100 hover:bg-emerald-700/60 block rounded-lg px-4 py-3 text-base font-medium transition-all">
            Home
          </button>
          <button onClick={goTeach} className="w-full text-left text-emerald-100 hover:bg-emerald-700/60 block rounded-lg px-4 py-3 text-base font-medium transition-all">
            Teach Section
          </button>
          <button onClick={goAbout} className="w-full text-left text-emerald-100 hover:bg-emerald-700/60 block rounded-lg px-4 py-3 text-base font-medium transition-all">
            About Us
          </button>
        </div>
      </DisclosurePanel>
    </Disclosure>
  )
}