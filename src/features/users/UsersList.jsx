import { useGetUsersQuery } from "./usersApiSlice";
import User from "./User";
import Thead from "../../components/Thead";
import Tbody from "../../components/Tbody";

const UsersList = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery("usersList", {
    pollingInterval: 15000, // refresh data every 15 seconds
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  let content;

  if (isLoading) content = <p>Loading...</p>;

  if (isError) {
    content = <p className="errmsg">{error?.data?.message}</p>;
  }

  if (isSuccess) {
    const { ids } = users;

    const tableContent = ids?.length
      ? ids.map((userId) => <User key={userId} userId={userId} />)
      : null;

  


    content = (
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="overflow-hidden overflow-x-auto rounded-md border border-gray-200 mt-8 dark:border-gray-800">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <Thead thName="NAME" />
                <Thead thName="USERNAME" />
                <Thead thName="ROLES" />
                <Thead thName="EDIT" />
              </tr>
            </thead>
            <Tbody tbName= {tableContent} />
          </table>
        </div>
      </div>
    );
  }

  return content;
};
export default UsersList;
