import type { Metadata } from 'next'
import { SidebarNav } from '@/components/sidebar-nav'
import { Inter } from 'next/font/google'
import { getAllTableNames } from '@/lib/db'
import './globals.css'

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
        <div className="flex flex-row w-full">
          <div className="w-48 m-3 self-stretch shrink-0">
            <div className="fixed border border-neutral-300 rounded-lg p-2 w-48 backdrop-blur-sm">
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
                ]}
              />
            </div>
          </div>
          <div className="bg-slate-80 m-3 shrink grow relative">{children}</div>
        </div>
      </body>
    </html>
  )
}
