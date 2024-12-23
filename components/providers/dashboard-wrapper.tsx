"use client"
import React from 'react'
import { SidebarTrigger } from '../ui/sidebar'
import { Separator } from '../ui/separator'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '../ui/breadcrumb'
import { TBreadCrumb } from '@/lib/types/global.type'
import Link from 'next/link'

type Props = {
  children: React.ReactNode;
  breadcrumb: TBreadCrumb[]
}

export const DashboardProvider = ({ breadcrumb, children }: Props) => {
  return (
    <div className='p-2'>
      <header className="flex bg-primary/90 rounded-xl h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1 text-white hover:text-white" />
          <Separator orientation="vertical" className="mr-2 h-4 text-white hover:text-white" />
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumb.map((item, index) => (
                <React.Fragment key={index}>
                  <BreadcrumbItem >
                    <BreadcrumbLink className='text-white hover:text-white' asChild={item.link ? true : false}>
                      {item.link ? <Link href={item.link}>
                        {item.label}
                      </Link> : <span>{item.label}</span>}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {index < breadcrumb.length - 1 && (
                    <BreadcrumbSeparator className='text-white hover:text-white' />
                  )}
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 px-0 pt-4">
        {children}

      </div>
    </div>
  )
}
