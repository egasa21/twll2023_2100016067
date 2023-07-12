import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import Cookies from 'js-cookie';
import './table.css';
import { useLocation, useNavigate } from 'react-router-dom';

export default function BasicTable() {
  const [data, setData] = useState([]);
  const location = useLocation();
  const backendURL = 'http://localhost:5000';
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get('access_token');
        if (token) {
          const response = await axios.get(`http://localhost:5000/api${location.pathname}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setData(response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [location.pathname]);

  const handleEdit = async (row) => {
    const id = row._id;
    navigate(`/doctors/edit/${id}`);
  };

  const handleDelete = async (row) => {
    try {
      const token = Cookies.get('access_token');
      const response = await axios.delete(`${backendURL}/api/doctors/${row._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });


      console.log('Delete successful:', response.data);

      setData((prevData) => prevData.filter((rowData) => rowData._id !== row._id));

    } catch (error) {
      console.error('Delete failed:', error);

    }
  };



  const makeStyle = (status) => {
    if (status === 'Approved') {
      return {
        background: 'rgb(145 254 159 / 47%)',
        color: 'green',
      };
    } else if (status === 'Pending') {
      return {
        background: '#ffadad8f',
        color: 'red',
      };
    } else {
      return {
        background: '#59bfff',
        color: 'white',
      };
    }
  };

  const tableHeaders = Object.keys(data[0] || {})
    .filter((header) => header !== '_id' && header !== 'createdAt' && header !== 'updatedAt' && header !== '__v' ); // && header !== 'imgUrl'


  return (
    <div className="Table">
      <TableContainer sx={{ maxHeight: 400 }}
        component={Paper}
        style={{ boxShadow: '0px 13px 20px 0px #80808029' }}
      >
        <Table stickyHeader aria-label="simple table">
          <TableHead>
            <TableRow>
              {tableHeaders.map((header) => (
                <TableCell key={header}>{header}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody style={{ color: 'white' }}>
            {data.map((row, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                {tableHeaders.map((header) => (
                  <TableCell
                    key={header}
                    align="left"
                    style={makeStyle(row[header])}
                  >
                    {header === 'imgUrl' ? (
                      <img src={`http://localhost:5000/api/images/${row[header]}`} alt="Doctor" style={{ width: '100px' }} />
                      // http://localhost:5000/api/images/33d3c2bd4ba506f53dc9b2ed41a1251e.png
                    ) : (
                      row[header] && typeof row[header] === 'object' ? row[header].name : row[header]
                    )}
                  </TableCell>
                ))}
                <TableCell align="left">
                  <button onClick={() => handleEdit(row)}>Edit</button>
                  <button onClick={() => handleDelete(row)}>Delete</button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
