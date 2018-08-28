<template>
  <div class="modal" id="answerModal" tabindex="-1" role="dialog">
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
          <button type="button" @click="tinkerAns(updateHtml)" data-dismiss="modal" class="btn btn-primary">update and save</button>
          <button type="button" data-dismiss="modal" class="btn btn-primary">cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
    computed: {
        ...mapState([
            'updateAns'
        ])
    },
    data () {
        return {
            updateHtml: ''
        }
    },
    methods: {
        ...mapActions([
            'changeAns'
        ]),
        tinkerAns (html) {
            let updateObj = {
                answerId : this.updateAns._id,
                answer: html,
                blogId: this.$route.params.id
            }
            this.changeAns(updateObj)
        }
    },
    watch: {
        updateAns ( obj ) {
            this.updateHtml = obj.answer
        }
    }
}
</script>

<style>

</style>

