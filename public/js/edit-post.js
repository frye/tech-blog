const updateButton = document.querySelector('#update-post');
const deleteButton = document.querySelector('#delete-post');

const updateClickHandler = async (event) => {
  event.preventDefault();
  const title = document.querySelector('#title').value.trim();
  const content = document.querySelector('#content').value.trim();
  const post_id = document.querySelector('#title').getAttribute('post-id');
  const postData = await fetch(`/api/posts/${post_id}`, {
    method: 'PUT',
    body: JSON.stringify({ title, content,}),
    headers: { 'Content-Type': 'application/json' },
  });
  if (postData.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Failed to create post.');
  }
}

const deleteClickHandler = async (event) => {
  event.preventDefault();
  const post_id = document.querySelector('#title').getAttribute('post-id');
  const postData = await fetch(`/api/posts/${post_id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  });
  if (postData.ok) {
    document.location.replace('/dashboard');
  } else {
    alert('Failed to create post.');
  }
}

updateButton.addEventListener('click', updateClickHandler);
deleteButton.addEventListener('click', deleteClickHandler);