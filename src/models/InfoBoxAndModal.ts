import ItemProps from "./ItemProps"

interface InfoBoxAndModal {
    item: ItemProps,
    bookmark: boolean,
    bookmarkStateChange: (state: boolean) => void,
    modalStateChange: (state: boolean) => void
}

export default InfoBoxAndModal;