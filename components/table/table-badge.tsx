import React from 'react'

export const TableBadge = ({ label }: { label: string }) => {
  return (
    <div className="text-xs px-2 py-1 capitalize bg-gray-100  text-gray-600 rounded-xl">{label}</div>
  )
}
