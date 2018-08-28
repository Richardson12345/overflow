<template>
    <div >
      <div v-for="(question, key) in questions"
        v-bind:key="key">
        <div class="card w-100">    
          <h5 class="card-header"> <strong>asked by:</strong>  {{question.user.username}} <span> &emsp; &emsp;</span>  <strong> createdAt:</strong> {{question.created_at}} <span> &emsp; &emsp;</span>  <strong>  updatedAt: </strong> {{question.updated_at}}</h5>
          <div class="card-body">
            <div class="row">
              <div class="col col-md-1">
                <i class="glyphicon glyphicon-chevron-up"></i>
                <div id="wrap" >
                    {{(question.upVote.length - question.downVote.length)}}
                </div>
                <i class="glyphicon glyphicon-chevron-down"></i>
              </div>
              <div class="border-left col col-md-11">
               <h5 class="card-title"> <strong>title: </strong> {{question.question}} </h5>
               <p class="card-text" v-html="question.input.slice(0,500) + ' ...'"></p>
              <button class="btn btn-primary" @click="questionPost(question._id)">go to thread</button>
              </div>
           </div>
          </div>
        </div>
        <br>
      </div>
     <hr>   
    </div>
</template>

<script>

import { mapState, mapActions } from 'vuex';

export default {
    data(){
        return {

        }
    },
    computed: {
        ...mapState([
            'questions'
        ])

    },
    methods: {
        ...mapActions([
            'getQuestions'
        ]),
        questionPost(id){
            this.$router.push(`/question/${id}`)
        }
    },
    mounted(){
        this.getQuestions()
    }
}
</script>

