"use client"

import { useState } from "react"

export default function AddressForm({ onSubmit, isLoading }) {
  const [formData, setFormData] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.street.trim()) {
      newErrors.street = "Street address is required"
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required"
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required"
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = "Pincode is required"
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Pincode must be 6 digits"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      onSubmit(formData)
    }
  }

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title text-xl font-semibold mb-4">Enter Address Details</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-control mb-3">
            <label className="label">
              <span className="label-text">Recipient Name</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full name"
              className={`input input-bordered w-full ${errors.name ? "input-error" : ""}`}
            />
            {errors.name && <span className="text-error text-sm mt-1">{errors.name}</span>}
          </div>

          <div className="form-control mb-3">
            <label className="label">
              <span className="label-text">Street Address</span>
            </label>
            <textarea
              name="street"
              value={formData.street}
              onChange={handleChange}
              placeholder="House/Flat No., Building, Street"
              className={`textarea textarea-bordered w-full ${errors.street ? "textarea-error" : ""}`}
              rows="2"
            ></textarea>
            {errors.street && <span className="text-error text-sm mt-1">{errors.street}</span>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="form-control mb-3">
              <label className="label">
                <span className="label-text">City</span>
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                className={`input input-bordered w-full ${errors.city ? "input-error" : ""}`}
              />
              {errors.city && <span className="text-error text-sm mt-1">{errors.city}</span>}
            </div>

            <div className="form-control mb-3">
              <label className="label">
                <span className="label-text">State</span>
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="State"
                className={`input input-bordered w-full ${errors.state ? "input-error" : ""}`}
              />
              {errors.state && <span className="text-error text-sm mt-1">{errors.state}</span>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="form-control mb-3">
              <label className="label">
                <span className="label-text">Pincode</span>
              </label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="6-digit pincode"
                className={`input input-bordered w-full ${errors.pincode ? "input-error" : ""}`}
                maxLength="6"
              />
              {errors.pincode && <span className="text-error text-sm mt-1">{errors.pincode}</span>}
            </div>

            <div className="form-control mb-3">
              <label className="label">
                <span className="label-text">Landmark (Optional)</span>
              </label>
              <input
                type="text"
                name="landmark"
                value={formData.landmark}
                onChange={handleChange}
                placeholder="Nearby landmark"
                className="input input-bordered w-full"
              />
            </div>
          </div>

          <div className="form-control mt-4">
            <button type="submit" className={`btn btn-primary ${isLoading ? "loading" : ""}`} disabled={isLoading}>
              {isLoading ? "Validating..." : "Validate Address"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

