'use client';
/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Upload, CheckCircle2, AlertCircle, FileText, X, Check } from 'lucide-react';
import KycSidebar from '@/components/kyc/KycSidebar';
import supabase from '@/lib/supabase/client';
import { USE_SUPABASE } from '@/lib/flags';

interface Product {
  id: string;
  product_code: string;
  product_name: string;
  category: 'Core' | 'Optional';
  requiresLogbook?: boolean;
  requiresPassport?: boolean;
}

interface ClientData {
  client_name: string;
  national_id: string;
  kra_pin: string;
  mobile_phone: string;
  email: string;
  gender: string;
  date_of_birth: string;
  plate_number?: string;
}

interface DocumentItem {
  type: string;
  file: File | null;
  url?: string;
  isRequired: boolean;
  isUploaded: boolean;
}

type DocumentKey = 'national_id' | 'kra_certificate' | 'logbook' | 'passport';
type DocumentsMap = Record<DocumentKey, DocumentItem>;

const products: Product[] = [
  {
    id: '1',
    product_code: 'MOTOR',
    product_name: 'Motor Insurance',
    category: 'Core',
    requiresLogbook: true,
  },
  { id: '2', product_code: 'MEDICAL', product_name: 'Medical Insurance', category: 'Core' },
  { id: '3', product_code: 'HOME', product_name: 'Home Insurance', category: 'Core' },
  { id: '4', product_code: 'KIPF', product_name: 'Pension (KIPF)', category: 'Core' },
  { id: '5', product_code: 'WEKAPESA', product_name: 'Wekapesa', category: 'Core' },
  {
    id: '6',
    product_code: 'TRAVEL',
    product_name: 'Travel Insurance',
    category: 'Optional',
    requiresPassport: true,
  },
  {
    id: '7',
    product_code: 'PERSONAL_ACC',
    product_name: 'Personal Accident',
    category: 'Optional',
  },
  { id: '8', product_code: 'PET', product_name: 'Pet Insurance', category: 'Optional' },
  { id: '9', product_code: 'INCOME_PROT', product_name: 'Income Protection', category: 'Optional' },
  {
    id: '10',
    product_code: 'HOME_OFFICE',
    product_name: 'Home Office Insurance',
    category: 'Optional',
  },
];

