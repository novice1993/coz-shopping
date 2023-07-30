import { toast } from "react-toastify"

const alertToastMessage = (bookmark: boolean) => {

    if(bookmark) {
        toast("상품이 추가되었습니다.")
    } else {
        toast("상품이 제거되었습니다.")
    }
}

export default alertToastMessage;