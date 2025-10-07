# Tài liệu Hệ thống Product Variants

## 📊 Tổng quan Kiến trúc

Hệ thống quản lý sản phẩm với biến thể (Product Variants) được thiết kế theo mô hình 3 tầng:

```
┌─────────────────────────────────────────────────────────────┐
│                    MASTER DATA (Định nghĩa)                  │
├─────────────────────────────────────────────────────────────┤
│ Attribute (Color, Size, Material)                           │
│    └─> AttributeValue (Red, Blue, S, M, L, XL)             │
└─────────────────────────────────────────────────────────────┘
                           ↓ Áp dụng cho
┌─────────────────────────────────────────────────────────────┐
│                    PRODUCT LEVEL (Sản phẩm)                  │
├─────────────────────────────────────────────────────────────┤
│ Product (Áo thun nam)                                        │
│    └─> ProductAttribute (Sản phẩm này có Color, Size)      │
│         └─> ProductAttributeValue (Red, Blue, S, M, L)     │
└─────────────────────────────────────────────────────────────┘
                           ↓ Tạo ra
┌─────────────────────────────────────────────────────────────┐
│                   VARIANT LEVEL (Biến thể)                   │
├─────────────────────────────────────────────────────────────┤
│ ProductVariant (SKU cụ thể: áo màu đỏ size M)              │
│    └─> ProductVariantsValue (Red + M)                      │
└─────────────────────────────────────────────────────────────┘
```

---

## 🗂️ Cấu trúc Database

### 1. **Attribute** - Thuộc tính chung
**Bảng:** `attributes`

| Cột | Kiểu | Mô tả |
|-----|------|-------|
| id | UUID | Primary key |
| name | string | Tên thuộc tính (Color, Size, Material...) |
| createdAt | timestamp | |
| updatedAt | timestamp | |

**Ví dụ:**
```json
[
  { "id": "1", "name": "Color" },
  { "id": "2", "name": "Size" },
  { "id": "3", "name": "Material" }
]
```

---

### 2. **AttributeValue** - Giá trị thuộc tính
**Bảng:** `attributeValues`

| Cột | Kiểu | Mô tả |
|-----|------|-------|
| id | UUID | Primary key |
| attributeId | number | Foreign key → `attributes.id` |
| value | string | Giá trị cụ thể (Red, Blue, M, L...) |
| createdAt | timestamp | |
| updatedAt | timestamp | |

**Relationship:** `Attribute (1) ──< AttributeValue (N)`

**Ví dụ:**
```json
[
  { "id": "1", "attributeId": 1, "value": "Red" },
  { "id": "2", "attributeId": 1, "value": "Blue" },
  { "id": "3", "attributeId": 1, "value": "Green" },
  { "id": "4", "attributeId": 2, "value": "S" },
  { "id": "5", "attributeId": 2, "value": "M" },
  { "id": "6", "attributeId": 2, "value": "L" },
  { "id": "7", "attributeId": 2, "value": "XL" }
]
```

---

### 3. **Product** - Sản phẩm
**Bảng:** `products`

| Cột | Kiểu | Mô tả |
|-----|------|-------|
| id | UUID | Primary key |
| name | string | Tên sản phẩm |
| description | text | Mô tả |
| price | string | Giá cơ bản |
| imgUrl | string | Ảnh sản phẩm |
| categoryId | number | Foreign key → `categories.id` |
| createdAt | timestamp | |
| updatedAt | timestamp | |

---

### 4. **ProductAttribute** - Thuộc tính của sản phẩm
**Bảng:** `productAttributes`

| Cột | Kiểu | Mô tả |
|-----|------|-------|
| id | UUID | Primary key |
| productId | number | Foreign key → `products.id` |
| attributeId | number | Foreign key → `attributes.id` |
| createdAt | timestamp | |
| updatedAt | timestamp | |

**Relationship:** `Product (1) ──< ProductAttribute (N) ──> Attribute (1)`

**Mục đích:** Khai báo sản phẩm này **CÓ** thuộc tính nào (Color, Size...)

**Ví dụ:**
```json
// Product "Áo thun nam" (id=1) có 2 thuộc tính: Color và Size
[
  { "id": "1", "productId": 1, "attributeId": 1 }, // Có Color
  { "id": "2", "productId": 1, "attributeId": 2 }  // Có Size
]
```

---

### 5. **ProductAttributeValue** - Giá trị thuộc tính của sản phẩm
**Bảng:** `productAttributeValues`

| Cột | Kiểu | Mô tả |
|-----|------|-------|
| id | UUID | Primary key |
| productAttributeId | number | Foreign key → `productAttributes.id` |
| attributeValueId | number | Foreign key → `attributeValues.id` |
| createdAt | timestamp | |
| updatedAt | timestamp | |

