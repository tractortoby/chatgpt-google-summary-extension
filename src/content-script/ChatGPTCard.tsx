import { LightBulbIcon, SearchIcon } from '@primer/octicons-react'
import { useState } from 'preact/hooks'
import { TriggerMode } from '../config'
import ChatGPTQuery, { QueryStatus } from './ChatGPTQuery'
import { endsWithQuestionMark } from './utils.js'

interface Props {
  question: string
  triggerMode: TriggerMode
  onStatusChange?: (status: QueryStatus) => void
  run: (isRefresh?: boolean) => Promise<void>
  isRefresh?: boolean
}

function ChatGPTCard(props: Props) {
  const { isRefresh, triggerMode, question, onStatusChange, run } = props

  const [triggered, setTriggered] = useState(false)

  console.log('ChatGPTCard props', props)

  if (triggerMode === TriggerMode.Always || isRefresh) {
    return (
      <ChatGPTQuery isRefresh={isRefresh} question={question} onStatusChange={onStatusChange} />
    )
  }
  if (triggerMode === TriggerMode.QuestionMark) {
    if (endsWithQuestionMark(question.trim())) {
      return (
        <ChatGPTQuery isRefresh={isRefresh} question={question} onStatusChange={onStatusChange} />
      )
    }
    return (
      <p className="icon-and-text">
        <LightBulbIcon size="small" /> Trigger ChatGPT by appending a question mark after your query
      </p>
    )
  }
  if (triggered) {
    return (
      <ChatGPTQuery isRefresh={isRefresh} question={question} onStatusChange={onStatusChange} />
    )
  }
  return (
    <a href="javascript:;" onClick={() => run(true)}>
      <SearchIcon size="small" /> Ask ChatGPT to summarize
    </a>
  )
}

export default ChatGPTCard
