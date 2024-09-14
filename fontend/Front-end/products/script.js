
// -- Hiển thị thông báo khi bấm nút Thêm Giỏ Hàng
const buttonBuy = document.querySelectorAll('.add-to-cart');
// -- Lấy các phần tử từ DOM
const alertEmail = document.getElementById('footer-submit');
const aleartBuy = document.getElementById('add-cart');

// -- Lấy các id của Pagination
const prevButton = document.querySelector('.product-pagination-prev');
const nextButton = document.querySelector('.product-pagination-next');
const pageButtons = document.querySelectorAll('.product-pagination a');
const productContent = document.getElementById('product-content');

// Biến lưu trang hiện tại
let currentPage = 1;
// Biến để lưu tổng số trang
let totalPages = 0; 

// -- Hàm hiển thị thông báo
aleartBuy.addEventListener('click', function(){
  showNotification("Đã Thêm Vào Giỏ Hàng!");
});

alertEmail.addEventListener('click', function(){
  showNotification("Đã gửi!");
});



// Hàm cập nhật nội dung sản phẩm dựa trên trang hiện tại
// -- Nhúng FETCH API XỬ LÍ SẢN PHẨM
function updateProductContent(page) {
  fetch('http://localhost:3000/api/products') 
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Chuyển đổi dữ liệu nhận được thành JSON
    })
    .then(data => {
      updateProductList(data.products); // Giả sử bạn nhận dữ liệu sản phẩm từ API
      totalPages = data.totalPages; // Giả sử API trả về tổng số trang
      currentPage = page; // Cập nhật trang hiện tại

       // Gọi hàm để cập nhật trạng thái các nút phân trang
      updatePaginationButtons();
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
}

// Hàm Lấy dữ liệu từ APi
function updateProductList(products) {
  const productList = document.getElementById('product-list');
  
  // Xóa nội dung cũ nếu có
  productList.innerHTML = ``;

  // Duyệt qua từng sản phẩm và tạo HTML tương ứng
  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    productCard.innerHTML = `
      <div class="productlist-container" id="product-content">
                  <div class="product-client-title">
                    <p><a href="">Trang chủ</a> &nbsp;&nbsp;/&nbsp;&nbsp; ${title} </p>
                  </div>
                
                  <div class="product-client-menu">
                    <div class="product-client-name">
                      <div class="product-client-menu1">${title} &nbsp;&nbsp; </div>
                      <div class="product-client-menu2"> &nbsp;&nbsp;${stock} sản phẩm</div>
                    </div>
                    <div class="dropdown">
                      <button class="dropdown-btn"><i class="fa-solid fa-arrow-down-a-z" id="dropdown-icon"></i>&nbsp;&nbsp;Sắp xếp <span>&#x25BC;</span></button>
                      <ul class="dropdown-menu">
                          <li class="active">Sản phẩm nổi bật</li>
                          <li>Giá: Tăng dần</li>
                          <li>Giá: Giảm dần</li>
                          <li>Tên: A-Z</li>
                          <li>Tên: Z-A</li>
                          <li>Cũ nhất</li>
                          <li>Mới nhất</li>
                          <li>Bán chạy nhất</li>
                          <li>Tồn kho giảm dần</li>
                      </ul>
                  </div>
                  </div>
                
                <div class="product-list" id="product-list">
                  <div class="product-card">
                
                    <a href="" class="img-card">
                      <img src="${product.image1}" alt="" class="img-card1">
                      <img src="${product.image2}" alt="" class="img-card2">
                      <div href="#" class="eye-icon"><i class="fa-regular fa-eye"></i></div>
                    </a>
                    <div class="sales-info">Đã bán ${product.sold}</div>
                    <div class="sales-bar">
                        <div class="filled" style="width: ${product.salesPercentage}%"></div>
                    </div>
                    <div class="productlist-des"> 
                      <a href="" class="a-product-name">
                        <div class="product-name">${product.name}</div>
                      </a>
                
                      <div class="productlist-price">
                        <div class="price-info">${product.price}₫</div>
                        <div class="old-price">${product.oldPrice}₫</div>
                      </div>
                      
                      <div class="product-discount">${product.discount}</div>
                      <span class="product-btn-buy">
                        <a href="#" class="add-to-cart" id="add-cart">THÊM VÀO GIỎ</a>
                        <a href="" class="add-to-cart2"><i class="fa-brands fa-shopify"></i></a>
                      </span>
                    </div>
                
                  </div>
                </div>
    `;
    productList.appendChild(productCard);
  });
}

