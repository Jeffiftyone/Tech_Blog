const replyFormHandler = async function(event) {
    event.preventDefault();
  
    const threadId = document.querySelector('input[name="thread-id"]').value;
    const body = document.querySelector('textarea[name="reply-text"]').value;
  
    if (body) {
      await fetch('/api/thread', {
        method: 'POST',
        body: JSON.stringify({
          threadId,
          body
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