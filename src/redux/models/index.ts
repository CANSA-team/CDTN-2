/**
 * Image
 */
export interface ImagesModel {
    uri: string;
}

/**
 * Silder
 */
export interface SliderModel {
    slider_id: number,
    slider_image: ImagesModel
}

/**
 * Product
 */
export interface ProductModel {
    product_id: number,
    product_date: Date,
    shop_id: number,
    product_avatar: ImagesModel,
    product_quantity: any,
    product_view: number,
    product_price: number,
    product_sale: number,
    product_title: string,
    product_image: [ImagesModel],
    product_description: string,
    last_update: number,
    status: number,
}
//Product State
export interface ProductState{
    products: [ProductModel];
    error: string | undefined;
}

/**
 * User
 */
export interface UserModel {
    user_id: number,
    user_key: null,
    user_name: string,
    user_avatar: ImagesModel,
    user_status: number,
    user_last_update: number
}

/**
 * Comment
 */
export interface CommentModel {
    comment_id: number,
    comment_rating: number,
    comment_date: Date,
    comment_content: string,
    product_id: number,
    user: UserModel,
}

/**
 * Category
 */
export interface CategoryModel {
    category_id: number,
    category_image: ImagesModel,
    category_view: number,
    category_name: string,
    last_update: number,
    status: number,
    categories: [CategoryModel],
}

/**
 * Shop
 */
export interface ShopModel {
    shop_id: number,
    shop_name: string,
    shop_description: string,
    shop_owner: number,
    shop_avatar: ImagesModel,
    last_update: number,
    status: number,
}

/**
 * Cart Item
 */
export interface CartItemModel {
    qty: number,
    product: ProductModel,
}

/**
 * Cart
 */
export interface CartModel{
    cart:[CartItemModel],
    price: number,
}

/**
 * Oder Item
 */
export interface OderItemModel {
    oder_id: string,
    product_quantity: number,
    status: number,
    product: ProductModel,
}

/**
 * Oder
*/
export interface OderModel{
    oder_id: string,
    oder_address: string,
    oder_phone: string,
    oder_date: Date,
    oder_customer: number,
    status: number,
}