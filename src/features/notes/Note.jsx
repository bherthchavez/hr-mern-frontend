import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'

import { useSelector } from 'react-redux'
import { selectNoteById } from './notesApiSlice'

const Note = ({ noteId }) => {

    const note = useSelector(state => selectNoteById(state, noteId))

    const navigate = useNavigate()

    if (note) {
        const created = new Date(note.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const updated = new Date(note.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const handleEdit = () => navigate(`/dash/notes/${noteId}`)

        return (
            <tr >
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    {note.completed
                        ? <span className="text-green-700">Completed</span>
                        : <span className="text-black">Open</span>
                    }
                </td>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{created}</td>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{updated}</td>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{note.title}</td>
                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{note.username}</td>

                <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
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
export default Note