<template>
  <div class="modal" id="exampleModal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">update you question</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
        <wysiwyg v-model="updateHtml" />
        </div>
        <div class="modal-footer">
          <button type="button" @click="updateQuestion(updateHtml)" data-dismiss="modal" class="btn btn-primary">update and save</button>
          <button type="button" data-dismiss="modal" class="btn btn-primary">cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapState, mapActions } from 'vuex'


export default {
    props: ["postId"],
    computed: {
      ...mapState(['currentQuestion'])
    },
    data(){
        return {
            updateHtml: ''
        }
    },
    methods: {
        ...mapActions([
            'updateQs'
        ]),
        updateQuestion(updateHtml){
            let updateObj = {
                question : this.postId,
                input : updateHtml
            };
            this.updateQs(updateObj);
        }
    },
    watch: {
      currentQuestion ( obj ) {
        // console.log('im here')
        this.updateHtml = obj.input   
      }
    }
}
</script>
