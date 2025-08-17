'use client';

// This page is deprecated per request. Redirecting to home.
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function WeddingCalculatorRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/');
  }, [router]);
  
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Redirecting...</h1>
        <p>This page has been moved. You will be redirected to the home page.</p>
      </div>
    </div>
  );
}

