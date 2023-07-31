import ItemProps from "./ItemProps"

interface InfoBoxAndModal {
    item: ItemProps,
    bookmark: boolean,
    bookmarkStateChange: (state: boolean) => void,
    modalStateChange: () => void
}

export default InfoBoxAndModal;