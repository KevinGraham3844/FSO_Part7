/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from 'react-redux'
import { initializeUsers } from '../reducers/usersReducer'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
    TableContainer,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Paper,
    TableHead
} from '@mui/material'


const Users = () => {

    const users = useSelector(state => state.users)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeUsers())
        console.log(users)
    }, [dispatch])

    return (
        <div>
            <h2>Users</h2>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>Blogs Created</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map(user => (
                            <TableRow key={user.id}>
                                <TableCell>
                                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                                </TableCell>
                                <TableCell>
                                    {user.blogs.length}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Users