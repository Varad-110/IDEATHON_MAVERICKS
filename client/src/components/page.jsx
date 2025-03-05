"use client"

import { useState } from "react"
import AddressForm from "./AddressForm"
import ValidationResults from "./Validationresults"
import DeliveryOffice from "./DeliveryOffice"
import PincodeMapping from "./PincodeMapping"


export default function Home() {
  const [addressData, setAddressData] = useState(null)
  const [isValidating, setIsValidating] = useState(false)
  const [validationResults, setValidationResults] = useState(null)

  const handleAddressSubmit = async (data) => {
    setIsValidating(true)
    setAddressData(data)

    // Simulate API call for address validation
    try {
      // In a real application, this would be an actual API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock validation results
      const results = {
        isValid: Math.random() > 0.3, // 70% chance of valid address
        confidence: Math.floor(Math.random() * 40) + 60, // 60-99% confidence
        suggestedAddress: {
          street: data.street,
          city: data.city,
          state: data.state,
          pincode: data.pincode,
          corrections: [],
        },
        deliveryOffice: {
          name: `${data.city} Central Post Office`,
          code: `PO-${data.pincode.substring(0, 3)}`,
          address: `Postal Complex, ${data.city}, ${data.state}`,
          contactNumber: `+91-${Math.floor(Math.random() * 9000000000) + 1000000000}`,
        },
        pincodeMapping: {
          mainPincode: data.pincode,
          relatedPincodes: [
            `${Number.parseInt(data.pincode) + 1}`,
            `${Number.parseInt(data.pincode) + 2}`,
            `${Number.parseInt(data.pincode) + 5}`,
          ],
          deliveryZone: `Zone-${data.pincode.substring(0, 2)}`,
          dispatchCenter: `${data.city} Regional Sorting Center`,
        },
      }

      // Add some corrections if needed
      if (results.confidence < 80) {
        results.suggestedAddress.corrections.push({
          field: "street",
          original: data.street,
          suggested: `${data.street} Main Road`,
        })
      }

      setValidationResults(results)
    } catch (error) {
      console.error("Validation error:", error)
    } finally {
      setIsValidating(false)
    }
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-10">
          <h1 className="text-3xl font-bold text-primary">Postal Address Validator</h1>
          <p className="text-gray-600 mt-2">AI-powered address validation and delivery office mapping system</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <AddressForm onSubmit={handleAddressSubmit} isLoading={isValidating} />
          </div>

          <div className="lg:col-span-2">
            {isValidating ? (
              <div className="card bg-base-100 shadow-xl p-6 flex items-center justify-center min-h-[300px]">
                <div className="flex flex-col items-center">
                  <div className="loading loading-spinner loading-lg text-primary"></div>
                  <p className="mt-4 text-gray-600">Analyzing address with AI...</p>
                </div>
              </div>
            ) : validationResults ? (
              <div className="space-y-6">
                <ValidationResults results={validationResults} />
                <DeliveryOffice office={validationResults.deliveryOffice} />
                <PincodeMapping mapping={validationResults.pincodeMapping} />
              </div>
            ) : (
              <div className="card bg-base-100 shadow-xl p-6 flex items-center justify-center min-h-[300px]">
                <div className="text-center text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-16 h-16 mx-auto mb-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776"
                    />
                  </svg>
                  <h3 className="text-xl font-semibold mb-2">Enter an address to validate</h3>
                  <p>Our AI system will analyze the address and suggest the correct delivery post office.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}