function updatePaginationButtons() {
  const prevButton = document.getElementById('prev-button');
  const nextButton = document.getElementById('next-button');

  // Ẩn hoặc hiện nút "previous"
  if (currentPage === 1) {
    prevButton.style.display = 'none'; // Ẩn nút "previous" khi ở trang 1
  } else {
    prevButton.style.display = 'inline'; // Hiện nút "previous" khi không ở trang 1
  }
  // Ẩn hoặc hiện nút "next"
  if (currentPage >= totalPages) {
    nextButton.style.display = 'none'; // Ẩn nút "next" khi ở trang cuối
  } else {
    nextButton.style.display = 'inline'; // Hiện nút "next" khi không ở trang cuối
}
  
}

// Lắng nghe sự kiện click cho các nút phân trang
document.addEventListener('DOMContentLoaded', () => {
  updateProductContent(1); // Gọi hàm với trang đầu tiên

  const paginationButtons = document.querySelectorAll('.product-pagination a');

  paginationButtons.forEach((button, index) => {
    button.addEventListener('click', (event) => {
      event.preventDefault(); // Ngăn chặn hành vi mặc định của thẻ a
      if (button.classList.contains('product-pagination-prev')) {
        updateProductContent(currentPage - 1); // Giảm trang
      } else if (button.classList.contains('product-pagination-next')) {
        updateProductContent(currentPage + 1); // Tăng trang
      } else {
        updateProductContent(index + 1); // Gọi hàm với trang tương ứng
      }
    });
  });
});



// Lắng nghe sự kiện click cho các lựa chọn menu
document.addEventListener('DOMContentLoaded', () => {
  const dropdownMenu = document.querySelector('.dropdown-menu');
  const dropdownItems = dropdownMenu.querySelectorAll('li');

  // Hiện thị dropdown khi nhấp vào nút
  document.querySelector('.dropdown-btn').addEventListener('click', () => {
      dropdownMenu.classList.toggle('show');
  });

  // Xử lý sự kiện click cho từng mục trong dropdown
  dropdownItems.forEach(item => {
      item.addEventListener('click', (event) => {
          // Xóa lớp active-menu khỏi tất cả các mục
          dropdownItems.forEach(i => i.classList.remove('active-menu'));
          
          // Thêm lớp active-menu cho mục đã chọn
          item.classList.add('active-menu');
          
          // Ẩn dropdown sau khi chọn
          dropdownMenu.classList.remove('show');
      });
  });

  // Ẩn dropdown khi click ra ngoài
  window.addEventListener('click', (event) => {
      if (!event.target.matches('.dropdown-btn')) {
          dropdownMenu.classList.remove('show');
      }
  });
});



// Hàm làm nổi bật nút trang hiện tại
function setActivePage(page) {
  pageButtons.forEach(button => button.classList.remove('active'));
  document.querySelector(`.product-pagination${page}`).classList.add('active');
}

 // Xử lý sự kiện khi nhấn vào các nút phân trang
pageButtons.forEach(button => {
  button.addEventListener('click', function(e) {
    e.preventDefault();  // Ngăn không cho trang tải lại
    const pageNumber = parseInt(this.textContent);
    currentPage = pageNumber;
    updateProductContent(pageNumber);
    setActivePage(pageNumber);
  });
});

// Xử lý sự kiện khi nhấn vào nút "Prev" và "Next"
prevButton.addEventListener('click', function(e) {
  e.preventDefault();
  if (currentPage > 1) {
    currentPage--;
    updateProductContent(currentPage);
    setActivePage(currentPage);
  }
});
nextButton.addEventListener('click', function(e) {
  e.preventDefault();
  if (currentPage < 3) {  // Giả định có 3 trang
    currentPage++;
    updateProductContent(currentPage);
    setActivePage(currentPage);
  }
});




