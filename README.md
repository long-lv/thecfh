# thecfh api
🔑 Auth

POST /auth/register → đăng ký user

POST /auth/login → đăng nhập

POST /auth/refresh → lấy access token mới

👤 Users

GET /users/me → thông tin profile user hiện tại

GET /users → list user (admin/seller)

PATCH /users/:id → update user (admin)

DELETE /users/:id → xoá user (admin)

📂 Categories

GET /categories → list danh mục

POST /categories → tạo danh mục (admin/seller)

GET /categories/:id → chi tiết danh mục

PATCH /categories/:id → update danh mục

DELETE /categories/:id → xoá danh mục

📦 Products (+ Attributes/Variants)

GET /products → list sản phẩm (filter theo category, search, phân trang)

POST /products → tạo sản phẩm (admin/seller)

GET /products/:id → chi tiết sản phẩm (kèm thuộc tính + variants)

PATCH /products/:id → update sản phẩm

DELETE /products/:id → xoá sản phẩm

Attributes

POST /products/:id/attributes → thêm thuộc tính (VD: Size, Color)

PATCH /products/:id/attributes/:attrId → sửa thuộc tính

DELETE /products/:id/attributes/:attrId → xoá thuộc tính

Variants

POST /products/:id/variants → thêm variants (VD: Size M, Color Red)

PATCH /products/:id/variants/:variantId → update variant

DELETE /products/:id/variants/:variantId → xoá variant

🛒 Cart

POST /cart → tạo giỏ hàng guest hoặc attach cart user

GET /cart → lấy giỏ hàng hiện tại (user login hoặc guest cartId)

POST /cart/items → thêm sản phẩm vào giỏ

PATCH /cart/items/:itemId → update số lượng

DELETE /cart/items/:itemId → xoá item khỏi giỏ

POST /cart/merge → merge giỏ guest vào user sau khi login

📑 Orders

POST /orders → tạo đơn từ giỏ hàng

GET /orders → list đơn của user (hoặc toàn bộ cho admin)

GET /orders/:id → chi tiết đơn

PATCH /orders/:id → update trạng thái đơn (admin/seller)

📰 Posts & Comments

GET /posts → list bài viết

POST /posts → tạo bài viết (admin/seller)

GET /posts/:id → chi tiết bài viết

PATCH /posts/:id → update bài viết

DELETE /posts/:id → xoá bài viết

Comments

GET /posts/:id/comments → list comment của bài viết (nested theo parent_id)

POST /posts/:id/comments → thêm comment

PATCH /comments/:id → sửa comment

DELETE /comments/:id → xoá comment

🖼️ Banners

GET /banners → list banner

POST /banners → tạo banner (admin)

PATCH /banners/:id → update banner

DELETE /banners/:id → xoá banner

📧 Emails

POST /emails → admin/seller gửi email cho user

GET /emails/sent → list email đã gửi (admin/seller)

POST /emails/contact → user gửi email khiếu nại → admin nhận

💬 Chats (Realtime REST base + WS sau)

GET /chats/:peerId/messages → list message với 1 user/seller/admin

POST /chats/:peerId/messages → gửi message