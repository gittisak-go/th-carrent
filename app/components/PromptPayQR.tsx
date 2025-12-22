'use client';

import { useEffect, useState } from 'react';
import { MoonLoader } from 'react-spinners';

interface PromptPayQRProps {
  phoneNumber?: string;
  idCard?: string;
  amount: number;
  className?: string;
}

/**
 * PromptPay QR Code Display Component
 * 
 * Displays a PromptPay QR code that can be scanned by Thai banking apps.
 * The QR code is generated on the client side for security.
 */
export default function PromptPayQR({ phoneNumber, idCard, amount, className = '' }: PromptPayQRProps) {
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const generateQR = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Dynamically import the utility to avoid SSR issues
        const { generatePromptPayQRDataURL } = await import('@/lib/util/promptpay');
        
        const dataUrl = await generatePromptPayQRDataURL({
          phoneNumber,
          idCard,
          amount,
        });

        setQrCodeDataUrl(dataUrl);
      } catch (err) {
        console.error('Failed to generate PromptPay QR code:', err);
        setError('ไม่สามารถสร้าง QR Code ได้ กรุณาลองใหม่อีกครั้ง');
      } finally {
        setIsLoading(false);
      }
    };

    generateQR();
  }, [phoneNumber, idCard, amount]);

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        <MoonLoader size={40} />
      </div>
    );
  }

  if (error) {
    return (
      <div className={`alert alert-error ${className}`}>
        <span>{error}</span>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      {qrCodeDataUrl && (
        <>
          <img 
            src={qrCodeDataUrl} 
            alt="PromptPay QR Code" 
            className="w-full max-w-xs rounded-lg bg-white p-4"
          />
          <p className="text-sm text-center text-gray-600 dark:text-gray-400">
            สแกน QR Code เพื่อชำระเงินผ่านแอปธนาคาร
          </p>
        </>
      )}
    </div>
  );
}
