import app from '../main'
import { setupGlobDirectives } from '../directive/loadMore'
import { nextTick } from '@vue/runtime-core'
nextTick(() => {
  app.config.globalProperties.getStatusTag = (status: boolean | number, trueText?: string, falseText?: string) => {
    return status ? (
      <span>
        <span class="dot line-block bgSuccess mr5"></span>
        { trueText || '启用' }
      </span>
    ) : (
      <span>
        <span class="dot line-block bgGrey_2 mr5"></span>
        { falseText || '禁用'}
      </span>
    )
  }
  setupGlobDirectives(app)
})
