/* eslint-disable jsx-a11y/anchor-is-valid */
import { useGetNotesQuery } from "../notes/notesApiSlice";
import { selectAllUsers } from "../users/usersApiSlice";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { useSelector } from "react-redux";
import PageLoader from "../../components/PageLoader";

const Welcome = () => {

  let [time, getTime] = useState(new Date().toLocaleTimeString());
  function refreshTime() {
    getTime((time = new Date().toLocaleTimeString()));
  }
  setInterval(refreshTime, 1000);
  const { name } = useAuth();

  const dateToday = (new Date().toLocaleDateString("en-US", {year: 'numeric' , day: 'numeric' ,
  month: 'long' }))

  const totalUsers = useSelector(state => selectAllUsers(state))


  const {
    data: notes,
    isLoading: isNotesLoading,
    isSuccess: isNotesSuccess,
    isError: isNotesError,
    error: notesError,
  } = useGetNotesQuery("noteList", {
    pollingInterval: 15000, // refresh data every 15 seconds
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });


  let content

  if (isNotesLoading) content = (
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mt-2">
            <div className="animate-pulse">
            <div className="h-5 w-80 bg-slate-700 rounded"></div>
            <div className=" mt-1.5  h-2 w-52 bg-slate-700 rounded"></div>
            </div>
            <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
              <div className="mt-4 sm:mt-4">
                <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="flex flex-col shadow-md bg-slate-200 dark:bg-slate-800 rounded-lg border border-none dark:border-gray-800 px-4 py-8 text-center text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-400">
                  <dt className="animate-pulse  order-last flex justify-center">
                   <div className="mt-3 h-2 w-20 bg-slate-700 rounded-full"></div>
                  </dt>
                    <dd className="animate-pulse  text-4xl flex justify-center  font-bold  md:text-5xl">
                    <div className="rounded-full bg-slate-700 h-12 w-12"></div>
                    </dd>
                  </div>
                  <div className="flex flex-col shadow-md bg-slate-200 dark:bg-slate-800 rounded-lg border border-none dark:border-gray-800 px-4 py-8 text-center text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-400">
                  <dt className="animate-pulse  order-last flex justify-center">
                   <div className="mt-3 h-2 w-20 bg-slate-700 rounded-full"></div>
                  </dt>

                    <dd className="animate-pulse  text-4xl flex justify-center  font-bold  md:text-5xl">
                    <div className="rounded-full bg-slate-700 h-12 w-12"></div>
                    </dd>
                  </div>
                  <div className="flex flex-col shadow-md bg-slate-200 dark:bg-slate-800 rounded-lg border border-none dark:border-gray-800 px-4 py-8 text-center text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-400">
                  <dt className="animate-pulse  order-last flex justify-center">
                    <div className="mt-3 h-2 w-20 bg-slate-700 rounded-full"></div>
                  </dt>
                    <dd className="animate-pulse  text-4xl flex justify-center  font-bold  md:text-5xl">
                    <div className="rounded-full bg-slate-700 h-12 w-12"></div>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>

  )

  if (isNotesError) {
    content = (
      <p className="text-slate-900 dark:text-slate-300">
        {notesError?.data?.message}
      </p>
    );
  }

  if (isNotesSuccess) {
    const { ids: notesIds, entities: notesEntities } = notes;

    const filteredOpenNotes = notesIds.filter(
      (noteId) => notesEntities[noteId].completed === false
    );

   
     content = (
      // <PageLoader />
      <div aria-label="Page Header" className="">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mt-2">
      
          <p className="text-xl font-bold text-gray-900 sm:text-2xl dark:text-gray-200">
            Welcome Back, {name}!
          </p>

          <p className="mt-1.5 text-sm text-gray-500">
             {`Today is  ${dateToday} - ${time} `}
          </p>

          <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
            <div className="mt-4 sm:mt-4">
              <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            
              <Link to="/dash/users">
                <div className="flex flex-col shadow-md bg-slate-200 dark:bg-slate-800 rounded-lg border border-none dark:border-gray-800 px-4 py-8 text-center text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-400">
                  <dt className="order-last text-sm  font-medium ">
                    Total Employees
                  </dt>

                  <dd className="text-4xl font-bold  md:text-5xl">
                   {totalUsers.length}
                  </dd>
                </div>
                </Link>

                
                <Link to="/dash/notes">
                  <div className="flex flex-col shadow-md bg-slate-200 dark:bg-slate-800 rounded-lg border border-none dark:border-gray-800 px-4 py-8 text-center text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-400">
                    <dt className="order-last text-sm font-medium ">
                      Total Tasks
                    </dt>
                    <dd className="text-4xl font-bold  md:text-5xl">
                      {notesIds.length}
                    </dd>
                  </div>
                </Link>

                <Link to="/dash/notes">
                <div className="flex flex-col shadow-md bg-slate-200 dark:bg-slate-800 rounded-lg border border-none dark:border-gray-800 px-4 py-8 text-center text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-400">
                  <dt className="order-last text-sm  font-medium">
                    Total Task Open
                  </dt>

                  <dd className="text-4xl font-bold md:text-5xl">
                    {filteredOpenNotes.length}
                  </dd>
                </div>
                </Link>

               
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }

  return content;
};

export default Welcome;
