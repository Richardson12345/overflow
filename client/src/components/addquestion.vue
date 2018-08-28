<template>
    <div class="addQuestions">
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text"> <strong>TITLE</strong> </span>
          </div>
          <textarea  v-model="title" class="form-control" aria-label="With textarea"></textarea>
        </div>
        <wysiwyg v-model="questionHtml" />
        <button type="button" @click="uploadThread(title , questionHtml)" class="btn btn-primary btn-lg btn-block"><strong>submit thread</strong></button>
    </div>
</template>

<script scoped>

import { mapActions } from 'vuex';

export default {
    data(){
        return {
            questionHtml: '',
            title: ''
        }
    },
    methods: {
        ...mapActions([
            'submitQuestion'
        ]),
        uploadThread(title, inputHtml){
            let questionObj = {
                question: title,
                input: inputHtml
            };
            this.submitQuestion(questionObj);
            this.title = '',
            this.questionHtml = ''
         }
       }
    
}
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
</style>

