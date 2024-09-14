const closeAleart = document.getElementById('closeNotification');
const notificationMessage = document.getElementById('notificationMessage');
const notification = document.getElementById('notification');

// -- Hàm hiển thị thông báo
function showNotification(message) {
  notificationMessage.textContent = message; 
  notification.style.display = 'block'; 
  setTimeout(function() {
      notification.style.display = 'none';
  }, 5000);
}
// -- Hàm ẩn thông báo
function closeNotification() {
  notification.style.display = 'none';  
}
closeAleart.addEventListener('click', closeNotification);