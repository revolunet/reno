import { Input } from './InputUI'
import questionType from './publicodes/questionType'
import { encodeSituation } from './publicodes/situationUtils'

export default function InputSwitch({
  rule,
  currentValue,
  currentQuestion,
  situation,
  answeredQuestions,
  setSearchParams,
  engine,
}) {
  const ruleQuestionType = questionType(rule)
  const defaultValue = currentQuestion && engine.evaluate(currentQuestion)

  return (
    <Input
      type={ruleQuestionType}
      placeholder={defaultValue.nodeValue}
      value={currentValue == null ? '' : currentValue}
      name={currentQuestion}
      onChange={(e) => {
        const encodedSituation = encodeSituation(
          {
            ...situation,
            [currentQuestion]:
              ruleQuestionType === 'number'
                ? e.target.value
                : `"${e.target.value}"`,
          },
          false,
          answeredQuestions,
        )
        console.log('on change will set encodedSituation', encodedSituation)

        setSearchParams(encodedSituation, false, false)
      }}
    />
  )
}
