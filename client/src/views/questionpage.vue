<template>
<div>
    <Navbar/>
    <span class="d-block p-2 bg-dark text-white"><strong>asked by:</strong> {{currentQuestion.user.username}} </span>
    <h1> <strong>Thread: </strong> {{currentQuestion.question}}</h1>
    <answer-mod/>
    <modal v-bind:postId="params"/>
    <div class="container">
        <div class="card w-100">
          <h5 class="card-header">
              <strong>created at: </strong>
              {{currentQuestion.created_at}} 
              <strong>updated at: </strong> 
              {{currentQuestion.updated_at}}
              <span class="tilt" v-if="currentQuestion.user._id == userId"><i @click="toUpdate(currentQuestion._id)" class="fas fa-edit" data-toggle="modal" data-target="#exampleModal"></i></span>
              <span class="tilt" v-if="currentQuestion.user._id == userId"><i @click="toDelete(currentQuestion._id)" class="fas fa-trash-alt"></i> &nbsp; </span>  
          </h5>
          <div class="card-body">
            <div class="row">
                <div class="col col-md-1">
                    <i class="glyphicon glyphicon-chevron-up" @click="upVoteQs()"></i>
                    <div id="wrap" >
                       {{currentQuestion.upVote.length - currentQuestion.downVote.length}}
                    </div>
                    <i class="glyphicon glyphicon-chevron-down" @click="downVoteQs()"></i>
                </div>
                <div class="border-left col col-md-11">
                  <p class="card-text" v-html="currentQuestion.input" ></p>
                </div>
            </div>
          </div>
        </div>
        <hr>
        <div class="comments">
            <span class="d-block p-2 bg-secondary text-white"> Add a comment: </span>
            <wysiwyg v-model="inputHtml" />
            <button type="button" @click="postAnswer(inputHtml)"   class="btn btn-primary btn-lg btn-block"><strong>submit answer</strong></button>
        </div>
        <div class="answers">
            <hr>
            <span class="d-block p-2 bg-secondary text-white">user replies: </span>
            <div class="card" v-for="(answer, key) in currentAnswer"
                v-bind:key="key">
              <h5 class="card-header"> <strong>username: </strong> {{answer.user.username}} <span class="tilt" 
              v-if="answer.user._id == userId"><i @click="updateAns(answer._id)" class="fas fa-edit" data-toggle="modal" data-target="#answerModal"></i></span><strong>createdAt: </strong> {{answer.created_at}} <strong> updatedAt: </strong> {{answer.updated_at}}</h5>
              <div class="card-body">
                <div class="row">
                    <div class="align-self-sm-center col col-md-1">
                        <i class="glyphicon glyphicon-chevron-up" @click="upVoteAns(answer._id)"></i>
                        <div id="wrap" >
                            {{(answer.upVote.length - answer.downVote.length)}}
                        </div>
                        <i class="glyphicon glyphicon-chevron-down" @click="downVoteAns(answer._id)"></i>
                    </div>
                    <div class="border-left col col-md-11">
                        <p class="card-text" v-html="answer.answer" ></p>
                    </div>
                </div>
              </div>
            </div>
        </div>
    </div>    
</div>
</template>



<script>
import { mapState , mapActions } from 'vuex'
import Navbar from "@/components/navbar.vue"
import questionVue from '../components/question.vue';
import modal from "@/components/modalUpdate.vue";
import AnswerMod from '@/components/answerModal.vue'

export default {
    data(){
      return {
          params: this.$route.params.id,
          inputHtml: '',
          userId : localStorage.getItem("id")
      }
    },
    computed: {
        ...mapState([
            'currentQuestion',
            'currentAnswer'
        ])
    },
    methods: {
        ...mapActions([
            'getSpecificAns',
            'getSpecificQs',
            'submitAnswer',
            'upvoteAns',
            'downvoteAns',
            'upvoteQs',
            'downvoteQs',
            'deleteQuestion',
            'updateAnswer'
        ]),
        updateAns (answerId) {
            this.updateAnswer(answerId)
        },
        toDelete (questionId) {
            this.deleteQuestion(questionId)
        },
        toUpdate (questionID) {
            console.log(questionID)
        },
        postAnswer(answerHtml){
            let queryObj = {
                question: this.$route.params.id,
                answer: answerHtml
            }
            this.submitAnswer(queryObj)
            this.inputHtml = "";
        },
        upVoteAns(answerId, questionId){
            let queryObj = {
                answer : answerId,
                question: this.params
            }
            this.upvoteAns(queryObj)
        },
        downVoteAns(answerId){
             let queryObj = {
                answer : answerId,
                question: this.params
            }
            this.downvoteAns(queryObj)
        },
        upVoteQs(){
            let question = this.params;
            this.upvoteQs(question) 
        },
        downVoteQs(){
            let question = this.params;
            this.downvoteQs(question) 
        }

    },
    mounted(){
        this.getSpecificQs(this.params),
        this.getSpecificAns(this.params)
    },
    components: {
        Navbar,
        modal,
        AnswerMod
    }
}
</script>

<style>
.tilt {
    float: right;
}

#wrap{
    flex-wrap: wrap;
}
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>
