<script setup>
const props = defineProps({
    context: Object,
})

</script>

<template>
    <div class="form-group">
        <label class="little-label">Card number
            <input ref="cardNumber" :oninput="validateCardNumber"
                :class="['form-control', (cardErrors?.cardNumber) ? 'error-payment-card' : '']"
                v-cardformat:formatCardNumber v-model="cardCvc" :data-error="(cardErrors?.cardNumber) ? true : false"
                placeholder="#### #### #### ####" type="tel"></label>
        <div v-if="cardErrors.cardNumber" class="error">
            <small class="error-text-payment">{{ cardErrors.cardNumber }}</small>
        </div>
    </div>
    <div class="expiration">
        <label class="little-label">Expiry</label>
        <input ref="cardExpiry" :class="[(cardErrors?.cardExpiry) ? 'error-payment-card' : '']"
            :oninput="validateCardExpiry" v-cardformat:formatCardExpiry>
        <div class="error" v-if="cardErrors.cardExpiry">
            <small class="error-text-payment">{{ cardErrors.cardExpiry }}</small>
        </div>
    </div>
    <div class="cvc">
        <label class="little-label">Card CVC</label>
        <input ref="cardCvc" :class="[(cardErrors?.cardCvc) ? 'error-payment-card' : '']" :oninput="validateCardCVC"
            v-cardformat:formatCardCVC>
        <div class="error" v-if="cardErrors.cardCvc">
            <small class="error-text-payment">{{ cardErrors.cardCvc }}</small>
        </div>
    </div>
</template>
  
<script >

export default {
    computed: {
        cardBrandClass() {
            return this.getBrandClass(this.cardBrand);
        }
    },
    data() {
        return {
            cardNumber: null,
            cardExpiry: null,
            cardCvc: null,
            cardPostal: null,
            cardErrors: {},
        }
    },
    methods: {
        validateCardNumber: function (e) {
            if (!this.$cardFormat.validateCardNumber(e.target.value)) {
                this.cardErrors.cardNumber = "Invalid credit card.";
            } else {
                this.cardErrors.cardNumber = null;
                this.validate();
            }
        },
        validateCardExpiry: function (e) {
            if (!this.$cardFormat.validateCardExpiry(e.target.value)) {
                this.cardErrors.cardExpiry = "Invalid expiration date.";
            } else {
                this.cardErrors.cardExpiry = null;
                this.validate();
            }
        },
        validateCardCVC: function (e) {
            if (!this.$cardFormat.validateCardCVC(e.target.value)) {
                this.cardErrors.cardCvc = "Invalid CVC.";
            } else {
                this.cardErrors.cardCvc = null;
                this.validate();
            }
        },
        validate: function () {
            // if there is no errors send 
            if (!Object.keys(this.cardErrors).length) {
                props.context.node.input({
                    number: this.$data.cardNumber,
                    cvc: this.$data.cardCvc,
                    expiry: this.$data.cardExpiry,
                })
            }
        },
        reset: function () {
            this.cardErrors = {};
            this.cardNumber = null;
            this.cardExpiry = null;
            this.cardCvc = null;
            this.cardPostal = null;
            this.$refs.cardNumInput.focus();
        },
        prefill: function (ccNum) {
            this.cardNumber = ccNum;
            this.$cardFormat.setCardType({
                currentTarget: this.$refs.cardNumInput,
                value: ccNum
            });
        },
        getBrandClass: function (brand) {
            let icon = '';
            brand = brand || 'unknown';
            let cardBrandToClass = {
                'visa': 'fab fa-cc-visa',
                'mastercard': 'fab fa-cc-mastercard',
                'amex': 'fab fa-cc-amex',
                'discover': 'fab fa-cc-discover',
                'diners': 'fab fa-cc-diners-club',
                'jcb': 'fab fa-cc-jcb',
                'unknown': 'fa fa-credit-card',
            };
            if (cardBrandToClass[brand]) {
                icon = cardBrandToClass[brand];
            };

            return icon;
        }
    },
    watch: {
        // handle auto-focus to next field
        // Note: since CVC can be 3 OR 4 digits we don't watch it
        cardNumber: function (val) {
            if (this.$cardFormat.validateCardNumber(val)) {
                this.$refs.cardExpInput.focus();
            }
        },
        cardExpiry: function (val) {
            if (this.$cardFormat.validateCardExpiry(val)) {
                this.$refs.cardCvcInput.focus();
            }
        },
        inputCreditCard: function (val) {

        },
        cardErrors: function (val) {
            switch (val) {
                case 'cardNumber':
                    this.$refs.cardNumInput.class = 'error-payment-card';
                    this.cardErrors.cardCvc = "Invalid CVC.";
                    break;
                case 'cardExpiry':
                    this.$refs.cardExpInput.focus();
                    break;
                case 'cardCvc':
                    this.$refs.cardCvcInput.focus();
                    break;
            }
        }
    },


};
</script>


