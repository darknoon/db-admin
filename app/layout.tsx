import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { getAllTableNames } from '@/lib/db'
import './globals.css'
import { TabsButton, TabsItem, TabsNav } from '@/components/tabs-nav'

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
  const tabs: TabsItem[] = tables.map((table) => ({
    title: table,
    href: `/tables/${table}`,
  }))
  const buttons: TabsButton[] = [
    {
      title: 'add',
      icon: 'add',
      href: '/tables/new',
    },
    {
      title: 'sql',
      icon: 'laptop',
      disabled: true,
      href: '/sql',
    },
  ]
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="w-full">
          <TabsNav tabs={tabs} buttons={buttons} />
          <div className="m-3">{children}</div>
        </div>
      </body>
    </html>
  )
}
