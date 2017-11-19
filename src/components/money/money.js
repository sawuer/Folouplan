import { mapGetters } from 'vuex'
import template from './money.html'

export default {
  template,
  mounted () {
    this.fullCategoriesFromDB()
    this.computeCapital()
    this.computeCash()
  },
  computed: {
    ...mapGetters([
      'user'
    ])
  },
  data () {
    return {
      pathCurrentUserData: this.$root.$firebaseRefs.users
        .child(this.$store.getters.user.key)
        .child('data'),
      spendingAmount: null,
      spendingName: null,
      spendingsType: null,
      spendingsCategory: [],
      spendingsTypeSelect: null,
      spendingTypeUpdate: null,

      incomeAmount: null,
      incomeType: null,
      incomeCategories: [],
      incomeTypeUpdate: null,
      itemNameRules: [
        (v) => !!v || 'You didn\'t fill out the puchase name',
        (v) => v && v.length <= 40 || 'Purchase name must be less than 40 characters'
      ],
      amountRules: [
        (v) => /^\d+$/.test(v) || 'There must be only numbers',
        (v) => !!v || 'You didn\'t fill out the cost'
      ],
      typeRules: [
        (v) => !!v || 'You didn\'t fill out the type'
      ],
      dateRules: [
        (v) => !!v || 'You didn\'t fill out the date'
      ],
      dialog: false,
      dialog2: false,
      valid: false,
      valid2: false,
      picker: null,
      picker2: null,
      date: false,
      date2: false,
      cashSum: 0,
      capital: 0,
      currentCurrency: 'тг',
      spendingHeader: [
        { text: 'date', align: 'left', sortable: true, value: 'date' },
        { text: 'item', align: 'left', sortable: true, value: 'name' },
        { text: 'type', align: 'left', sortable: true, value: 'type' },
        { text: 'amount', align: 'right', sortable: true, value: 'cost' }
      ],
      incomeHeader: [
        { text: 'date', align: 'left', sortable: true, aria_sort: 'descending', value: 'date' },
        { text: 'type', align: 'left', sortable: true, value: 'type' },
        { text: 'amount', align: 'right', sortable: true, value: 'income' }
      ]
    }
  },
  methods: {
    addCategory (coll, catName) {
      const key = this.user.key
      this.$root.$firebaseRefs.users
        .child(key)
        .child('data')
        .child(coll)
        .push({
          catName: this[catName]
        })
        .then(i => {
          this.$root.$firebaseRefs.users
            .child(key)
            .child('data')
            .child(coll)
            .child(i.key)
            .update({
              thisKey: i.key
            })
        })
      this.fullCategoriesFromDB()
    },
    fullCategoriesFromDB () {
      this.spendingsCategory = []
      var varSpendingsCategories = this.pathCurrentUserData.child('spendingsCategories')
      varSpendingsCategories.once('value').then(snapshot => {
        snapshot.forEach(item => {
          this.spendingsCategory.push([item.val().catName, item.val().thisKey])
        })
      })
      this.incomeCategories = []
      var varIncomesCategories = this.pathCurrentUserData.child('incomesCategories')
      varIncomesCategories.once('value').then(snapshot => {
        snapshot.forEach(item => {
          this.incomeCategories.push([item.val().catName, item.val().thisKey])
        })
      })
    },
    removeCategory (key, coll) {
      this.pathCurrentUserData.child(coll).child(key).remove()
      this.fullCategoriesFromDB()
    },
    addSpending () {
      if (this.$refs.form.validate()) {
        var form = this.$refs.form
        var money = +form.$el[0].value
        var name = form.$el[1].value
        var type = form.$el[2].previousSibling.textContent
        var date = form.$el[3].value
        const key = this.user.key
        this.$root.$firebaseRefs.users
          .child(key)
          .child('data')
          .child('spendings').push({
            money, name, type, date
          })
          .then(i => {
            this.$root.$firebaseRefs.users
              .child(key)
              .child('data')
              .child('spendings')
              .child(i.key)
              .update({
                thisKey: i.key
              })
          })
        this.computeCash()
        this.computeCapital()
        setTimeout(() => this.$refs.form.reset(), 200)
      }
    },
    addIncome () {
      if (this.$refs.form2.validate()) {
        var form = this.$refs.form2
        var money = form.$el[0].value
        var type = form.$el[1].previousSibling.textContent
        var date = form.$el[2].value
        const key = this.user.key
        this.$root.$firebaseRefs.users
          .child(key)
          .child('data')
          .child('incomes').push({
            type, date, money
          })
          .then(i => {
            this.$root.$firebaseRefs.users
              .child(key)
              .child('data')
              .child('incomes')
              .child(i.key)
              .update({
                thisKey: i.key
              })
          })
        this.computeCash()
        this.computeCapital()
        setTimeout(() => this.$refs.form2.reset(), 200)
      }
    },
    deleteItem (key, coll) {
      this.pathCurrentUserData
        .child(coll)
        .child(key).remove()
      this.computeCash()
      this.computeCapital()
    },
    computeCash () {
      this.$root.users.forEach(user => {
        if (user.id === this.user.id && user.data) {
          this.cashSum = 0
          if (user.data.incomes) {
            Object.keys(user.data.incomes).forEach(i => {
              this.cashSum += +user.data.incomes[i].money
            })
          }
          if (user.data.spendings) {
            Object.keys(user.data.spendings).forEach(i => {
              this.cashSum -= +user.data.spendings[i].money
            })
          }
        }
      })
    },
    computeCapital () {
      this.$root.users.forEach(user => {
        if (user.id === this.user.id && user.data) {
          this.capital = 0
          if (user.data.spendings) {
            Object.keys(user.data.spendings).forEach(i => {
              this.capital += user.data.spendings[i].type === 'капитал' ? +user.data.spendings[i].money : 0
            })
          }
        }
      })
    },
    newSpendingTitle (e, spending, key) {
      this.pathCurrentUserData.child('spendings')
        .child(key).update({
          name: e.target.value
        })
    },
    newType (type, key, coll) {
      this.pathCurrentUserData.child(coll).child(key).update({ type })
    },
    newMoneyCount (e, key, coll) {
      this.pathCurrentUserData
        .child(coll)
        .child(key).update({
          money: e.target.value
        })
      this.computeCash()
      this.computeCapital()
    }
  }
}
