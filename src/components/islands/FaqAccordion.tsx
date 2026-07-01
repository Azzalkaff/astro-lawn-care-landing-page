import { useState } from 'react';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  faqs: FaqItem[];
}

export default function FaqAccordion({ faqs }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <dl className="mt-10 space-y-6 divide-y divide-slate-900/10">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} className="pt-6">
            <dt>
              <button
                type="button"
                className="flex w-full items-start justify-between text-left text-slate-900"
                onClick={() => toggleItem(index)}
                aria-expanded={isOpen}
              >
                <span className="text-base font-semibold leading-7">{faq.question}</span>
                <span className="ml-6 flex h-7 items-center">
                  <svg
                    className={`h-6 w-6 transform transition-transform duration-200 ${isOpen ? 'rotate-180 text-primary-600' : 'text-slate-400'}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </span>
              </button>
            </dt>
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <dd className="mt-2 pr-12">
                <p className="text-base leading-7 text-slate-600">{faq.answer}</p>
              </dd>
            </div>
          </div>
        );
      })}
    </dl>
  );
}
