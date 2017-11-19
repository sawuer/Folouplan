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
      users: this.$root.$firebaseRefs.users,
      userData: this.$root.$firebaseRefs.users.child(this.$store.getters.user.key).child('data'),
      spendingAmount: null,
      spendingName: null,
      spendingsType: null,
      spendingsCategory: [],
      spendingsTypeSelect: null,
      newSpendingCategory: null,

      incomeAmount: null,
      incomeType: null,
      incomesCategories: [],
      newIncomeCategory: null,
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
      cash: 0,
      capital: 0,
      currency: 'тг',
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
      this[catName] = null
    },
    fullCategoriesFromDB () {
      this.spendingsCategory = []
      this.userData.child('spendingsCategories').once('value').then(i => {
        i.forEach(j => {
          this.spendingsCategory.push([j.val().catName, j.val().thisKey])
        })
      })
      this.incomesCategories = []
      this.userData.child('incomesCategories').once('value').then(i => {
        i.forEach(j => {
          this.incomesCategories.push([j.val().catName, j.val().thisKey])
        })
      })
    },
    removeCategory (key, coll) {
      this.userData.child(coll).child(key).remove()
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
      this.userData.child(coll).child(key).remove()
      this.computeCash()
      this.computeCapital()
    },
    computeCash () {
      this.users.child(this.user.key).once('value').then(i => {
        this.cash = 0
        if (i.val().data.incomes) {
          Object.keys(i.val().data.incomes).forEach(j => {
            this.cash += +i.val().data.incomes[j].money
          })
        }
        if (i.val().data.spendings) {
          Object.keys(i.val().data.spendings).forEach(j => {
            this.cash -= +i.val().data.spendings[j].money
          })
        }
      })
    },
    computeCapital () {
      this.users.child(this.user.key).once('value').then(i => {
        this.capital = 0
        if (i.val().data.spendings) {
          Object.keys(i.val().data.spendings).forEach(j => {
            this.capital += i.val().data.spendings[j].type === 'капитал' ? +i.val().data.spendings[j].money : 0
          })
        }
      })
    },
    newSpendingName (e, spending, key) {
      this.userData.child('spendings').child(key).update({
        name: e.target.value
      })
    },
    newType (type, key, coll) {
      this.userData.child(coll).child(key).update({ type })
    },
    newMoneyCount (e, key, coll) {
      this.userData.child(coll).child(key).update({
        money: e.target.value
      })
      this.computeCash()
      this.computeCapital()
    }
  }
}
