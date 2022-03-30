const createButton = document.querySelector('#create-post')

const createClickHandler = async (event) => {
  event.preventDefault();
  const title = document.querySelector('#title').value.trim();
  const content = document.querySelector('#content').value.trim();
  const postData = await fetch('/api/posts', {
    method: 'POST',
    body: JSON.stringify({ title, content,}),
    headers: { 'Content-Type': 'application/json' },
  });
  if (postData.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Failed to create post.');
  }
}

createButton.addEventListener('click', createClickHandler);