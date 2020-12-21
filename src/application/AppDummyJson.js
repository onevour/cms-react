import moment from "moment";

export function dummyData(count = 1) {
    let tmp = {
        id: 1,
        item: "Phone",
        item_total: 1,
        price: 1900,
        order_date: null
    }
    let tmpArray = []
    for (let i = 0; i < count; i++) {
        let copy = Object.assign({}, tmp)
        copy.id = (i + 1)
        copy.item_total = (i + 1)
        copy.order_date = moment()
        tmpArray.push(copy)
    }
    return tmpArray

}