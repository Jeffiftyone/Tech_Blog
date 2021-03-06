const replyFormHandler = async function(event) {
    event.preventDefault();
  
    const thread_id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
  ];
    const reply_text = document.querySelector('input[name="reply-text"]').value;
  
    if (reply_text) {
      const response = await fetch('/api/replies', {
        method: 'POST',
        body: JSON.stringify({
          thread_id,
          reply_text
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
  
        alert(response.statusText);
      }
    }
    
  };
  
  document.querySelector('#reply-form').addEventListener('submit', replyFormHandler);
 