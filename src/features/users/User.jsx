import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectUserById } from './usersApiSlice'

const User = ({ userId }) => {
    const user = useSelector(state => selectUserById(state, userId))

    const navigate = useNavigate()

    if (user) {
        const handleEdit = () => navigate(`/dash/users/${userId}`)

        const userRolesString = user.roles.toString().replaceAll(',', ', ')

        const cellStatus = user.active ? '' : 'text-gray-300'

        return (
            <tr>

                
                <td className={`whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-gray-300 ${cellStatus}`}>
                    <div className='flex'>
                    <img
                      alt="Man"
                      src={user.avatar ? user.avatar : `https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80`}
                      className="h-12 w-12 rounded-full border border-slate-300  dark:border-slate-600 object-cover"
                    />
                     <p className='my-auto pl-2'>{user.name} </p> 

                    </div>
                    
                     </td>
                <td className={`whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-gray-300 ${cellStatus}`}> {user.username} </td>
                <td className={`whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-gray-300 ${cellStatus}`}> {userRolesString} </td>
                <td className={`whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-gray-300 ${cellStatus}`}>
                    <button
                        title='Edit User'
                        className="text-lg p-1 hover:text-slate-500"
                        onClick={handleEdit}
                    >
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>
            </tr>
        )

    } else return null
}
export default User