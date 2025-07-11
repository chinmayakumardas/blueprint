'use client';

import { Button } from '@/components/ui/button';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex justify-center space-x-2 py-4">
      <Button
        variant="outline"
        className="text-blue-800 border-blue-300 hover:bg-blue-50"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Button
          key={page}
          variant={currentPage === page ? 'default' : 'outline'}
          className={currentPage === page ? 'bg-blue-800 text-white' : 'text-blue-800 border-blue-300 hover:bg-blue-50'}
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
      ))}
      <Button
        variant="outline"
        className="text-blue-800 border-blue-300 hover:bg-blue-50"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </Button>
    </div>
  );
}