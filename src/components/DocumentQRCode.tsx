"use client";

import React, { useEffect, useState } from "react";
import QRCode from "qrcode";
import { QrCode as QrIcon } from "lucide-react";

interface DocumentQRCodeProps {
  payload: string;
  size?: number;
  className?: string;
  darkColor?: string;
  lightColor?: string;
}

export function DocumentQRCode({
  payload,
  size = 120,
  className = "",
  darkColor = "#0C141C",
  lightColor = "#FFFFFF",
}: DocumentQRCodeProps) {
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (!payload) return;

    let isMounted = true;
    QRCode.toDataURL(payload, {
      width: size * 2, // 2x for retina crispness
      margin: 1,
      color: {
        dark: darkColor,
        light: lightColor,
      },
      errorCorrectionLevel: "M",
    })
      .then((url) => {
        if (isMounted) {
          setQrDataUrl(url);
          setHasError(false);
        }
      })
      .catch((err) => {
        console.error("QR Code Generation Error:", err);
        if (isMounted) setHasError(true);
      });

    return () => {
      isMounted = false;
    };
  }, [payload, size, darkColor, lightColor]);

  if (hasError || !qrDataUrl) {
    return (
      <div
        className={`flex items-center justify-center bg-slate-100 dark:bg-dark-navy rounded-lg ${className}`}
        style={{ width: size, height: size }}
      >
        <QrIcon className="w-1/2 h-1/2 text-muted-gray animate-pulse" />
      </div>
    );
  }

  return (
    <img
      src={qrDataUrl}
      alt={`QR Code: ${payload}`}
      width={size}
      height={size}
      className={`rounded-lg object-contain ${className}`}
      loading="lazy"
    />
  );
}
