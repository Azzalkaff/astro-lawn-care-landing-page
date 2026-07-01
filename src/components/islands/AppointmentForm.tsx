import { useState } from 'react';
import { actions } from 'astro:actions';

type FormData = {
  service: string;
  propertySize: string;
  urgency: string;
  postcode: string;
  name: string;
  phone: string;
  email: string;
};

export default function AppointmentForm() {
  const [step, setStep] = useState(1);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  
  const [formData, setFormData] = useState<FormData>({
    service: '',
    propertySize: '',
    urgency: '',
    postcode: '',
    name: '',
    phone: '',
    email: '',
  });

  const handleNext = () => {
    if (step === 1 && !formData.service) return;
    if (step === 2 && (!formData.propertySize || !formData.urgency || !formData.postcode)) return;
    setStep(prev => prev + 1);
  };
  
  const handleBack = () => setStep(prev => prev - 1);

  const updateFormData = (key: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');
    
    // Create FormData object since Astro Actions with form accept expect FormData
    const submissionData = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      submissionData.append(key, value);
    });
    
    try {
      const { error } = await actions.bookAppointment(submissionData);
      if (error) {
        setStatus('error');
        setErrorMessage(error.message || 'Something went wrong. Please try again.');
      } else {
        setStatus('success');
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage('Failed to book appointment. Please try again later.');
    }
  };

  if (status === 'success') {
    return (
      <div className="rounded-2xl bg-primary-50 p-8 text-center ring-1 ring-primary-200">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 mb-6">
          <svg className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-primary-900 mb-2">Request Received!</h3>
        <p className="text-primary-700 mb-6">
          Thank you for choosing EverGreen. We're reviewing your request and will contact you shortly with your free quote.
        </p>
        <button 
          onClick={() => {
            setStatus('idle');
            setStep(1);
            setFormData({
              service: '', propertySize: '', urgency: '', postcode: '', name: '', phone: '', email: ''
            });
          }}
          className="text-sm font-semibold text-primary-600 hover:text-primary-500"
        >
          Book another service <span aria-hidden="true">&rarr;</span>
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl ring-1 ring-slate-200 overflow-hidden">
      {/* Progress Bar */}
      <div className="bg-slate-100 h-2 w-full">
        <div 
          className="bg-primary-500 h-2 transition-all duration-300" 
          style={{ width: `${(step / 3) * 100}%` }}
        ></div>
      </div>

      <div className="px-6 py-8 sm:p-10">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* STEP 1: The Hook */}
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="text-2xl font-bold tracking-tight text-slate-900 mb-2">What do you need help with?</h3>
              <p className="text-slate-500 mb-8">Select a service to get started.</p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { 
                    id: 'lawn-mowing', 
                    icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="6" r="3"/><path d="M8.12 8.12 12 12"/><path d="M20 4 8.12 15.88"/><circle cx="6" cy="18" r="3"/><path d="M14.8 14.8 20 20"/></svg>, 
                    label: 'Lawn Mowing' 
                  },
                  { 
                    id: 'landscaping', 
                    icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="m17 14 3 3.3a1 1 0 0 1-.7 1.7H4.7a1 1 0 0 1-.7-1.7L7 14h-.3a1 1 0 0 1-.7-1.7L9 9h-.2A1 1 0 0 1 8 7.3L12 3l4 4.3a1 1 0 0 1-.8 1.7H15l3 3.3a1 1 0 0 1-.7 1.7H17Z"/><path d="M12 19v3"/></svg>, 
                    label: 'Landscaping' 
                  },
                  { 
                    id: 'weed-control', 
                    icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" /></svg>, 
                    label: 'Weed Control' 
                  },
                  { 
                    id: 'cleanup', 
                    icon: <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09l2.846.813-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" /></svg>, 
                    label: 'Yard Clean Up' 
                  },
                ].map(service => (
                  <button
                    key={service.id}
                    type="button"
                    onClick={() => {
                      updateFormData('service', service.id);
                      setTimeout(handleNext, 300); // Auto advance
                    }}
                    className={`flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all ${
                      formData.service === service.id 
                        ? 'border-primary-500 bg-primary-50 text-primary-700' 
                        : 'border-slate-100 bg-white text-slate-500 hover:border-primary-200 hover:bg-slate-50 hover:text-primary-600'
                    }`}
                  >
                    <span className="mb-3">{service.icon}</span>
                    <span className={`font-semibold ${formData.service === service.id ? 'text-primary-900' : 'text-slate-900'}`}>
                      {service.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Scoping */}
          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="text-2xl font-bold tracking-tight text-slate-900 mb-2">A few quick details</h3>
              <p className="text-slate-500 mb-8">This helps us provide an accurate quote.</p>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold leading-6 text-slate-900 mb-3">
                    Roughly how large is the area?
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['Small', 'Medium', 'Large'].map(size => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => updateFormData('propertySize', size.toLowerCase())}
                        className={`py-2 px-3 text-sm font-medium rounded-md border transition-colors ${
                          formData.propertySize === size.toLowerCase()
                            ? 'border-primary-600 bg-primary-50 text-primary-700'
                            : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold leading-6 text-slate-900 mb-3">
                    When do you need it done?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {['ASAP', 'This Week', 'Flexible'].map(urgency => (
                      <button
                        key={urgency}
                        type="button"
                        onClick={() => updateFormData('urgency', urgency.toLowerCase())}
                        className={`py-2 px-3 text-sm font-medium rounded-md border transition-colors ${
                          formData.urgency === urgency.toLowerCase()
                            ? 'border-primary-600 bg-primary-50 text-primary-700'
                            : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        {urgency}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="postcode" className="block text-sm font-semibold leading-6 text-slate-900">
                    What is your postcode?
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="text"
                      id="postcode"
                      value={formData.postcode}
                      onChange={(e) => updateFormData('postcode', e.target.value)}
                      placeholder="e.g. 4000"
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: The Ask */}
          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-300">
              <h3 className="text-2xl font-bold tracking-tight text-slate-900 mb-2">Almost done!</h3>
              <p className="text-slate-500 mb-8">Where should we send your free quote?</p>
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold leading-6 text-slate-900">
                    Full Name
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="text"
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => updateFormData('name', e.target.value)}
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold leading-6 text-slate-900">
                    Phone Number
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="tel"
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={(e) => updateFormData('phone', e.target.value)}
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold leading-6 text-slate-900">
                    Email Address
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="email"
                      id="email"
                      required
                      value={formData.email}
                      onChange={(e) => updateFormData('email', e.target.value)}
                      className="block w-full rounded-md border-0 px-3.5 py-2 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Form Controls */}
          <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-6">
            {step > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                className="text-sm font-semibold leading-6 text-slate-500 hover:text-slate-900 transition-colors"
              >
                &larr; Back
              </button>
            ) : (
              <div></div> // Empty div for flexbox spacing
            )}

            {step < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={
                  (step === 1 && !formData.service) || 
                  (step === 2 && (!formData.propertySize || !formData.urgency || !formData.postcode))
                }
                className="rounded-md bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next Step
              </button>
            ) : (
              <button
                type="submit"
                disabled={status === 'loading'}
                className="rounded-md bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
              >
                {status === 'loading' ? 'Sending...' : 'Get Free Quote'}
              </button>
            )}
          </div>
          
          {status === 'error' && (
            <p className="mt-4 text-sm text-red-600 text-center">{errorMessage}</p>
          )}
        </form>
      </div>
    </div>
  );
}
