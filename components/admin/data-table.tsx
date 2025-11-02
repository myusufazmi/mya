'use client'

import { useState, useMemo } from 'react'
import { 
  ChevronUp, 
  ChevronDown, 
  ChevronsUpDown,
  Search,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

export interface Column<T> {
  key: string
  label: string
  sortable?: boolean
  render?: (item: T) => React.ReactNode
  width?: string
}

interface DataTableProps<T> {
  data: T[]
  columns: Column<T>[]
  searchable?: boolean
  searchPlaceholder?: string
  onRowClick?: (item: T) => void
  emptyState?: React.ReactNode
  itemsPerPage?: number
}

type SortDirection = 'asc' | 'desc' | null

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  searchable = false,
  searchPlaceholder = 'Search...',
  onRowClick,
  emptyState,
  itemsPerPage = 10,
}: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  // Filter data based on search
  const filteredData = useMemo(() => {
    if (!searchQuery) return data

    return data.filter((item) => {
      return Object.values(item).some((value) => {
        if (value === null || value === undefined) return false
        return String(value)
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      })
    })
  }, [data, searchQuery])

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortKey || !sortDirection) return filteredData

    return [...filteredData].sort((a, b) => {
      const aVal = a[sortKey]
      const bVal = b[sortKey]

      if (aVal === bVal) return 0

      const comparison = aVal > bVal ? 1 : -1
      return sortDirection === 'asc' ? comparison : -comparison
    })
  }, [filteredData, sortKey, sortDirection])

  // Paginate data
  const totalPages = Math.ceil(sortedData.length / itemsPerPage)
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage
    const end = start + itemsPerPage
    return sortedData.slice(start, end)
  }, [sortedData, currentPage, itemsPerPage])

  // Handle sort
  const handleSort = (key: string) => {
    if (sortKey === key) {
      if (sortDirection === 'asc') {
        setSortDirection('desc')
      } else if (sortDirection === 'desc') {
        setSortKey(null)
        setSortDirection(null)
      }
    } else {
      setSortKey(key)
      setSortDirection('asc')
    }
  }

  // Reset to first page when search changes
  useMemo(() => {
    setCurrentPage(1)
  }, [searchQuery])

  return (
    <div className="space-y-4">
      {/* Search */}
      {searchable && (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 dark:text-white"
          />
        </div>
      )}

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={`px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider ${
                      column.sortable ? 'cursor-pointer select-none hover:bg-gray-100 dark:hover:bg-gray-800' : ''
                    }`}
                    style={{ width: column.width }}
                    onClick={() => column.sortable && handleSort(column.key)}
                  >
                    <div className="flex items-center space-x-1">
                      <span>{column.label}</span>
                      {column.sortable && (
                        <span className="ml-1">
                          {sortKey === column.key ? (
                            sortDirection === 'asc' ? (
                              <ChevronUp className="h-4 w-4" />
                            ) : (
                              <ChevronDown className="h-4 w-4" />
                            )
                          ) : (
                            <ChevronsUpDown className="h-4 w-4 text-gray-400" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="px-6 py-12">
                    {emptyState || (
                      <div className="text-center text-gray-500 dark:text-gray-400">
                        No data available
                      </div>
                    )}
                  </td>
                </tr>
              ) : (
                paginatedData.map((item, index) => (
                  <tr
                    key={index}
                    className={`${
                      onRowClick
                        ? 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700/50 transition'
                        : ''
                    }`}
                    onClick={() => onRowClick?.(item)}
                  >
                    {columns.map((column) => (
                      <td
                        key={column.key}
                        className="px-6 py-4 text-sm text-gray-900 dark:text-white"
                      >
                        {column.render
                          ? column.render(item)
                          : item[column.key]}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
              {Math.min(currentPage * itemsPerPage, sortedData.length)} of{' '}
              {sortedData.length} results
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <ChevronLeft className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              </button>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                Page {currentPage} of {totalPages}
              </div>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
              >
                <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
