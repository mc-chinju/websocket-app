<template>
  <no-ssr>
    <v-layout justify-center>
      <v-flex xs12 sm8 md6>
        <form>
          <v-text-field
            v-model="messageText"
            label="テキスト"
            data-vv-name="messageText"
            placeholder="何かテキストを入力してください"
          />
          <v-btn @click="handleClick" block class="font-weight-bold">投稿する</v-btn>
        </form>

        <div>{{ this.saveMessage }}</div>
      </v-flex>
    </v-layout>
  </no-ssr>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

// ref: https://qiita.com/JunSuzukiJapan/items/134f3a2b342c4804b498
declare function require(x: string): any

@Component
export default class Index extends Vue {
  messageText = ''
  saveMessage = ''
  messageChannel: any

  created() {
    if (typeof window !== 'undefined') {
      const ActionCable = require('actioncable')
      const cable = ActionCable.createConsumer('ws://localhost:3000/cable')

      this.messageChannel = cable.subscriptions.create('PostChannel', {
        received: (data: any) => {
          this.saveMessage = data
        }
      })
    }
  }

  handleClick() {
    this.messageChannel.perform('post', {
      message: this.messageText
    })
    // console.log(this.$store.state.messages);
    this.messageText = ''
  }
}
</script>


<style lang="scss" module>
</style>
