/**
 * PromptPay QR Code Generation Utility
 * 
 * This utility generates PromptPay QR codes for Thai banking payments.
 * PromptPay allows customers to pay using their mobile banking apps by scanning QR codes.
 * 
 * Based on the PromptPay specification: https://www.bot.or.th/Thai/PaymentSystems/StandardPS/Documents/ThaiQRCode_Payment_Standard.pdf
 */

import generatePayload from 'promptpay-qr';
import QRCode from 'qrcode';

export interface PromptPayOptions {
  phoneNumber?: string;
  idCard?: string;
  amount?: number;
}

/**
 * Format phone number or ID card for PromptPay
 * @param phoneNumber - Phone number (e.g., '0812345678')
 * @param idCard - ID card number
 * @returns Formatted identifier
 */
function formatPromptPayIdentifier(phoneNumber?: string, idCard?: string): string {
  if (!phoneNumber && !idCard) {
    throw new Error('Either phoneNumber or idCard must be provided');
  }

  let identifier = phoneNumber || idCard!;
  
  // Remove all dashes and spaces
  identifier = identifier.replace(/[-\s]/g, '');
  
  // For phone numbers, ensure it starts with country code
  if (phoneNumber && !identifier.startsWith('66')) {
    // Remove leading 0 and add Thailand country code (66)
    if (identifier.startsWith('0')) {
      identifier = '66' + identifier.substring(1);
    }
  }

  return identifier;
}

/**
 * Generate PromptPay QR code as SVG string
 * 
 * @param options - PromptPay options (phoneNumber or idCard, and optional amount)
 * @returns Promise<string> - SVG string of the QR code
 * 
 * @example
 * const qrSvg = await generatePromptPayQR({ phoneNumber: '0812345678', amount: 100 });
 */
export async function generatePromptPayQR(options: PromptPayOptions): Promise<string> {
  const { phoneNumber, idCard, amount } = options;

  const identifier = formatPromptPayIdentifier(phoneNumber, idCard);

  // Generate the PromptPay payload string
  const payload = generatePayload(identifier, { amount });

  // Generate QR code as SVG
  const qrCodeSvg = await QRCode.toString(payload, {
    type: 'svg',
    color: {
      dark: '#000000',
      light: '#FFFFFF',
    },
    errorCorrectionLevel: 'M',
  });

  return qrCodeSvg;
}

/**
 * Generate PromptPay QR code as Data URL (for img src)
 * 
 * @param options - PromptPay options (phoneNumber or idCard, and optional amount)
 * @returns Promise<string> - Data URL of the QR code
 * 
 * @example
 * const qrDataUrl = await generatePromptPayQRDataURL({ phoneNumber: '0812345678', amount: 100 });
 */
export async function generatePromptPayQRDataURL(options: PromptPayOptions): Promise<string> {
  const { phoneNumber, idCard, amount } = options;

  const identifier = formatPromptPayIdentifier(phoneNumber, idCard);

  // Generate the PromptPay payload string
  const payload = generatePayload(identifier, { amount });

  // Generate QR code as Data URL
  const qrCodeDataUrl = await QRCode.toDataURL(payload, {
    errorCorrectionLevel: 'M',
    margin: 1,
    width: 300,
  });

  return qrCodeDataUrl;
}

/**
 * Get PromptPay payload string (for debugging or custom QR generation)
 * 
 * @param options - PromptPay options
 * @returns string - PromptPay payload string
 */
export function getPromptPayPayload(options: PromptPayOptions): string {
  const { phoneNumber, idCard, amount } = options;

  const identifier = formatPromptPayIdentifier(phoneNumber, idCard);

  return generatePayload(identifier, { amount });
}

