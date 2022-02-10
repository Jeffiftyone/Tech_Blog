async function newFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('input[name="thread-title"]').value;
    const content = document.querySelector('input[name="thread-content"]').value;
  
    const response = await fetch(`/api/threads`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        content
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {

      alert(response.statusText);
    }
  }
  
  document.querySelector('#new-thread-form').addEventListener('submit', newFormHandler);