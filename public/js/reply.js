const replyFormHandler = async function(event) {
    event.preventDefault();
  
    const thread_id = document.querySelector('input[name="thread-id"]').value;
    const reply_body = document.querySelector('textarea[name="reply-text"]').value;
  
    if (body) {
      await fetch('/api/replies', {
        method: 'POST',
        body: JSON.stringify({
          thread_id,
          reply_body
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      document.location.reload();
    }
  };
  
  document
    .querySelector('#new-reply-form')
    .addEventListener('submit', replyFormHandler);