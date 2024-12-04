// script.js

let members = [];
let attendance = new Set();

document.getElementById('uploadBtn').addEventListener('click', () => {
  document.getElementById('fileInput').click();
});

document.getElementById('fileInput').addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const rows = e.target.result.split('\n');
      members = rows.map(row => row.trim());
      alert("Member list uploaded successfully!");
    };
    reader.readAsText(file);
  }
});

document.getElementById('attendanceBtn').addEventListener('click', () => {
  document.getElementById('attendanceSection').classList.remove('hidden');
});

document.getElementById('markAttendanceBtn').addEventListener('click', () => {
  const itsNumber = document.getElementById('itsInput').value.trim();
  if (members.includes(itsNumber)) {
    attendance.add(itsNumber);
    alert(`Attendance marked for ITS Number: ${itsNumber}`);
    document.getElementById('itsInput').value = '';
  } else {
    alert("Invalid ITS Number!");
  }
});

document.getElementById('exportBtn').addEventListener('click', () => {
  const attendanceArray = Array.from(attendance);
  const csvContent = "data:text/csv;charset=utf-8," + attendanceArray.join('\n');
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', 'attendance.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});
document.getElementById('markAttendanceBtn').addEventListener('click', () => {
  const itsNumber = document.getElementById('itsInput').value.trim();

  if (attendance.has(itsNumber)) {
    alert("Attendance marked already!");
    return;
  }

  const member = members.find(m => m.its === itsNumber);
  if (member) {
    attendance.set(itsNumber, 'Marked');
    alert(`Attendance marked for ${member.name}`);
    renderTable();
    document.getElementById('itsInput').value = '';
  } else {
    alert("Invalid ITS Number!");
  }
});
document.getElementById('exportBtn').addEventListener('click', () => {
  // Check if attendance is taken
  if (attendance.size === 0) {
    alert('No attendance marked to export!');
    return;
  }

  // Generate CSV content
  const csvContent = 'data:text/csv;charset=utf-8,ITS Number,Name\n' +
    Array.from(attendance.entries())
      .map(([its, name]) => `${its},${name}`)
      .join('\n');

  // Create a download link and trigger download
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', 'attendance.csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});
