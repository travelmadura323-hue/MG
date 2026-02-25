"use client"

import { EnquiryProvider } from "@/components/enquiry-modal"

export function EnquiryProviderWrapper({ children }: { children: React.ReactNode }) {
  return <EnquiryProvider>{children}</EnquiryProvider>
}
