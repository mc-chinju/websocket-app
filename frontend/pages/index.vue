<template>
  <no-ssr>
    <v-layout column justify-center align-center>
      <v-flex xs12 sm8 md6>
        <div>{{ this.saveMessage }}</div>
        <form>
          <v-text-field
            v-model="messageText"
            label="テキスト"
            data-vv-name="messageText"
            placeholder="何かテキストを入力してください"
          />
          <v-btn @click="handleClick" block class="font-weight-bold">投稿する</v-btn>
        </form>
      </v-flex>
    </v-layout>
  </no-ssr>
</template>

<script>
export default {
  data() {
    return {
      messageText: '',
      saveMessage: ''
    }
  },
  created() {
    if (process.client) {
      const ActionCable = require('actioncable')
      const cable = ActionCable.createConsumer('ws://localhost:3000/cable')

      this.messageChannel = cable.subscriptions.create('PostChannel', {
        received: (data) => {
          this.saveMessage = data
          // this.$store.commit('addMessage', data)
        }
      })
    }
  },
  methods: {
    handleClick: function() {
      //ActionCable PostChannelにおけるpostメソッドを実行する
      this.messageChannel.perform('post', {
        message: this.messageText
      })
      // console.log(this.$store.state.messages);
      //メッセージ追加後にテキストボックスを空にする
      this.messageText = ''
    }
  }
}
</script>

<style lang="scss" module>
</style>