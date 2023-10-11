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
        <div className="flex flex-row">
          <div className="w-30 flex-grow-0 bg-neutral-200 m-3 rounded-lg p-2">
            <SidebarNav
              items={[
                {
                  title: 'Tables',
                  href: '/tables',
                  items: tables.map((table) => ({
                    title: table,
                    href: `/tables/${table}`,
                  })),
                },
                { title: 'Functions', href: '/functions' },
              ]}
            />
          </div>
          <div className="bg-slate-80 w-full m-3">{children}</div>
        </div>
      </body>
    </html>
  )
}
