import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#f9f7f3] flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-[120px] font-extrabold text-[#003e45] leading-none mb-4" style={{ fontFamily: 'var(--font-display)' }}>
        404
      </h1>
      <h2 className="text-2xl font-bold text-[#003e45] mb-4" style={{ fontFamily: 'var(--font-display)' }}>
        This page cannot be found error
      </h2>
      <p className="text-[#6e675c] mb-8 max-w-md mx-auto">
        The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
      </p>
      <Link 
        href="/"
        className="font-body font-bold text-[15px] border-none rounded-full px-[26px] py-[14px] inline-flex items-center justify-center gap-[9px] bg-[#5ce1e6] text-[#003e45] shadow-[0_12px_0_-2px_#003e45] transition-[transform,box-shadow] duration-200 hover:translate-y-[2px] hover:shadow-[0_8px_0_-2px_#003e45] no-underline"
      >
        Go back home
      </Link>
    </div>
  );
}
