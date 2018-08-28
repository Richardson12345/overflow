import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { stat } from 'fs';
import router from './router';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    logged: false,
    questions: [],
    answers: [],
    currentQuestion: [],
    currentAnswer: [],
    updateAns: ''
  },
  mutations: {
    LOGGED(state,condition){
      state.logged = condition
    },
    GET_QUESTION(state, questionArr) {
      console.log(questionArr)
      state.questions = questionArr
    },
    GET_ANSWER(state, answerArr){
      console.log(answerArr)
      state.answers = answerArr
    },
    GET_SPECIFICQS(state, question){
      console.log(question)
      state.currentQuestion = question
    },
    GET_SPECIFICANS(state, answerArr){
      console.log(answerArr)
      state.currentAnswer = answerArr
    },
    UPDATE_ANS(state, answerObj){
      state.updateAns = answerObj
      console.log(state.updateAns)
    }
  },
  actions: {
    changeAns({ commit, dispatch }, updateObj ) {
      axios.put(`http://localhost:3000/answers/update/${updateObj.answerId}`, {
        answer: updateObj.answer
      })
      .then((result => {
        dispatch('getSpecificAns', updateObj.blogId)
        .then((result => {
          console.log(`succesfully updated`) 
        }))
        .catch((err => {
          console.log(`err in diispatching`)
        }))
      }))
      .catch((err => {
        console.log('oops something went wrong')
        alert('something went wrong')
      }))
    },
    loginAcc(context, credentials){
      axios.post("http://localhost:3000/users/signin", credentials)
      .then((result => {
       console.log(result.data)
       let token = result.data.token;
       let id = result.data.id
       localStorage.setItem("token", token)
       localStorage.setItem("id", id)
       context.commit("LOGGED", true)
       router.push('/home')
      }))
      .catch((err => {
        console.log(err);
        alert("oops on passwprd or username is incorrect")
        context.commit("LOGGED", false)
      }))
    },
    loginFb(context, fbToken){
      axios.post("http://localhost:3000/users/fbsign", { fbToken })
      .then((result => {
        let token = result.data.token;
        let id = result.data.user._id;
        localStorage.setItem("token", token);
        localStorage.setItem("id", id);
        context.commit("LOGGED", true)
        router.push('/home')
      }))
      .catch((err => {
        console.log(err);
        alert("oops failed fb login")
        context.commit("LOGGED", false)
      }))
    },
    logoutAcc(context){
      context.commit("LOGGED", false)
    },
    updateAnswer ({ commit, dispatch }, answerId) {
      axios.get(`http://localhost:3000/answers/one/${answerId}`)
      .then((result => {
        commit('UPDATE_ANS', result.data)
      }))
      .catch((err => {
        console.log(err)
      }))
    },
    deleteQuestion ({ commit, dispatch }, questionId ) {
      axios.delete(`http://localhost:3000/questions/${questionId}`)
      .then((result => {
        console.log('result')
        dispatch('getQuestions')
        .then(() => {
          alert('succesfully deleted question')
          router.push('/home')
        })
        .catch((err) => {
          alert('oops something went wrong')
          console.log(err)
        })
      }))
    },
    getQuestions(context){
      axios.get("http://localhost:3000/questions")
      .then((result => {
        context.commit("GET_QUESTION", result.data)
      }))
      .catch((err => {
        console.log(err)
      }))
    },
    getAnswers(context){
      axios.get("http://localhost:3000/answers")
      .then((result => {
        context.commit("GET_ANSWER", result.data)
      }))
      .catch((err => {
        console.log(err)
      }))
    },
    getSpecificQs(context, qsID){
      axios.get(`http://localhost:3000/questions/one/${qsID}`)
      .then( result => {
        context.commit("GET_SPECIFICQS", result.data)
      })
      .catch((err => {
        console.log(err)
        alert("ooops something went wrong")
      }))
    },
    getSpecificAns(context, qsID){
      axios.get(`http://localhost:3000/answers/filter/${qsID}`)
      .then( result => {
        context.commit("GET_SPECIFICANS", result.data)
      })
      .catch((err => {
        console.log(err)
        alert("ooops something went wrong")
      }))
    },
    submitAnswer(context, query){
      let token = localStorage.getItem("token");
      if(token){
        axios.post("http://localhost:3000/answers",query,{
        headers : {
          token
          }
        })
        .then((result => {
          axios.get(`http://localhost:3000/answers/filter/${query.question}`)
          .then( result => {
            context.commit("GET_SPECIFICANS", result.data);
            alert("succesfully posted answer");
          

          })
          .catch((err => {
            console.log(err)
            alert("ooops something went wrong")
          }))
        }))
        .catch((err => {
          console.log(err);
          alert("oops you must login to answer")
        }))
      }else{
        alert("you must be logged in to answer a question")
      }
    },
    upvoteAns(context, queryObj){
      let token = localStorage.getItem("token");
      if(token){
        axios.put("http://localhost:3000/answers/upvote",{
            answer: queryObj.answer
          },{ headers: { token } })
          .then((result => {
            console.log(result.data);
            alert("succesfully upvoted")
            axios.get(`http://localhost:3000/answers/filter/${queryObj.question}`)
            .then( result => {
              context.commit("GET_SPECIFICANS", result.data)
            })
            .catch((err => {
              console.log(err)
              alert("ooops something went wrong")
            }))
            
          }))
          .catch(( err => {
            console.log(err);
            alert("cant upvote twice or upvote  your own answer")
          }))
      }else{
        alert("you need to login in order to upvote/downvote")
      }
    },
    downvoteAns(context, queryObj){
      let token = localStorage.getItem("token");
      if(token){
        axios.put("http://localhost:3000/answers/downvote",{
            answer: queryObj.answer
          },{ headers: { token } })
          .then((result => {
            console.log(result.data);
            alert("succesfully downvoted")
            axios.get(`http://localhost:3000/answers/filter/${queryObj.question}`)
            .then( result => {
              context.commit("GET_SPECIFICANS", result.data)
            })
            .catch((err => {
              console.log(err)
              alert("ooops something went wrong")
            }))
            
          }))
          .catch(( err => {
            console.log(err);
            alert("cant downvote twice or downvote  your own answer")
          }))
      }else{
        alert("you need to login in order to downvote/downvote")
      }
    },
    upvoteQs(context, qsID){
      let token = localStorage.getItem("token");
      if(token){
        axios.put("http://localhost:3000/questions/upvote", {
          question : qsID
        }, { headers: { token } })
        .then((result => {
          console.log(result.data);
          alert("succesfully upvoted")
          axios.get(`http://localhost:3000/questions/one/${qsID}`)
          .then( result => {
            context.commit("GET_SPECIFICQS", result.data)
          })
        .catch((err => {
          console.log(err)
          alert("ooops something went wrong")
          }))
        }))
        .catch(( err => {
          console.log(err);
          alert("cant upvote twice or upvote  your own question")
        }))
      }else{
        alert("you must be logged in to upvote/downvote")
      }
    },
    downvoteQs(context, qsID){
      let token = localStorage.getItem("token");
      if(token){
        axios.put("http://localhost:3000/questions/downvote", {
          question : qsID
        }, { headers: { token } })
        .then((result => {
          console.log(result.data);
          alert("succesfully downvoted")
          axios.get(`http://localhost:3000/questions/one/${qsID}`)
          .then( result => {
            context.commit("GET_SPECIFICQS", result.data)
          })
        .catch((err => {
          console.log(err)
          alert("ooops something went wrong")
          }))
        }))
        .catch(( err => {
          console.log(err);
          alert("cant downvote twice or downvote  your own question")
        }))
      }else{
        alert("you must be logged in to downvote/downvote")
      }
    },
    submitQuestion(context, questionObj){
      let token = localStorage.getItem("token");
      if(token){
        axios.post("http://localhost:3000/questions", questionObj, {
          headers: { token }
        })
        .then((result => {
          alert("succesfully posted question");
          axios.get("http://localhost:3000/questions")
          .then((result => {
            context.commit("GET_QUESTION", result.data)
          }))
          .catch((err => {
            console.log(err);
            "oops something went wrong"
          }))
        }))
        .catch(err => {
          console.log(err);
          alert("ooops you must be logged in to post a question and input all fields")
        })
      }else{
        alert("you must be logged in to post a question")
      }
    },
    registerUser(context, credentials){
      axios.post("http://localhost:3000/users/signup", credentials)
      .then((result => {
        console.log(result.data);
        alert("succesfully created an account and an email has been sent to your email, you can now login")
        router.push('/')
      }))
      .catch((err => {
        console.log(err);
        alert("ooops username & email must be unique and all field cannot be empty")
      }))
    },
    updateQs(context, updateObj){
      // alert("woooos")
      axios.put("http://localhost:3000/questions/update", updateObj)
      .then((result => {
        console.log(result.data)
        alert("succesfully updated question");
        axios.get(`http://localhost:3000/questions/one/${updateObj.question}`)
        .then( result => {
          context.commit("GET_SPECIFICQS", result.data)
        })
        .catch((err => {
          console.log(err)
          alert("ooops something went wrong")
        }))
      }))
      .catch((err => {
        console.log(err)
        alert("oops somethign went wrong")
      }))
    }
  },
})
