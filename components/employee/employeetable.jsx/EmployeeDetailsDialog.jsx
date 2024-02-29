// import React from 'react';
// import {
//   Avatar,
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableRow,
// } from '@mui/material';
// import { CloseOutlined } from '@mui/icons-material';

// const EmployeeDetailsDialog = ({ isOpen, onClose, selectedRowCandidate }) => {
//   return (
//     <Dialog open={isOpen} onClose={onClose}>
//       <div style={{ display: 'flex', flexDirection: 'row', marginTop: '10px', marginBottom: '-20px' }}>
//         <Avatar
//           src={selectedRowCandidate && selectedRowCandidate.profile_image || "/default-avatar.png"}
//           sx={{
//             width: 45,
//             height: 42,
//             cursor: 'pointer',
//             marginTop: '8px',
//             marginLeft: '13px'
//           }}
//           alt="Profile Avatar"
//         />
//         <DialogTitle style={{ marginTop: '-16px' }}>
//           {selectedRowCandidate && selectedRowCandidate.name} <br />
//           <span style={{ fontWeight: '300', fontSize: '15px', marginTop: '0px' }}>{selectedRowCandidate && selectedRowCandidate.designation}</span>
//         </DialogTitle>
//         <DialogActions>
//           <Button onClick={onClose} sx={{ marginTop: '-50px', marginLeft: '190px' }}>
//             <CloseOutlined style={{ color: 'black' }} />
//           </Button>
//         </DialogActions>
//       </div>
//       <DialogContent>
//         <TableContainer component={Paper}>
//           <Table>
//             <TableBody>
//               {selectedRowCandidate && (
//                 <>
//                   <TableRow>
//                     <TableCell sx={{ borderRight: '1px solid #ccc', padding: '8px' }}>Mobile Number</TableCell>
//                     <TableCell>{selectedRowCandidate.phone}</TableCell>
//                   </TableRow>
//                   <TableRow>
//                     <TableCell sx={{ borderRight: '1px solid #ccc', padding: '8px' }}>Department</TableCell>
//                     <TableCell>{selectedRowCandidate.designation}</TableCell>
//                   </TableRow>
//                   <TableRow>
//               <TableCell sx= {{borderRight: "1px solid #ccc", padding: "8px" }}>Marital Status</TableCell>
//               <TableCell>{selectedRowCandidate.marriage_status}</TableCell>
//               </TableRow>
//               <TableRow>
//               <TableCell sx= {{borderRight: "1px solid #ccc", padding: "8px" }}>Salary</TableCell>
//               <TableCell></TableCell>
//               </TableRow>
//               <TableRow>
//               <TableCell sx= {{borderRight: "1px solid #ccc", padding: "8px" }}>Salary Type</TableCell>
//               <TableCell></TableCell>
//               </TableRow>
//               <TableRow>
//               <TableCell sx= {{borderRight: "1px solid #ccc", padding: "8px" }}>Probation Periods</TableCell>
//               <TableCell></TableCell>
//               </TableRow>
//               <TableRow>
//               <TableCell sx= {{borderRight: "1px solid #ccc", padding: "8px" }}>Working hours</TableCell>
//               <TableCell></TableCell>
//               </TableRow>
//              <TableRow>
//               <TableCell sx= {{borderRight: "1px solid #ccc", padding: "8px" }}>Weekly off</TableCell>
//               <TableCell></TableCell>
//               </TableRow>
              
//               <TableRow>
//               <TableCell sx= {{borderRight: "1px solid #ccc", padding: "8px" }}>Joining Date</TableCell>
//               <TableCell></TableCell>
//               </TableRow>
//               <TableRow>
//               <TableCell sx= {{borderRight: "1px solid #ccc", padding: "8px" }}>Allow late clock in</TableCell>
//               <TableCell></TableCell>
//               </TableRow>
//               <TableRow>
//               <TableCell sx= {{borderRight: "1px solid #ccc", padding: "8px" }}>Overtime</TableCell>
//               <TableCell></TableCell>
//               </TableRow>
//               <TableRow>
//               <TableCell sx= {{borderRight: "1px solid #ccc", padding: "8px" }}>Allowance</TableCell>
//               <TableCell></TableCell>
//               </TableRow>
//               <TableRow>
//               <TableCell sx= {{borderRight: "1px solid #ccc", padding: "8px" }}>Sick leave</TableCell>
//               <TableCell></TableCell>
//               </TableRow>
//               <TableRow>
//               <TableCell sx= {{borderRight: "1px solid #ccc", padding: "8px" }}>Casual Leave</TableCell>
//               <TableCell></TableCell>
//               </TableRow>
//               <TableRow>
//               <TableCell sx= {{borderRight: "1px solid #ccc", padding: "8px" }}>Network access</TableCell>
//               <TableCell></TableCell>
//               </TableRow>
//                 </>
//               )}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default EmployeeDetailsDialog;
import React from 'react';
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from '@mui/material';
import { CloseOutlined } from '@mui/icons-material';
const EmployeeDetailsDialog = ({ isOpen, onClose, selectedRowCandidate }) => {
  const tableRows = [
    { label: 'Mobile Number', value: selectedRowCandidate ? selectedRowCandidate.phone : '' },
    { label: 'Department', value: selectedRowCandidate ? selectedRowCandidate.designation : '' },
    { label: 'Marital Status', value: selectedRowCandidate ? selectedRowCandidate.marriage_status : '' },
    { label: 'Salary', value: '' },
    { label: 'Salary Type', value: '' }, 
    { label: 'Probation Periods', value: '' }, 
    { label: 'Working hours', value: '' },
    { label: 'Weekly off', value: '' },
    { label: 'Joining Date', value: '' },
    { label: 'Allow late clock in', value: '' },
    { label: 'Overtime', value: '' }, 
    { label: 'Allowance', value: '' },
    { label: 'Sick leave', value: '' },
    { label: 'Casual Leave', value: '' },
    { label: 'Network access', value: '' },
  ];
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <div style={{ display: 'flex', flexDirection: 'row', marginTop: '10px', marginBottom: '-20px' }}>
        <Avatar
          src={selectedRowCandidate && selectedRowCandidate.profile_image || "/default-avatar.png"}
          sx={{
            width: 45,
            height: 42,
            cursor: 'pointer',
            marginTop: '8px',
            marginLeft: '13px'
          }}
          alt="Profile Avatar"
        />
        <DialogTitle style={{ marginTop: '-16px' }}>
          {selectedRowCandidate && selectedRowCandidate.name} <br />
          <span style={{ fontWeight: '300', fontSize: '15px', marginTop: '0px' }}>{selectedRowCandidate && selectedRowCandidate.designation}</span>
        </DialogTitle>
        <DialogActions>
          <Button onClick={onClose} sx={{ marginTop: '-50px', marginLeft: '190px' }}>
            <CloseOutlined style={{ color: 'black' }} />
          </Button>
        </DialogActions>
      </div>
      <DialogContent>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {tableRows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ borderRight: '1px solid #ccc', padding: '8px' }}>{row.label}</TableCell>
                  <TableCell>{row.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
    </Dialog>
  );
};

export default EmployeeDetailsDialog;