import React,{useState,useEffect} from 'react'
import {ContentLayout} from './style'
import api from '../../utils/api';
import {Table} from 'reactstrap'
import PopUp from '../PopUp';

const UserPage = () => {

    const [users,setUsers] = useState([])
    const [showAlert,setShowAlert] = useState(false)
    const [deletedUser,setDeletedUser] = {}
    const fetchUsers = async() => {
        const {data} = await api.users.list()
        data && setUsers(data)
    }

    const deleteUser = async(key) => {
        const {data} = await api.users.delete(key)
        data && fetchUsers()
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <ContentLayout>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((item,key)=>
                    <tr key={key}>
                        <td>{key+1}</td>
                        <td>{item.userName}</td>
                        <td>{item.userEmail}</td>
                        <td>
                            <button className="text-red" onClick={e=> {setShowAlert(true);setDeletedUser(item)}}></button>
                        </td>
                    </tr>
                    )}
                </tbody>
            </Table>
            <PopUp show={showAlert} setShow={setShowAlert} title="Milestone" eventAccept={e => deleteUser(deletedUser.userId)}>
                {`Are you sure to remove user ${deleteUser.userName} ?`} 
            </PopUp>
        </ContentLayout>
    )
}

export default UserPage
