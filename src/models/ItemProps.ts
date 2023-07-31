interface ItemProps {
    id: number,
    type: string,
    title: string|null,
    sub_title: string|null, // Exhibition Type
    brand_name: string|null, // Brand Type
    price: string|null, // Poduct Type
    discountPercentage: number|null, // Poduct Type
    image_url: string|null, // Brand 제외 모든 Type
    brand_image_url: string|null, // Brand Type
    follower: number|null // Brand Type
}

export default ItemProps

