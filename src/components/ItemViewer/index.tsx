import { useState } from "react";
import useManageBookmarkList from "../../hooks/useManageBookmarkList";
import ItemProps from "../../models/ItemProps";

import Modal from "../Modal";
import ItemInfoBox from "./ItemInfoBox";

interface OwnProps {
    item: ItemProps
}

function ItemViewer ({ item }: OwnProps) {

    const { bookmark, bookmarkStateChange } = useManageBookmarkList(item);
    const [ modalState, setModalState ] = useState(false);

    const modalStateChange = () => {
        setModalState(!modalState);
    }

    if(modalState === true) {

        return (
            <Modal
            item={item} 
            bookmark={bookmark}
            bookmarkStateChange={bookmarkStateChange}
            modalStateChange={modalStateChange}
            />)
            
    }

    else {

        return (
            <ItemInfoBox
            item={item}
            bookmark={bookmark}
            bookmarkStateChange={bookmarkStateChange}
            modalStateChange={modalStateChange}
            />)
    }

}

export default ItemViewer;