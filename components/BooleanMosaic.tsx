import { Fieldset } from './BooleanMosaicUI'
import css from './css/convertToJs'
import { encodeSituation } from './publicodes/situationUtils'
import { getRuleName } from './publicodes/utils'

export const isMosaicQuestion = (currentQuestion, rule, rules) => {
  const localIsMosaic = (dottedName, rule) =>
    dottedName.startsWith('gestes . ') &&
    rule &&
    ['oui', 'non'].includes(rule['par défaut'])
  if (!localIsMosaic(currentQuestion, rule)) return false

  const questions = Object.entries(rules).filter(([dottedName, rule]) =>
    localIsMosaic(dottedName, rule),
  )
  return questions
}

export const mosaicQuestionText = (rules, currentQuestion) => {
  return rules['gestes . montant'].question.mosaïque
}

export default function BooleanMosaic({
  rules,
  setSearchParams,
  rule,
  engine,
  situation,
  answeredQuestions,
  questions,
}) {
  const grouped = questions.reduce(
      (memo, [q, rule]) => {
        const categoryDottedName = q.split(' . ').slice(0, -1).join(' . ')

        return {
          ...memo,
          [categoryDottedName]: [...(memo[categoryDottedName] || []), q],
        }
      },

      {},
    ),
    entries = Object.entries(grouped)

  const levels = entries.map(([el]) => el.split(' . ').length),
    minimum = Math.min(...levels),
    maximum = Math.max(...levels)

  if (maximum - minimum > 1) {
    throw new Error('The UI cannot yet handle 3 level mosaic questions')
  }

  const categories = entries.filter((el) => el[0].split(' . ').length === 2)

  console.log({ entries })

  const onChange = (dottedName) => {
    const encodedSituation = encodeSituation(
      {
        ...situation,
        [dottedName]: situation[dottedName] === 'oui' ? 'non' : 'oui',
      },
      false,
      answeredQuestions,
    )
    console.log('on change will set encodedSituation', encodedSituation)

    setSearchParams(encodedSituation, false, false)
    console.log('set situation', dottedName)
  }

  return (
    <Fieldset>
      <ul>
        {categories.map(([category, dottedNames]) => (
          <li key={category}>
            <h4>{rules[category].titre}</h4>
            <ul>
              <Checkboxes
                {...{ questions: dottedNames, rules, onChange, situation }}
              />
              {entries
                .filter(([k, v]) => k.startsWith(category) && k !== category)
                .map(([subCategory, dottedNames2]) => {
                  const categoryTitle = rules[subCategory].titre

                  return (
                    <li key={subCategory}>
                      <h5>{categoryTitle}</h5>
                      <ul>
                        <Checkboxes
                          {...{
                            questions: dottedNames2,
                            rules,
                            onChange,
                            situation,
                          }}
                        />
                      </ul>
                    </li>
                  )
                })}
            </ul>
          </li>
        ))}
      </ul>
    </Fieldset>
  )
}

const Checkboxes = ({ questions, rules, onChange, situation }) => {
  return questions.map((dottedName) => {
    const questionRule = rules[dottedName]
    return (
      <li key={dottedName}>
        <label key={dottedName}>
          <input
            style={css`
              margin-right: 1rem;
              cursor: pointer;
            `}
            type="checkbox"
            checked={situation[dottedName] === 'oui'}
            value={Math.random() > 0.5 ? true : false}
            onChange={() => onChange(dottedName)}
          />
          {questionRule.titre || getRuleName(dottedName)}
        </label>
      </li>
    )
  })
}
