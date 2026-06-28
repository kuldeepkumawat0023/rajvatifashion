'use client'
import { Toaster } from 'react-hot-toast'

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        className: 'font-body font-bold text-sm tracking-tight shadow-2xl rounded-2xl border border-white/10',
        duration: 5000,
        style: {
          padding: '16px 24px',
          color: '#fff',
          background: '#1A1A1A',
        },
        success: {
          style: {
            background: '#2D7A4F',
            boxShadow: '0 10px 15px -3px rgba(45, 122, 79, 0.4)',
          },
          iconTheme: { primary: '#fff', secondary: '#2D7A4F' },
        },
        error: {
          style: {
            background: '#C0392B',
            boxShadow: '0 10px 15px -3px rgba(192, 57, 43, 0.4)',
          },
          iconTheme: { primary: '#fff', secondary: '#C0392B' },
        },
        loading: {
          style: {
            background: '#C9A84C', // Rajvati gold accent
            boxShadow: '0 10px 15px -3px rgba(201, 168, 76, 0.4)',
          },
        },
      }}
    />
  )
}
