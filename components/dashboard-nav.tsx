'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Plus, Home, Map, Package, LogOut, Settings } from 'lucide-react'

export function DashboardNav() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <nav className="border-b bg-gradient-to-r from-blue-600 to-blue-700 sticky top-0 z-40 shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Left Section - Logo and Navigation */}
          <div className="flex items-center gap-8">
            <Link href="/dashboard" className="flex items-center gap-2">
              <Image
                src="/images/logo.png"
                alt="Madura Logo"
                width={50}
                height={50}
                className="object-contain h-12 w-12"
              />
              <div>
                <div className="font-bold text-white text-lg">Admin Dashboard</div>
                <div className="text-xs text-blue-100">Travel Management</div>
              </div>
            </Link>
          </div>

          {/* Center Section - Navigation Links */}
          <div className="flex gap-1">
            <Link href="/dashboard">
              <Button
                variant={isActive('/dashboard') ? 'secondary' : 'ghost'}
                size="sm"
                className={isActive('/dashboard') ? '' : 'text-white hover:bg-blue-500'}
              >
                <Home className="w-4 h-4 mr-2" />
                Overview
              </Button>
            </Link>
            <Link href="/dashboard/add-tour">
              <Button
                variant={isActive('/dashboard/add-tour') ? 'secondary' : 'ghost'}
                size="sm"
                className={isActive('/dashboard/add-tour') ? '' : 'text-white hover:bg-blue-500'}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Tour
              </Button>
            </Link>
            <Link href="/dashboard/add-destination">
              <Button
                variant={isActive('/dashboard/add-destination') ? 'secondary' : 'ghost'}
                size="sm"
                className={isActive('/dashboard/add-destination') ? '' : 'text-white hover:bg-blue-500'}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Destination
              </Button>
            </Link>
          </div>

          {/* Right Section - Actions */}
          <div className="flex gap-2">
            <Link href="/">
              <Button variant="outline" size="sm" className="bg-white text-blue-600 hover:bg-blue-50">
                ← View Site
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
