import { useEffect, useState } from 'react'
import { Box, Button, Checkbox, ThemeProvider } from '@mui/material'
import { Bounce, toast } from 'react-toastify'
import CreateUserForm from './forms/CreateUserForm.jsx'
import { fetchUsers, deleteUser, updateUser } from '../utils/api'
import { button } from '../styles/CustomThemes'
import BackButton from '../components/button-components/BackBtn.jsx'

export default function ManageUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingUserId, setEditingUserId] = useState(null)
  const [editForm, setEditForm] = useState({
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
      isAdmin: user.isAdmin
    })
  }

  const handleCancelEdit = () => {
    setEditingUserId(null)
    setEditForm({
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
    <ThemeProvider theme={button}>
      <Box id="manage-users-page">
        <BackButton />
        <Box className="manage-users-section">
          <h2>Current Users</h2>

          {loading ? (
            <p className="manage-users-message">Loading users...</p>
          ) : users.length === 0 ? (
            <p className="manage-users-message">No users found.</p>
          ) : (
            <div className="manage-users-table-wrapper">
              <table className="manage-users-table">
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Admin</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => {
                    const isEditing = editingUserId === user._id

                    return (
                      <tr key={user._id}>
                        <td>
                          <span className="user-email">{user.email}</span>
                        </td>

                        <td>
                          {isEditing ? (
                            <Checkbox
                              checked={editForm.isAdmin}
                              onChange={(e) =>
                                setEditForm({
                                  isAdmin: e.target.checked
                                })
                              }
                            />
                          ) : (
                            <span
                              className={
                                user.isAdmin
                                  ? 'admin-badge admin-yes'
                                  : 'admin-badge admin-no'
                              }
                            >
                              {user.isAdmin ? 'Admin' : 'Standard'}
                            </span>
                          )}
                        </td>

                        <td>
                          {user.createdAt ? new Date(user.createdAt).toLocaleString() : '—'}
                        </td>

                        <td>
                          <div className="manage-users-actions">
                            {isEditing ? (
                              <>
                                <Button
                                  size="small"
                                  color="submit"
                                  variant="contained"
                                  onClick={() => handleSaveEdit(user._id)}
                                >
                                  Save
                                </Button>
                                <Button
                                  size="small"
                                  color="back"
                                  variant="outlined"
                                  onClick={handleCancelEdit}
                                >
                                  Cancel
                                </Button>
                              </>
                            ) : (
                              <>
                                <Button
                                  size="small"
                                  color="edit"
                                  variant="contained"
                                  onClick={() => handleEditClick(user)}
                                  sx={{
                                    borderRadius: '4px',
                                    textTransform: 'none',
                                    fontFamily: 'DM Sans, sans-serif',
                                    fontWeight: 600,
                                    letterSpacing: '0.02em'
                                  }}
                                >
                                  Edit
                                </Button>
                                <Button
                                  size="small"
                                  color="delete"
                                  variant="contained"
                                  onClick={() => handleDelete(user._id)}
                                  sx={{
                                    borderRadius: '4px',
                                    textTransform: 'none',
                                    fontFamily: 'DM Sans, sans-serif',
                                    fontWeight: 600,
                                    letterSpacing: '0.02em'
                                  }}
                                >
                                  Delete
                                </Button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </Box>
        <CreateUserForm onUserCreated={loadUsers} />

      </Box>
    </ThemeProvider>
  )
}