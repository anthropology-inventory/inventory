import { useEffect, useState } from 'react'
import { Box, Button, Checkbox, TextField } from '@mui/material'
import { Bounce, toast } from 'react-toastify'
import CreateUserForm from './forms/CreateUserForm.jsx'
import { fetchUsers, deleteUser, updateUser } from '../utils/api'

export default function ManageUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingUserId, setEditingUserId] = useState(null)
  const [editForm, setEditForm] = useState({
    email: '',
    isAdmin: false
  })

  const loadUsers = async () => {
    setLoading(true)
    const data = await fetchUsers()
    setUsers(Array.isArray(data) ? data : [])
    setLoading(false)
  }

  useEffect(() => {
    loadUsers()
  }, [])

  const handleDelete = async (id) => {
    const result = await deleteUser(id)

    if (result.ok) {
      toast.success('User deleted successfully.', {
        position: 'top-right',
        autoClose: 2500,
        hideProgressBar: false,
        theme: 'colored',
        transition: Bounce
      })
      loadUsers()
    } else {
      toast.error(result.data?.message || 'Failed to delete user.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        theme: 'colored',
        transition: Bounce
      })
    }
  }

  const handleEditClick = (user) => {
    setEditingUserId(user._id)
    setEditForm({
      email: user.email,
      isAdmin: user.isAdmin
    })
  }

  const handleCancelEdit = () => {
    setEditingUserId(null)
    setEditForm({
      email: '',
      isAdmin: false
    })
  }

  const handleSaveEdit = async (id) => {
    const result = await updateUser(id, editForm)

    if (result.ok) {
      toast.success('User updated successfully.', {
        position: 'top-right',
        autoClose: 2500,
        hideProgressBar: false,
        theme: 'colored',
        transition: Bounce
      })
      setEditingUserId(null)
      loadUsers()
    } else {
      toast.error(result.data?.message || 'Failed to update user.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        theme: 'colored',
        transition: Bounce
      })
    }
  }

  return (
    <Box sx={{ padding: 3 }}>
      <CreateUserForm onUserCreated={loadUsers} />

      <Box sx={{ marginTop: 4 }}>
        <h2>Current Users</h2>

        {loading ? (
          <p>Loading users...</p>
        ) : users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '8px' }}>Email</th>
                <th style={{ textAlign: 'left', padding: '8px' }}>Admin</th>
                <th style={{ textAlign: 'left', padding: '8px' }}>Created</th>
                <th style={{ textAlign: 'left', padding: '8px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                const isEditing = editingUserId === user._id

                return (
                  <tr key={user._id}>
                    <td style={{ padding: '8px' }}>
                      {isEditing ? (
                        <TextField
                          size="small"
                          value={editForm.email}
                          onChange={(e) =>
                            setEditForm((prev) => ({
                              ...prev,
                              email: e.target.value
                            }))
                          }
                        />
                      ) : (
                        user.email
                      )}
                    </td>

                    <td style={{ padding: '8px' }}>
                      {isEditing ? (
                        <Checkbox
                          checked={editForm.isAdmin}
                          onChange={(e) =>
                            setEditForm((prev) => ({
                              ...prev,
                              isAdmin: e.target.checked
                            }))
                          }
                        />
                      ) : user.isAdmin ? (
                        'Yes'
                      ) : (
                        'No'
                      )}
                    </td>

                    <td style={{ padding: '8px' }}>
                      {user.createdAt ? new Date(user.createdAt).toLocaleString() : '—'}
                    </td>

                    <td style={{ padding: '8px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {isEditing ? (
                        <>
                          <Button
                            color="primary"
                            variant="contained"
                            onClick={() => handleSaveEdit(user._id)}
                          >
                            Save
                          </Button>
                          <Button
                            color="inherit"
                            variant="outlined"
                            onClick={handleCancelEdit}
                          >
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            color="primary"
                            variant="contained"
                            onClick={() => handleEditClick(user)}
                          >
                            Edit
                          </Button>
                          <Button
                            color="error"
                            variant="contained"
                            onClick={() => handleDelete(user._id)}
                          >
                            Delete
                          </Button>
                        </>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </Box>
    </Box>
  )
}