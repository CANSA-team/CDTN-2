

/**
 * Silder
 */
export interface SliderModel {
    slider_id: number;
    slider_image: string;
}

/**
 * Product
 */
export interface ProductModel {
    product_id: number;
    product_date: Date;
    shop_id: number;
    product_avatar: string;
    product_quantity: number;
    product_view: number;
    product_price: number;
    product_sale: number;
    product_title: string;
    product_image: [string];
    product_description: string;
    product_rating: number;
    last_update: number;
    status: number;
}
//Product State
export interface ProductState {
    productNew: ProductModel[];
    productHot: ProductModel[];
    productCategory: ProductModel[];
    productSearch: ProductModel[];
    productShop: ProductModel[];
    product: ProductModel;
    error: string | undefined;
}

/**
 * User
 */
export interface UserModel {
    user_id: number;
    user_phone: string;
    user_email: string;
    user_key: null;
    user_name: string;
    user_avatar: string;
    user_status: number;
    user_last_update: number;
    user_real_name: string;
    user_birthday: Date;
    user_avatar_image: string;
}

/**
 * Comment
 */
export interface CommentModel {
    comment_id: number;
    comment_rating: number;
    comment_date: Date;
    comment_content: string;
    product_id: number;
    user: UserModel;
}

/**
 * Category
 */
export interface CategoryModel {
    category_id: number;
    category_image: string;
    category_view: number;
    category_name: string;
    last_update: number;
    status: number;
    categories: [CategoryModel];
}

/**
 * Shop
 */
export interface ShopModel {
    shop_id: number;
    shop_name: string;
    shop_description: string;
    shop_owner: number;
    shop_avatar: string;
    last_update: number;
    status: number;
}

/**
 * Cart Item
 */
export interface CartItemModel {
    qty: number;
    product: ProductModel;
}

/**
 * Cart
 */
export interface CartModel {
    cart: CartItemModel[];
    sub_price: number;
    ship: number;
    total_price: number;
}
export interface CartState {
    cart: CartModel;
    status: string | undefined;
    error: string | undefined;
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

export interface OderModel {
    oder_id: number;
    oder_address: string;
    oder_phone: string;
    oder_date: Date;
    oder_customer: number;
    product_oder: OderItemModel[];
    status: number;
}



export interface OderState {
    status: string | undefined;
    oderList: OderModel[];
    oder: OderModel;
    error: string | undefined;
}

export interface CategoryState {
    categories: CategoryModel[];
    error: string | undefined;
}

export interface SliderState {
    slider: SliderModel[];
    error: string | undefined;
}

export interface CommentState {
    comment: CommentModel[];
    error: string | undefined;
}

export interface ShopState {
    info: ShopModel;
    error: string | undefined;
}

export interface AccessState {
    message: any;
    error: string | undefined;
}

export interface userModel {
    user_id: number,
    user_name: string,
    user_avatar: string,
    user_phone: string,
    user_profile_name: string,
    user_email: string,

}

export interface UserStage {
    check: boolean;
    checkFogotPassword: boolean;
    userInfor: UserModel;
    status: string;
    updateUser: number;
    error: string | undefined;
}

export interface ComplaintStage {
    status: string | undefined;
    error: string | undefined;
}


export interface ImageStage {
    image: string | undefined;
    error: string | undefined;
}
export interface ChatStage {
    isChat: boolean | undefined;
}

export interface ImageId {
    id: number;
}