'use client'

import { useState } from 'react'

const faqs = [
  {
    question: 'What is your return policy?',
    answer:
      'We offer a 30-day return policy on all unworn items in their original packaging. Items must be in new condition with tags attached.',
  },
  {
    question: 'How long does shipping take?',
    answer:
      'Standard shipping typically takes 5-7 business days. Express shipping options are available at checkout for 2-3 business day delivery.',
  },
  {
    question: 'Do you ship internationally?',
    answer:
      'Yes, we ship to most countries worldwide. International shipping times and costs vary by location.',
  },
  {
    question: 'How do I track my order?',
    answer:
      'Once your order ships, you will receive a tracking number via email. You can use this number to track your package on our website or the carrier\'s website.',
  },
  {
    question: 'What payment methods do you accept?',
    answer:
      'We accept all major credit cards, PayPal, and Apple Pay. All transactions are secure and encrypted.',
  },
  {
    question: 'Can I change or cancel my order?',
    answer:
      'Orders can be modified or cancelled within 24 hours of placement. After that, please contact customer service for assistance.',
  },
  {
    question: 'Do you offer size exchanges?',
    answer:
      'Yes, we offer free size exchanges within 30 days of purchase. Please contact us to initiate an exchange.',
  },
  {
    question: 'How do I care for my shoes?',
    answer:
      'Care instructions vary by material. Generally, we recommend cleaning with a soft brush or cloth and storing in a cool, dry place. Specific care instructions are included with each product.',
  },
]

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-12 text-center">
        Frequently Asked Questions
      </h1>
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition"
            >
              <span className="font-semibold text-lg">{faq.question}</span>
              <svg
                className={`w-5 h-5 transform transition-transform ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {openIndex === index && (
              <div className="px-6 py-4 border-t border-gray-200">
                <p className="text-gray-700">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

