export default function PincodeMapping({ mapping }) {
    return (
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-xl mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
              />
            </svg>
            Pincode Mapping & Dispatch Information
          </h2>
  
          <div className="overflow-x-auto">
            <table className="table w-full">
              <tbody>
                <tr>
                  <td className="font-semibold">Main Pincode</td>
                  <td>
                    <div className="badge badge-primary badge-lg">{mapping.mainPincode}</div>
                  </td>
                </tr>
                <tr>
                  <td className="font-semibold">Related Pincodes</td>
                  <td>
                    <div className="flex flex-wrap gap-2">
                      {mapping.relatedPincodes.map((pincode, index) => (
                        <div key={index} className="badge badge-outline">
                          {pincode}
                        </div>
                      ))}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className="font-semibold">Delivery Zone</td>
                  <td>{mapping.deliveryZone}</td>
                </tr>
                <tr>
                  <td className="font-semibold">Dispatch Center</td>
                  <td>{mapping.dispatchCenter}</td>
                </tr>
              </tbody>
            </table>
          </div>
  
        </div>
      </div>
    )
  }
  
  