import { useState } from 'react';
import { actions } from 'astro:actions';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    
    try {
      const { error } = await actions.contact(data);
      if (error) {
        setStatus('error');
        setErrorMessage(error.message || 'Something went wrong. Please try again.');
      } else {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage('Failed to send message. Please try again later.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-xl space-y-6">
      <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="name" className="block text-sm font-semibold leading-6 text-slate-900">
            Full name
          </label>
          <div className="mt-2.5">
            <input
              type="text"
              name="name"
              id="name"
              autoComplete="name"
              required
              className="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        
        <div className="sm:col-span-2">
          <label htmlFor="email" className="block text-sm font-semibold leading-6 text-slate-900">
            Email
          </label>
          <div className="mt-2.5">
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="email"
              required
              className="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        
        <div className="sm:col-span-2">
          <label htmlFor="service" className="block text-sm font-semibold leading-6 text-slate-900">
            Service interested in
          </label>
          <div className="mt-2.5">
            <select
              id="service"
              name="service"
              className="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6 bg-white"
            >
              <option value="lawn-mowing">Lawn Mowing</option>
              <option value="landscaping">Landscaping</option>
              <option value="weed-control">Weed Control</option>
              <option value="fertilization">Fertilization</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="message" className="block text-sm font-semibold leading-6 text-slate-900">
            Message
          </label>
          <div className="mt-2.5">
            <textarea
              name="message"
              id="message"
              rows={4}
              required
              className="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
      </div>
      
      <div className="mt-10">
        <button
          type="submit"
          disabled={status === 'loading'}
          className="block w-full rounded-md bg-primary-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
        >
          {status === 'loading' ? 'Sending...' : 'Send message'}
        </button>
      </div>
      
      {status === 'success' && (
        <div className="rounded-md bg-green-50 p-4 mt-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">Message sent successfully</h3>
              <div className="mt-2 text-sm text-green-700">
                <p>We've received your request and will get back to you shortly.</p>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {status === 'error' && (
        <div className="rounded-md bg-red-50 p-4 mt-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Error sending message</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{errorMessage}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
