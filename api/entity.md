🔹 Users

User → Cart : User@OneToMany, Cart@ManyToOne

User → Order : User@OneToMany, Order@ManyToOne

User → Post : User@OneToMany, Post@ManyToOne

User → Comment : User@OneToMany, Comment@ManyToOne

User → Email (sender) : User@OneToMany, Email@ManyToOne

User → Email (receiver) : User@OneToMany, Email@ManyToOne

User → Chat (sender) : User@OneToMany, Chat@ManyToOne

User → Chat (receiver) : User@OneToMany, Chat@ManyToOne

🔹 Categories

Category → Product : Category@OneToMany, Product@ManyToOne

🔹 Products

Product → Category : Product@ManyToOne, Category@OneToMany

Product → ProductAttribute : Product@OneToMany, ProductAttribute@ManyToOne

Product → ProductVariant : Product@OneToMany, ProductVariant@ManyToOne

🔹 Product_Attributes

ProductAttribute → Product : ProductAttribute@ManyToOne, Product@OneToMany

ProductAttribute → ProductAttributeValue : ProductAttribute@OneToMany, ProductAttributeValue@ManyToOne

🔹 Product_Attribute_Values

ProductAttributeValue → ProductAttribute : ProductAttributeValue@ManyToOne, ProductAttribute@OneToMany

ProductAttributeValue → ProductVariantValue : ProductAttributeValue@OneToMany, ProductVariantValue@ManyToOne

🔹 Product_Variants

ProductVariant → Product : ProductVariant@ManyToOne, Product@OneToMany

ProductVariant → ProductVariantValue : ProductVariant@OneToMany, ProductVariantValue@ManyToOne

ProductVariant → CartItem : ProductVariant@OneToMany, CartItem@ManyToOne

ProductVariant → OrderItem : ProductVariant@OneToMany, OrderItem@ManyToOne

🔹 Product_Variant_Values

ProductVariantValue → ProductVariant : ProductVariantValue@ManyToOne, ProductVariant@OneToMany

ProductVariantValue → ProductAttributeValue : ProductVariantValue@ManyToOne, ProductAttributeValue@OneToMany

🔹 Carts

Cart → User : Cart@ManyToOne, User@OneToMany

Cart → CartItem : Cart@OneToMany, CartItem@ManyToOne

🔹 Cart_Items

CartItem → Cart : CartItem@ManyToOne, Cart@OneToMany

CartItem → ProductVariant : CartItem@ManyToOne, ProductVariant@OneToMany

🔹 Orders

Order → User : Order@ManyToOne, User@OneToMany

Order → OrderItem : Order@OneToMany, OrderItem@ManyToOne

🔹 Order_Items

OrderItem → Order : OrderItem@ManyToOne, Order@OneToMany

OrderItem → ProductVariant : OrderItem@ManyToOne, ProductVariant@OneToMany

🔹 Posts

Post → User (author) : Post@ManyToOne, User@OneToMany

Post → Comment : Post@OneToMany, Comment@ManyToOne

🔹 Comments

Comment → Post : Comment@ManyToOne, Post@OneToMany

Comment → User : Comment@ManyToOne, User@OneToMany

Comment → Comment (self-relation) : Comment@ManyToOne (parent), Comment@OneToMany (replies)

🔹 Banners

Không có quan hệ trực tiếp

🔹 Emails

Email → User (sender) : Email@ManyToOne, User@OneToMany

Email → User (receiver) : Email@ManyToOne, User@OneToMany

🔹 Chats

Chat → User (sender) : Chat@ManyToOne, User@OneToMany

Chat → User (receiver) : Chat@ManyToOne, User@OneToMany