**Relationship:** `ProductAttribute (1) ──< ProductAttributeValue (N) ──> AttributeValue (1)`

**Mục đích:** Xác định **giá trị cụ thể** của thuộc tính cho sản phẩm này

**Ví dụ:**
```json
// Áo thun chỉ có màu Red, Blue (không có Green)
// Áo thun chỉ có size M, L (không có S, XL)
[
  { "id": "1", "productAttributeId": 1, "attributeValueId": 1 }, // Color: Red
  { "id": "2", "productAttributeId": 1, "attributeValueId": 2 }, // Color: Blue
  { "id": "3", "productAttributeId": 2, "attributeValueId": 5 }, // Size: M
  { "id": "4", "productAttributeId": 2, "attributeValueId": 6 }  // Size: L
]
```

---

### 6. **ProductVariant** - Biến thể sản phẩm (SKU)
**Bảng:** `productVariants`

| Cột | Kiểu | Mô tả |
|-----|------|-------|
| id | UUID | Primary key |
| productId | number | Foreign key → `products.id` |
| sku | string | Mã SKU duy nhất |
| price | number | Giá của biến thể này |
| stock | number | Tồn kho |
| createdAt | timestamp | |
| updatedAt | timestamp | |

**Relationship:** `Product (1) ──< ProductVariant (N)`

**Mục đích:** Mỗi variant là 1 SKU độc lập với giá và tồn kho riêng

**Ví dụ:**
```json
[
  {
    "id": "1",
    "productId": 1,
    "sku": "SHIRT-RED-M",
    "price": 100000,
    "stock": 50
  },
  {
    "id": "2",
    "productId": 1,
    "sku": "SHIRT-RED-L",
    "price": 100000,
    "stock": 30
  },
  {
    "id": "3",
    "productId": 1,
    "sku": "SHIRT-BLUE-M",
    "price": 110000,
    "stock": 20
  },
  {
    "id": "4",
    "productId": 1,
    "sku": "SHIRT-BLUE-L",
    "price": 110000,
    "stock": 15
  }
]
```

---

### 7. **ProductVariantsValue** - Tổ hợp giá trị của variant
**Bảng:** `productVariantsValues`

| Cột | Kiểu | Mô tả |
|-----|------|-------|
| id | UUID | Primary key |
| variantId | number | Foreign key → `productVariants.id` |
| attributeValueId | number | Foreign key → `productAttributeValues.id` |
| createdAt | timestamp | |
| updatedAt | timestamp | |

**Relationship:** `ProductVariant (1) ──< ProductVariantsValue (N) ──> ProductAttributeValue (1)`

**Mục đích:** Xác định variant này có tổ hợp giá trị nào (Red + M, Blue + L...)

**Ví dụ:**
```json
// Variant "SHIRT-RED-M" = Red + M
[
  { "id": "1", "variantId": 1, "attributeValueId": 1 }, // Red
  { "id": "2", "variantId": 1, "attributeValueId": 3 }  // M
]

// Variant "SHIRT-BLUE-L" = Blue + L
[
  { "id": "3", "variantId": 4, "attributeValueId": 2 }, // Blue
  { "id": "4", "variantId": 4, "attributeValueId": 4 }  // L
]
```

---

## 🔄 Luồng hoạt động chi tiết

### **Bước 1: Thiết lập Master Data (Làm 1 lần)**

#### 1.1. Tạo Attributes
```http
POST /api/attributes/create
{
  "name": "Color"
}

POST /api/attributes/create
{
  "name": "Size"
}
```

#### 1.2. Tạo AttributeValues
```http
POST /api/attribute-value/create
{
  "attributeId": 1,
  "value": "Red"
}

POST /api/attribute-value/create
{
  "attributeId": 1,
  "value": "Blue"
}

POST /api/attribute-value/create
{
  "attributeId": 2,
  "value": "M"
}

POST /api/attribute-value/create
{
  "attributeId": 2,
  "value": "L"
}
```

**Kết quả:**
```
Attribute: Color
  └─> Red, Blue, Green

Attribute: Size
  └─> S, M, L, XL
```

---

### **Bước 2: Tạo Product và áp dụng Attributes**

#### 2.1. Tạo Product
```http
POST /api/products/create
{
  "name": "Áo thun nam",
  "description": "Áo thun cotton cao cấp",
  "price": "100000",
  "categoryId": 1
}
```

#### 2.2. Khai báo Product có Attributes nào
```http
POST /api/product-attributes/create
{
  "productId": 1,
  "attributeId": 1  // Product này có Color
}

POST /api/product-attributes/create
{
  "productId": 1,
  "attributeId": 2  // Product này có Size
}
```

