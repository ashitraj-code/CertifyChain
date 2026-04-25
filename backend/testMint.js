const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');

async function testUpload() {
  try {
    const form = new FormData();
    form.append('studentName', 'Test Name');
    form.append('course', 'Test Course');
    // Read the dummy.pdf we created
    form.append('file', fs.createReadStream('c:/Users/David Tembhare/Desktop/CertifyChain/frontend/dummy.pdf'));

    const response = await axios.post('http://localhost:5000/api/certificate/mint', form, {
      headers: form.getHeaders()
    });

    console.log(response.data);
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
  }
}

testUpload();
