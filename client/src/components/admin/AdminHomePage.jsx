import React, { useState } from 'react'
import StudentInfoTable from './StudentInfoTable'
import TransactionInfoTable from './TransactionInfoTable'
//import {useHistory} from 'react-router-dom'

const AdminHomePage = () => {
  const [studentTable, setStudentTable] = useState(true)

  return (
    <div>
      <ul class="nav">
        <li class="nav-item">
          <h2 className='p-4'>Welcome Admin</h2>
        </li>
        <li class="nav-item m-2">
          <button className='btn btn-dark p-2' onClick={() => setStudentTable(false)}>Transaction Information</button>
        </li>

        <li class="nav-item m-2">
          <button onClick={() => setStudentTable(true)} className='btn btn-dark p-2'>Student Information</button>
        </li>

        <li class="nav-item m-4">
          <a  className='p-4' href="/admin/addDocument" style={{ 'color':'black'}}>
            Add Transacript
          </a>
        </li>
      </ul>
      <section className='p-4'>
        {studentTable ? <StudentInfoTable /> : <TransactionInfoTable />}
      </section>
    </div>
  )
}

export default AdminHomePage

//1. add welcome admin below navbar
//2. right side of welcome add transcript button
// above table heading with table anme and slide button for other table
//2. add tables
//3. search bar before table but in same container
//4. footer
//5. font and bgcolor