#### 2.3. Chọn giá trị cụ thể cho từng Attribute
```http
POST /api/product-attribute-values/create
{
  "productAttributeId": 1,  // Color của product này
  "attributeValueId": 1      // Có màu Red
}

POST /api/product-attribute-values/create
{
  "productAttributeId": 1,
  "attributeValueId": 2      // Có màu Blue
}

POST /api/product-attribute-values/create
{
  "productAttributeId": 2,  // Size của product này
  "attributeValueId": 5      // Có size M
}

POST /api/product-attribute-values/create
{
  "productAttributeId": 2,
  "attributeValueId": 6      // Có size L
}
```

**Kết quả:**
```
Product: Áo thun nam
  ├─> Color: Red, Blue (chỉ 2 màu, không có Green)
  └─> Size: M, L (chỉ 2 size, không có S, XL)
```

---

### **Bước 3: Tạo Product Variants (SKU)**

#### 3.1. Tạo các Variants
Với 2 màu × 2 size = **4 variants**

```http
POST /api/product-variants/create
{
  "productId": 1,
  "sku": "SHIRT-RED-M",
  "price": 100000,
  "stock": 50
}

POST /api/product-variants/create
{
  "productId": 1,
  "sku": "SHIRT-RED-L",
  "price": 100000,
  "stock": 30
}

POST /api/product-variants/create
{
  "productId": 1,
  "sku": "SHIRT-BLUE-M",
  "price": 110000,
  "stock": 20
}

POST /api/product-variants/create
{
  "productId": 1,
  "sku": "SHIRT-BLUE-L",
  "price": 110000,
  "stock": 15
}
```

#### 3.2. Gán giá trị cho từng Variant

**Variant 1: SHIRT-RED-M (Red + M)**
```http
POST /api/product-variants-value/create
{
  "variantId": 1,
  "attributeValueId": 1  // Red từ ProductAttributeValue
}

POST /api/product-variants-value/create
{
  "variantId": 1,
  "attributeValueId": 3  // M từ ProductAttributeValue
}
```

**Variant 2: SHIRT-RED-L (Red + L)**
```http
POST /api/product-variants-value/create
{
  "variantId": 2,
  "attributeValueId": 1  // Red
}

POST /api/product-variants-value/create
{
  "variantId": 2,
  "attributeValueId": 4  // L
}
```

**Tương tự cho các variants còn lại...**

---

## 📈 Sơ đồ quan hệ đầy đủ

```
┌──────────────┐
│  Attribute   │
│  - id        │
│  - name      │
└──────┬───────┘
       │ 1:N
       ↓
┌──────────────────┐
│ AttributeValue   │
│  - id            │
│  - attributeId   │◄────────┐
│  - value         │         │
└──────────────────┘         │
                             │
                             │ reference
┌──────────────┐             │
│   Product    │             │
│  - id        │             │
│  - name      │             │
└──────┬───────┘             │
       │ 1:N                 │
       ↓                     │
┌─────────────────────┐      │
│ ProductAttribute    │      │
│  - id               │      │
│  - productId        │      │
│  - attributeId      │──────┘
└──────┬──────────────┘
       │ 1:N
       ↓
┌────────────────────────────┐
│ ProductAttributeValue      │
│  - id                      │
│  - productAttributeId      │
│  - attributeValueId        │◄────────┐
└────────────────────────────┘         │
                                       │
                                       │ reference
┌──────────────┐                       │
│   Product    │                       │
│  - id        │                       │
└──────┬───────┘                       │
       │ 1:N                           │
       ↓                               │
┌─────────────────────┐                │
│  ProductVariant     │                │
│  - id               │                │
│  - productId        │                │
│  - sku              │                │
│  - price            │                │
│  - stock            │                │
└──────┬──────────────┘                │
       │ 1:N                           │
       ↓                               │
┌─────────────────────────┐            │
│ ProductVariantsValue    │            │
│  - id                   │            │
│  - variantId            │            │
│  - attributeValueId     │────────────┘
└─────────────────────────┘
```

---

## 🎯 Use Cases thực tế

### Use Case 1: Hiển thị options trên trang sản phẩm

**Request:**
```http
GET /api/products/1
```

**Response:**
```json
{
  "product": {
    "id": "1",
    "name": "Áo thun nam",
    "price": "100000",
    "attributes": [
      {
        "name": "Color",
        "values": ["Red", "Blue"]
      },
      {
        "name": "Size",
        "values": ["M", "L"]
      }
    ]
  }
}
```

**Frontend hiển thị:**
```
Màu sắc: ◉ Red  ◯ Blue
Kích cỡ:  ◉ M    ◯ L
```

---

### Use Case 2: Tìm variant khi user chọn options

