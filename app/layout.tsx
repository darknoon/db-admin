import { SidebarNav } from '@/components/sidebar-nav'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { getAllTableNames } from '@/lib/db'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DB Admin',
  description: 'Edits your DB / Schema',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const tables = await getAllTableNames()
  return (
    <html lang="en">
      <body className={inter.className}>
        <SidebarNav
          items={[
            {
              title: 'Tables',
              href: '/tables',
              items: [
                { title: 'Users', href: '/tables/users' },
                { title: 'Posts', href: '/tables/posts' },
              ],
            },
            { title: 'Functions', href: '/functions' },
          ]}
        ></SidebarNav>
        {children}
      </body>
    </html>
  )
}
