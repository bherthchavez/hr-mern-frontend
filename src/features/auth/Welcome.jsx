/* eslint-disable jsx-a11y/anchor-is-valid */
import { useGetNotesQuery } from "../notes/notesApiSlice";
import useAuth from "../../hooks/useAuth";

const Welcome = () => {

  const {name} = useAuth()


  const {
    data: notes,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetNotesQuery('noteList', {
    pollingInterval: 15000, // refresh data every 15 seconds
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true
});

let content

  if (isLoading) content = <p>Loading...</p>;

  if (isError) {
    content = <p className="text-slate-900 dark:text-slate-300">{error?.data?.message}</p>;
  }

if (isSuccess) {
  const { ids } = notes;



console.log(notes)

   content = (
    <div aria-label="Page Header" className="">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mt-2">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-gray-400">
            Welcome Back, {name}!
          </h1>

          <p className="mt-1.5 text-sm text-gray-500">
            Your website has seen a 52% increase in traffic in the last month.
            Keep it up!
          </p>

            <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
              <div className="mt-4 sm:mt-4">
                <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="flex flex-col bg-slate-800 rounded-lg border border-gray-800 px-4 py-8 text-center">
                    <dt className="order-last text-lg font-medium text-gray-500">
                     Total Users
                    </dt>

                    <dd className="text-4xl font-extrabold text-gray-400 md:text-5xl">
                      3
                    </dd>
                  </div>

                  <div className="flex flex-col bg-slate-800 rounded-lg border border-gray-800 px-4 py-8 text-center">
                    <dt className="order-last text-lg font-medium text-gray-500">
                    Total Notes
                    </dt>

                    <dd className="text-4xl font-extrabold text-gray-400 md:text-5xl">
                    {ids.length}
                    </dd>
                  </div>

                  <div className="flex flex-col bg-slate-800 rounded-lg border border-gray-800 px-4 py-8 text-center">
                    <dt className="order-last text-lg font-medium text-gray-500">
                      Total Notes Open
                    </dt>

                    <dd className="text-4xl font-extrabold text-gray-400 md:text-5xl">
                     23
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          
        </div>
      </div>
    </div>
  )}

  return content;
};

export default Welcome;