export default function KycClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [showPlateNumber, setShowPlateNumber] = useState(false);

  const [clientData, setClientData] = useState<ClientData>({
    client_name: '',
    national_id: '',
    kra_pin: '',
    mobile_phone: '',
    email: '',
    gender: '',
    date_of_birth: '',
    plate_number: '',
  });

  const [documents, setDocuments] = useState<DocumentsMap>({
    national_id: { type: 'National_ID', file: null, isRequired: true, isUploaded: false },
    kra_certificate: {
      type: 'KRA_Pin_Certificate',
      file: null,
      isRequired: true,
      isUploaded: false,
    },
    logbook: { type: 'Logbook', file: null, isRequired: false, isUploaded: false },
    passport: { type: 'Passport', file: null, isRequired: false, isUploaded: false },
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Mock upload when Supabase is disabled
  async function mockUpload(file: File) {
    await new Promise((r) => setTimeout(r, 300));
    return { path: `mock/${Date.now()}-${file.name}` } as const;
  }

  // Update required docs + plate number visibility based on selection
  useEffect(() => {
    setDocuments((prev) => {
      const updated = { ...prev };
      const hasMotor = selectedProducts.some((id) =>
        products.find((p) => p.id === id && p.product_code === 'MOTOR'),
      );
      const hasTravel = selectedProducts.some((id) =>
        products.find((p) => p.id === id && p.product_code === 'TRAVEL'),
      );
      if (updated.logbook) updated.logbook.isRequired = hasMotor;
      if (updated.passport) updated.passport.isRequired = hasTravel;
      setShowPlateNumber(hasMotor);
      return updated;
    });
  }, [selectedProducts]);

  // Map URL slug (?product=motor) to internal product IDs, then preselect
  const productSlugToId = useMemo<Record<string, string>>(
    () => ({
      motor: '1',
      medical: '2',
      home: '3',
      kipf: '4',
      wekapesa: '5',
      travel: '6',
      pa: '7',
      pet: '8',
      income: '9',
      'home-office': '10',
    }),
    [],
  );

  useEffect(() => {
    const qp = searchParams?.get('product');
    if (!qp) return;
    const pid = productSlugToId[qp];
    if (pid && !selectedProducts.includes(pid)) {
      setSelectedProducts((prev) => [...prev, pid]);
    }
  }, [searchParams, productSlugToId, selectedProducts]);

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    if (!clientData.client_name) newErrors.client_name = 'Client name is required';
    if (!clientData.national_id) newErrors.national_id = 'National ID is required';
    if (!clientData.kra_pin) newErrors.kra_pin = 'KRA PIN is required';
    if (!clientData.mobile_phone) newErrors.mobile_phone = 'Mobile phone is required';
    if (!clientData.email) newErrors.email = 'Email is required';
    if (!clientData.gender) newErrors.gender = 'Gender is required';
    if (!clientData.date_of_birth) newErrors.date_of_birth = 'Date of birth is required';

    if (showPlateNumber && !clientData.plate_number)
      newErrors.plate_number = 'Plate number is required for Motor Insurance';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (clientData.email && !emailRegex.test(clientData.email))
      newErrors.email = 'Invalid email format';

    const phoneRegex = /^(\+254|0)[17]\d{8}$/;
    if (clientData.mobile_phone && !phoneRegex.test(clientData.mobile_phone))
      newErrors.mobile_phone = 'Invalid phone number format';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    if (selectedProducts.length === 0) {
      setErrors({ products: 'Please select at least one product' });
      return false;
    }
    setErrors({});
    return true;
  };

  const validateStep3 = () => {
    const newErrors: Record<string, string> = {};
    (Object.entries(documents) as [DocumentKey, DocumentItem][]).forEach(([key, doc]) => {
      if (doc.isRequired && !doc.file && !doc.isUploaded) {
        newErrors[key] = `${doc.type.replace('_', ' ')} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProductToggle = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId],
    );
  };

  const handleFileUpload = (docKey: DocumentKey, file: File | null) => {
    setDocuments((prev) => ({
      ...prev,
      [docKey]: { ...prev[docKey], file, isUploaded: false },
    }));
  };

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) setStep(3);
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep((s) => (s - 1) as typeof step);
      setErrors({});
    }
  };

  const uploadDocumentToSupabase = async (file: File, clientId: string, docType: string) => {
    if (!USE_SUPABASE) {
      const res = await mockUpload(file);
      return res.path;
    }
    const fileExt = file.name.split('.').pop();
    const fileName = `${clientId}/${docType}_${Date.now()}.${fileExt}`;
    const { data, error } = await (supabase as any).storage
      .from('kyc-documents')
      .upload(fileName, file);
    if (error) throw error;
    return (data as any).path as string;
  };

  const handleSubmit = async () => {
    if (!validateStep3()) return;
    setLoading(true);
    try {
      let clientRecord: any = null;
      if (USE_SUPABASE) {
        // Fetch the authenticated user id to associate ownership
        const { data: userData } = await (supabase as any).auth.getUser();
        const authUserId = userData?.user?.id;
        const insertResp = await (supabase as any)
          .from('clients')
          .insert([
            {
              ...(clientData as ClientData),
              user_id: authUserId,
              kyc_completed: true,
            } as any,
          ])
          .select()
          .single();
        if (insertResp.error) throw insertResp.error;
        clientRecord = insertResp.data;
      }

      // Upload documents (real or mock)
      for (const [key, doc] of Object.entries(documents) as [DocumentKey, DocumentItem][]) {
        if (!doc.file) continue;
        let path: string | undefined;
        if (USE_SUPABASE) {
          path = await uploadDocumentToSupabase(doc.file, clientRecord.id, doc.type);
          await (supabase as any).from('documents').insert([
            {
              client_id: clientRecord.id,
              document_type: doc.type,
              file_url: path,
              file_name: doc.file.name,
              file_size: doc.file.size,
              mime_type: doc.file.type,
            } as any,
          ]);
        } else {
          const mockPath = await mockUpload(doc.file);
          path = mockPath.path;
        }
        setDocuments((prev) => ({
          ...prev,
          [key]: { ...prev[key], url: path, isUploaded: true },
        }));
      }

      if (USE_SUPABASE) {
        const productRecords = selectedProducts.map((productId) => ({
          client_id: clientRecord.id,
          product_id: productId,
          status: 'Pending',
        }));
        await (supabase as any).from('client_products').insert(productRecords as any);
      }

      alert(USE_SUPABASE ? 'KYC submission successful!' : 'Saved locally (mock).');
      router.push('/');
    } catch (error) {
      console.error('Error submitting KYC:', error);
      alert('Error submitting KYC. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // --- Layout without internal sidebar; selection moved to Step 2 ---
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <KycSidebar selected={selectedProducts} onToggle={handleProductToggle} />
        <div className="flex-1 p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            {/* Stepper */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div
                  className={`flex items-center ${step >= 1 ? 'text-indigo-600' : 'text-gray-400'}`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      step >= 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200'
                    }`}
                  >
                    1
                  </div>
                  <span className="ml-3 font-medium">Personal Information</span>
                </div>
                <div className={`flex-1 h-1 mx-4 ${step > 1 ? 'bg-indigo-600' : 'bg-gray-200'}`} />

                <div
                  className={`flex items-center ${step >= 2 ? 'text-indigo-600' : 'text-gray-400'}`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      step >= 2 ? 'bg-indigo-600 text-white' : 'bg-gray-200'
                    }`}
                  >
                    2
                  </div>
                  <span className="ml-3 font-medium">Product Selection</span>
                </div>
                <div className={`flex-1 h-1 mx-4 ${step > 2 ? 'bg-indigo-600' : 'bg-gray-200'}`} />

                <div
                  className={`flex items-center ${step >= 3 ? 'text-indigo-600' : 'text-gray-400'}`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      step >= 3 ? 'bg-indigo-600 text-white' : 'bg-gray-200'
                    }`}
                  >
                    3
                  </div>
                  <span className="ml-3 font-medium">Document Upload</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              {step === 1 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Personal Information</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Client Name *
                      </label>
                      <input
                        type="text"
                        value={clientData.client_name}
                        onChange={(e) =>
                          setClientData({ ...clientData, client_name: e.target.value })
                        }
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${
                          errors.client_name ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter full name"
                      />
                      {errors.client_name && (
                        <p className="text-sm text-red-500 mt-1">{errors.client_name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        National ID Number *
                      </label>
                      <input
                        type="text"
                        value={clientData.national_id}
                        onChange={(e) =>
                          setClientData({ ...clientData, national_id: e.target.value })
                        }
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${
                          errors.national_id ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter National ID"
                      />
                      {errors.national_id && (
                        <p className="text-sm text-red-500 mt-1">{errors.national_id}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        KRA PIN Number *
                      </label>
                      <input
                        type="text"
                        value={clientData.kra_pin}
                        onChange={(e) => setClientData({ ...clientData, kra_pin: e.target.value })}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${
                          errors.kra_pin ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter KRA PIN"
                      />
                      {errors.kra_pin && (
                        <p className="text-sm text-red-500 mt-1">{errors.kra_pin}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Mobile Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={clientData.mobile_phone}
                        onChange={(e) =>
                          setClientData({ ...clientData, mobile_phone: e.target.value })
                        }
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${
                          errors.mobile_phone ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="+254 or 07XX XXX XXX"
                      />
                      {errors.mobile_phone && (
                        <p className="text-sm text-red-500 mt-1">{errors.mobile_phone}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={clientData.email}
                        onChange={(e) => setClientData({ ...clientData, email: e.target.value })}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${
                          errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="email@example.com"
                      />
                      {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Gender *
                      </label>
                      <select
                        value={clientData.gender}
                        onChange={(e) => setClientData({ ...clientData, gender: e.target.value })}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${
                          errors.gender ? 'border-red-500' : 'border-gray-300'
                        }`}
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.gender && (
                        <p className="text-sm text-red-500 mt-1">{errors.gender}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date of Birth *
                      </label>
                      <input
                        type="date"
                        value={clientData.date_of_birth}
                        onChange={(e) =>
                          setClientData({ ...clientData, date_of_birth: e.target.value })
                        }
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${
                          errors.date_of_birth ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.date_of_birth && (
                        <p className="text-sm text-red-500 mt-1">{errors.date_of_birth}</p>
                      )}
                    </div>

                    {showPlateNumber && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Vehicle Plate Number *
                          <span className="text-xs text-gray-500 ml-2">
                            (Required for Motor Insurance)
                          </span>
                        </label>
                        <input
                          type="text"
                          value={clientData.plate_number}
                          onChange={(e) =>
                            setClientData({ ...clientData, plate_number: e.target.value })
                          }
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${
                            errors.plate_number ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="KXX 123X"
                        />
                        {errors.plate_number && (
                          <p className="text-sm text-red-500 mt-1">{errors.plate_number}</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">Select Your Products</h2>
                  <p className="text-sm text-gray-600 mb-6">
                    Use the sidebar to choose your Core and Optional products. Your tier updates
                    automatically.
                  </p>
                  {/* Validation message */}
                  {errors.products && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6">
                      <p className="text-sm text-red-600">{errors.products}</p>
                    </div>
                  )}

                  {/* Confirmation block */}
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Confirm Selection</h3>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <p className="text-sm text-gray-600 mb-4">
                      You have selected {selectedProducts.length} product(s). Please confirm your
                      selection:
                    </p>
                    {selectedProducts.length > 0 ? (
                      <div className="space-y-3">
                        {selectedProducts.map((productId) => {
                          const product = products.find((p) => p.id === productId);
                          return product ? (
                            <div
                              key={productId}
                              className="flex items-center justify-between bg-white p-4 rounded-lg"
                            >
                              <div className="flex items-center">
                                <CheckCircle2 className="w-5 h-5 text-green-500 mr-3" />
                                <span className="font-medium">{product.product_name}</span>
                                <span
                                  className={`ml-3 px-2 py-1 text-xs rounded-full ${
                                    product.category === 'Core'
                                      ? 'bg-indigo-100 text-indigo-800'
                                      : 'bg-purple-100 text-purple-800'
                                  }`}
                                >
                                  {product.category}
                                </span>
                              </div>
                              <button
                                onClick={() => handleProductToggle(productId)}
                                className="text-red-500 hover:text-red-700"
                                aria-label="Remove product"
                              >
                                <X className="w-5 h-5" />
                              </button>
                            </div>
                          ) : null;
                        })}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <AlertCircle className="w-12 h-12 text-yellow-500 mx-auto mb-3" />
                        <p className="text-gray-600">No products selected</p>
                        <p className="text-sm text-gray-500 mt-2">
                          Please select at least one product above
                        </p>
                      </div>
                    )}

                    <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
                      <h4 className="font-semibold text-indigo-800 mb-2">Your Tier Status:</h4>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-indigo-600">
                          {selectedProducts.length >= 5
                            ? 'Platinum'
                            : selectedProducts.length >= 3
                              ? 'Gold'
                              : selectedProducts.length === 2
                                ? 'Silver'
                                : 'Bronze'}
                        </span>
                        <span className="text-sm text-indigo-600">
                          {selectedProducts.length >= 5
                            ? 'Maximum benefits unlocked!'
                            : `${5 - selectedProducts.length} more product(s) to reach Platinum`}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Upload Required Documents
                  </h2>
                  <div className="space-y-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <h3 className="font-semibold text-blue-800 mb-2">Required Documents:</h3>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• National ID (Required for all products)</li>
                        <li>• KRA PIN Certificate (Required for all products)</li>
                        {documents.logbook.isRequired && (
                          <li>• Vehicle Logbook (Required for Motor Insurance)</li>
                        )}
                        {documents.passport.isRequired && (
                          <li>• Passport (Required for Travel Insurance)</li>
                        )}
                      </ul>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {(Object.entries(documents) as [DocumentKey, DocumentItem][]).map(
                        ([key, doc]) => {
                          if (!doc.isRequired && key !== 'national_id' && key !== 'kra_certificate')
                            return null;
                          return (
                            <div
                              key={key}
                              className="border-2 border-dashed border-gray-300 rounded-lg p-6"
                            >
                              <div className="text-center">
                                <FileText className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                                <h4 className="font-medium text-gray-700 mb-2">
                                  {doc.type.replace(/_/g, ' ')}
                                  {doc.isRequired && <span className="text-red-500 ml-1">*</span>}
                                </h4>
                                {doc.file ? (
                                  <div className="bg-green-50 rounded-lg p-3">
                                    <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto mb-2" />
                                    <p className="text-sm text-green-700">{doc.file.name}</p>
                                    <button
                                      onClick={() => handleFileUpload(key as DocumentKey, null)}
                                      className="text-xs text-red-500 hover:text-red-700 mt-2"
                                    >
                                      Remove
                                    </button>
                                  </div>
                                ) : (
                                  <>
                                    <label className="cursor-pointer">
                                      <span className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                                        <Upload className="w-4 h-4 mr-2" />
                                        Choose File
                                      </span>
                                      <input
                                        type="file"
                                        className="sr-only"
                                        accept=".pdf,.jpg,.jpeg,.png"
                                        onChange={(e) => {
                                          if (e.target.files?.[0])
                                            handleFileUpload(key as DocumentKey, e.target.files[0]);
                                        }}
                                      />
                                    </label>
                                    <p className="text-xs text-gray-500 mt-2">
                                      PDF, JPG, or PNG (Max 5MB)
                                    </p>
                                  </>
                                )}
                                {errors[key] && (
                                  <p className="text-sm text-red-500 mt-2">{errors[key]}</p>
                                )}
                              </div>
                            </div>
                          );
                        },
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Footer actions */}
              <div className="flex justify-between mt-8">
                {step > 1 && (
                  <button
                    onClick={handlePreviousStep}
                    className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Previous
                  </button>
                )}
                {step < 3 ? (
                  <button
                    onClick={handleNextStep}
                    className="ml-auto px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                  >
                    Next Step
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="ml-auto px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
                  >
                    {loading ? (
                      <>
                        <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></span>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Check className="w-5 h-5 mr-2" />
                        Submit KYC
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
