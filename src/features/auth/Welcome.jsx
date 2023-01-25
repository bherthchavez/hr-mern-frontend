// import {Link} from 'react-router-dom'

const Welcome = () => {
  const content = (
    <div aria-label="Page Header" className="">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mt-2">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            Welcome Back, Barry!
          </h1>

          <p className="mt-1.5 text-sm text-gray-500">
            Your website has seen a 52% increase in traffic in the last month.
            Keep it up!
          </p>

          {/* <div className="overflow-hidden overflow-x-auto rounded-lg border border-gray-200 mt-8">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-100">
                  <tr>
                   
                    <th
                      className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900"
                    >
                      <div className="flex items-center gap-2">
                        ID

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-gray-700"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </th>
                    <th
                      className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900"
                    >
                      <div className="flex items-center gap-2">
                        Name

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-gray-700"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </th>
                    <th
                      className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900"
                    >
                      <div className="flex items-center gap-2">
                        Email

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-gray-700"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </th>
                    <th
                      className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900"
                    >
                      <div className="flex items-center gap-2">
                        Amount

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 text-gray-700"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </th>
                    <th
                      className="whitespace-nowrap px-4 py-2 text-left font-medium text-gray-900"
                    >
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  <tr>
                   
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      #00001
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      John Frusciante
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">john@rhcp.com</td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">$783.23</td>
                    <td className="whitespace-nowrap px-4 py-2">
                      <strong
                        className="rounded bg-red-100 px-3 py-1.5 text-xs font-medium text-red-700"
                      >
                        Cancelled
                      </strong>
                    </td>
                  </tr>

                  <tr>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      #00002
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      George Harrison
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      george@beatles.com
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">$128.99</td>
                    <td className="whitespace-nowrap px-4 py-2">
                      <strong
                        className="rounded bg-green-100 px-3 py-1.5 text-xs font-medium text-green-700"
                      >
                        Paid
                      </strong>
                    </td>
                  </tr>

                  <tr>
                    <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                      #00003
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">Dave Gilmour</td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                      dave@pinkfloyd.com
                    </td>
                    <td className="whitespace-nowrap px-4 py-2 text-gray-700">$459.43</td>
                    <td className="whitespace-nowrap px-4 py-2">
                      <strong
                        className="rounded bg-amber-100 px-3 py-1.5 text-xs font-medium text-amber-700"
                      >
                        Partially Refunded
                      </strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div> */}

            <div class="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
             

              <div class="mt-4 sm:mt-4">
                <dl class="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div class="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
                    <dt class="order-last text-lg font-medium text-gray-500">
                      Total Sales
                    </dt>

                    <dd class="text-4xl font-extrabold text-blue-600 md:text-5xl">
                      $4.8m
                    </dd>
                  </div>

                  <div class="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
                    <dt class="order-last text-lg font-medium text-gray-500">
                      Official Addons
                    </dt>

                    <dd class="text-4xl font-extrabold text-blue-600 md:text-5xl">
                      24
                    </dd>
                  </div>

                  <div class="flex flex-col rounded-lg border border-gray-100 px-4 py-8 text-center">
                    <dt class="order-last text-lg font-medium text-gray-500">
                      Total Addons
                    </dt>

                    <dd class="text-4xl font-extrabold text-blue-600 md:text-5xl">
                      86
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          
        </div>
      </div>
    </div>
  );

  return content;
};

export default Welcome;