**Khi user chọn: Red + M**

**Request:**
```http
GET /api/product-variants?productId=1&color=Red&size=M
```

**Response:**
```json
{
  "variant": {
    "id": "1",
    "sku": "SHIRT-RED-M",
    "price": 100000,
    "stock": 50,
    "available": true
  }
}
```

---

### Use Case 3: Thêm vào giỏ hàng

**Request:**
```http
POST /api/cart/add
{
  "variantId": "1",  // SHIRT-RED-M
  "quantity": 2
}
```

**Backend:**
- Check `stock >= quantity`
- Lưu vào CartItem với `variantId`
- Mỗi variant là 1 item riêng trong giỏ

---

## 💡 Lợi ích của kiến trúc

### ✅ **Tái sử dụng (Reusability)**
- Attributes định nghĩa 1 lần, dùng cho nhiều products
- Không cần tạo lại "Color", "Size" cho mỗi sản phẩm

### ✅ **Linh hoạt (Flexibility)**
- Mỗi product chỉ chọn attributes cần thiết
- Product A có Color + Size
- Product B có Material + Weight
- Product C có Color + Size + Material

### ✅ **Quản lý tồn kho (Inventory Management)**
- Mỗi variant có stock độc lập
- Dễ dàng tracking từng SKU
- Báo cáo chính xác

### ✅ **Định giá linh hoạt (Flexible Pricing)**
- Variant có thể có giá khác nhau
- VD: Áo màu đặc biệt có thể đắt hơn

### ✅ **Mở rộng (Scalability)**
- Dễ dàng thêm attributes mới
- Thêm Material, Style, Pattern...
- Không ảnh hưởng cấu trúc hiện tại

### ✅ **Performance**
- Query nhanh với eager loading
- Index trên các foreign keys
- Giảm JOIN không cần thiết

---

## 🔒 Validation Rules

### 1. **Attribute Level**
- Tên attribute phải unique
- Không xóa attribute đang được sử dụng

### 2. **ProductAttribute Level**
- Không duplicate attribute cho cùng 1 product
- VD: Product không thể có 2 lần "Color"

### 3. **ProductAttributeValue Level**
- AttributeValue phải thuộc đúng Attribute
- VD: Không thể gán "Red" cho attribute "Size"

### 4. **ProductVariant Level**
- SKU phải unique
- Price và stock phải > 0
- Mỗi tổ hợp giá trị chỉ có 1 variant
- VD: Không thể có 2 variant "Red + M"

---

## 📝 Checklist khi triển khai

### Phase 1: Master Data
- [ ] Tạo tất cả Attributes cần thiết
- [ ] Tạo tất cả AttributeValues
- [ ] Test CRUD operations

### Phase 2: Product Setup
- [ ] Tạo Product
- [ ] Gán ProductAttributes
- [ ] Chọn ProductAttributeValues
- [ ] Validate không có giá trị trùng

### Phase 3: Variants Creation
- [ ] Generate tất cả tổ hợp có thể
- [ ] Tạo ProductVariants với SKU unique
- [ ] Gán ProductVariantsValues
- [ ] Cập nhật giá và tồn kho

### Phase 4: Testing
- [ ] Test hiển thị options
- [ ] Test tìm variant theo options
- [ ] Test add to cart
- [ ] Test order với variants
- [ ] Test inventory management

---

## 🚀 Best Practices

### 1. **Naming Conventions**
```typescript
// Attributes: Singular, PascalCase
"Color", "Size", "Material"

// AttributeValues: Descriptive
"Red", "Navy Blue", "Extra Large"

// SKU: Consistent format
"PRODUCT-ATTR1-ATTR2"
"SHIRT-RED-M", "SHOE-BLACK-42"
```

### 2. **Eager Loading**
```typescript
// Sử dụng eager: true cho relations thường xuyên query
@ManyToOne(() => AttributeValue, { eager: true })
attributeValue: AttributeValue;
```

### 3. **Cascade Operations**
```typescript
// Xóa Product → xóa tất cả ProductAttributes
onDelete: 'CASCADE'

// Xóa ProductAttribute → xóa ProductAttributeValues
cascade: true
```

### 4. **Indexing**
```typescript
// Index trên các foreign keys
@Index(['productId'])
@Index(['attributeId'])
@Index(['variantId'])
```

---

## 📚 References

- [TypeORM Relations](https://typeorm.io/relations)
- [E-commerce Product Variants Pattern](https://www.shopify.com/partners/blog/product-variants)
- [Database Design for Product Attributes](https://stackoverflow.com/questions/tagged/product-attributes)

---

**Tác giả:** LeLong  
**Ngày cập nhật:** 2025-10-07  
**Version:** 1.0.0

