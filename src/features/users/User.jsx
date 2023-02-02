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
                <td className={`whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-gray-300 ${cellStatus}`}> {user.name} </td>
                <td className={`whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-gray-300 ${cellStatus}`}> {user.username} </td>
                <td className={`whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-gray-300 ${cellStatus}`}> {userRolesString} </td>
                <td className={`whitespace-nowrap px-4 py-2 font-medium text-gray-900 dark:text-gray-300 ${cellStatus}`}>
                    <button
                        className="text-lg p-1"
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