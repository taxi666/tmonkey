import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    city: '',
    channel: '',
    cityName: '',
    bannerRowData: null,
    classRowData: null,
    activityRowData: null
  },
  mutations: {
    setCity(state, city) {
      state.city = city;
    },
    setCityName(state, cityName){
      state.cityName = cityName;
    },
    setChannel(state, channel){
      state.channel = channel;
    },
    setBannerRowData(state, bannerRowData){
      state.bannerRowData = bannerRowData;
    },
    setClassRowData(state, classRowData){
      state.classRowData = classRowData;
    },
    setActivityRowData(state, classRowData){
      state.activityRowData = classRowData;
    }
  },
  actions: {},
  getters: {
    getCity: (state) => {
      return state.city;
    },
    getCityName: (state) => {
      return state.cityName;
    },
    getChannel: (state, getters) => {
      return state.channel;
    },
    getBannerRowData: (state) => {
      return state.bannerRowData;
    },
    getClassRowData: (state) => {
      return state.classRowData;
    },
    getActivityRowData: (state) => {
      return state.activityRowData;
    }
  }
})
