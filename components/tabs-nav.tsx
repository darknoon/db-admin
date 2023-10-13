'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

import { Icons } from '@/components/icons'
import { createElement } from 'react'

export type MainNavItem = TabsItem

export type TabsItem = {
  title: string
  disabled?: boolean
  external?: boolean
  href: string
}

export type TabsButton = TabsItem & {
  icon?: keyof typeof Icons
}

export interface TabsNavProps {
  tabs: TabsItem[]
  buttons: TabsButton[]
}

export function TabsNav({ tabs, buttons }: TabsNavProps) {
  const pathname = usePathname()

  return (
    <div className="flex content-start m-4 justify-between">
      <div className="flex content-start">
        {tabs.map((item) =>
          !item.disabled ? (
            <Link
              key={item.href}
              href={item.href}
              className={cn('rounded-md p-2 hover:bg-muted overflow-ellipsis', {
                'font-medium': pathname === item.href,
              })}
            >
              {item.title}
            </Link>
          ) : (
            <span
              key={item.title}
              className="cursor-not-allowed rounded-md p-2 opacity-60"
            >
              {item.title}
            </span>
          ),
        )}
      </div>
      <div className="flex">
        {buttons.map((item) =>
          !item.disabled ? (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'rounded-md p-2 hover:bg-muted overflow-ellipsis self-end',
                {
                  'font-medium': pathname === item.href,
                },
              )}
            >
              {item.icon ? createElement(Icons[item.icon]) : item.title}
            </Link>
          ) : (
            <span
              key={item.title}
              className="cursor-not-allowed rounded-md p-2 opacity-60 self-end"
            >
              {item.icon ? createElement(Icons[item.icon]) : item.title}
            </span>
          ),
        )}
      </div>
    </div>
  )
}
