import { mapGetters, mapActions } from 'vuex'
import modal from '../modal/modal.js'
import selector from '../selector/selector.js'
import template from './template.html'

export default {
  template,
  components: {
    modal,
    selector
  },
  mounted () {
    this.setUserData()
  },
  computed: {
    ...mapGetters([
      'userData'
    ])
  },
  data () {
    return {
      transactionDate: null,
      transactionName: null,
      transactionAmount: null
    }
  },
  methods: {
    ...mapActions([
      'setUserData'
    ]),
    // addAccount () {
    //   this.$root.$firebaseRefs.users
    //     .child(this.user.key).child('data').child('accounts').push({
    //       name: this.addAccountType
    //     })
    //   this.computeAccounts()
    // },
    // deleteAccount (key) {
    //   this.$root.$firebaseRefs.users
    //     .child(this.user.key).child('data').child('accounts').child(key).remove()
    //   this.computeAccounts()
    // },
    // putAccounts () {
    //   this.users.child(this.user.key).once('value').then(i => {
    //     if (i.val().data.accounts) {
    //       this.accounts = []
    //       Object.keys(i.val().data.accounts).forEach(j => {
    //         this.accounts.push({
    //           name: i.val().data.accounts[j].name,
    //           key: j
    //         })
    //       })
    //     }
    //   })
    // },
    // computeAccounts () {
    //   var currency = this.currency
    //   this.users.child(this.user.key).once('value').then(i => {
    //     this.accountsTemplate = ''
    //     if (i.val().data.accounts) {
    //       Object.keys(i.val().data.accounts).forEach(j => {
    //         var newAccountCount = 0
    //         Object.keys(i.val().data.spendings).forEach(k => {
    //           if (i.val().data.accounts[j].name === i.val().data.spendings[k].type) {
    //             newAccountCount += +i.val().data.spendings[k].money
    //           }
    //         })
    //         this.accountsTemplate += `
    //           <div class="flex money-accountItem">
    //             <span class="text-xs-right">${i.val().data.accounts[j].name}: <b>${newAccountCount} ${currency}</b></span>
    //           </div>
    //         `
    //       })
    //     }
    //   })
    //   this.putAccounts()
    // },
    // addCategory (coll, catName) {
    //   const key = this.user.key
    //   this.$root.$firebaseRefs.users
    //     .child(key)
    //     .child('data')
    //     .child(coll)
    //     .push({
    //       catName: this[catName]
    //     })
    //     .then(i => {
    //       this.$root.$firebaseRefs.users
    //         .child(key)
    //         .child('data')
    //         .child(coll)
    //         .child(i.key)
    //         .update({
    //           thisKey: i.key
    //         })
    //     })
    //   this.fullCategoriesFromDB()
    //   this[catName] = null
    // },
    // fullCategoriesFromDB () {
    //   this.spendingsCategory = []
    //   this.userData.child('spendingsCategories').once('value').then(i => {
    //     i.forEach(j => {
    //       this.spendingsCategory.push([j.val().catName, j.val().thisKey])
    //     })
    //   })
    //   this.incomesCategories = []
    //   this.userData.child('incomesCategories').once('value').then(i => {
    //     i.forEach(j => {
    //       this.incomesCategories.push([j.val().catName, j.val().thisKey])
    //     })
    //   })
    // },
    // removeCategory (key, coll) {
    //   this.userData.child(coll).child(key).remove()
    //   this.fullCategoriesFromDB()
    //   this.computeAccounts()
    // },
    addTransaction (type) {
      const key = this.$store.getters.user.key
      this.$root.$firebaseRefs.users
        .child(key)
        .child('data')
        .child('transactions').push({
          name: this.transactionName,
          date: this.transactionDate,
          amount: this.transactionAmount,
          type: document.querySelector('.transaction-type .selector-selected').innerText
        })
        .then(it => {
          this.$root.$firebaseRefs.users
            .child(key)
            .child('data')
            .child('transactions')
            .child(it.key)
            .update({
              thisKey: it.key
            })
        })
    },
    deleteTransaction (key) {
      this.$root.$firebaseRefs.users
        .child(this.$store.getters.user.key)
        .child('data')
        .child('transactions')
        .child(key)
        .remove()
    }
    // computeCash () {
    //   this.users.child(this.user.key).once('value').then(i => {
    //     this.cash = 0
    //     if (i.val().data.incomes) {
    //       Object.keys(i.val().data.incomes).forEach(j => {
    //         this.cash += +i.val().data.incomes[j].money
    //       })
    //     }
    //     if (i.val().data.spendings) {
    //       Object.keys(i.val().data.spendings).forEach(j => {
    //         this.cash -= +i.val().data.spendings[j].money
    //       })
    //     }
    //   })
    // },
  }
}
