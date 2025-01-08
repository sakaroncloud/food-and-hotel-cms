"use client"
import React from 'react'
import { SidebarTrigger } from '../ui/sidebar'
import { Separator } from '../ui/separator'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '../ui/breadcrumb'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getBreadCrumb } from '@/lib/utils/utils'

type Props = {
  children: React.ReactNode;
}

export const DashboardProvider = ({ children }: Props) => {
  const pathname = usePathname()
  const breadCrumb = getBreadCrumb(pathname)

  return (
    <div className='p-2 bg-slate-100'>
      <header className="flex fixed  top-0 z-50 w-full bg-white  h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center h-full w-full mt-4 rounded-xl bg-primary  gap-2 px-4">
          <SidebarTrigger className="-ml-1 text-white hover:text-white" />
          <Separator orientation="vertical" className="mr-2 h-4 text-white hover:text-white" />
          <Breadcrumb>
            <BreadcrumbList>
              {breadCrumb.map((item, index) => (
                <React.Fragment key={index}>
                  <BreadcrumbItem >
                    <BreadcrumbLink className='text-white hover:text-white capitalize' asChild={item.link ? true : false}>
                      {item.link ? <Link href={item.link}>
                        {item.label}
                      </Link> : <span>{item.label}</span>}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {index < breadCrumb.length - 1 && (
                    <BreadcrumbSeparator className='text-white hover:text-white' />
                  )}
                </React.Fragment>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <div className="flex flex-1 flex-col gap-4 px-0 pt-4 mt-16">
        {children}
      </div>
    </div>
  )
}
