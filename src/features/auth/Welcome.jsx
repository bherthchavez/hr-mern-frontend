/* eslint-disable jsx-a11y/anchor-is-valid */
import { useGetNotesQuery } from "../notes/notesApiSlice";
import { useGetUsersQuery } from "../users/usersApiSlice";
import { Link } from "react-router-dom";

import useAuth from "../../hooks/useAuth";

const Welcome = () => {
  const { name } = useAuth();

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

  const {
    data: users,
    isLoading: isUsersLoading,
    isSuccess: isUsersSuccess,
    isError: isUsersError,
    error: usersError,
  } = useGetUsersQuery("usersList", {
    pollingInterval: 15000, // refresh data every 15 seconds
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  console.log(users)

  let contentNotes;
  let content

  if (isNotesLoading) contentNotes = <p>Loading...</p>;

  if (isNotesError) {
    contentNotes = (
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
      <div aria-label="Page Header" className="">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="mt-2">
        
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-gray-200">
              Welcome Back, {name}!
            </h1>

            <p className="mt-1.5 text-sm text-gray-500">
              Your website has seen a 52% increase in traffic in the last month.
              Keep it up!
            </p>

            <div className="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
              <div className="mt-4 sm:mt-4">
                <dl className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              
                <Link to="/dash/users">
                  <div className="flex flex-col shadow-md bg-slate-200 dark:bg-slate-800 rounded-lg border border-none dark:border-gray-800 px-4 py-8 text-center text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-400">
                    <dt className="order-last text-sm  font-medium ">
                      Total Users
                    </dt>

                    <dd className="text-4xl font-bold  md:text-5xl">
                     {users.ids?.length}
                    </dd>
                  </div>
                  </Link>

                  
                  <Link to="/dash/notes">
                    <div className="flex flex-col shadow-md bg-slate-200 dark:bg-slate-800 rounded-lg border border-none dark:border-gray-800 px-4 py-8 text-center text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-400">
                      <dt className="order-last text-sm font-medium ">
                        Total Notes
                      </dt>
                      <dd className="text-4xl font-bold  md:text-5xl">
                        {notesIds.length}
                      </dd>
                    </div>
                  </Link>

                  <Link to="/dash/notes">
                  <div className="flex flex-col shadow-md bg-slate-200 dark:bg-slate-800 rounded-lg border border-none dark:border-gray-800 px-4 py-8 text-center text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-400">
                    <dt className="order-last text-sm  font-medium">
                      Total Notes Open
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
