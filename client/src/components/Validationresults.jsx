export default function ValidationResults({ results }) {
    const { isValid, confidence, suggestedAddress } = results
  
    const getConfidenceColor = (confidence) => {
      if (confidence >= 90) return "text-success"
      if (confidence >= 70) return "text-warning"
      return "text-error"
    }
  
    return (
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex justify-between items-center mb-4">
            <h2 className="card-title text-xl">Address Validation Results</h2>
            <div className="badge badge-lg badge-outline p-3 gap-1">
              <span>Confidence:</span>
              <span className={getConfidenceColor(confidence)}>{confidence}%</span>
            </div>
          </div>
  
          <div className="alert alert-info mb-4">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-current flex-shrink-0 w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>
                {isValid
                  ? "This address is valid and can be used for delivery."
                  : "This address has issues that may affect delivery."}
              </span>
            </div>
          </div>
  
          <div className="divider">Suggested Address</div>
  
          <div className="bg-base-200 p-4 rounded-lg">
            <p className="font-medium">{suggestedAddress.street}</p>
            <p>
              {suggestedAddress.city}, {suggestedAddress.state} - {suggestedAddress.pincode}
            </p>
          </div>
  
          {suggestedAddress.corrections.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold text-warning mb-2">Suggested Corrections:</h3>
              <ul className="list-disc list-inside space-y-1 pl-2">
                {suggestedAddress.corrections.map((correction, index) => (
                  <li key={index} className="text-sm">
                    <span className="font-medium">{correction.field}:</span> Change from "{correction.original}" to "
                    {correction.suggested}"
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    )
  }
  
  