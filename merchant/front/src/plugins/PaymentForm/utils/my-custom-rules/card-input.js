const validateCardNumber = function (node, group = 'card-number') {
    const value = node.value?.toLowerCase()
    switch (group) {
        case 'card-number':
            return this.$cardFormat.validateCardNumber(value)
        default:
            return false
    }
}


const validateCardCVC = function (node, group = 'card-cvc') {
    console.log(node);
    const value = node.value
    switch (group) {
        case 'card-cvc':
            return this.$cardFormat.validateCardCVC(value)
        default:
            return false
    }
}

const checkCardExpiry = function (node, group = 'card-expiry') {
    const value = node.value?.toLowerCase()
    switch (group) {
        case 'card-expiry':
            return this.$cardFormat.validateCardExpiry(value)
        default:
            return false
    }
}




export {
    validateCardNumber,
    validateCardCVC,
    checkCardExpiry
}